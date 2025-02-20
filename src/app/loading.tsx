import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-lime-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
