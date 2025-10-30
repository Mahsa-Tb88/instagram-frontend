/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useGetUserPosts } from "../../http/queries";
import UserPostsSkeleton from "./skeletons/UserPostsSkeleton";
import { useInView } from "react-intersection-observer";
import LoadingError from "../../components/LoadingError";
import { useEffect } from "react";
import UserPost from "./UserPost";

export default function UserPosts() {
  const { username } = useParams<{ username: string }>();
  const { data, error, fetchNextPage, hasNextPage, isFetching, refetch } = useGetUserPosts(
    username!,
    9
  );
  const { ref, inView } = useInView({ rootMargin: "150px" });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);
  const postExists: boolean = !!data?.pages?.[0]?.data?.body?.count;

  return (
    <Stack my={4}>
      <Box maxWidth={800} mx="auto">
        <Grid container columnSpacing={{ xs: 2, sm: 3, lg: 4 }} mb={3}>
          {data?.pages?.map((page) => {
            return page.data.body.posts.map((p) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={p._id}>
                <UserPost post={p} />
              </Grid>
            ));
          })}
        </Grid>

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
