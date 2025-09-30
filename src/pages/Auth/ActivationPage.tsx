import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Alert, AlertTitle, Box, LinearProgress } from "@mui/material";
import { useActivation } from "../../http/mutation";

export default function ActivationPage() {
  const { mutate, isPending, error } = useActivation();
  const { username, activationCode } = useParams<{ username: string; activationCode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (username && activationCode) {
      mutate(
        { username, activationCode },
        {
          onSuccess() {
            setTimeout(() => navigate("/auth/login", { replace: true }), 5000);
          },
        }
      );
    }
  }, [username, activationCode]);

  return isPending ? (
    <Box my={7} px={1}>
      <Alert
        severity="info"
        variant="filled"
        sx={{
          maxWidth: 400,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        icon={false}
      >
        <AlertTitle mb={2} fontSize={20}>
          Checking your data
        </AlertTitle>
        <LinearProgress color="secondary" />
      </Alert>
    </Box>
  ) : error ? (
    <Box my={7} px={1}>
      <Alert severity="error" variant="filled" sx={{ maxWidth: 400, mx: "auto" }}>
        <AlertTitle>{error.message}</AlertTitle>
      </Alert>
    </Box>
  ) : (
    <Box my={7} px={1}>
      <Alert severity="success" variant="filled" sx={{ maxWidth: 400, mx: "auto" }}>
        <AlertTitle>Your account activated successfully</AlertTitle>
      </Alert>
    </Box>
  );
}
