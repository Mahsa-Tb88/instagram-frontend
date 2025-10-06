import { Avatar, Box, Button, Stack } from "@mui/material";
import React from "react";
import { useUserStore } from "../../store/store";
import { Link } from "react-router";
import { Typography } from "@mui/material";
import { useFollowUser, useLogout } from "../../http/mutation";

export default function SuggestedUsers() {
  const { username, fullname, profilePicture, suggestedUsers, setSuggestedUsers, logout } =
    useUserStore();

  const followMutation = useFollowUser();
  const logoutMutation = useLogout();
  return (
    <Stack height="100%">
      <Stack direction="row" spacing={2} alignItems="center" useFlexGap>
        <Avatar
          src={SERVER_URL + profilePicture}
          sx={{ width: 50, height: 50, textDecoration: "none" }}
          alt={fullname}
          component={Link}
          to={"/user/" + username}
        />

        <Stack mr="auto">
          <Typography
            fontWeight="bold"
            sx={{ textDecoration: "none", color: "text.primary" }}
            component={Link}
            to={"/user/" + username}
          >
            {username}
          </Typography>
          <Typography color="text.secondary">{fullname}</Typography>
        </Stack>
        <Button variant="text" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <Box mt={3}>
        <Typography fontWeight={600} fontSize={16} mb={2}>
          Suggested for you
        </Typography>
        <Stack spacing={3}>
          {suggestedUsers.length > 0 ? (
            suggestedUsers.slice(0, 5).map((u) => (
              <Stack direction="row" spacing={2} alignItems="center" key={u._id} useFlexGap>
                <Avatar
                  src={SERVER_URL + u.profilePicture}
                  sx={{ width: 50, height: 50, textDecoration: "none" }}
                  alt={u.fullname}
                  component={Link}
                  to={"/user/" + u.username}
                />
                <Stack mr="auto">
                  <Typography
                    fontWeight="bold"
                    component={Link}
                    to={"/user/" + u.username}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    {u.username}
                  </Typography>
                  <Typography color="text.secondary">{u.fullname}</Typography>
                </Stack>
                <Button
                  variant="text"
                  onClick={() => handleFollow(u._id)}
                  disabled={followMutation.isPending}
                >
                  Follow
                </Button>
              </Stack>
            ))
          ) : (
            <Typography textAlign="center">No suggestion!</Typography>
          )}
        </Stack>
      </Box>

      <Box mt="auto">
        <Typography color="textDisabled">© 2025 Instagram from Meta</Typography>
      </Box>
    </Stack>
  );
}
