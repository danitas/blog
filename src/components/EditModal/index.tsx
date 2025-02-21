import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "@/components/Modal";
import { TPostProps } from "../Post";

type TEditModalProps = TPostProps &
  React.PropsWithChildren & {
    isOpen: boolean;
    close: () => void;
  };

const EditModal = ({
  id,
  title,
  body,
  isOpen,
  close,
  children,
}: TEditModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {children}
      {mounted &&
        createPortal(
          <Modal
            open={isOpen}
            close={close}
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

export default EditModal;
