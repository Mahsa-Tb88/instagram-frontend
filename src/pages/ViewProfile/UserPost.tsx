import { Stack } from "@mui/material";
import React from "react";
import type { Post } from "../../types/types";

type PostProps = { post: Post };
export default function UserPost({ post }: PostProps) {
  return (
    <Stack>
      <img src={SERVER_URL + post.image} />
    </Stack>
  );
}
