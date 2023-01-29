import he, { Decode } from "he";

function getCopy(value: unknown, getValue: Decode) {
  if (value == null) {
    return value;
  } else if (typeof value !== "object") {
    return getValue(String(value)); // convert non-string values to strings
  } else {
    const keys = Object.keys(value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const copy: Record<string, any> = Array.isArray(value) ? [] : {};
    for (const key of keys) {
      copy[key] = getCopy(value[key as keyof typeof value], getValue);
    }
    return copy;
  }
}

function decodeHTML(obj: unknown) {
  return getCopy(obj, he.decode);
}

export default decodeHTML;
