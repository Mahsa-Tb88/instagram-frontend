import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { Post } from "../../types/types";
import { MdComment, MdDelete, MdEdit, MdFavorite } from "react-icons/md";
import { useUserStore } from "../../store/store";
import { useDeletePost, useLikePost, useUnlikePost } from "../../http/mutation";
import { showConfirmDialog } from "../../components/Dialogs/ConfirmDialog";
import { toast } from "react-toastify";

type PostProps = { post: Post };
export default function UserPost({ post }: PostProps) {
  const username = useUserStore((state) => state.username);
  const userId = useUserStore((state) => state._id);
  const liked = post.likes.includes(userId);
  const [likeChanged, setLikeChanged] = useState(false);
  const [hover, setHover] = useState(false);

  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const deletePost = useDeletePost();

  function handleLikeUnlikePost() {
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

  async function handleDeletePost() {
    const answer = await showConfirmDialog(
      <p style={{ fontSize: 24 }}>Are you sure you want to delete this post</p>,
      "Yes",
      "No"
    );
    if (answer) {
      deletePost.mutate(post._id, {
        onError(e) {
          console.log(e);
          toast.error(e.message);
        },
      });
    }
  }

  return (
    <Stack my={3}>
      <Card
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          height: 360,
          position: "relative",
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
          // only show pointer on devices that support hover
          "@media (hover: hover)": { cursor: "pointer" },
        }}
      >
        <CardHeader
          sx={{
            zIndex: 2,
            position: "relative",
          }}
          action={
            <Box sx={{ textAlign: "right", mb: 1 }}>
              <IconButton
                sx={{
                  m: 0,
                  p: "5px",
                  opacity: hover ? 1 : 0,
                  pointerEvents: hover ? "auto" : "none",
                  transition: "opacity 0.3s",
                }}
                color="info"
              >
                {username == post.user.username && <MdEdit size={14} />}
              </IconButton>
              <IconButton
                sx={{
                  m: 0,
                  p: "5px",
                  opacity: hover ? 1 : 0,
                  pointerEvents: hover ? "auto" : "none",
                  transition: "opacity 0.3s",
                }}
                color="error"
                onClick={handleDeletePost}
              >
                {username == post.user.username && <MdDelete size={14} />}
              </IconButton>
            </Box>
          }
        />

        <CardMedia src={SERVER_URL + post.image} component="img" alt="post image" />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: hover ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0)",
            transition: "background-color 220ms ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none", // let mouse pass through to card
          }}
          aria-hidden={!hover}
        />
        {hover && (
          <CardActions
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              transform: "translateY(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              py: 1,
              pointerEvents: "auto",
              transition: "all 0.3s ease",
            }}
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
        )}
      </Card>
    </Stack>
  );
}
