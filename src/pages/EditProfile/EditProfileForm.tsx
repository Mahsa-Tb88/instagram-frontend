import { type ChangeEvent } from "react";
import type { User } from "../../types/types";
import { Button } from "@mui/material";

import { useUploadFile } from "../../http/mutation";

interface EditProfileFormProps {
  user?: User;
}
export default function EditProfileForm({ user }: EditProfileFormProps) {
  const { mutate, progress, abort } = useUploadFile();

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

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <h1>progress:{progress}</h1>
      <Button onClick={abort}>Cancel Upload</Button>
    </div>
  );
}
