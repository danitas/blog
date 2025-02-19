import axiosInstance from "@/lib/axios";

export const getPosts = async ({ maxPosts }) => {
  const response = await axiosInstance.get("/posts");
  const posts = response.data;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return posts.slice(0, maxPosts);
};

export const getPost = async ({ id }) => {
  const response = await axiosInstance.get(`/posts/${id}`);
  const posts = response.data;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return posts;
};
