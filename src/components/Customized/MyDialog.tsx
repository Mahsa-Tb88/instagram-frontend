/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, type DialogProps } from "@mui/material";
import { useEffect, useRef } from "react";

export default function MyDialog(props: DialogProps & { setOpen: (b: boolean) => void }) {
    const { open, setOpen } = props;
    const { setOpen: s, children, ...ps } = { ...props };
    const isFirstLoading = useRef(true);
    const isPopped = useRef(false);

    useEffect(() => {
        if (isFirstLoading.current) {
            isFirstLoading.current = false;
            return;
        }
        if (open) {
            history.pushState("", "");
            isPopped.current = false;
        } else if (!isPopped.current) {
            history.back();
        }
    }, [open]);

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
