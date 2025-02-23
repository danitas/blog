import "@testing-library/jest-dom";

import Home from "@/app/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PostStoreProvider from "@/context/PostStoreContext";
import { getPosts } from "@/utils/api";

jest.mock("@/utils/api", () => ({
  getPosts: jest.fn(),
}));

beforeEach(() => {
  localStorage.clear();

  jest.spyOn(Storage.prototype, "setItem");
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
});

afterEach(() => {
  jest.restoreAllMocks();
});

const mockPosts = [
  { id: 1, title: "Test Post", body: "This is a test post", userId: 1 },
  { id: 2, title: "Second Post", body: "Another test post", userId: 2 },
];

describe("Home Page", () => {
  it("render Not Found page when data is undefined", async () => {
    (getPosts as jest.Mock).mockResolvedValue(undefined);

    const HomeComponent = await Home();

    render(<PostStoreProvider>{HomeComponent}</PostStoreProvider>);

    expect(screen.getByText("OOPS! Posts Not Found.")).toBeInTheDocument();
  });
  it("renders posts when data is available", async () => {
    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    const HomeComponent = await Home();

    render(<PostStoreProvider>{HomeComponent}</PostStoreProvider>);

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
    });
  });
  it("renders Add Post button", async () => {
    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    const HomeComponent = await Home();

    render(<PostStoreProvider>{HomeComponent}</PostStoreProvider>);

    await waitFor(() => {
      expect(screen.getByText("Add New Post")).toBeInTheDocument();
    });
  });

  it("renders Post List", async () => {
    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    const HomeComponent = await Home();

    render(<PostStoreProvider>{HomeComponent}</PostStoreProvider>);

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
      expect(screen.getByText("Second Post")).toBeInTheDocument();
    });
  });
});

describe("Posts Component via Home Page", () => {
  it("renders posts correctly", async () => {
    const mockPosts = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Test Post ${i + 1}`,
      body: "This is a test post",
      userId: 1,
    }));

    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    const HomeComponent = await Home();

    render(<PostStoreProvider>{HomeComponent}</PostStoreProvider>);

    await waitFor(() => {
      expect(screen.getByText("Test Post 1")).toBeInTheDocument();
      expect(screen.getByText("Test Post 12")).toBeInTheDocument();
    });

    expect(screen.queryByText("Test Post 13")).not.toBeInTheDocument();
  });

  it("loads more posts when 'Load More' is clicked", async () => {
    const mockPosts = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Test Post ${i + 1}`,
      body: "This is a test post",
      userId: 1,
    }));

    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    const HomeComponent = await Home();

    render(<PostStoreProvider>{HomeComponent}</PostStoreProvider>);

    await waitFor(() => {
      expect(screen.getByText("Test Post 12")).toBeInTheDocument();
    });

    const loadMoreButton = screen.getByText("Load More");
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(screen.getByText("Test Post 13")).toBeInTheDocument();
    });
  });

  it("hides 'Load More' button when all posts are loaded", async () => {
    const mockPosts = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Test Post ${i + 1}`,
      body: "This is a test post",
      userId: 1,
    }));

    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    const HomeComponent = await Home();

    render(<PostStoreProvider>{HomeComponent}</PostStoreProvider>);

    await waitFor(() => {
      expect(screen.getByText("Test Post 12")).toBeInTheDocument();
    });

    expect(screen.queryByText("Load More")).not.toBeInTheDocument();
  });
});
