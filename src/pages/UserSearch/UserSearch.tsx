import { useEffect, useState } from "react";
import { useFindUser } from "../../http/queries";
import { Avatar, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import LoadingError from "../../components/LoadingError";
import { Link } from "react-router";
import type { User } from "../../types/types";

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
            <LoadingError message="Is Loading" />
          </Box>
        ) : error ? (
          <Box>
            <LoadingError handleAction={refetch} message={error.message} />
          </Box>
        ) : userList.length ? (
          <Stack>
            {userList.map((user) => {
              return (
                <Stack
                  key={user.username}
                  sx={{
                    my: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                  }}
                >
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      textDecoration: "none",
                    }}
                    component={Link}
                    to={`profile/${user.username}`}
                  >
                 
                    <Avatar
                      src={SERVER_URL + user.profilePicture}
                      sx={{ width: "50px", height: "50px", cursor: "pointer" }}
                    />
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 17,
                      }}
                    >
                      {user.username[0].toUpperCase() + user.username.slice(1)}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      alignItems: "center",
                    }}
                  ></Box>
                </Stack>
              );
            })}
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
