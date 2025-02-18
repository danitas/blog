import React from "react";
import Modal from "@/components/Modal";

const AddPost = () => {
  return (
    <>
      <section className="flex flex-col my-12">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Share Your Insights with the World
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
          We believe in the power of ideas. Where technology meets innovation,
          and passion fuels progress, we create opportunities that inspire
          change and drive lasting impact.
        </p>
        <button
          data-modal-target="addPostModal"
          data-modal-toggle="addPostModal"
          type="button"
          className="cursor-pointer max-w-[150px] mb-5 px-3 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-600"
        >
          Add New Post
        </button>
      </section>
      <Modal />
    </>
  );
};

export default AddPost;
