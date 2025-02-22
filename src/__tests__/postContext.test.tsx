import { act, renderHook } from "@testing-library/react";
import PostStoreProvider, { usePostStore } from "@/context/PostStoreContext";
import {
  localStorageHelper,
  LocalStorageTypes,
  STORED_FIELD,
} from "@/utils/helper";
import { TPost } from "@/utils/api";

const mockPosts: TPost[] = [
  { userId: 1, id: 1, title: "First Post", body: "This is the first post" },
  { userId: 2, id: 2, title: "Second Post", body: "This is the second post" },
];

describe("PostStoreContext", () => {
  it("cachePosts should store posts", () => {
    const { result } = renderHook(() => usePostStore(), {
      wrapper: PostStoreProvider,
    });

    act(() => {
      result.current.setPosts(mockPosts);
    });

    expect(result.current.posts).toEqual(mockPosts);
  });

  it("cachePosts should re-store posts from localStorage", () => {
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue(JSON.stringify(mockPosts));

    const { result } = renderHook(() => usePostStore(), {
      wrapper: PostStoreProvider,
    });

    act(() => {
      result.current.setPosts([]);
    });

    expect(result.current.posts).toEqual(mockPosts);
  });

  it("addPost should add the post", () => {
    const { result } = renderHook(() => usePostStore(), {
      wrapper: PostStoreProvider,
    });

    const newPost = { id: 3, title: "New Post", body: "New Post Content" };

    act(() => {
      result.current.addPost(newPost);
    });

    expect(result.current.posts).toContainEqual(newPost);
  });

  it("updatePost should update the post by id", () => {
    const { result } = renderHook(() => usePostStore(), {
      wrapper: PostStoreProvider,
    });

    act(() => {
      result.current.setPosts(mockPosts);
    });

    const updatedPost = { id: 1, title: "Updated Title", body: "Updated Body" };

    act(() => {
      result.current.updatePost(updatedPost);
    });

    expect(result.current.posts.find((post) => post.id === 1)).toEqual(
      updatedPost,
    );
  });

  it("removePost should remove the post by id", () => {
    const { result } = renderHook(() => usePostStore(), {
      wrapper: PostStoreProvider,
    });

    act(() => {
      result.current.setPosts(mockPosts);
    });

    act(() => {
      result.current.removePost(1);
    });

    expect(result.current.posts.find((post) => post.id === 1)).toBeUndefined();
  });
});

describe("localStorageHelper", () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "getItem").mockClear();
    jest.spyOn(Storage.prototype, "setItem").mockClear();
  });

  it("should return undefined if localStorage is absent", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => null);

    const result = localStorageHelper({
      type: LocalStorageTypes.GET,
      key: STORED_FIELD.POSTS,
    });

    expect(result).toBeUndefined();
  });

  it("should return parsed item from localStorage", () => {
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue(JSON.stringify(mockPosts));

    const result = localStorageHelper({
      type: LocalStorageTypes.GET,
      key: STORED_FIELD.POSTS,
    });

    expect(result).toEqual(mockPosts);
  });

  it("should return undefined if item is absent in localStorage", () => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    const result = localStorageHelper({
      type: LocalStorageTypes.GET,
      key: STORED_FIELD.POSTS,
    });

    expect(result).toBeUndefined();
  });

  it("should set item to localStorage", () => {
    const setItemMock = jest.spyOn(Storage.prototype, "setItem");

    localStorageHelper({
      type: LocalStorageTypes.SET,
      key: STORED_FIELD.POSTS,
      data: mockPosts,
    });

    expect(setItemMock).toHaveBeenCalledWith(
      STORED_FIELD.POSTS,
      JSON.stringify(mockPosts),
    );
  });

  it("should throw an error if incorrect data received", () => {
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage Error");
    });

    expect(() =>
      localStorageHelper({
        type: LocalStorageTypes.SET,
        key: STORED_FIELD.POSTS,
        data: {},
      }),
    ).toThrow("Storage Error");
  });

  it("throws error when used outside PostStoreProvider", () => {
    expect(() => renderHook(() => usePostStore())).toThrow(
      "usePostStore must be used within PostStoreProvider",
    );
  });
});
