import { Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import UserComment from "./UserComment";
import type { Comment, Post } from "../../../types/types";
import { showConfirmDialog } from "../ConfirmDialog";
import { useDeleteCommentPost, useEditCommentPost } from "../../../http/mutation";
type CommentProps = {
  post: Post;
  setListComment: React.Dispatch<React.SetStateAction<Comment[]>>;
  listComment: Comment[];
};
export default function CommentComp({ post, setListComment, listComment }: CommentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isEditComment, setIsEditComment] = useState(false);

  const useEditComment = useEditCommentPost();
  const useDeleteComment = useDeleteCommentPost();
  console.log("listComeent", listComment);

  async function deleteComment(id: string) {
    const answer = await showConfirmDialog(
      <p style={{ fontSize: 24 }}>Are you sure you want to delete this comment</p>,
      "Yes",
      "No"
    );
    console.log("deleteCommentId", id);
    if (answer) {
      const data = { id, postId: post._id };

      const updatedList = listComment.filter((l) => l._id !== id);
      setListComment(updatedList);
      console.log("start...");
      useDeleteComment.mutate(data, {
        onSuccess(d) {
          console.log("success", d);
        },
        onError(e) {
          console.log("error.. ", e);
        },
      });
      console.log("end..");
    }
  }

  function saveHandler(id: string, comment: string) {
    setIsEditComment(false);
    const data = { id, text: comment, postId: post._id };
    useEditComment.mutate(data, {
      onSuccess() {
        console.log("save success");
        setPreviousComment(comment);
      },
      onError(e) {
        toast.error(e.message);
        setComment(previousComment);
      },
    });
  }

  return (
    <Stack>
      <Typography component={"h6"} variant="h6" fontWeight={600} mb={1}>
        Comments
      </Typography>
      <Stack sx={{ bgcolor: "light.main", p: 1, borderRadius: 1, mb: 3 }}>
        {listComment.length > 0 ? (
          listComment.map((c) => (
            <UserComment
              post={post}
              key={c._id}
              c={c}
              deleteComment={deleteComment}
              isEditComment={isEditComment}
              setIsEditComment={setIsEditComment}
              saveHandler={saveHandler}
            />
          ))
        ) : (
          <Typography>No Comment yet!</Typography>
        )}
        <div ref={ref} />
      </Stack>
    </Stack>
  );
}
