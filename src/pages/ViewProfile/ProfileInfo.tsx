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
import { useFollowUser, useUnfollowUser } from "../../http/mutation";

export default function ProfileInfo() {
  const { username } = useParams<{ username: string }>();
  const { data, isPending, error, refetch } = useGetProfile(username!);
  const currentUserId = useUserStore((state) => state._id);
  const currentUsername = useUserStore((state) => state.username);
  const [followChanged, setFollowChanged] = useState(false);
  const followMutaion = useFollowUser();
  const unFollowMutation = useUnfollowUser();

  const navigate = useNavigate();
  function handleFollow() {
    setFollowChanged(!followChanged);
    followMutaion.mutate(user._id, {
      onError() {
        setFollowChanged(followChanged);
      },
    });
  }
  function handleUnfollow() {
    setFollowChanged(!followChanged);
    unFollowMutation.mutate(user._id, {
      onError() {
        setFollowChanged(followChanged);
      },
    });
  }

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
        <Grid container columnSpacing={{ xs: 2, sm: 3, lg: 4 }} mb={3}>
          <Grid size={3}>
            <Avatar
              src={user.profilePicture ? SERVER_URL + user.profilePicture : noImage}
              sx={{
                width: 1,
                aspectRatio: 1,
                height: "auto",
                mb: 1,
                border: "1px solid #ccc",
              }}
            />
            <Typography textAlign="center" fontWeight="bold" fontSize={{ xs: 18, sm: 22, md: 24 }}>
              {user.username.slice(0, 1).toUpperCase() + user.username.slice(1)}
            </Typography>
          </Grid>
          <Grid size={9}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              <Typography>{user.fullname}</Typography>
              {currentUsername == username ? (
                <Button sx={{ ml: 4 }} endIcon={<MdEdit />}>
                  Edit profile
                </Button>
              ) : user.following.includes(currentUserId) !== followChanged ? (
                <Button onClick={handleUnfollow}>Unfollow</Button>
              ) : (
                <Button onClick={handleFollow}>
                  {user.following.includes(currentUserId) ? "Follow Back" : "Follow"}
                </Button>
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
