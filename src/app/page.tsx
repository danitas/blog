import { getPosts } from "@/utils/api";
import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";

export default async function Home() {
  const posts = await getPosts({ maxPosts: 12 });

  return (
    <main className="mx-4 md:mx-8">
      <AddPost />
      <section className="flex flex-wrap gap-5 md:gap-15 justify-between">
        <Posts posts={posts} />
      </section>
    </main>
  );
}
