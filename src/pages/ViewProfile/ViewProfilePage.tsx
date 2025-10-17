import { Container, Divider } from "@mui/material";
import ProfileInfo from "./ProfileInfo";
import UserPosts from "./UserPosts";

export default function ViewProfilePage() {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <ProfileInfo />
      <Divider />
      <UserPosts />
    </Container>
  );
}
