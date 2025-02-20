import { getPost } from "@/utils/api";
import { Quote } from "lucide-react";

const PostDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await getPost({ id });

  if (!post) return <div>No post</div>;

  return (
    <section className="mt-[150px] mx-auto max-w-[300px] md:max-w-[950px] relative flex items-center flex-col">
      <Quote className="rotate-180 md:w-[60px] md:h-[60px] w-[45px] h-[45px] stroke-lime-500" />
      <section className="py-[50px] md:py-[100px] w-5/6 mx-auto">
        <h1 className="capitalize mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-950 md:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 mb-6 text-lg font-normal text-gray-500 lg:text-xl">
          {post.body}
        </p>
      </section>
    </section>
  );
};

export default PostDetail;
