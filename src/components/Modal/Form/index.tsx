"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { usePostStore } from "@/context/PostStoreContext";
import { TPost } from "@/utils/api";

type TFormProps = Partial<TPost> & {
  closeModal: () => void;
};

type TFormValues = {
  title: string;
  body: string;
};

const Form = ({ id, title = "", body = "", closeModal }: TFormProps) => {
  const { addPost, updatePost, posts } = usePostStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: { title, body },
  });

  const titleValue = watch("title") || "";
  const bodyValue = watch("body") || "";
  const isEditing = Boolean(id);
  const isModified = titleValue !== title || bodyValue !== body;
  const isNewPostValid = titleValue.length >= 3 && bodyValue.length >= 3;
  const isCTADisabled = isEditing ? !isModified : !isNewPostValid;

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    if (isEditing) {
      updatePost({ id: id!, ...data } as TPost);
    } else {
      addPost({ id: posts.length + 1, ...data } as TPost);
    }
    closeModal();
  };

  return (
    <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)} role="form">
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <label
            htmlFor="title"
            className="mb-2 text-sm font-medium text-gray-900 font-medium"
          >
            Title of the Post
          </label>
          <input
            id="title"
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
            placeholder="Type the title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="mt-2 text-xs text-red-400 font-medium">
              The title is required.
            </span>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="body" className="block mb-2 text-sm font-medium">
            Post Description
          </label>
          <textarea
            id="body"
            className="min-h-[150px] block p-2.5 w-full text-sm rounded-lg border bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write the description here"
            {...register("body", { required: true })}
          />
          {errors.body && (
            <span className="mt-2 text-xs text-red-400">
              Description is required.
            </span>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isCTADisabled}
        className={clsx(
          "min-w-[100px] text-center justify-center flex mb-5 px-3 py-2 text-sm font-medium text-white rounded-lg",
          {
            "bg-lime-700 hover:bg-lime-600 cursor-pointer": !isCTADisabled,
            "bg-gray-400 cursor-not-allowed": isCTADisabled,
          },
        )}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
