import { useState, type ChangeEvent, type FormEvent } from "react";
import type { RegisterErrorObject, User } from "../../types/types";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import noImage from "../../assets/images/no-image.jpg";

import { useEditProfile, useLogout, useUploadFile } from "../../http/mutation";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/store";
import { MdClose, MdUpload } from "react-icons/md";

interface EditProfileFormProps {
  user?: User;
}
export default function EditProfileForm({ user }: EditProfileFormProps) {
  const logoutMutation = useLogout();
  const logout = useUserStore((state) => state.logout);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [bio, setBio] = useState(user?.bio);
  const [email, setEmail] = useState(user?.email);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture);
  const [profilePicChanges, setProfilePicCahnges] = useState({});
  const [fullname, setFullName] = useState(user?.fullname);
  const [errors, setErrors] = useState<RegisterErrorObject>({});

  const { mutate, progress, abort, reset } = useUploadFile();
  const editProfile = useEditProfile();

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    mutate(file!, {
      onSuccess(d) {
        console.log(d);
      },
      onError(e) {
        console.log(e);
      },
    });
  }
  async function handleSubmit(event: FormEvent) {
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

    function handleUpdateProfile(updatedPhoto: string) {
      editProfile.mutate(
        { id: user!._id, email, bio, fullname, password, profilePicture: updatedPhoto },
        {
          onSuccess() {
            setTimeout(() => {
              logoutMutation.mutate(undefined, {
                onSuccess() {
                  logout();
                },
              });
            }, 1000);
          },
          onError(error) {
            toast.error(error.message);
          },
        }
      );
    }
  }
  return (
    <Stack maxWidth={"60%"} gap={3} onSubmit={handleSubmit} component="form">
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
                ? SERVER_URL + profilePicture // existing image from server
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
            onClick={reset}
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
              // onChange={uploadProfilePicHandler}
            />
          )}
        </Stack>
      </Stack>

      <Button type="submit" size="large" disableElevation disabled={editProfile.isPending}>
        Save Changes
      </Button>
    </Stack>
  );
}

