import { Quote } from "lucide-react";
import { Details } from "../../../components/Post/Details";

const PostDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return (
    <section className="mt-[150px] mx-auto max-w-[300px] md:max-w-[950px] relative flex items-center flex-col">
      <Quote className="rotate-180 md:w-[60px] md:h-[60px] w-[45px] h-[45px] stroke-lime-500" />
      <Details id={id} />
    </section>
  );
};

export default PostDetail;
