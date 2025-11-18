import { useEffect, useState } from "react";
import { useFindUser } from "../../http/queries";
import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import LoadingError from "../../components/LoadingError";
import type { User } from "../../types/types";
import UserList from "./UserList";

export default function UserSearch() {
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [userList, setUserList] = useState<User[]>([]);
  const { isPending, isFetching, data, error, refetch } = useFindUser(q);

  console.log("data ", data?.data?.body?.users);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setQ(search);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search]);

  useEffect(() => {
    setUserList(data?.data?.body.users || []);
  }, [data]);

  return (
    <Stack sx={{ p: 2, width: "100%" }}>
      <TextField
        label="Search user"
        variant="outlined"
        sx={{ width: "80%", mx: "auto" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Stack sx={{ mt: 2 }}>
        {isFetching ? (
          <Box>
            <LoadingError message="Is loading" />
          </Box>
        ) : error ? (
          <Box>
            <LoadingError handleAction={refetch} message={error.message} />
          </Box>
        ) : userList.length ? (
          <Stack>
            <UserList userList={userList} />
          </Stack>
        ) : !userList.length && search && !isPending ? (
          <Typography>Nothing found!</Typography>
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
}
