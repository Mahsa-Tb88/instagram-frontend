import { Grid, Skeleton } from "@mui/material";

export default function UserPostsSkeleton() {
  return (
    <Grid container my={3} spacing={2}>
      {Array.from({ length: 9 }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 4 }} key={index}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ bgcolor: "grey.300", aspectRatio: 1, height: "auto" }}
          />
          ;
        </Grid>
      ))}
    </Grid>
  );
}
