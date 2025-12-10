import { Box, CircularProgress, IconButton, Stack, TextField, Typography } from "@mui/material";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useRef, type ChangeEvent } from "react";
import type { UploadResponse } from "../../http/responseTypes";
import { toast } from "react-toastify";
import { MdClose, MdUpload } from "react-icons/md";
import noImage from "../../assets/images/no-image.jpg";

type ProfileImgUploaderProps = {
  imageUrl: string;
  setImageUrl: (s: string) => void;
  profilePicture: string;
  setProfilePicture: (s: string) => void;
  uploadMutation: UseMutationResult<AxiosResponse<UploadResponse>, Error, File> & {
    progress: number;
    abort: () => void;
  };
};
export default function ProfileImageUploader({
  imageUrl,
  setImageUrl,
  setProfilePicture,
  uploadMutation,
}: ProfileImgUploaderProps) {
  const imgRef = useRef<HTMLInputElement>(null);

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    console.log("upload");
    const file = e.target.files![0];
    setImageUrl(URL.createObjectURL(file));
    uploadMutation.mutate(file, {
      onSuccess(d) {
        setProfilePicture(d.data.body.url);
        setImageUrl(SERVER_URL + d.data.body.url);
      },
      onError(e) {
        setImageUrl(imageUrl);
        toast.error(e.message);
      },
    });
  }

  function removeProfilePicture() {
    // e.stopPropagation();
    if (uploadMutation.isPending) {
      uploadMutation.abort();
      setImageUrl(imageUrl);
    } else {
      setImageUrl(noImage);
    }
  }
  return (
    <Stack flexDirection={"row"} alignItems={"center"}>
      <Typography sx={{ mr: 3 }}>Profile Picture</Typography>
      <input
        id="upload-input"
        type="file"
        ref={imgRef}
        style={{
          display: "none",
        }}
        onChange={handleUpload}
      />
      <Box
        sx={{
          borderRadius: "50%",
          border: "1px solid #ccc",
          width: 140,
          height: 140,
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          backgroundColor: "#ddd",
        }}
      >
        <Box
          component={"img"}
          alt="profile image"
          sx={{ objectFit: "contain", width: "100%", height: "100%" }}
          src={imageUrl}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            backgroundColor: uploadMutation.isPending ? "#0005" : "transparent",
            justifyContent: "center",
          }}
        >
          {uploadMutation.isPending && (
            <CircularProgress
              variant="determinate"
              value={uploadMutation.progress}
              color="info"
              size={130}
              thickness={2}
              sx={{ opacity: 0.8 }}
            />
          )}
          {imageUrl !== noImage ? (
            <IconButton
              onClick={removeProfilePicture}
              sx={{
                bgcolor: "rgba(255, 0, 0, 0.6)",
                position: "absolute",
                p: 0,
                opacity: 0.8,
                fontSize: 36,
                "&:hover": {
                  bgcolor: "rgba(255, 0, 0, 0.8)",
                },
              }}
            >
              <MdClose />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => imgRef.current!.click()}
              sx={{
                position: "absolute",
                p: 0,
                opacity: 0.8,
                fontSize: 36,
                bgcolor: "rgba(24, 182, 42, 0.6)",
                "&:hover": {
                  bgcolor: "rgba(13, 197, 56, 0.6)",
                },
              }}
            >
              <MdUpload />
            </IconButton>
          )}
        </Box>
      </Box>
    </Stack>
  );
}
