import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { usePostStore } from "@/context/PostStoreContext";
import { useForm } from "react-hook-form";
import Form from "@/components/Modal/Form";

jest.mock("react-hook-form", () => {
  return {
    ...jest.requireActual("react-hook-form"),
    useForm: jest.fn(),
  };
});

jest.mock("@/context/PostStoreContext", () => ({
  usePostStore: jest.fn(),
}));

describe("Form Component", () => {
  let mockAddPost, mockUpdatePost, mockCloseModal;

  beforeEach(() => {
    mockAddPost = jest.fn();
    mockUpdatePost = jest.fn();
    mockCloseModal = jest.fn();

    usePostStore.mockReturnValue({
      addPost: mockAddPost,
      updatePost: mockUpdatePost,
      posts: [{ id: 1, title: "Sample Title", body: "Sample Body" }],
    });

    useForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: (fn) => () =>
        fn({ title: "New Post", body: "New Post Body" }),
      watch: jest
        .fn()
        .mockImplementation((field) =>
          field === "title" ? "New Post" : "New Post Body",
        ),
      formState: { errors: {} },
    });
  });

  test("renders form inputs and button", () => {
    render(<Form closeModal={mockCloseModal} />);

    expect(screen.getByLabelText(/title of the post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/post description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("submits a new post and closes modal", async () => {
    render(<Form closeModal={mockCloseModal} />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/title of the post/i), {
      target: { value: "New Post" },
    });
    fireEvent.change(screen.getByLabelText(/post description/i), {
      target: { value: "New Post Body" },
    });

    // Click submit button
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Ensure addPost was called with the correct data
    expect(mockAddPost).toHaveBeenCalledWith({
      id: 2,
      title: "New Post",
      body: "New Post Body",
    });

    // Ensure modal was closed
    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("updates an existing post", () => {
    render(
      <Form
        id={1}
        title="Old Title"
        body="Old Body"
        closeModal={mockCloseModal}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockUpdatePost).toHaveBeenCalledWith({
      id: 1,
      title: "New Post",
      body: "New Post Body",
    });
    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("disables submit button when input is invalid", () => {
    useForm.mockReturnValueOnce({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      watch: jest.fn().mockReturnValue(""),
      formState: { errors: { title: true, body: true } },
    });

    render(<Form closeModal={mockCloseModal} />);

    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });
});
