function _get(object, path, defaultValue) {
  /**
   * NOTE:  Fails for keys containing dots: "a['b.c']"
            Produces empty keys for leading dots: "[0].a" → ["", "0", "a"]
   */
  if (!Array.isArray(path)) {
    path = path
      .replaceAll("[", ".")
      .replaceAll("]", "")
      .replaceAll("'", "")
      .replaceAll('"', "")
      .split(".");
  }

  let result = object;

  for (const key of path) {
    if (typeof result === "object" && result !== null && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }

  return result;
}

const obj = {
  a: {
    b: "Hello",
    c: null,
    d: [1, 2, "Hello World"],
    e: [{ name: "Abhishek" }, { work: "Spiderman" }],
    h: {
      i: {
        j: "Iron Man",
        k: "Batman",
      },
    },
  },
  f: {
    g: undefined,
  },
};

console.log(_get(obj, "a.h.i.j", "Key Not Found")); // Iron man
console.log(_get(obj, ["a", "e", "1", "work"], "Key Not Found")); // Spiderman
console.log(_get(obj, "a.e['1']['work']", "Key Not Found")); // Spiderman
console.log(_get(obj, "f[g]", "Key Not Found", "Key Not Found")); // undefined
