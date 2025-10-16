import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useUserStore } from "../../../store/store";
import type { Comment, Post } from "../../../types/types";
import { useInsertComment } from "../../../http/mutation";
import { useNavigate } from "react-router";
import { MdDelete, MdEdit, MdSend } from "react-icons/md";
import { toast } from "react-toastify";

type PostContentProps = {
  post: Post;
  hideDialog: () => voids;
};
export default function PostContent({ post, hideDialog }: PostContentProps) {
  const username = useUserStore((state) => state.username);
  const profilePicture = useUserStore((state) => state.profilePicture);
  const [text, setText] = useState("");
  const [newComments, setNewComments] = useState<Comment[]>([]);
  const commentMutation = useInsertComment();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const allComments = [...post.comments, ...newComments];

  function handleGotoProfile(username: string) {
    hideDialog();
    setTimeout(() => {
      navigate("/user/" + username);
    }, 50);
  }
  function handleComment() {
    if (text.length > 300) {
      toast.error("Comment must not exceed 300 characters");
      return;
    }

    setNewComments([
      ...newComments,
      {
        _id: Math.random().toString(),
        text,
        user: { _id: "", username, fullname: "", profilePicture },
      },
    ]);

    commentMutation.mutate(
      { text, id: post._id },
      {
        onSuccess() {
          setText("");
        },
        onError(e) {
          setNewComments((c) => c.slice(0, c.length - 1));
          toast.error(e.message);
        },
      }
    );
  }
  return (
    <Container disableGutters>
      <Grid container spacing={3} my={5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <img
            src={SERVER_URL + post.image}
            style={{
              width: "100%",
              aspectRatio: 1,
              // display: "block",
              // borderRight: "1px solid #ccc",
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack sx={{ mr: 3 }}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Avatar
                src={SERVER_URL + post.user.profilePicture}
                onClick={() => handleGotoProfile(post.user.username)}
              />
              <Stack>
                <Typography fontWeight={600} onClick={() => handleGotoProfile(post.user.username)}>
                  {post.user.username.slice(0, 1).toUpperCase() + post.user.username.slice(1)}
                </Typography>
                <Typography color="text.secondary">{post.updatedAt.slice(0, 10)}</Typography>
              </Stack>
            </Stack>
            <Typography sx={{ mt: 1, fontSize: 12, textAlign: "justify" }}>
              {post.caption}
            </Typography>
          </Stack>
          <Stack mt={4} sx={{ mr: 3 }}>
            <Typography component={"h6"} variant="h6" fontWeight={600} mb={1}>
              Comments
            </Typography>
            <Stack sx={{ bgcolor: "light.main", p: 1, borderRadius: 1, mb: 3 }}>
              {allComments.map((c) => (
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
                      <IconButton sx={{ m: 0, p: "5px" }} color="error">
                        <MdDelete size={14} />
                      </IconButton>
                      <IconButton sx={{ m: 0, p: "5px" }} color="info">
                        <MdEdit size={14} />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Typography
                    sx={{ whiteSpace: "pre-line", overflowWrap: "anywhere", lineHeight: 1.8 }}
                    fontSize={14}
                  >
                    {c.text}
                  </Typography>
                </Stack>
              ))}
              <div ref={ref} />
            </Stack>
            <Stack mt={"auto"} flexDirection={"row"} alignItems={"center"} gap={1}>
              <TextField
                variant="standard"
                size="small"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={commentMutation.isPending}
                fullWidth
                placeholder="Leave a comment"
                // minRows={1}
                // maxRows={2}
                multiline
              />
              <Button
                size="small"
                onClick={handleComment}
                disabled={text.length < 2 || commentMutation.isPending}
              >
                <MdSend size={24} />
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
