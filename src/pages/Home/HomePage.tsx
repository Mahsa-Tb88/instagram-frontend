/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Post from "./Post";
import SuggestedUsers from "./SuggestedUsers";
import LoadingError from "../../components/LoadingError";
import { useFeedPosts } from "../../http/queries";
import { useAppStore } from "../../store/store";

export default function HomePage() {
  const isMobile = useAppStore((state) => state.isMobile);
  const { data, error, fetchNextPage, hasNextPage, isFetching, refetch } = useFeedPosts(10);
  const { ref, inView } = useInView({ rootMargin: "150px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  const postExists: boolean = !!data?.pages?.[0]?.data?.body?.count;

  return (
    <Container>
      <Grid container mt={4} mb={isMobile ? 8 : 4} spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box maxWidth={600} mx="auto">
            {data?.pages?.map((page) => {
              return page.data.body.posts.map((p) => <Post key={p._id} post={p} />);
            })}

            {isFetching && (
              <Box textAlign="center">
                <CircularProgress />
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

            {error && !isFetching && (
              <LoadingError message={error.message} handleAction={refetch} />
            )}
          </Box>
          <div ref={ref} />
        </Grid>
        <Grid size={{ xs: 0, lg: 4 }} display={{ xs: "none", lg: "block" }}>
          <Box position="sticky" top="32px" height="calc(100vh - 50px)">
            <SuggestedUsers />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
