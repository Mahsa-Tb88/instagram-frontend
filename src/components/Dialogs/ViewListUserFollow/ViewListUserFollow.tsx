import { useEffect, useState } from "react";
import MyDialog from "../../Customized/MyDialog";
import { Avatar, Box, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useAppStore } from "../../../store/store";
import { useGetFollowers } from "../../../http/queries";
import LoadingError from "../../LoadingError";
import UserListSkeleton from "./UserListSkeleton";
import type { User } from "../../../types/types";

let viewList: (u: string) => void;
// eslint-disable-next-line react-refresh/only-export-components
export { viewList };

export default function ViewListUserFollow() {
  const [open, setOpen] = useState(false);
  const isMobile = useAppStore((state) => state.isMobile);
  const [username, setUsername] = useState("");
  const { data, error, isFetching, refetch } = useGetFollowers(username);

  useEffect(() => {
    viewList = (username: string) => {
      setOpen(true);
      setUsername(username);
    };
  }, []);

  console.log("userFolloerList is ...", data);
  const userList = (data?.data?.body?.users ?? []) as User[];

  return (
    <MyDialog open={open} fullWidth maxWidth="md" fullScreen={isMobile} setOpen={setOpen}>
      <DialogTitle>Follower</DialogTitle>
      <DialogContent sx={{ p: 0, m: 0 }}>
        {isFetching ? (
          <UserListSkeleton />
        ) : error ? (
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
          <Typography>
            {userList.map((p, index) => {
              return (
                <Stack key={index}>
                  <Avatar src={SERVER_URL + p.profilePicture} />
                  <Typography>{p.username}</Typography>
                  <Typography>{p.fullname}</Typography>
                </Stack>
              );
            })}
          </Typography>
        )}
      </DialogContent>
    </MyDialog>
  );
}
