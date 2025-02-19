import { getPost } from "@/utils/api";

const PostDetail = async ({ params }) => {
  const id = (await params).id;
  const post = await getPost({ id });

  return (
    <section className="mt-[150px] mx-auto max-w-[300px] md:max-w-[950px]">
      <h1 className="capitalize mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        {post.title}
      </h1>
      <p className="mt-5 mb-6 text-lg font-normal text-gray-500 lg:text-xl">
        {post.body}
      </p>
    </section>
  );
};

export default PostDetail;
