import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMustLoggedOut } from "../../utils/customhooks";
import type { RegisterErrorObject } from "../../types/types";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useRegister } from "../../http/mutation";
import instagram from "../../assets/images/instagram.png";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [errors, setErrors] = useState<RegisterErrorObject>({});
  const [finished, setFinished] = useState("");

  const { isPending, error, mutate } = useRegister();
  const navigate = useNavigate();
  useMustLoggedOut();

  function handleSubmit() {}

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
            onChange={(e) => setFullname(e.target.value)}
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
