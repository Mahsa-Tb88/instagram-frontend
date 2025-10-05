import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import type { Post } from "../../types/types";
import { Link } from "react-router";
import parse from "html-react-parser";
import { useUserStore } from "../../store/store";
import { MdComment, MdFavorite } from "react-icons/md";
import { useLikePost, useUnlikePost } from "../../http/mutation";

type PostProps = { post: Post };
export default function Post({ post }: PostProps) {
  const [followChanged, setFollowChanged] = useState(false);
  console.log("post is", post);
  const userId = useUserStore((state) => state._id);
  const liked = post.likes.includes(userId);
  const [likeChanged, setLikeChanged] = useState(false);

  const unlikeMutation = useUnlikePost();
  const likeMutation = useLikePost();

  function handleFollowUnfollow() {}
  const dateOfPost = new Date(post.createdAt);

  function handleLikeUnlike() {
    if (liked != likeChanged) {
      console.log("diffrent");
      unlikeMutation.mutate(post._id, {
        onError() {
          setLikeChanged(likeChanged);
        },
        onSuccess() {
          setLikeChanged(!likeChanged);
        },
      });
    } else {
      console.log("equal");

      likeMutation.mutate(post._id, {
        onError() {
          setLikeChanged(likeChanged);
        },
        onSuccess() {
          setLikeChanged(!likeChanged);
        },
      });
    }
    setLikeChanged(!likeChanged);
  }

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
      <CardMedia image={SERVER_URL + post.image} component={"img"} />
      <CardContent>
        <Typography variant="body2" component={"div"}>
          {parse(post.caption)}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleLikeUnlike}>
          {liked != likeChanged ? <MdFavorite color="red" /> : <MdFavorite />}
        </IconButton>
        <Typography>{post.likes.length + (!likeChanged ? 0 : liked ? -1 : 1)}</Typography>
        <IconButton>
          <MdComment />
        </IconButton>
        <Typography>{post.comments.length}</Typography>
      </CardActions>
    </Card>
  );
}
