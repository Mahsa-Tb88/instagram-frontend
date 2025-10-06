import { Box, DialogTitle, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyDialog from "../../Customized/MyDialog";
import { useGetPost } from "../../../http/queries";
import LoadingError from "../../LoadingError";
import PostContent from "./PostContent";
import { DialogContent } from "@mui/material";
import ViewPostSkeleton from "./ViewPostSkeleton";
import { useAppStore } from "../../../store/store";

let showViewPostDialog: (s: string) => void;
export { showViewPostDialog };

export default function ViewPostDialog() {
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState("");
  const { data, error, isFetching, refetch } = useGetPost(postId);
  const isMobile = useAppStore((state) => state.isMobile);

  useEffect(() => {
    showViewPostDialog = (postId: string) => {
      setOpen(true);
      setPostId(postId);
    };
  }, []);

  return (
    <MyDialog open={open} fullWidth maxWidth="md" fullScreen={isMobile} setOpen={setOpen}>
      <DialogTitle>View Post</DialogTitle>
      <DialogContent sx={{ p: 0, m: 0 }}>
        {isFetching ? (
          <ViewPostSkeleton />
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
          postId && <PostContent />
        )}
      </DialogContent>
    </MyDialog>
  );
}
