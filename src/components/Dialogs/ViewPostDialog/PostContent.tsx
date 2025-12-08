import { Avatar, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useUserStore } from "../../../store/store";
import type { Post, Comment } from "../../../types/types";
import { useInsertComment } from "../../../http/mutation";
import { useNavigate } from "react-router";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import UserComment from "./UserComment";
import { useQueryClient } from "@tanstack/react-query";

type PostContentProps = {
  post: Post;
  hideDialog: () => void;
};

export default function PostContent({ post, hideDialog }: PostContentProps) {
  const username = useUserStore((state) => state.username);
  const profilePicture = useUserStore((state) => state.profilePicture);
  const [text, setText] = useState("");
  const [listComment, setListComment] = useState<Comment[]>(post.comments);

  const commentMutation = useInsertComment();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    setListComment([
      ...listComment,
      {
        _id: Math.random().toString(),
        text,
        user: { _id: "", username, fullname: "", profilePicture },
      },
    ]);

    setTimeout(() => ref.current!.scrollIntoView({ behavior: "smooth" }), 50);
    commentMutation.mutate(
      { text, id: post._id },
      {
        onSuccess(d) {
          setText("");
          setListComment([
            ...listComment,
            {
              _id: d.data.body._id,
              text,
              user: { _id: "", username, fullname: "", profilePicture },
            },
          ]);
        },
        onError(e) {
          setListComment((c) => c.slice(0, c.length - 1));
          toast.error(e.message);
          console.log("error insert comment", e);
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
              {listComment.length > 0 ? (
                listComment.map((c) => (
                  <UserComment
                    setListComment={setListComment}
                    listComment={listComment}
                    post={post}
                    key={c._id}
                    c={c}
                    handleGotoProfile={handleGotoProfile}
                  />
                ))
              ) : (
                <Typography>No Comment yet!</Typography>
              )}
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
