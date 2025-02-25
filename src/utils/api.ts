import { axiosRequest } from "@/lib/axios";

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPosts = async (): Promise<TPost[] | null> => {
  const posts = await axiosRequest<TPost[]>("/posts");

  if (!posts) return null;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return posts;
};
