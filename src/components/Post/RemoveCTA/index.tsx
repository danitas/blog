"use client";

import React from "react";
import { usePostStore } from "@/context/PostStoreContext";

const RemoveCTA = ({ id }: { id: number }) => {
  const { removePost } = usePostStore();

  return (
    <button
      type="button"
      onClick={() => removePost(id)}
      className="px-3 max-w-[150px] py-2 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-600 cursor-pointer"
    >
      Remove Post
    </button>
  );
};

export default RemoveCTA;
