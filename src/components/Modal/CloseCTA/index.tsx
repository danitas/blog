import React from "react";
import { X } from "lucide-react";

const closeCTA = ({ close }: { close(): void }) => {
  return (
    <button
      onClick={close}
      type="button"
      className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
    >
      <X className="w-5 h-5" />
      <span className="sr-only">Close modal</span>
    </button>
  );
};

export default closeCTA;
