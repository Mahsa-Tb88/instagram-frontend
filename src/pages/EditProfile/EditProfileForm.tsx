import React, { useRef, useState, type ChangeEvent } from "react";
import type { User } from "../../types/types";
import { Button } from "@mui/material";
import axios from "axios";

interface EditProfileFormProps {
  user?: User;
}
export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [progress, setProgress] = useState(0);
  const abortController = useRef<AbortController>(null);

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    abortController.current = new AbortController();
    const file = e.target.files?.[0];
    const form = new FormData();
    form.append("file", file!);
    axios
      .post("/misc/upload", form, {
        onUploadProgress(e) {
          setProgress(+((e.progress ?? 0) * 100).toFixed());
        },
        timeout: 0,
        signal: abortController.current.signal,
      })
      .catch((e) => alert("cancle"));
  }
  function handleCancel() {
    abortController.current?.abort();
  }
  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <h1>progress:{progress}</h1>
      <Button onClick={handleCancel}>Cancel Upload</Button>
    </div>
  );
}
