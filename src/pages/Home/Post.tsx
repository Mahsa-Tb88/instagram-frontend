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
import { useFollowUser, useLikePost, useUnfollowUser, useUnlikePost } from "../../http/mutation";
import { showViewPostDialog } from "../../components/Dialogs/ViewPostDialog/ViewPostDialog";

type PostProps = { post: Post };
export default function Post({ post }: PostProps) {
  const [followChanged, setFollowChanged] = useState(false);
  console.log("post is", post);
  const userId = useUserStore((state) => state._id);
  const liked = post.likes.includes(userId);
  const [likeChanged, setLikeChanged] = useState(false);

  const unlikeMutation = useUnlikePost();
  const likeMutation = useLikePost();
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  function handleFollowUnfollow() {
    if (followChanged) {
      followMutation.mutate(post.user._id, {
        onError() {
          setFollowChanged(followChanged);
        },
      });
    } else {
      unfollowMutation.mutate(post.user._id, {
        onError() {
          setFollowChanged(followChanged);
        },
      });
    }
    setFollowChanged(!followChanged);
  }
  const dateOfPost = new Date(post.createdAt);

  function handleLikeUnlike() {
    if (liked != likeChanged) {
      unlikeMutation.mutate(post._id, {
        onError() {
          setLikeChanged(likeChanged);
        },
      });
    } else {
      likeMutation.mutate(post._id, {
        onError() {
          setLikeChanged(likeChanged);
        },
      });
    }
    setLikeChanged(!likeChanged);
  }

  return (
    <Card sx={{ maxWidth: 500, mb: 5, mx: "auto", boxShadow: 0, border: "1px solid #ccc" }}>
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
        <IconButton onClick={() => showViewPostDialog(post._id)}>
          <MdComment />
        </IconButton>
        <Typography>{post.comments.length}</Typography>
      </CardActions>
    </Card>
  );
}
