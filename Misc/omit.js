function _omit(obj, path) {
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

  const normalizedPath = [...path];
  let result = obj;

  while (normalizedPath.length > 1) {
    if (result === null || typeof result !== "object") {
      return;
    }

    const key = normalizedPath.shift();

    if (!(key in result)) {
      return;
    }

    result = result[key];
  }

  if (result === null || typeof result !== "object") {
    return;
  }

  const key = normalizedPath.shift();

  if (Array.isArray(result) && !isNaN(Number(key))) {
    result.splice(Number(key), 1);
    return;
  }

  delete result[key];
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

// _set(obj, "a.h.i.j", "superman");
// console.dir(obj, { depth: null });

_omit(obj, "a[h].i");
console.dir(obj, { depth: null });
