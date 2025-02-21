import { axiosRequest } from "@/lib/axios";

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPosts = async ({
  maxPosts,
}: {
  maxPosts?: number;
}): Promise<TPost[] | null> => {
  const posts = await axiosRequest<TPost[]>("/posts");

  if (!posts) return null;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (maxPosts) return posts.slice(0, maxPosts);

  return posts;
};
