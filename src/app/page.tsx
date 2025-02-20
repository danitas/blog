import { getPosts } from "@/utils/api";
import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";

export async function fetchPosts() {
  return await getPosts({});
}

export default async function Home() {
  const posts = await fetchPosts();

  if (!posts)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 uppercase my-4 text-5xl font-extrabold leading-none tracking-tight text-blue-950 lg:text-6xl">
        No Posts
      </div>
    );

  return (
    <main className="mx-4 md:mx-8">
      <AddPost />

      <Posts posts={posts} />
    </main>
  );
}
