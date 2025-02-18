import axiosInstance from "@/lib/axios";

export const getPosts = async ({ maxPosts }) => {
  const response = await axiosInstance.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  const posts = response.data;

  return posts.slice(0, maxPosts);
};
