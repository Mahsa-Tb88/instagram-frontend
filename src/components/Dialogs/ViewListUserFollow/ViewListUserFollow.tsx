import { useEffect, useState } from "react";
import MyDialog from "../../Customized/MyDialog";
import { Avatar, Box, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useAppStore } from "../../../store/store";
import { useGetFollowers, useGetFollowings } from "../../../http/queries";
import LoadingError from "../../LoadingError";
import UserListSkeleton from "./UserListSkeleton";
import type { User } from "../../../types/types";
import { useNavigate } from "react-router";

let viewList: (u: string, status: string) => void;
// eslint-disable-next-line react-refresh/only-export-components
export { viewList };

export default function ViewListUserFollow() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useAppStore((state) => state.isMobile);
  const [usernameFollower, setUsernameFollower] = useState("");
  const [usernameFollowing, setUsernameFollowing] = useState("");
  const userFollower = useGetFollowers(usernameFollower);
  const userFollowing = useGetFollowings(usernameFollowing);
  let status;
  useEffect(() => {
    viewList = (username: string, status: string) => {
      setOpen(true);
      if (status == "Follower") {
        setUsernameFollower(username);
        status = "Follower";
      } else {
        setUsernameFollowing(username);
        status = "Following";
      }
    };
  }, []);

  function HandleGoToProfile(u: string) {
    setOpen(false);
    setUsernameFollower("");
    setUsernameFollowing("");
    setTimeout(() => {
      navigate("/user/" + u);
    }, 50);
  }

  const userList =
    status == "Follower"
      ? userFollower.data?.data?.body?.users ?? []
      : userFollowing.data?.data?.body?.users ?? [];
  return (
    <MyDialog open={open} fullWidth maxWidth="md" fullScreen={isMobile} setOpen={setOpen}>
      <DialogTitle>Follower</DialogTitle>
      <DialogContent sx={{ p: 0, m: 0 }}>
        { status == userFollower.isFetching || userFollowing.isFetching ? (
          <UserListSkeleton />
        ) : userFollower.error || userFollowing.error ? (
          <Box
            height={500}
            py={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={1}
          >
            <LoadingError message={error.message} handleAction={refetch} />
          </Box>
        ) : (
          <Stack p={4}>
            {userList.map((p, index) => {
              return (
                <Stack
                  height="100%"
                  key={index}
                  flexDirection={"row"}
                  alignItems={"center"}
                  width={"100%"}
                  mb={3}
                  onClick={() => HandleGoToProfile(p.username)}
                >
                  <Avatar src={SERVER_URL + p.profilePicture} sx={{ mr: 1 }} />
                  <Stack>
                    <Typography>{p.username}</Typography>
                    <Typography>{p.fullname}</Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        )}
      </DialogContent>
    </MyDialog>
  );
}
