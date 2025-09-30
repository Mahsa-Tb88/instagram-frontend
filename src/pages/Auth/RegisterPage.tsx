import React, { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useMustLoggedOut } from "../../utils/customhooks";
import type { RegisterErrorObject } from "../../types/types";
import { Alert, AlertTitle, Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useRegister } from "../../http/mutation";
import instagram from "../../assets/images/instagram.png";
import { Divider } from "@mui/material";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [errors, setErrors] = useState<RegisterErrorObject>({});

  const { isPending, error, mutate, data } = useRegister();
  const navigate = useNavigate();
  useMustLoggedOut();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({});
    const e: RegisterErrorObject = {};
    if (username.length < 4) {
      e.username = "Username must be 4 charcters long";
    }
    if (password.length < 6) {
      e.password = "Password must be at least 6 characters long";
    }
    if (confirm !== password) {
      e.confirm = "Passwords do not match";
    }
    if (!/.+@.+\..+/.test(email)) {
      e.email = "Please enter a valid email address";
    }
    if (fullname.length < 2) {
      e.fullname = "Fullname must be at least 2 characters long";
    }

    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    mutate(
      { username, password, email, fullname },
      {
        onSuccess() {
          setTimeout(() => navigate("/auth/login"), 10000);
        },
      }
    );
  }

  if (data?.data?.success) {
    return (
      <Box my={7} px={2}>
        <Alert sx={{ maxWidth: 460, mx: "auto", pb: 6 }} variant="filled" icon={false}>
          <AlertTitle fontSize={24}>Your account created successfully</AlertTitle>
          <Divider sx={{ my: 1 }} />
          <Typography fontSize={18}>Please check your inbox, for activate your account</Typography>
        </Alert>
      </Box>
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
          <Typography fontWeight={600} mx={2} color="textSecondary">
            Sign up to see photos and videos from your friends.
          </Typography>
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
          <TextField
            variant="filled"
            label="Confirm Password"
            fullWidth
            size="small"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={!!errors.confirm}
            helperText={errors.confirm}
          />
          <TextField
            variant="filled"
            label="Email"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="filled"
            label="Fullname"
            fullWidth
            size="small"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            error={!!errors.fullname}
            helperText={errors.fullname}
          />
        </Stack>

        <Box textAlign="center">
          <Button type="submit" size="large" disableElevation disabled={isPending}>
            Register
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
          have an account?{" "}
          <Link
            to="/auth/login"
            style={{
              color: "#0697f6",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
