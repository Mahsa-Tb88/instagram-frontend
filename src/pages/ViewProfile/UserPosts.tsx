/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useGetUserPosts } from "../../http/queries";
import UserPostsSkeleton from "./skeletons/UserPostsSkeleton";
import { useInView } from "react-intersection-observer";
import LoadingError from "../../components/LoadingError";
import { useEffect } from "react";
import UserPost from "./UserPost";
import { MdHome } from "react-icons/md";

export default function UserPosts() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isPending } = useGetUserPosts(
    username!,
    9
  );

  const { ref, inView } = useInView({ rootMargin: "150px" });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  const postExists: boolean = !data?.pages?.[0]?.data?.body?.count;

  return (
    <Stack my={4}>
      {isPending ? (
        <UserPostsSkeleton />
      ) : error && error.status === 404 ? (
        <LoadingError
          message={error.message}
          handleAction={() => navigate("/")}
          actionText="Back to home"
          actionIcon={<MdHome />}
        />
      ) : postExists ? (
        <Typography sx={{ textAlign: "center" }} fontWeight={600} fontSize={24} p={2}>
          No Posts yet!
        </Typography>
      ) : (
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
            <Box textAlign={"center"} width={1} mt={2}>
              <CircularProgress />
            </Box>
          )}

          {error && !isFetching && (
            <LoadingError message={error.message} handleAction={fetchNextPage} />
          )}
          <div ref={ref} />
        </Box>
      )}
    </Stack>
  );
}
