import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useGetProfile } from "../../http/queries";
import { useNavigate, useParams } from "react-router";
import LoadingError from "../../components/LoadingError";
import SkeletonEditProfile from "./SkeletonEditProfile";
import { MdClose, MdHome, MdUpload } from "react-icons/md";
import { useEffect, useState, type FormEvent } from "react";
import type { RegisterErrorObject } from "../../types/types";
import { useEditProfile } from "../../http/mutation";
import noImage from "../../assets/images/no-image.jpg";

export default function EditProfilePage() {
  const params = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { data, isFetching, error, refetch } = useGetProfile(params.username!);
  const { mutate, isPending } = useEditProfile();
  const user = data?.data?.body;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [bio, setBio] = useState(user?.bio);
  const [email, setEmail] = useState(user?.email);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture);
  const [fullname, setFullName] = useState(user?.fullname);
  const [errors, setErrors] = useState<RegisterErrorObject>({});

  useEffect(() => {
    if (user) {
      setBio(user.bio);
      setFullName(user.fullname);
      setProfilePicture(user.profilePicture);
      setEmail(user.email);
    }
  }, [user]);

  function removeProfilePicHandler() {
    if (profilePicture) {
      setProfilePicture("");
      return;
    }
  }

  function uploadProfilePicHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    } else {
      console.log("No file selected");
    }
  }

  function handleSubmit(event: FormEvent) {
    console.log("yees");
    event.preventDefault();
    setErrors({});
    const e: RegisterErrorObject = {};

    if (password.length < 6) {
      e.password = "Password must be at least 6 characters long";
    }
    if (confirm !== password) {
      e.confirm = "Passwords do not match";
    }
    if (!/.+@.+\..+/.test(email!)) {
      e.email = "Please enter a valid email address";
    }
    if (bio?.length && bio.length > 100) {
      e.bio = "Bio must not exceed 100 characters";
    }
    if (fullname?.length && fullname!.length < 2) {
      e.fullname = "Fullname must be at least 2 characters long";
    }

    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    mutate(
      { id: user!._id, email, bio, fullname, password, profilePicture },
      {
        onSuccess() {
          setTimeout(() => navigate("/auth/login"), 10000);
        },
        onError(e) {
          console.log("eroor is", e);
        },
      }
    );
  }

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
        <Stack maxWidth={"60%"} gap={3} onSubmit={handleSubmit} component="form">
          <Typography component="h3" variant="h3" mb={1}>
            Edit Profile
          </Typography>
          <Stack gap={4}>
            <TextField value={user?.username} label="username" disabled />
            <TextField
              value={fullname}
              label="Fullname"
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullname}
              helperText={errors.fullname}
            />
            <TextField
              value={bio}
              label="Bio"
              onChange={(e) => setBio(e.target.value)}
              error={!!errors.bio}
              helperText={errors.bio}
            />
            <TextField value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={!!errors.confirm}
              helperText={errors.confirm}
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
                border: "2px solid rgba(52, 51, 51, 0.6)",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Box
                component={"img"}
                src={
                  profilePicture
                    ? profilePicture.startsWith("blob:")
                      ? profilePicture // local preview
                      : SERVER_URL + profilePicture // existing image from server
                    : noImage
                }
                alt="profile image"
                sx={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
              <IconButton
                component={profilePicture ? "button" : "label"} // label connects to file input
                htmlFor={profilePicture ? undefined : "upload-input"}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: profilePicture ? "rgba(255, 0, 0, 0.6)" : "rgba(39, 159, 67, 0.78)",
                  color: "white",
                  "&:hover": {
                    bgcolor: profilePicture ? "rgba(255, 0, 0, 0.8)" : "rgba(13, 197, 56, 0.6)",
                  },
                }}
                onClick={removeProfilePicHandler}
              >
                {profilePicture ? <MdClose /> : <MdUpload />}
              </IconButton>
              {!profilePicture && (
                <TextField
                  id="upload-input"
                  type="file"
                  sx={{
                    display: "none",
                  }}
                  onChange={uploadProfilePicHandler}
                />
              )}
            </Stack>
          </Stack>

          <Button type="submit" size="large" disableElevation disabled={isPending}>
            Save Changes
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
