import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useMessagingStore, useUserStore } from "../../store/store";
import type { LoginErrorObject } from "../../types/types";

import instagram from "../../assets/images/instagram.png";
import { useMustLoggedOut } from "../../utils/customhooks";
import { useLogin } from "../../http/mutation";
import { io } from "socket.io-client";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<LoginErrorObject>({});
  const { isPending, error, mutate } = useLogin();
  const setUser = useUserStore((state) => state.setUser);
  const setSuggestedUsers = useUserStore((state) => state.setSuggestedUsers);
  const setSocket = useMessagingStore((state) => state.setSocket);
  useMustLoggedOut();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({});
    const e: LoginErrorObject = {};
    if (username.length < 4) {
      e.username = "Username must be at least 4 characters long";
    }
    if (password.length < 6) {
      e.password = "Password must be at least 6 characters long";
    }
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    mutate(
      { username, password, remember },
      {
        onSuccess(d) {
          setUser(d.data.body.user);
          setSuggestedUsers(d.data.body.suggested);
          const socket = io(SERVER_URL, { withCredentials: true });
          setSocket(socket);
        },
      }
    );
  }

  return (
    <Box my={7} px={1}>
      <Stack
        sx={{
          mx: "auto",
          maxWidth: 340,
          border: "1px solid #ccc",
          p: 3,
        }}
        spacing={3}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box textAlign="center">
          <img src={instagram} width="60%" />
        </Box>
        {error && <Alert severity="error">{error.message}</Alert>}
        <Stack spacing={2}>
          <TextField
            variant="filled"
            label="Username"
            fullWidth
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            variant="filled"
            label="Password"
            fullWidth
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />

          <FormControlLabel
            control={<Checkbox value={remember} onChange={(e) => setRemember(e.target.checked)} />}
            label="Remember me"
          />
        </Stack>

        <Box textAlign="center">
          <Button type="submit" size="large" disableElevation disabled={isPending}>
            Login
          </Button>
        </Box>
      </Stack>

      <Box
        sx={{
          mx: "auto",
          maxWidth: 340,
          border: "1px solid #ccc",
          p: 3,
          textAlign: "center",
          mt: 2,
        }}
      >
        <Typography>
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            style={{
              color: "#0697f6",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
