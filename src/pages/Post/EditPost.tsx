import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useGetPost } from "../../http/queries";
import { Stack } from "@mui/material";
import ViewPostSkeleton from "../../components/Dialogs/ViewPostDialog/ViewPostSkeleton";

export default function EditPost() {
  const { postId } = useParams<{ postId: string }>();

  const { isPending, refetch, data, error } = useGetPost(postId!);

  return <Stack>{isPending ? <ViewPostSkeleton /> : ""}</Stack>;
}
