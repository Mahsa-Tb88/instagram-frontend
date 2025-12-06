import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store/store";
import { useFindUser } from "../../http/queries";
import MyDialog from "../Customized/MyDialog";
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingError from "../LoadingError";

let showSearchDialog: () => Promise<string | null>;
// eslint-disable-next-line react-refresh/only-export-components
export { showSearchDialog };

export default function SearchDialog() {
  const isMobile = useAppStore((state) => state.isMobile);
  const page = 1;
  const limit = 10;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const { data, error, refetch, isFetching } = useFindUser(page, limit, q);
  const [result, setResult] = useState<string | null>(null);
  const handler = useRef<any>(null);

  useEffect(() => {
    showSearchDialog = () => {
      setOpen(true);
      setResult(null);
      setSearch("");
      setQ("");

      return new Promise((resolve) => {
        handler.current = (e: CustomEvent) => resolve(e.detail);
        window.addEventListener("hideSearchDialog", handler.current);
      });
    };
  }, []);

  useEffect(() => {
    if (!open) {
      dispatchEvent(new CustomEvent("hideSearchDialog", { detail: result }));
      window.removeEventListener("hideSearchDialog", handler.current);
    }
  }, [open]);

  useEffect(() => {
    const timeout = setTimeout(() => setQ(search), 1000);
    return () => clearTimeout(timeout);
  }, [search]);
  const users = data?.data?.body?.users ?? [];

  function handleClick(username: string) {
    setResult(username);
    setOpen(false);
  }

  return (
    <MyDialog open={open} fullWidth maxWidth="xs" fullScreen={isMobile} setOpen={setOpen}>
      <DialogTitle>Search Users</DialogTitle>
      <Stack p={2} spacing={2}>
        <TextField label="search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </Stack>
      <DialogContent sx={{ mt: 0, p: 0 }}>
        <Stack spacing={2} minHeight={350} px={2} pt={1}>
          {isFetching ? (
            <LinearProgress />
          ) : error ? (
            <LoadingError message={error.message} handleAction={refetch} />
          ) : !search ? (
            <Typography textAlign="center" bgcolor="#eee" borderRadius={2} p={2}>
              Type to search
            </Typography>
          ) : users.length === 0 ? (
            <Typography textAlign="center" bgcolor="#eee" borderRadius={2} p={2}>
              No Match
            </Typography>
          ) : (
            <List disablePadding>
              {users.map((u) => {
                return (
                  <ListItem key={u._id} disablePadding>
                    <ListItemButton onClick={() => handleClick(u.username)}>
                      <ListItemIcon>
                        <Avatar src={SERVER_URL + u.profilePicture} />
                      </ListItemIcon>
                      <ListItemText primary={u.username} secondary={u.fullname}></ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </MyDialog>
  );
}
