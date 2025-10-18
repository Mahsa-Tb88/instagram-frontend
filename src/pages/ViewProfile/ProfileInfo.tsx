import { useNavigate, useParams } from "react-router";
import { useGetProfile } from "../../http/queries";
import ProfileInfoSkeleton from "./skeletons/ProfileInfoSkeleton";
import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import LoadingError from "../../components/LoadingError";
import { MdEdit, MdHome, MdRefresh } from "react-icons/md";
import type { Profile } from "../../types/types";
import noImage from "../../assets/images/no-image.jpg";
import { useState } from "react";
import { useUserStore } from "../../store/store";

export default function ProfileInfo() {
  const { username } = useParams<{ username: string }>();
  const { data, isPending, error, refetch } = useGetProfile(username!);
  const currentUserId = useUserStore((state) => state._id);
  const currentUsername = useUserStore((state) => state.username);
  const [followChanged, setFollowChanged] = useState(false);

  const navigate = useNavigate();

  const user = (data?.data?.body ?? {}) as Profile;

  return (
    <Stack>
      {isPending ? (
        <ProfileInfoSkeleton />
      ) : error ? (
        <LoadingError
          message={error.message}
          handleAction={error.status === 404 ? () => navigate("/") : refetch}
          actionText={error.status === 404 ? "Back to home" : "Retry"}
          actionIcon={error.status === 404 ? <MdHome /> : <MdRefresh />}
        />
      ) : (
        <Grid container columnSpacing={{ xs: 2, sm: 3, lg: 4 }}>
          <Grid size={3}>
            <Avatar
              src={user.profilePicture ? SERVER_URL + user.profilePicture : noImage}
              sx={{
                width: 1,
                aspectRatio: 1,
                height: "auto",
                mb: 3,
                border: "1px solid #ccc",
              }}
            />
            <Typography textAlign="center" fontWeight="bold" fontSize={{ xs: 18, sm: 22, md: 24 }}>
              {user.username}
            </Typography>
          </Grid>
          <Grid size={9}>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Typography>{user.fullname}</Typography>
              {currentUsername == username ? (
                <Button sx={{ ml: 4 }} endIcon={<MdEdit />}>
                  Edit profile
                </Button>
              ) : user.following.includes(currentUserId) !== followChanged ? (
                <Button>Unfollow</Button>
              ) : (
                <Button>{user.following.includes(currentUserId) ? "Follow Back" : "Follow"}</Button>
              )}
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"} gap={2} my={4}>
              <Typography bgcolor="#f2f2f2" borderRadius={1} py={1} px={2}>
                <b>{user.postsCount}Post</b>
              </Typography>
              <Button sx={{ py: 1, px: 2 }} disableElevation color="light">
                <b>{user.followers.length}&nbsp;</b>Followers
              </Button>
              <Button sx={{ py: 1, px: 2 }} disableElevation color="light">
                <b>{user.following.length}&nbsp;</b>Following
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
}
