import { saveState } from "./localStorage";

beforeEach(() => localStorage.clear());

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
