import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useGetProfile } from "../../http/queries";
import { useNavigate, useParams } from "react-router";
import LoadingError from "../../components/LoadingError";
import SkeletonEditProfile from "./SkeletonEditProfile";
import { MdClose, MdHome } from "react-icons/md";
import { useState } from "react";
import type { RegisterErrorObject } from "../../types/types";
import { useEditProfile } from "../../http/mutation";

export default function EditProfilePage() {
  const params = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { data, isFetching, error, refetch } = useGetProfile(params.username!);
  const { mutate, isPending } = useEditProfile();
  const user = data?.data?.body;

  const [username, setUsername] = useState(user?.username);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState(user?.username);
  const [fullname, setFullName] = useState(user?.fullname);
  const [errors, setErrors] = useState<RegisterErrorObject>({});

  function profilePictureHandler() {}
  function handleSubmit(event: FormEvent) {}

  return (
    <Stack width={"80%"} sx={{ mx: 2, my: 6 }}>
      {isFetching ? (
        <SkeletonEditProfile />
      ) : error ? (
        <LoadingError
          message={error.message}
          handleAction={
            error.status === 404
              ? () => navigate("/")
              : error.status == 401
              ? () => navigate("/auth/login")
              : refetch
          }
          actionText={
            error.status === 404 ? "Back to home" : error.status == 401 ? "Login" : "Retry"
          }
          actionIcon={error.status === 404 && <MdHome />}
        />
      ) : (
        <Stack maxWidth={"60%"} gap={3} onSubmit={handleSubmit}>
          <Typography component="h3" variant="h3" mb={1}>
            Edit Profile
          </Typography>
          <Stack gap={4}>
            <TextField value={username} label="username" disabled />
            <TextField
              value={fullname}
              label="Fullname"
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Typography sx={{ mr: 3 }}>Profile Picture</Typography>
            <Stack
              sx={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                borderColor: "red",
                border: "2px solid rgba(255, 0, 0, 0.6)",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Box
                component={"img"}
                src={SERVER_URL + user?.profilePicture}
                alt="profile image"
                sx={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "rgba(255, 0, 0, 0.6)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 0, 0, 0.8)",
                  },
                }}
                onClick={profilePictureHandler}
              >
                <MdClose />
              </IconButton>
            </Stack>
          </Stack>

          <Button type="submit" disabled={isPending} size="large">
            Save Changes
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
