import { Avatar, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useUserStore } from "../../../store/store";
import { Comment, type Post } from "../../../types/types";
import { useInsertComment } from "../../../http/mutation";
import { useNavigate } from "react-router";
import { MdDelete, MdEdit } from "react-icons/md";

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
          <Stack mt={4}>
            <Typography component={"h6"} variant="h6" fontWeight={600} mb={1}>
              {" "}
              Comments
            </Typography>
            <Stack sx={{ bgcolor: "light.main", p: 1, borderRadius: 1, mr: 3 }}>
              {allComments.map((c) => (
                <Stack mb={1} sx={{ bgcolor: "light.dark", p: 1, borderRadius: 1 }}>
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <Avatar
                      src={SERVER_URL + c.user.profilePicture}
                      sx={{ width: "30px", height: "30px" }}
                    />
                    <Stack>
                      <Typography fontWeight={600} fontSize={14}>
                        {c.user.username}
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
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
