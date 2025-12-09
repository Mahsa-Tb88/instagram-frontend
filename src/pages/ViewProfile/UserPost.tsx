import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState, type MouseEvent } from "react";
import type { Post } from "../../types/types";
import { MdComment, MdDelete, MdEdit, MdFavorite } from "react-icons/md";
import { useUserStore } from "../../store/store";
import { useDeletePost, useLikePost, useUnlikePost } from "../../http/mutation";
import { showConfirmDialog } from "../../components/Dialogs/ConfirmDialog";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { showViewPostDialog } from "../../components/Dialogs/ViewPostDialog/ViewPostDialog";
import { useNavigate } from "react-router";

type PostProps = { post: Post };
export default function UserPost({ post }: PostProps) {
  const username = useUserStore((state) => state.username);
  const userId = useUserStore((state) => state._id);
  const liked = post.likes.includes(userId);
  const [likeChanged, setLikeChanged] = useState(false);

  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const deletePost = useDeletePost();
  const client = useQueryClient();
  const navigate = useNavigate();

  function handleLikeUnlikePost(e: MouseEvent) {
    e.stopPropagation();
    setLikeChanged(!likeChanged);

    if (liked !== likeChanged) {
      unlikePost.mutate(post._id, {
        onError() {
          setLikeChanged(likeChanged);
        },
      });
    } else {
      likePost.mutate(post._id, {
        onError() {
          setLikeChanged(likeChanged);
        },
      });
    }
  }

  async function handleDeletePost(e: MouseEvent) {
    e.stopPropagation();
    const answer = await showConfirmDialog(
      <p style={{ fontSize: 24 }}>Are you sure you want to delete this post</p>,
      "Yes",
      "No"
    );
    if (answer) {
      const deleting = toast.loading(<i>Deleting...</i>, {
        position: "bottom-left",
        type: "info",
      });
      deletePost.mutate(post._id, {
        onSuccess() {
          toast.update(deleting, {
            type: "success",
            isLoading: false,
            render: "The post was deleted Successfully!",
            autoClose: 2000,
          });
          client.invalidateQueries({ queryKey: ["userPosts", username] });
        },
        onError(e) {
          toast.update(deleting, {
            type: "error",
            isLoading: false,
            render: e.message,
            autoClose: 2000,
          });
        },
      });
    }
  }

  async function handleEditPost(e: MouseEvent) {
    e.stopPropagation();
    navigate("/user/post/edit/" + post._id);
  }

  return (
    <Stack my={3}>
      <Card
        sx={{
          height: 400,
          position: "relative",
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
          // only show pointer on devices that support hover
          "@media (hover: hover)": { cursor: "pointer" },
          "&:hover .cover": { visibility: "visible", opacity: 1 },
        }}
        onClick={() => showViewPostDialog(post._id)}
      >
        <CardHeader
          sx={{
            zIndex: 2,
            position: "relative",
          }}
          action={
            <Box sx={{ textAlign: "right", mb: 1 }}>
              <IconButton color="info" onClick={handleEditPost}>
                {username == post.user.username && <MdEdit size={14} />}
              </IconButton>
              <IconButton color="error" onClick={handleDeletePost}>
                {username == post.user.username && <MdDelete size={14} />}
              </IconButton>
            </Box>
          }
        />

        <CardMedia
          src={SERVER_URL + post.image}
          component="img"
          alt="post image"
          sx={{ maxWidth: "100%", maxHeight: "100%" }}
        />
        <Divider sx={{ mt: 1 }} />
        <CardContent>
          {post.caption.length > 40 ? (
            <Typography>{post.caption.slice(0, 50)} ... </Typography>
          ) : (
            <Typography>{post.caption}</Typography>
          )}
        </CardContent>

        <CardActions
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            py: 1,
            visibility: "hidden",
            opacity: 0,
            pointerEvents: "auto",
            transition: "all 0.3s ease",
          }}
          className="cover"
        >
          {/* Likes */}
          <Box display="flex" alignItems="center" gap={1} onClick={handleLikeUnlikePost}>
            <IconButton>
              {liked !== likeChanged ? (
                <MdFavorite color="red" size={24} />
              ) : (
                <MdFavorite size={24} color="white" />
              )}
            </IconButton>
            <Typography sx={{ color: "white", fontSize: 14 }}>
              {post.likes.length + (!likeChanged ? 0 : liked ? -1 : 1)}
            </Typography>
          </Box>

          {/* Comments */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton sx={{ color: "white" }}>
              <MdComment size={24} />
            </IconButton>
            <Typography sx={{ color: "white", fontSize: 14 }}>{post.comments.length}</Typography>
          </Box>
        </CardActions>
      </Card>
    </Stack>
  );
}
