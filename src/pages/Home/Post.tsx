import { Avatar, Button, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import type { Post } from "../../types/types";
import { Link } from "react-router";

type PostProps = { post: Post };
export default function Post({ post }: PostProps) {
  const [followChanged, setFollowChanged] = useState(false);
  console.log("post is", post);
  function handleFollowUnfollow() {}
  const dateOfPost = new Date(post.createdAt);
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            src={SERVER_URL + post.user.profilePicture}
            alt={post.user.username}
            component={Link}
            to={"/user/" + post.user.username}
            sx={{ textDecoration: "none" }}
          />
        }
        action={
          <Button variant="text" sx={{ fontWeight: 600 }} onClick={handleFollowUnfollow}>
            {followChanged ? "Follow" : "Unfollow"}
          </Button>
        }
        title={
          <Link
            to={"/user/" + post.user.username}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {post.user.username.substring(0, 1).toUpperCase() + post.user.username.substring(1)}
          </Link>
        }
        subheader={dateOfPost.toDateString() + " - " + dateOfPost.toISOString().substring(11, 16)}
        slotProps={{ title: { fontWeight: 600 }, subheader: { fontSize: "12px" } }}
      />
    </Card>
  );
}
