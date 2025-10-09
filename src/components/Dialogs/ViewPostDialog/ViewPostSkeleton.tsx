import { Container, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function ViewPostSkeleton() {
  return (
    <Container>
      <Grid container p={0} my={2} spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Skeleton variant="rectangular" sx={{ height: { xs: 200, sm: 400, md: 500 } }} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton width={"60%"} />
          </Stack>
          <Stack spacing={1} height="100%" p={1}>
            <Stack>
              <Skeleton />
              <Skeleton />
              <Skeleton width="40%" />
            </Stack>

            <Stack>
              <Skeleton />
              <Skeleton />
              <Skeleton width="40%" />
            </Stack>

            <Stack>
              <Skeleton />
              <Skeleton />
              <Skeleton width="40%" />
            </Stack>

            <Stack>
              <Skeleton />
              <Skeleton />
              <Skeleton width="40%" />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
