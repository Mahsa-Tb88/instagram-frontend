import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import { Container, Grid } from "@mui/material";

import type { Post } from "../../types/types";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useEditPost } from "../../http/mutation";
import { toast } from "react-toastify";
export default function SinglePostEdit({ post }: { post: Post }) {
 
  const navigate = useNavigate();
  function handleGotoProfile() {
    navigate("/user/" + post.user.username);
  }

  const [caption, setCaption] = useState(post?.caption);

  const { isPending, mutate } = useEditPost();

  function handleSave() {
    mutate(
      { caption, id: post._id },
      {
        onSuccess() {
          toast.success("Caption was updated successfully!");
        },
        onError() {
          setCaption(post.caption);
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
            <Stack direction={"row"} alignItems={"center"} gap={1} sx={{ cursor: "pointer" }}>
              <Avatar
                src={SERVER_URL + post.user.profilePicture}
                onClick={() => handleGotoProfile()}
              />
              <Stack>
                <Typography fontWeight={600} onClick={() => handleGotoProfile()}>
                  {post.user.username.slice(0, 1).toUpperCase() + post.user.username.slice(1)}
                </Typography>
                <Typography color="text.secondary">{post.updatedAt.slice(0, 10)}</Typography>
              </Stack>
            </Stack>
            <TextField
              size="small"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              fullWidth
              multiline
              disabled={isPending}
            />
            <Button
              size="small"
              sx={{ mt: 2 }}
              onClick={handleSave}
              disabled={post.caption.length == caption.length || isPending}
            >
              save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
