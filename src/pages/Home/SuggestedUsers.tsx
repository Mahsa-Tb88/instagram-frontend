import { Avatar, Box, Button, Stack } from "@mui/material";
import { useUserStore } from "../../store/store";
import { Link } from "react-router";
import { Typography } from "@mui/material";
import { useFollowUser, useLogout } from "../../http/mutation";
import { showConfirmDialog } from "../../components/Dialogs/ConfirmDialog";

export default function SuggestedUsers() {
  const { username, fullname, profilePicture, suggestedUsers, setSuggestedUsers, logout } =
    useUserStore();

  const followMutation = useFollowUser();
  const logoutMutation = useLogout();
  console.log(suggestedUsers);
  function handleFollow(id: string) {
    followMutation.mutate(id, {
      onSuccess() {
        setSuggestedUsers(suggestedUsers.filter((s) => s._id !== id));
      },
    });
  }

  async function handleLogout() {
    const answer = await showConfirmDialog(
      <p style={{ fontSize: 24, margin: "10px 0" }}>Are you sure to logout?</p>,
      "Yes",
      "No"
    );
    if (answer) {
      logoutMutation.mutate(undefined, {
        onSuccess() {
          logout();
        },
      });
    }
  }
  return (
    <Stack height={"100%"}>
      <Stack direction={"row"} spacing={2}>
        <Avatar
          src={SERVER_URL + profilePicture}
          alt={fullname}
          component={Link}
          to={"/user/" + username}
          sx={{ width: 50, height: 50 }}
        />
        <Stack mr={"auto"}>
          <Typography
            sx={{ textDecoration: "none", color: "text.primary" }}
            fontWeight={"bold"}
            component={Link}
            to={"/user/" + username}
          >
            {username.slice(0, 1).toUpperCase() + username.slice(1)}
          </Typography>
          <Typography className="text.secondary">{fullname}</Typography>
        </Stack>
        <Button onClick={handleLogout} variant="text">
          Logout
        </Button>
      </Stack>
      <Stack mt={2}>
        <Typography fontWeight={600} mb={2} fontSize={16}>
          Suggested For you
        </Typography>
        <Stack spacing={3}>
          {suggestedUsers.length > 0 ? (
            suggestedUsers.slice(0, 5).map((u) => (
              <Stack direction={"row"} spacing={2}>
                <Avatar
                  src={SERVER_URL + u.profilePicture}
                  component={Link}
                  to={"/user/" + u.username}
                  alt={u.fullname}
                  sx={{ height: 50, width: 50 }}
                />
                <Stack mr={"auto"}>
                  <Typography
                    sx={{ textDecoration: "none", color: "text.primary" }}
                    fontWeight={"bold"}
                    component={Link}
                    to={"/user/" + u.username}
                  >
                    {u.username.slice(0, 1).toUpperCase() + u.username.slice(1)}
                  </Typography>
                  <Typography className="text.secondary">{fullname}</Typography>
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
      </Stack>
      <Box mt="auto">
        <Typography color="textDisabled">© 2025 Instagram from Meta</Typography>
      </Box>
    </Stack>
  );
}

{
  /* <Stack height="100%">
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
</Stack>; */
}
