import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Modal from "@/components/Modal";
import PostStoreProvider from "@/context/PostStoreContext";

describe("Modal", () => {
  it("do not render a modal when prop open is false", () => {
    render(<Modal open={false} close={() => {}} />);

    expect(screen.queryByText("Create Post")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("renders a modal when prop open is true", () => {
    render(
      <PostStoreProvider>
        <Modal open={true} close={() => {}} />
      </PostStoreProvider>,
    );
    expect(screen.getByText("Create Post")).toBeInTheDocument();
    expect(screen.getByLabelText("Title of the Post")).toBeInTheDocument();
    expect(screen.getByLabelText("Post Description")).toBeInTheDocument();
  });
  it("should render Edit post title in edit mode", () => {
    render(
      <PostStoreProvider>
        <Modal open={true} close={() => {}} isEdit={true} />{" "}
      </PostStoreProvider>,
    );

    expect(screen.getByText("Edit Post")).toBeInTheDocument();
  });
  it("should render Create post title in create mode", () => {
    render(
      <PostStoreProvider>
        <Modal open={true} close={() => {}} />{" "}
      </PostStoreProvider>,
    );

    expect(screen.getByText("Create Post")).toBeInTheDocument();
  });
  it("should render CloseCTA", () => {
    render(
      <PostStoreProvider>
        <Modal open={true} close={() => {}} />{" "}
      </PostStoreProvider>,
    );
  });
  it("should render Form", () => {
    render(
      <PostStoreProvider>
        <Modal open={true} close={() => {}} />
      </PostStoreProvider>,
    );

    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();

    const closeCTA = screen.getByTestId("closeCTA");
    expect(closeCTA).toBeInTheDocument();
  });
});
