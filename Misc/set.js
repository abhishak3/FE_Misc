function _set(obj, path, value) {
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

  let normalizedPath = [...path];
  let result = obj;

  while (normalizedPath.length > 1) {
    if (result === null || typeof result !== "object") {
      // No need to override primitive values
      return;
    }

    const key = normalizedPath.shift();

    if (!(key in result)) {
      const nextKey = normalizedPath[0];

      if (isNaN(Number(nextKey))) {
        result[key] = {};
      } else {
        result[key] = [];
      }
    }

    result = result[key];
  }

  if (result === null || typeof result !== "object") {
    // No need to override primitive values. It won't through error but nothing is going to be done
    return;
  }

  result[normalizedPath[0]] = value;
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

_set(obj, "a[h].i[k]['hello']", "betaman");
console.dir(obj, { depth: null });

// _set(obj, "f[l][m].n.p[0]", 100);
// console.dir(obj, { depth: null });
