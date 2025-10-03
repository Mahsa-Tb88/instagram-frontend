import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useUserStore } from "../../store/store";
import { useLogout } from "../../http/mutation";
import { MdAddCircle, MdHome, MdLogout, MdPerson, MdSearch } from "react-icons/md";
import { Link } from "react-router";
import { showConfirmDialog } from "../../components/Dialogs/ConfirmDialog";

export default function LeftMenu() {
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
    <Box
      minWidth={250}
      maxWidth={250}
      borderRight="1px solid #ccc"
      height={"100vh"}
      fontSize={24}
      // position={"sticky"}
      // top="0"
    >
      <List disablePadding sx={{ "& *": { fontWeight: "600 !important" } }}>
        <ListItemButton LinkComponent={Link} to="/">
          <ListItemIcon>
            <MdHome />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <MdSearch />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <MdAddCircle />
          </ListItemIcon>
          <ListItemText primary="Create" />
        </ListItemButton>
        <ListItemButton LinkComponent={Link} to={"/user/" + username}>
          <ListItemIcon>
            <MdPerson />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <MdLogout />
          </ListItemIcon>
          <ListItemText primary="Logout" onClick={handleLogout} />
        </ListItemButton>
      </List>
    </Box>
  );
}
