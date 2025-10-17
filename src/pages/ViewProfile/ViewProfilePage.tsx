import { Container, Divider } from "@mui/material";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import UserPosts from "./UserPosts";

export default function ViewProfilePage() {
  return (
    <Container>
      <ProfileInfo />
      <Divider />
      <UserPosts />
    </Container>
  );
}
