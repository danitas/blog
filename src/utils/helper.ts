export enum LocalStorageTypes {
  GET,
  SET,
}

export const STORED_FIELD = {
  POSTS: "posts",
} as const;

type TLocalStorageHelper<T> = {
  type: LocalStorageTypes;
  data?: T;
  key: (typeof STORED_FIELD)[keyof typeof STORED_FIELD];
};

export const localStorageHelper = <T>({
  type,
  key,
  data,
}: TLocalStorageHelper<T>) => {
  if (typeof localStorage !== "undefined") {
    if (type === LocalStorageTypes.GET) {
      const data = localStorage.getItem(key);

      if (data) {
        return JSON.parse(data);
      }
    }

    if (type === LocalStorageTypes.SET) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e: unknown) {
        throw Error(e as string);
      }
    }
  }
};
