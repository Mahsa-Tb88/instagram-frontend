import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function ProfileInfoSkeleton() {
  return (
    <Grid container mb={3} spacing={6}>
      <Grid size={3}>
        <Skeleton
          variant="circular"
          animation="wave"
          width={"100%"}
          sx={{ aspectRatio: 1, height: "auto", mb: 3 }}
        />
        <Skeleton variant="rectangular" />
      </Grid>
      <Grid size={9}>
        <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
          <Skeleton variant="rectangular" width={"20%"} animation="wave" />
          <Skeleton variant="rectangular" width={"20%"} height={40} animation="wave" />
        </Stack>
        <Stack
          my={4}
          flexDirection={"row"}
          gap={2}
          alignItems={"center"}
          
        >
          <Skeleton variant="rectangular" width={"20%"} height={40} animation="wave" />
          <Skeleton variant="rectangular" width={"20%"} height={40} animation="wave" />
          <Skeleton variant="rectangular" width={"20%"} height={40} animation="wave" />
        </Stack>
        <Skeleton variant="rectangular" width={"100%"} animation="wave" />
      </Grid>
    </Grid>
  );
}
