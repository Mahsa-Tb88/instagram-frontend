/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useGetUserPosts } from "../../http/queries";
import UserPostsSkeleton from "./skeletons/UserPostsSkeleton";
import { useInView } from "react-intersection-observer";
import LoadingError from "../../components/LoadingError";
import { useEffect } from "react";
import Post from "../Home/Post";

export default function UserPosts() {
  const { username } = useParams<{ username: string }>();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isPending, refetch } =
    useGetUserPosts(username!, 9);
  const { ref, inView } = useInView({ rootMargin: "150px" });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  const postExists: boolean = !!data?.pages?.[0]?.data?.body?.count;

  console.log("data...", data);
  return (
    <Stack>
      <Box maxWidth={600} mx="auto">
        {data?.pages?.map((page) => {
          return (
            <Grid container>
              <Grid size={{ xs: 12, md: 4 }}>
                {page.data.body.posts.map((p) => (
                  <Post key={p._id} post={p} />
                ))}
              </Grid>
            </Grid>
          );
        })}

        {isFetching && (
          <Box textAlign="center">
            <UserPostsSkeleton />
          </Box>
        )}

        {!hasNextPage && !isFetching && !error && (
          <Box textAlign="center" bgcolor="#eee" p={4}>
            {postExists ? (
              <Typography>No more posts</Typography>
            ) : (
              <Typography>No post exists</Typography>
            )}
          </Box>
        )}

        {error && !isFetching && <LoadingError message={error.message} handleAction={refetch} />}
      </Box>
      <div ref={ref} />
    </Stack>
  );
}
