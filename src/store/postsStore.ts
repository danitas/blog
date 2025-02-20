import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TPostProps } from "@/components/HomeContent";

type PostState = {
  posts: TPostProps[];
  setPosts: (newPosts: TPostProps[]) => void;
  addPost: (post: TPostProps) => void;
  updatePost: (updatedPost: TPostProps) => void;
  removePost: (id: string) => void;
};

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      posts: [],
      setPosts: (newPosts) => set({ posts: newPosts }),
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      updatePost: (updatedPost) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post,
          ),
        })),
      removePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),
    }),
    {
      name: "posts-storage",
      getStorage: () => localStorage,
    },
  ),
);
