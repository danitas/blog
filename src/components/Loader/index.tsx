import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="w-16 h-16 border-4 border-t-transparent border-lime-500 border-solid rounded-full animate-spin"
        role="progressbar"
      ></div>
    </div>
  );
};

export default Loader;
