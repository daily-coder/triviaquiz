import he from "he";
 
function getCopy(value, getValue) {
  if (value == null) {
    return value;
  } else if (typeof value !== "object") {
    return getValue(String(value)); // convert non-string values to strings
  } else {
    const keys = Object.keys(value);
    const copy = Array.isArray(value) ? [] : {};
    for (const key of keys) {
      copy[key] = getCopy(value[key], getValue);
    }
    return copy;
  }
}

function decodeHTML(obj) {
  return getCopy(obj, he.decode);
}

export default decodeHTML;
