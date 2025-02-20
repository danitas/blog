"use client";
import React, { useEffect } from "react";
import HomeContent from "@/components/HomeContent";
import { usePostStore } from "@/store/postsStore";
import { TPost } from "@/utils/api";

type TPostsProps = {
  posts: Omit<TPost, "userId">[];
};

const Posts = ({ posts }: TPostsProps) => {
  const { posts: storedPosts, setPosts } = usePostStore();

  useEffect(() => {
    if (posts.length > 0) {
      setPosts(posts);
    }
  }, [posts]);

  return (
    <>
      {storedPosts.length > 0 &&
        storedPosts.map((post) => <HomeContent {...post} key={post.id} />)}
    </>
  );
};

export default Posts;
