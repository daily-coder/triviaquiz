import { loadState, saveState } from "./localStorage";

const temp = window.localStorage;
beforeEach(() => localStorage.clear());
afterEach(() => (window.localStorage = temp));

test("store data in localStorage", () => {
  const key = "token";
  const value = Math.random();
  saveState(key, value);

  const serializedData = localStorage.getItem(key);
  if (!serializedData) {
    throw new Error("Failed to store data in localStorage");
  }
  expect(JSON.parse(serializedData)).toBe(value);
});

test("retrieve data from localStorage", () => {
  const key = "token";
  const value = Math.random();
  saveState(key, value);

  expect(loadState(key)).toBe(value);
});

test("return undefined if there is an error while retrieving", () => {
  const key = "token";
  const value = Math.random();
  saveState(key, value);

  // create an error by deleting localStorage
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete window.localStorage;
  expect(loadState(key)).toBeUndefined();
});
