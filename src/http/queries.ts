import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { FeedResponse, GetPostResponse, InitResponse } from "./responseTypes";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 8000;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
      error.message = "Can't connect to the server";
    } else if (error?.response?.data?.message !== undefined) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);

export function useInitialize() {
  return useQuery({
    queryKey: ["initialize"],
    queryFn: () => axios.get<InitResponse>("/misc/init"),
  });
}

export function useFeedPosts(limit: number) {
  return useInfiniteQuery({
    queryKey: ["feedPosts", limit],
    initialPageParam: 1,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      axios.get<FeedResponse>("/posts/user/feed", { params: { page: pageParam, limit } }),
    getNextPageParam(lastPage, pages, lastPageParam) {
      const totalPosts = lastPage.data.body.count;
      const totalPages = Math.ceil(totalPosts / limit);
      if (totalPages > pages.length) {
        return lastPageParam + 1;
      } else {
        return;
      }
    },
  });
}

export function useGetPost(postId: string) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => axios.get<GetPostResponse>("/posts" + postId),
    enabled: !!postId,
  });
}
