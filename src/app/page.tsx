import { getPosts } from "@/utils/api";
import AddPost from "@/components/Post/AddPost";
import Posts from "@/components/Posts";
import PostNotFound from "@/components/Post/PostNotFound";

export default async function Home() {
  const posts = await getPosts({});

  if (!posts) return <PostNotFound />;

  return (
    <main className="mx-4 md:mx-8">
      <AddPost />

      <Posts posts={posts} />
    </main>
  );
}
