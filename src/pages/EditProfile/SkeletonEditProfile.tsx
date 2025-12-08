import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function SkeletonEditProfile() {
  return (
    <Grid size={12}>
      <Stack gap={3} sx={{ mt: 6 }}>
        <Skeleton variant="rectangular" width={"20%"} animation="wave" />
        <Skeleton variant="rectangular" width={"50%"} height={40} animation="wave" />
        <Skeleton variant="rectangular" width={"50%"} height={40} animation="wave" />
        <Skeleton variant="rectangular" width={"50%"} height={40} animation="wave" />
        <Skeleton variant="rectangular" width={"50%"} height={40} animation="wave" />
        <Skeleton variant="rectangular" width={"50%"} height={40} animation="wave" />
        <Box sx={{ mt: 4 }}>
          <Skeleton
            variant="circular"
            animation="wave"
            width={"10%"}
            sx={{ aspectRatio: 1, height: "auto", mb: 3 }}
          />
          <Skeleton variant="rectangular" height={20} width={"30%"} />
        </Box>
      </Stack>
    </Grid>
  );
}
