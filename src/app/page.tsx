import { getPosts } from "@/utils/api";
import HomeContent from "@/components/HomeContent";
import AddPost from "@/components/AddPost";

export default async function Home() {
  const posts = await getPosts({ maxPosts: 12 });

  return (
    <main className="mx-4 md:mx-8">
      <AddPost />

      <section className="flex flex-wrap gap-5 md:gap-15 justify-between">
        {posts !== null &&
          Object.keys(posts).map((article) => (
            <HomeContent {...posts[article]} key={article} />
          ))}
      </section>
    </main>
  );
}
