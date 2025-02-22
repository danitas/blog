import React from "react";
import Link from "next/link";

const PostNotFound = () => {
  return (
    <section className="flex mx-auto md:w-[800px] w-[300px] items-center flex-col md:flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <img src="/404.png" alt="404 page" className="h-64 md:h-100" />
      <section className="flex flex-col">
        <h1 className="uppercase my-4 text-5xl font-extrabold leading-none tracking-tight text-blue-950 lg:text-6xl">
          OOPS! Posts Not Found.
        </h1>
        <p className="my-6 font-medium text-gray-600 leading-tight text-lg">
          You might have picked the wrong door because I haven't been able to
          find the message posts you're searching for.
        </p>
        <Link
          href="/"
          title="back home"
          className="w-[170px] uppercase cursor-pointer mb-5 px-3 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-600"
        >
          Back to Home
        </Link>
      </section>
    </section>
  );
};

export default PostNotFound;
