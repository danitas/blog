import { getPosts } from "@/utils/api";

export const dynamic = "force-static";

export async function GET() {
  const res = await getPosts({ maxPosts: 12 });

  console.log("res");
  console.log(res);

  const data = await res.json();

  return Response.json({ data });
}
