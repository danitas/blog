import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AddPost from "@/components/Post/AddPost";
import PostStoreProvider from "@/context/PostStoreContext";

describe("AddPost", () => {
  it("renders a heading", () => {
    render(<AddPost />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
  it("renders a button", () => {
    render(<AddPost />);

    const addPostBtn = screen.getByText("Add New Post");

    expect(addPostBtn).toBeInTheDocument();
  });
  it("renders a modal", () => {
    render(
      <PostStoreProvider>
        <AddPost />
      </PostStoreProvider>,
    );

    const addPostBtn = screen.getByText("Add New Post");

    fireEvent.click(addPostBtn);

    const modalTitle = screen.getByRole("heading", { level: 3 });

    expect(modalTitle).toHaveTextContent("Create Post");
  });
});
