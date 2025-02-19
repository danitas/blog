import { getPost } from "@/utils/api";

const PostDetail = async ({ params }) => {
  const id = (await params).id;
  const post = await getPost({ id });

  return (
    <section>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </section>
  );
};

export default PostDetail;
