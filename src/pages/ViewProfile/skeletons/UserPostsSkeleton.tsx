import { Grid, Skeleton } from "@mui/material";

export default function UserPostsSkeleton() {
  return (
    <Grid container my={3} columnSpacing={{ xs: 2, sm: 3, lg: 4 }}>
      <Grid size={{ xs: 12, md: 4 }} mb={3}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={200}
          animation="wave"
          sx={{ borderRadius: "4px" }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }} mb={3}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={200}
          animation="wave"
          sx={{ borderRadius: "4px" }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }} mb={3}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={200}
          animation="wave"
          sx={{ borderRadius: "4px" }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }} mb={3}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={200}
          animation="wave"
          sx={{ borderRadius: "4px" }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }} mb={3}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={200}
          animation="wave"
          sx={{ borderRadius: "4px" }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }} mb={3}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={200}
          animation="wave"
          sx={{ borderRadius: "4px" }}
        />
      </Grid>
    </Grid>
  );
}
