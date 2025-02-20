"use client";
import React, { useEffect, useState } from "react";
import HomeContent from "@/components/HomeContent";
import { usePostStore } from "@/store/postsStore";
import { TPost } from "@/utils/api";

type TPostsProps = {
  posts: Omit<TPost, "userId">[];
};

const Posts = ({ posts }: TPostsProps) => {
  const [visiblePosts, setVisiblePosts] = useState<Omit<TPost, "userId">[]>([]);
  const [loadCount, setLoadCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const { posts: storedPosts, setPosts } = usePostStore();

  useEffect(() => {
    if (posts.length > 0) {
      setPosts(posts);
    }
  }, [posts]);

  useEffect(() => {
    setVisiblePosts(posts.slice(0, loadCount));
  }, [posts, loadCount]);

  const loadMorePosts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLoadCount((prevCount) => prevCount + 12);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-15">
        {visiblePosts.length > 0 &&
          visiblePosts.map((post) => <HomeContent {...post} key={post.id} />)}
      </div>

      {visiblePosts.length < posts.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMorePosts}
            disabled={isLoading}
            className={`uppercase px-6 py-4 text-sm font-medium text-center text-white bg-lime-800 rounded-lg hover:bg-lime-700 transition-all duration-300 ease-in-out ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer opacity-100"
            }`}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
};

export default Posts;
