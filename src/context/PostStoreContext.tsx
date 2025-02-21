"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TPost } from "@/utils/api";
import {
  LocalStorageTypes,
  locaStorageHelper,
  STORED_FIELD,
} from "@/utils/helper";

type TPostStoreContext = {
  posts: TPost[];
  setPosts: (value: TPost[]) => void;
  addPost: (value: TPost) => void;
  updatePost: (value: TPost) => void;
  getPost: (id: string) => TPost | undefined;
  removePost: (id: number) => void;
};

const PostStoreContext = createContext<TPostStoreContext | undefined>(
  undefined,
);

const PostStoreProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    if (posts.length) {
      locaStorageHelper({
        type: LocalStorageTypes.SET,
        key: STORED_FIELD.POSTS,
        data: posts,
      });
    }
  }, [posts]);

  const cachePosts = (posts: TPost[]) => {
    const data = locaStorageHelper({
      type: LocalStorageTypes.GET,
      key: STORED_FIELD.POSTS,
    });

    setPosts(data ?? posts);
  };

  const addPost = (post: TPost) => {
    setPosts((prev) => [...prev, post]);
  };

  const updatePost = (updatedPost: TPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  const getPost = (id: string): TPost | undefined => {
    return posts.find((post) => post.id === +id);
  };

  const removePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const value = {
    posts,
    setPosts: cachePosts,
    addPost,
    updatePost,
    getPost,
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
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return postStoreContext;
};

export default PostStoreProvider;
