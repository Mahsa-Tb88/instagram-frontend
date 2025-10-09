import { Avatar, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useUserStore } from "../../../store/store";
import { Comment, type Post } from "../../../types/types";
import { useInsertComment } from "../../../http/mutation";
import { useNavigate } from "react-router";

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

  function handleGotoProfile() {}
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
          <Stack>
            <Stack
              onClick={() => handleGotoProfile(post.user.username)}
              direction={"row"}
              alignItems={"center"}
              gap={1}
            >
              <Avatar src={SERVER_URL + post.user.profilePicture} />
              <Stack>
                <Typography fontWeight={600}>
                  {post.user.username.slice(0, 1).toUpperCase() + post.user.username.slice(1)}
                </Typography>
                <Typography color="text.secondary">{post.updatedAt.slice(0, 10)}</Typography>
              </Stack>
            </Stack>
            <Typography sx={{ mt: 1, fontSize: 12, textAlign: "justify", mr: 4 }}>
              {post.caption}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
