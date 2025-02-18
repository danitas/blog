import Form from "@/components/Modal/Form";
import CloseCTA from "@/components/Modal/CloseCTA";

type TModalProps = {
  open: boolean;
  close: () => void;
}

const Modal = ({ open, close }: TModalProps) => {
  return (
    <div
      id="addPostModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${open ? '' : 'hidden overflow-x-hidden overflow-y-auto'} overflow-y-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Create New Post
        </h3>
        <CloseCTA close={close} />
      </div>

      <Form />
    </div>
  );
};

export default Modal;
