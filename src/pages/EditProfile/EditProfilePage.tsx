import React from "react";
import { useUserStore } from "../../store/store";
import { useGetProfile } from "../../http/queries";
import { Container, Divider, Grid, Typography } from "@mui/material";
import SkeletonEditProfile from "./SkeletonEditProfile";
import LoadingError from "../../components/LoadingError";
import EditProfileForm from "./EditProfileForm";

export default function EditProfilePage() {
  const username = useUserStore((state) => state.username);
  const { data, isPending, error, refetch } = useGetProfile(username);

  const user = data?.data?.body;

  return (
    <Container>
      <Grid container>
        {isPending ? (
          <SkeletonEditProfile />
        ) : error ? (
          <LoadingError message={error.message} handleAction={refetch} />
        ) : (
          <Grid size={12}>
            <Typography variant="h4" component={"h1"} fontWeight={600}>
              Edit Profile
            </Typography>
            <Divider sx={{ my: 3 }} />
            <EditProfileForm user={user} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
