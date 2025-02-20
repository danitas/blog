"use client";
import React, { useEffect } from "react";
import HomeContent from "@/components/HomeContent";
import { usePostStore } from "@/store/postsStore";
import { TPost } from "@/utils/api";

type TPostsProps = {
  posts: Omit<TPost, "userId">[];
};

const Posts = ({ posts }: TPostsProps) => {
  const { setPosts } = usePostStore();

  useEffect(() => {
    if (posts.length > 0) {
      setPosts(posts);
    }
  }, [posts]);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <HomeContent {...post} key={post.id} />)}
    </>
  );
};

export default Posts;
