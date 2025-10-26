import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import type { Post } from "../../types/types";
import { MdComment, MdDelete, MdEdit, MdFavorite } from "react-icons/md";
import { useUserStore } from "../../store/store";

type PostProps = { post: Post };
export default function UserPost({ post }: PostProps) {
  const username = useUserStore((state) => state.username);
  const userId = useUserStore((state) => state._id);
  const liked = post.likes.includes(userId);
  const [likeChanged, setLikeChanged] = useState(false);

  return (
    <Stack my={3}>
      <Paper sx={{ p: 1, height: 350 }}>
        {username == post.user.username && (
          <Box sx={{ textAlign: "right", mb: 1 }}>
            <IconButton sx={{ m: 0, p: "5px" }} color="info">
              <MdEdit size={14} />
            </IconButton>
            <IconButton sx={{ m: 0, p: "5px" }} color="error">
              <MdDelete size={14} />
            </IconButton>
          </Box>
        )}
        <img
          src={SERVER_URL + post.image}
          alt="post"
          style={{
            width: "100%",

            objectFit: "contain",
            display: "block",
            paddingBottom: "20%",
          }}
        />
        <Stack flexDirection={"row"}>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"} mr={2}>
            <IconButton>
              {liked != likeChanged ? (
                <MdFavorite color="red" size={20} />
              ) : (
                <MdFavorite size={20} />
              )}
            </IconButton>
            <Typography fontSize={14}>
              {post.likes.length + (!likeChanged ? 0 : liked ? -1 : 1)}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"} mr={3}>
            <IconButton>
              <MdComment size={20} />
            </IconButton>
            <Typography fontSize={14}>{post.comments.length}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}
