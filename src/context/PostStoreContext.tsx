"use client";

import React, { createContext, useContext, useRef } from "react";
import createPostStore, { PostStore } from "@/store/postsStore";
import { useStore } from "zustand/react";

type TPostStoreContext = ReturnType<typeof createPostStore>;

const PostStoreContext = createContext<TPostStoreContext | undefined>(
  undefined,
);

const PostStoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<TPostStoreContext>(null);

  if (!storeRef.current) {
    storeRef.current = createPostStore();
  }

  return (
    <PostStoreContext.Provider value={storeRef.current}>
      {children}
    </PostStoreContext.Provider>
  );
};

export const usePostStore = <T,>(selector: (store: PostStore) => T): T => {
  const postStoreContext = useContext(PostStoreContext);

  if (!postStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(postStoreContext, selector);
};

export default PostStoreProvider;
