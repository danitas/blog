"use client";

import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { TPostProps } from "@/components/HomeContent";
import { createPortal } from "react-dom";
import Modal from "@/components/Modal";

const EditCTA = ({ id, title, body }: TPostProps) => {
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
      {mounted &&
        createPortal(
          <Modal
            open={isOpen}
            close={handleStateModal}
            isEdit={true}
            id={id}
            title={title}
            body={body}
          />,
          document.body,
        )}
    </>
  );
};

export default EditCTA;
