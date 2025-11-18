import { Stack, Button } from "@mui/material";
import type { User } from "../../types/types";
import { useFollowUser, useUnfollowUser } from "../../http/mutation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ButtonFollowUnfollow({ user }: { user: User }) {
  const [followStatus, setFollowStatus] = useState(
    user.isFollowing && !user.isFollower
      ? "Follow back"
      : !user.isFollowing && !user.isFollower
      ? "Follow"
      : "Unfollow"
  );

  const followUser = useFollowUser();
  const UnfollowUser = useUnfollowUser();

  function followStatusHandler() {
    if (followStatus == "Follow back" || followStatus == "Follow") {
      const previousStatus = followStatus;
      setFollowStatus("Unfollow");
      followUser.mutate(user._id, {
        onError() {
          setFollowStatus(previousStatus);
          toast.error(followUser.error?.message);
        },
      });
    } else {
      const previousStatus = followStatus;
      setFollowStatus(user.isFollowing ? "Follow back" : "Follow");
      UnfollowUser.mutate(user._id, {
        onError() {
          setFollowStatus(previousStatus);
          toast.error(followUser.error?.message);
        },
      });
    }
  }

  return (
    <Stack>
      <Button sx={{ width: "120px" }} onClick={() => followStatusHandler()}>
        {followStatus}
      </Button>
    </Stack>
  );
}
