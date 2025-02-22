"use client";

import * as React from "react";
import { usePostStore } from "@/context/PostStoreContext";
import { useEffect, useMemo, useState } from "react";
import Loader from "@/components/Loader";
import EditModal from "@/components/EditModal";
import { Quote } from "lucide-react";
import PostNotFound from "@/components/Post/PostNotFound";

type Props = {
  id: string;
};
export const Details = ({ id }: Props) => {
  const { setPosts, posts } = usePostStore();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleStateModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setPosts([]);
    setLoading(false);
  }, []);

  const post = useMemo(() => {
    if (loading || !posts.length) return undefined;

    return posts.find((p) => +id === p.id);
  }, [posts, id, loading]);

  if (loading) return <Loader />;

  if (!post) {
    return <PostNotFound />;
  }

  return (
    <section className="mt-[150px] mx-auto max-w-[300px] md:max-w-[950px] relative flex items-center flex-col">
      <Quote className="rotate-180 md:w-[60px] md:h-[60px] w-[45px] h-[45px] stroke-lime-500" />
      <section className="py-[50px] md:py-[100px] w-5/6 mx-auto">
        <h1 className="capitalize mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-950 md:text-5xl lg:text-6xl">
          {post?.title}
        </h1>
        <p className="mt-5 mb-6 text-lg font-normal text-gray-500 lg:text-xl">
          {post?.body}
        </p>
        <EditModal {...post} isOpen={isOpen} close={handleStateModal}>
          <button
            type="button"
            onClick={handleStateModal}
            className="cursor-pointer w-[110px] md:w-[150px] mb-5 px-3 py-2 text-sm md:text-lg font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-600"
          >
            Edit Post
          </button>
        </EditModal>
      </section>
    </section>
  );
};
