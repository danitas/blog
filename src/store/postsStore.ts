import { createStore } from "zustand";
import { TPostProps } from "@/components/HomeContent";

type PostActions = {
  setPosts: (newPosts: TPostProps[]) => void;
  addPost: (post: TPostProps) => void;
  updatePost: (updatedPost: TPostProps) => void;
  removePost: (id: number) => void;
};

type PostState = {
  posts: TPostProps[];
};

export type PostStore = PostState & PostActions;

const defaultState: PostState = {
  posts: [],
};

const createPostStore = (initialState: PostState = defaultState) =>
  createStore<PostStore>()((set) => ({
    ...initialState,
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
  }));

export default createPostStore;
