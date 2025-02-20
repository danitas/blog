"use client";

import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStateModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <section className="flex flex-col my-[50px] md:my-[130px]">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-950 lg:text-5xl">
          Share Your Insights with the World
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
          We believe in the power of ideas. Where technology meets innovation,
          and passion fuels progress, we create opportunities that inspire
          change and drive lasting impact.
        </p>
        <button
          onClick={handleStateModal}
          type="button"
          className="cursor-pointer max-w-[150px] mb-5 px-3 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-600"
        >
          Add New Post
        </button>
      </section>
      {mounted &&
        createPortal(
          <Modal open={isOpen} close={handleStateModal} />,
          document.body,
        )}
    </>
  );
};

export default AddPost;
