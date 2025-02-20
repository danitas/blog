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
    const savedPosts = JSON.parse(
      localStorage.getItem("posts-storage") || "[]",
    );
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    }
  }, [setPosts]);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <HomeContent {...post} key={post.id} />)}
    </>
  );
};

export default Posts;
