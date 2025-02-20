import { getPosts } from "@/utils/api";

export const dynamic = "force-static";

export async function POST() {
  const data = await getPosts({ maxPosts: 12 });
  return Response.json(data);
}
