import { Container, Divider } from "@mui/material";
import ProfileInfo from "./ProfileInfo";
import UserPosts from "./UserPosts";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function ViewProfilePage() {
  const username = useParams<{ username: string }>();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [username]);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <ProfileInfo />
      <Divider />
      <UserPosts />
    </Container>
  );
}
