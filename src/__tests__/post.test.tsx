import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TPost } from "@/utils/api";
import Post from "@/components/Post";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/Post/EditCTA", () => () => <button>Edit Post</button>);
jest.mock("@/components/Post/RemoveCTA", () => ({ id }: { id: number }) => (
  <button>Remove Post {id}</button>
));

describe("Post Component", () => {
  const mockPost: TPost = {
    id: 1,
    title: "Test Post",
    body: "This is a test post with some content.",
    userId: 1,
  };

  it("renders the post title and body", () => {
    render(<Post {...mockPost} />);

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test post with some content."),
    ).toBeInTheDocument();
  });

  it("renders Edit and Remove buttons", () => {
    render(<Post {...mockPost} />);

    expect(screen.getByText("Edit Post")).toBeInTheDocument();
    expect(screen.getByText("Remove Post 1")).toBeInTheDocument();
  });

  it("renders 'Read more' link with correct href", () => {
    render(<Post {...mockPost} />);

    const readMoreLink = screen.getByRole("link", { name: /read more/i });
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute("href", "/post/1");
  });
});
