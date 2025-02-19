import { getPosts } from "@/utils/api";

import HomeContent from "@/components/HomeContent";
import AddPost from "@/components/AddPost";
import Header from "@/components/Header";

export default async function Home() {
  const posts = await getPosts({ maxPosts: 12 });

  return (
    <section className="container mx-auto my-9">
      <Header />

      <main className="mx-4 md:mx-8">
        <AddPost />

        <section className="flex flex-wrap gap-5 md:gap-15 justify-between">
          {posts !== null &&
            Object.keys(posts).map((article) => (
              <HomeContent {...posts[article]} key={article} />
            ))}
        </section>
      </main>
    </section>
  );
}
