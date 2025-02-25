"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TPost } from "@/utils/api";
import {
  LocalStorageTypes,
  localStorageHelper,
  STORED_FIELD,
} from "@/utils/helper";

type TPostStoreContext = {
  posts: TPost[];
  setPosts: (value: TPost[]) => void;
  addPost: (value: TPost) => void;
  updatePost: (value: TPost) => void;
  removePost: (id: number) => void;
};

const PostStoreContext = createContext<TPostStoreContext | undefined>(
  undefined,
);

const PostStoreProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    if (posts.length) {
      localStorageHelper({
        type: LocalStorageTypes.SET,
        key: STORED_FIELD.POSTS,
        data: posts,
      });
    }
  }, [posts]);

  const cachePosts = (posts: TPost[]) => {
    const data = localStorageHelper({
      type: LocalStorageTypes.GET,
      key: STORED_FIELD.POSTS,
    });

    setPosts(data ?? posts);
  };

  const addPost = (post: TPost) => {
    setPosts((prev) => [post, ...prev]);
  };

  const updatePost = (updatedPost: TPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  const removePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const value = {
    posts,
    setPosts: cachePosts,
    addPost,
    updatePost,
    removePost,
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
    throw new Error(`usePostStore must be used within PostStoreProvider`);
  }

  return postStoreContext;
};

export default PostStoreProvider;
