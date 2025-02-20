import { getPosts } from "@/utils/api";
import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";

export async function fetchPosts() {
  return await getPosts({});
}

export default async function Home() {
  const posts = await fetchPosts();

  if (!posts) return <div>No Posts</div>;

  return (
    <main className="mx-4 md:mx-8">
      <AddPost />
      <section className="flex flex-wrap gap-5 md:gap-15 justify-between">
        <Posts posts={posts} />
      </section>
    </main>
  );
}
