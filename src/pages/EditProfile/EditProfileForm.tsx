import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { RegisterErrorObject, User } from "../../types/types";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import noImage from "../../assets/images/no-image.jpg";

import { useEditProfile, useLogout, useUploadFile } from "../../http/mutation";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/store";
import { MdClose, MdUpload } from "react-icons/md";

interface EditProfileFormProps {
  user: User & { email: string; bio: string };
}
export default function EditProfileForm({ user }: EditProfileFormProps) {
  const logoutMutation = useLogout();
  const setUser = useUserStore((state) => state.setUser);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fullname, setFullName] = useState("");
  const [errors, setErrors] = useState<RegisterErrorObject>({});

  const uploadMutation = useUploadFile();
  const updateMutation = useEditProfile();

  function removeProfilePicture() {
    if (profilePic && !progress) {
      setProfilePic("");
      return;
    } else {
      abort();
      reset();
    }
  }

  useEffect(() => {
    if (user) {
      setFullName(user.fullname);
      setEmail(user.email);
      setBio(user.bio);
      setProfilePicture(user?.profilePicture ? SERVER_URL + user.profilePicture : noImage);
    }
  }, [user]);

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

    updateMutation.mutate(
      { id: user!._id, email, bio, fullname, password, profilePicture },
      {
        onSuccess() {
          setTimeout(() => {
            logoutMutation.mutate(undefined, {
              onSuccess() {
                setUser({ fullname, profilePicture } as User);
                toast.success("Profile Updated Succesfully");
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
        {}
      </Stack>

      <Button type="submit" size="large" disableElevation disabled={editProfile.isPending}>
        Save Changes
      </Button>
    </Stack>
  );
}
//  <div>
//       <input type="file" onChange={handleUpload} />
//       <h1>progress:{progress}</h1>
//       <Button onClick={abort}>Cancel Upload</Button>
//     </div>

{
  /* <Typography sx={{ mr: 3 }}>Profile Picture</Typography>
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
              profilePicChanges
                ? profilePic
                : profilePic && !profilePicChanges
                ? SERVER_URL + profilePic // existing image from server
                : noImage
            }
            alt="profile image"
            sx={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
          <IconButton
            component={profilePic ? "button" : "label"} // label connects to file input
            htmlFor={profilePic ? undefined : "upload-input"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: profilePic ? "rgba(255, 0, 0, 0.6)" : "rgba(39, 159, 67, 0.78)",
              color: "white",
              "&:hover": {
                bgcolor: profilePic ? "rgba(255, 0, 0, 0.8)" : "rgba(13, 197, 56, 0.6)",
              },
            }}
            onClick={removeProfilePicture}
          >
            {profilePic ? <MdClose /> : <MdUpload />}
          </IconButton>
          {!profilePic && (
            <TextField
              id="upload-input"
              type="file"
              sx={{
                display: "none",
              }}
              onChange={handleUpdateProfile}
            />
          )}
        </Stack> */
}
