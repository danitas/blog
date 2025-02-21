"use client";

import React, { createContext, useContext, useState } from "react";
import { TPost } from "@/utils/api";

type TPostStoreContext = {
  posts: TPost[];
  setPosts: (value: TPost[]) => void;
  addPost: (value: TPost) => void;
  updatePost: (value: TPost) => void;
};

const PostStoreContext = createContext<TPostStoreContext | undefined>(
  undefined,
);

const PostStoreProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useState<TPost[]>([]);

  const addPost = (post: TPost) => {
    setPosts((prev) => [...prev, post]);
  };

  const updatePost = (updatedPost: TPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  const value = {
    posts,
    setPosts,
    addPost,
    updatePost,
  };

  return (
    <PostStoreContext.Provider value={value}>
      {children}
    </PostStoreContext.Provider>
  );
};

export const usePostStore = () => {
  const postStoreContext = useContext(PostStoreContext);

  if (!postStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return postStoreContext;
};

export default PostStoreProvider;
