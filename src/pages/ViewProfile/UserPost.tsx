import { Box, Paper, Stack } from "@mui/material";
import React from "react";
import type { Post } from "../../types/types";
import { MdEdit } from "react-icons/md";

type PostProps = { post: Post };
export default function UserPost({ post }: PostProps) {
  return (
    <Stack my={3}>
      <Paper sx={{ p: 1, height: 300 }}>
        <Box sx={{ textAlign: "right" }}>
          <MdEdit />
        </Box>
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
