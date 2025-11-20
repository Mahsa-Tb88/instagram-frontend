import { Container, Skeleton, Stack } from "@mui/material";

export default function UserListSkeleton() {
  return (
    <Container>
      <Stack
        spacing={3}
        height="100%"
        p={4}
        justifyContent="center"
        alignItems="center"
        width={"100%"}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              key={index}
              width={"100%"}
            >
              <Skeleton variant="circular" width={50} height={50} sx={{ mr: 2 }} />
              <Stack width={"100%"}>
                <Skeleton width="10%" variant="text" />
                <Skeleton width="20%" variant="text" />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Container>
  );
}
