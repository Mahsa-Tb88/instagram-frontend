/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useRef, useState, type ReactNode } from "react";
import MyDialog from "../Customized/MyDialog";

let showConfirmDialog: (
  content: ReactNode,
  confirmText?: string,
  cancelText?: string
) => Promise<boolean>;
export { showConfirmDialog };

export default function ConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>("");
  const [confirmText, setConfirmText] = useState("Confirm");
  const [cancelText, setCancelText] = useState("Cancel");
  const [result, setResult] = useState(false);
  const handler = useRef<any>(null);

  useEffect(() => {
    showConfirmDialog = async (
      content: ReactNode,
      confirmText = "Confirm",
      cancelText = "Cancel"
    ) => {
      setOpen(true);
      setContent(content);
      setConfirmText(confirmText);
      setCancelText(cancelText);
      setResult(false);

      return new Promise((resolve) => {
        handler.current = (e: CustomEvent) => resolve(e.detail);
        window.addEventListener("hideConfirmDialog", handler.current);
      });
    };
  }, []);

  useEffect(() => {
    if (!open) {
      dispatchEvent(new CustomEvent("hideConfirmDialog", { detail: result }));
      window.removeEventListener("hideConfirmDialog", handler.current);
    }
  }, [open]);

  function retrunTrue() {
    setResult(true);
    setOpen(false);
  }

  function returnFalse() {
    setOpen(false);
  }

  return (
    <MyDialog open={open} setOpen={setOpen} fullWidth maxWidth="xs">
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent sx={{ py: 2, px: 3 }}>{content}</DialogContent>
      <DialogActions>
        <Button type="submit" sx={{ width: 90 }} onClick={retrunTrue}>
          {confirmText}
        </Button>
        <Button onClick={returnFalse} color="warning" variant="outlined" sx={{ width: 90 }}>
          {cancelText}
        </Button>
      </DialogActions>
    </MyDialog>
  );
}
