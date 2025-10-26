import { Box, IconButton, Paper, Stack } from "@mui/material";
import React from "react";
import type { Post } from "../../types/types";
import { MdEdit } from "react-icons/md";
import { useUserStore } from "../../store/store";

type PostProps = { post: Post };
export default function UserPost({ post }: PostProps) {
  const username = useUserStore((state) => state.username);

  return (
    <Stack my={3}>
      <Paper sx={{ p: 1, height: 300 }}>
        {username == post.user.username && (
          <Box sx={{ textAlign: "right" }}>
            <IconButton>
              <MdEdit size={16} />
            </IconButton>
          </Box>
        )}
        <img
          src={SERVER_URL + post.image}
          alt="post"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            paddingBottom: "20%",
          }}
        />
      </Paper>
    </Stack>
  );
}
