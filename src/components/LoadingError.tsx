import { MdRefresh } from "react-icons/md";
import { Alert, AlertTitle, Button } from "@mui/material";
import type { ReactNode } from "react";

type LoadingErrorProps = {
  message: string;
  handleAction?: null | (() => void);
  actionText?: string;
  actionIcon?: ReactNode;
};

export default function LoadingError({
  message,
  handleAction = null,
  actionText = "Retry",
  actionIcon = <MdRefresh />,
}: LoadingErrorProps) {
  return (
    <Alert
      color="error"
      sx={{
        maxWidth: 500,
        minWidth: 320,
        mx: "auto",
        flexDirection: "column",
        py: 2,
        alignItems: "center",
        textAlign: "center",
      }}
      icon={false}
    >
      <AlertTitle textAlign="center" variant="h6">
        {message}
      </AlertTitle>
      {handleAction && (
        <Button endIcon={actionIcon} onClick={handleAction} sx={{ mt: 2, mx: "auto" }} size="large">
          {actionText}
        </Button>
      )}
    </Alert>
  );
}
