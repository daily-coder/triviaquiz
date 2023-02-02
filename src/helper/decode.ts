import he from "he";

function deepCopy<T>(
  value: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: <K = T>(arg: K) => any = (arg) => arg
): T {
  if (value == null || typeof value !== "object") {
    return callback(value);
  }

  const keys = Object.keys(value) as (keyof T)[];
  const copy = (Array.isArray(value) ? [] : {}) as T;
  for (const key of keys) {
    copy[key] = deepCopy(value[key], callback);
  }
  return copy;
}

function decodeHTML(value: unknown) {
  function getValue(value: unknown) {
    if (typeof value === "object" || value == null) {
      return value;
    }
    return he.decode(String(value));
  }
  return deepCopy(value, getValue);
}

export default decodeHTML;
