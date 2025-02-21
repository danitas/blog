"use client";

import * as React from "react";
import { usePostStore } from "@/context/PostStoreContext";
import { NoPostError } from "@/components/NoPostError";
import { useEffect } from "react";

type Props = {
  id: string;
};
export const HomeDetail = ({ id }: Props) => {
  const { getPost, setPosts } = usePostStore();

  useEffect(() => {
    setPosts([]);
  }, []);

  const post = getPost(id);

  if (!post) return <NoPostError />;

  return (
    <section className="py-[50px] md:py-[100px] w-5/6 mx-auto">
      <h1 className="capitalize mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-950 md:text-5xl lg:text-6xl">
        {post.title}
      </h1>
      <p className="mt-5 mb-6 text-lg font-normal text-gray-500 lg:text-xl">
        {post.body}
      </p>
    </section>
  );
};
