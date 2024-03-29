import decodeHTML from "./decode";

test("should return string when called with non-string values", function () {
  expect(typeof decodeHTML("hello world")).toBe("string");
  expect(typeof decodeHTML(2)).toBe("string");
  expect(typeof decodeHTML(true)).toBe("string");
  expect(typeof decodeHTML(Symbol())).toBe("string");
  expect(typeof decodeHTML(jest.fn())).toBe("string");
});

test("should return object when called with object", function () {
  expect(typeof decodeHTML({})).toBe("object");
  expect(typeof decodeHTML([])).toBe("object");
});

test("should return null or undefined", function () {
  expect(decodeHTML(null)).toBeNull();
  expect(decodeHTML(undefined)).toBeUndefined();
});

test("should return decoded string", function () {
  expect(decodeHTML("&lt;")).toBe("<");
  expect(decodeHTML("&gt;")).toBe(">");
});

test("should return decoded object", function () {
  const obj = {
    a: 1,
    b: "he said,&quot;hello&quot;",
    c: {
      a: 2,
      b: ["&lt;", "&gt;"],
    },
  };

  const expectedObj = {
    a: "1", // numbers are converted into strings
    b: 'he said,"hello"',
    c: {
      a: "2",
      b: ["<", ">"],
    },
  };

  expect(decodeHTML(obj)).toEqual(expectedObj);
});
