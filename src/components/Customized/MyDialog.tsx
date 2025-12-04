/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, type DialogProps } from "@mui/material";
import { useEffect, useRef } from "react";

let openDialogCount = 0;

export default function MyDialog(props: DialogProps & { setOpen: (b: boolean) => void }) {
  const { setOpen, children, ...ps } = props;
  //   const { setOpen: s, children, ...ps } = { ...props };
  const isFirstLoading = useRef(true);
  const isPopped = useRef(false);

  useEffect(() => {
    if (isFirstLoading.current) {
      isFirstLoading.current = false;
      return;
    }
    if (ps.open) {
      history.pushState("", "");
      isPopped.current = false;
      openDialogCount++;
    } else if (!isPopped.current) {
      if (openDialogCount === 1) {
        history.back();
      }
      openDialogCount--;
    }
  }, [ps.open]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      isPopped.current = true;
      setOpen(false);
    });
  }, []);

  return (
    <Dialog onClose={() => setOpen(false)} {...ps}>
      {children}
    </Dialog>
  );
}
