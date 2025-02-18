import axiosInstance from "@/lib/axios";

export const getPosts = async () => {
  return await axiosInstance.get("https://jsonplaceholder.typicode.com/posts");
};
