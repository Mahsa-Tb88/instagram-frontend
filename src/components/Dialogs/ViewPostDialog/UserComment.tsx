import { Avatar, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import type { Comment, Post } from "../../../types/types";
import { useUserStore } from "../../../store/store";
import { useDeleteCommentPost, useEditCommentPost } from "../../../http/mutation";
import { toast } from "react-toastify";
import { showConfirmDialog } from "../ConfirmDialog";
import { useNavigate } from "react-router";

type UserCommentProps = {
  c: Comment;
  post: Post;
  deleteComment: (id: string) => void;
  saveHandler: (id: string) => void;
  isEditComment: boolean;
  setIsEditComment: () => void;
};
export default function UserComment({
  c,
  post,
  deleteComment,
  isEditComment,
  setIsEditComment,
}: UserCommentProps) {
  const username = useUserStore((state) => state.username);
  const [comment, setComment] = useState(c.text);
  const [previousComment, setPreviousComment] = useState(c.text);
  const navigate = useNavigate();

  function handleGotoProfile(username: string) {
    // hideDialog();
    setTimeout(() => {
      navigate("/user/" + username);
    }, 50);
  }

  return (
    <Stack mb={1} sx={{ bgcolor: "light.dark", p: 1, borderRadius: 1 }}>
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Avatar
          src={SERVER_URL + c.user.profilePicture}
          sx={{ width: "30px", height: "30px", cursor: "pointer" }}
          onClick={() => handleGotoProfile(c.user.username)}
        />
        <Stack>
          <Typography
            fontWeight={600}
            fontSize={14}
            onClick={() => handleGotoProfile(c.user.username)}
            sx={{ cursor: "pointer" }}
          >
            {c.user.username.slice(0, 1) + c.user.username.slice(1)}
          </Typography>
          <Typography color="text.secondary" fontSize={10}>
            {c._id.slice(0, 10)}
          </Typography>
        </Stack>

        <Stack ml="auto" direction="row" justifyContent="end" alignItems="center">
          {(username == post.user.username || username == c.user.username) && !isEditComment && (
            <IconButton sx={{ m: 0, p: "5px" }} color="error" onClick={() => deleteComment(c._id)}>
              <MdDelete size={14} />
            </IconButton>
          )}
          {username == c.user.username && !isEditComment && (
            <IconButton sx={{ m: 0, p: "5px" }} color="info" onClick={() => setIsEditComment(true)}>
              <MdEdit size={14} />
            </IconButton>
          )}
        </Stack>
      </Stack>

      {isEditComment ? (
        <Stack spacing={1}>
          <TextField
            value={comment}
            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
            fullWidth
          />
          <Button size="small" sx={{ maxWidth: "20%" }} onClick={() => saveHandler(c._id,comment)}>
            Save
          </Button>
        </Stack>
      ) : (
        <Typography
          sx={{ whiteSpace: "pre-line", overflowWrap: "anywhere", lineHeight: 1.8 }}
          fontSize={14}
        >
          {comment}
        </Typography>
      )}
    </Stack>
  );
}
