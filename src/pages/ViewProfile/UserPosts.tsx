import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router";
import { useGetUserPosts } from "../../http/queries";
import UserPostsSkeleton from "./skeletons/UserPostsSkeleton";

export default function UserPosts() {
  const { username } = useParams<{ username: string }>();
  const { data, isPending, refetch, error } = useGetUserPosts(username!, 9);
  console.log("data...", data);
  return (
    <Stack>
      <UserPostsSkeleton />{" "}
    </Stack>
  );
}
