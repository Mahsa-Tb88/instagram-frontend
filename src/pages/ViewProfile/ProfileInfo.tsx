import { useParams } from "react-router";
import { useGetProfile } from "../../http/queries";
import ProfileInfoSkeleton from "./skeletons/ProfileInfoSkeleton";

export default function ProfileInfo() {
  const { username } = useParams<{ username: string }>();
  const { data, isPending, error, refetch } = useGetProfile(username!);
  return <div>{!isPending ? <ProfileInfoSkeleton /> : ""}</div>;
}
