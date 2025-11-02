import { Container, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function SkeletonEditPost() {
  return (
    <Container>
      <Grid container p={0} my={2} spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Skeleton variant="rectangular" sx={{ height: { xs: 200, sm: 400, md: 500 } }} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack>
            <Skeleton
              variant="circular"
              animation="wave"
              width={"20%"}
              sx={{ aspectRatio: 1, height: "auto" }}
            />
            <Skeleton width={"20%"} />
            <Skeleton width={"40%"} />
          </Stack>

          <Stack mt={3}>
            <Skeleton variant="rectangular" width={"100%"} height={"100px"} />
            <Skeleton width="100%" sx={{ mt: 1 }} height={"50px"} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
