import { useEffect, useState } from "react";
import MyDialog from "../../Customized/MyDialog";
import {
  Avatar,
  Box,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useAppStore } from "../../../store/store";
import LoadingError from "../../LoadingError";
import UserListSkeleton from "./UserListSkeleton";
import { useNavigate } from "react-router";
import { useGetFollowers, useGetFollowings } from "../../../http/queries";
import { useInView } from "react-intersection-observer";
import type { User } from "../../../types/types";

let viewList: (u: string, status: string) => void;
// eslint-disable-next-line react-refresh/only-export-components
export { viewList };

export default function ViewListUserFollow() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useAppStore((state) => state.isMobile);
  const [usernameFollower, setUsernameFollower] = useState("");
  const [usernameFollowing, setUsernameFollowing] = useState("");
  const [status, setStatus] = useState("");
  const userFollower = useGetFollowers(usernameFollower, 10);
  const userFollowing = useGetFollowings(usernameFollowing, 10);

  const { ref, inView } = useInView({ rootMargin: "120px" });

  useEffect(() => {
    if (status == "Follower") {
      if (inView && userFollower.hasNextPage && !userFollower.isFetching && !userFollower.error) {
        userFollower.fetchNextPage();
      }
    } else {
      if (
        inView &&
        userFollowing.hasNextPage &&
        !userFollowing.isFetching &&
        !userFollowing.error
      ) {
        userFollower.fetchNextPage();
      }
    }
  }, [inView]);

  useEffect(() => {
    viewList = (username: string, status: string) => {
      console.log("username ", username, "status ", status);
      setOpen(true);
      if (status == "Following") {
        setUsernameFollowing(username);
        setStatus("Following");
      } else {
        setUsernameFollower(username);
        setStatus("Follower");
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
    status == "Following"
      ? userFollowing.data?.data?.body?.users ?? []
      : userFollower.data?.data?.body?.users ?? [];
  console.log("userlist =====> ", userList);
  console.log("userfollowing is ", userFollowing.data);

  return (
    <MyDialog open={open} fullWidth maxWidth="md" fullScreen={isMobile} setOpen={setOpen}>
      <DialogTitle> {status == "Follower" ? "Follower" : "Following"}</DialogTitle>
      <DialogContent sx={{ p: 0, m: 0 }}>
        {userFollower.isFetching || userFollowing.isFetching ? (
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
            <LoadingError
              message={
                status == "Follower" ? userFollower.error?.message : userFollowing.error?.message
              }
              handleAction={status == "Follower" ? userFollower.refetch : userFollowing.refetch}
            />
          </Box>
        ) : (
          <Stack p={4}>
            {userList.map((p: User, index: number) => {
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
        {(status == "Follower" ? userFollower.isFetching : userFollowing.isFetching) && (
          <Box textAlign="center" width={1} mt={2}>
            <CircularProgress />
          </Box>
        )}

        {status == "Follower"
          ? !userFollower.hasNextPage && !userFollower.isFetching && !userFollower.error
          : !userFollowing.hasNextPage &&
            !userFollowing.isFetching &&
            !userFollowing.error && (
              <div
                style={{
                  height: 54,
                  paddingTop: 6,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                <b>No more followers</b>
              </div>
            )}

        {status == "Follower"
          ? userFollower.error &&
            !userFollower.isFetching && (
              <LoadingError
                message={userFollower.error.message}
                handleAction={userFollower.fetchNextPage}
              />
            )
          : userFollowing.error &&
            !userFollowing.isFetching && (
              <LoadingError
                message={userFollowing.error.message}
                handleAction={userFollowing.fetchNextPage}
              />
            )}
        <div ref={ref} />
      </DialogContent>
    </MyDialog>
  );
}
