import { Stack, Button } from "@mui/material";
import type { User } from "../../types/types";

export default function ButtonFollowUnfollow({ user }: { user: User }) {
  return (
    <Stack>
      {user.isFollowing && !user.isFollower ? (
        <Button sx={{ width: "120px" }}>Follow back</Button>
      ) : !user.isFollowing && !user.isFollower ? (
        <Button sx={{ width: "120px" }}> Follow</Button>
      ) : (
        <Button sx={{ width: "120px" }}>Unfollow</Button>
      )}
    </Stack>
  );
}
