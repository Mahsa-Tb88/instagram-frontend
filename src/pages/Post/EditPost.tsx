import { useParams } from "react-router";
import { useGetPost } from "../../http/queries";
import ViewPostSkeleton from "../../components/Dialogs/ViewPostDialog/ViewPostSkeleton";
import LoadingError from "../../components/LoadingError";
import SinglePostEdit from "./SinglePostEdit";

export default function EditPost() {
  const { postId } = useParams<{ postId: string }>();
  const { isPending, refetch, data, error } = useGetPost(postId!);

  const post = data?.data?.body;

  return isPending ? (
    <ViewPostSkeleton />
  ) : error ? (
    <LoadingError message={error.message} handleAction={refetch} />
  ) : (
    <SinglePostEdit post={post!} />
  );
}
