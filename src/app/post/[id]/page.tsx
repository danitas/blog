import { Details } from "@/components/Post/Details";

const PostDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return <Details id={id} />;
};

export default PostDetail;
