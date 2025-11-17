import { useEffect, useState } from "react";
import { useFindUser } from "../../http/queries";
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
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
                    width: "80%",
                    mx: "auto",
                    cursor: "pointer",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "#f2f2f2",
                    },
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
                    to={`/user/${user.username}`}
                  >
                    <Avatar
                      src={SERVER_URL + user.profilePicture}
                      sx={{ width: "50px", height: "50px", cursor: "pointer" }}
                    />
                    <Stack>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "text.primary",
                        }}
                        fontWeight={"600"}
                      >
                        {user.username[0].toUpperCase() + user.username.slice(1)}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "text.primary",
                        }}
                        fontWeight={"600"}
                      >
                        {user.fullname[0].toUpperCase() + user.fullname.slice(1)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Button sx={{ width: "120px" }}>
                    {user.isFollowing && !user.isFollower
                      ? "Follow back"
                      : !user.isFollowing && user.isFollower
                      ? "Unfollow"
                      : !user.isFollowing && !user.isFollower
                      ? "Follow"
                      : "Unfollow"}
                  </Button>
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
