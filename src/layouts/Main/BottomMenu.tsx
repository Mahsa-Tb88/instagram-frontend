import { IconButton, Paper, Stack } from "@mui/material";
import React from "react";
import { MdAddCircle, MdHome, MdLogout, MdPerson, MdSearch } from "react-icons/md";
import { useUserStore } from "../../store/store";
import { useLogout } from "../../http/mutation";
import { showConfirmDialog } from "../../components/Dialogs/ConfirmDialog";
import { Link } from "react-router";

export default function BottomMenu() {
  const username = useUserStore((state) => state.username);
  const logout = useUserStore((state) => state.logout);
  const { mutate } = useLogout();

  async function handleLogout() {
    const answer = await showConfirmDialog(
      <p style={{ fontSize: 20, margin: "40px 0", textAlign: "center" }}>
        Are you sure to logout?
      </p>,
      "Yes",
      "No"
    );
    if (answer) {
      mutate(undefined, {
        onSuccess() {
          logout();
        },
      });
    }
  }

  return (
    <Paper sx={{ position: "fixed", bottom: "0", width: 1, zIndex: 5, px: 1 }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <IconButton LinkComponent={Link} to="/">
          <MdHome />
        </IconButton>
        <IconButton>
          <MdSearch />
        </IconButton>
        <IconButton>
          <MdAddCircle />
        </IconButton>
        <IconButton LinkComponent={Link} to={"/user/" + username}>
          <MdPerson />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <MdLogout />
        </IconButton>
      </Stack>
    </Paper>
  );
}
