import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddPost from "@/components/Post/AddPost";

describe("Home", () => {
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
});
