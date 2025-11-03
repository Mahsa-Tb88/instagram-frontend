import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function SkeletonEditProfile() {
  return (
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
  );
}
