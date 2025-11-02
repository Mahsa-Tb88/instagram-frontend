import { useParams } from "react-router";
import { useGetPost } from "../../http/queries";
import LoadingError from "../../components/LoadingError";
import SinglePostEdit from "./SinglePostEdit";
import SkeletonEditPost from "./SkeletonEditPost";

export default function EditPost() {
  const { postId } = useParams<{ postId: string }>();
  const { isPending, refetch, data, error } = useGetPost(postId!);

  const post = data?.data?.body;

  return isPending ? (
    <SkeletonEditPost />
  ) : error ? (
    <LoadingError message={error.message} handleAction={refetch} />
  ) : (
    <SinglePostEdit post={post!} />
  );
}
