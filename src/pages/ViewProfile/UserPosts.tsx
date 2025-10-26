import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { useGetUserPosts } from "../../http/queries";

export default function UserPosts() {
  const username = useParams<{ username: string }>();

  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 3, lg: 4 }}></Grid>
    </Grid>
  );
}
