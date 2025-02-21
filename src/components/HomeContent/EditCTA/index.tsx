"use client";

import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { TPostProps } from "@/components/HomeContent";
import EditModal from "@/components/EditModal";

const EditCTA = (props: TPostProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStateModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <EditModal {...props} isOpen={isOpen} close={handleStateModal}>
        <button
          type="button"
          className="absolute right-[15px] top-[15px]"
          onClick={handleStateModal}
        >
          <Pencil
            width="20"
            height="20"
            color="white"
            className="cursor-pointer"
          />
        </button>
      </EditModal>
    </>
  );
};

export default EditCTA;
