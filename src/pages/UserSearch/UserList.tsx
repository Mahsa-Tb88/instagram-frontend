import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import type { User } from "../../types/types";
import { Link } from "react-router";
import ButtonFollowUnfollow from "./ButtonFollowUnfollow";

export default function UserList({ userList }: { userList: User[] }) {
  return (
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

            <ButtonFollowUnfollow user={user} />
          </Stack>
        );
      })}
    </Stack>
  );
}
