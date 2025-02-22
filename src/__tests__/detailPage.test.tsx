import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Details } from "@/components/Post/Details";
import PostStoreProvider from "@/context/PostStoreContext";
import { TPost } from "@/utils/api";
import PostNotFound from "@/components/Post/PostNotFound";

const setPosts = jest.fn();

const mockPosts: TPost[] = [
  { userId: 1, id: 1, title: "First Post", body: "This is the first post" },
  { userId: 2, id: 2, title: "Second Post", body: "This is the second post" },
];

const mockPost: TPost = {
  userId: 1,
  id: 1,
  title: "First Post",
  body: "This is the first post",
};

describe("Details", () => {
  it("renders a heading", async () => {
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue(JSON.stringify(mockPosts));

    render(
      <PostStoreProvider>
        <Details id={mockPost.id.toString()} />
      </PostStoreProvider>,
    );

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument(),
    );

    const postTitle = await screen.getByRole("heading", { level: 1 });
    expect(postTitle).toBeInTheDocument();
  });

  it("renders post content", async () => {
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue(JSON.stringify(mockPosts));

    render(
      <PostStoreProvider>
        <Details id={mockPost.id.toString()} />
      </PostStoreProvider>,
    );

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument(),
    );

    const postBody = await screen.getByRole("paragraph");
    expect(postBody).toBeInTheDocument();
  });

  it("renders PostNotFound when no post is found for the given ID", async () => {
    render(
      <PostStoreProvider>
        <Details id="999" /> {/* Using a non-existent post ID */}
      </PostStoreProvider>,
    );

    await waitFor(() => {
      const postNotFound = screen.getByText(/oops! posts not found/i);
      expect(postNotFound).toBeInTheDocument();
    });
  });

  it("toggles the modal when the Edit button is clicked", async () => {
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue(JSON.stringify(mockPosts));

    render(
      <PostStoreProvider>
        <Details id={mockPost.id.toString()} />
      </PostStoreProvider>,
    );

    let modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();

    const editButton = screen.getByRole("button", { name: "Edit Post" });

    fireEvent.click(editButton);

    modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    fireEvent.click(editButton);
    modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });
});

describe("PostNotFound", () => {
  it("renders the 'Oops' heading after lazy loading", async () => {
    render(<PostNotFound />);

    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("OOPS! Posts Not Found.");
    });
  });
});
