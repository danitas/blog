"use client";
import React, { useEffect } from "react";
import CloseCTA from "@/components/Modal/CloseCTA";
import Form from "@/components/Modal/Form";

type TModalProps = {
  id?: number;
  title?: string;
  body?: string;
  open: boolean;
  close: () => void;
  isEdit?: boolean;
};

const Modal = ({ id, title, body, open, close, isEdit }: TModalProps) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  return (
    <>
      {open && (
        <>
          <div
            className="cursor-pointer fixed bg-black opacity-75 flex w-full h-full left-0 top-0"
            onClick={() => close()}
          ></div>

          <div
            className={`${
              open ? "fixed" : "hidden"
            } overflow-y-hidden right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 flex justify-center items-center`}
          >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="flex min-w-[300px] md:min-w-[400px] items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {isEdit ? "Edit Post" : "Create Post"}
                </h3>
                <CloseCTA close={close} />
              </div>
              <Form id={id} title={title} body={body} closeModal={close} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
