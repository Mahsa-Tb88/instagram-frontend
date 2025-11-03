import { Divider, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useUserStore } from "../../store/store";
import { useGetProfile } from "../../http/queries";
import { useNavigate, useParams } from "react-router";
import LoadingError from "../../components/LoadingError";
import SkeletonEditProfile from "./SkeletonEditProfile";
import { MdHome, MdRefresh } from "react-icons/md";

export default function EditProfilePage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { data, isPending, error, refetch } = useGetProfile(username!);
  const user = data?.data?.body;
  return (
    <Stack width={"80%"} sx={{ mx: 2 }}>
      {!isPending ? (
        <SkeletonEditProfile />
      ) : error ? (
        <LoadingError
          message={error.message}
          handleAction={error.status === 404 ? () => navigate("/") : refetch}
          actionText={error.status === 404 ? "Back to home" : "Retry"}
          actionIcon={error.status === 404 ? <MdHome /> : <MdRefresh />}
        />
      ) : (
        <Stack>
          <Typography component="h3" variant="h3">
            Edit Profile
          </Typography>
          <TextField value={user?.username} />
        </Stack>
      )}
    </Stack>
  );
}
