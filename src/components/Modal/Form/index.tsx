import React from "react";

const Form = () => {
  return (
    <form className="p-4 md:p-5">
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <label
            htmlFor="name"
            className="mb-2 text-sm font-medium text-gray-900"
          >
            Title of the Post
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type the title"
            required
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium"
          >
            Post Description
          </label>
          <textarea
            id="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write the description here"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="cursor-pointer min-w-[100px] text-center justify-center flex mb-5 px-3 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
