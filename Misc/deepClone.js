function deepClone(obj, seen = new Map()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (seen.has(obj)) {
    // for circular dependencies
    return seen.get(obj);
  }

  let result;

  if (Array.isArray(obj)) {
    result = [];
    seen.set(obj, result);

    for (const item of obj) {
      result.push(deepClone(item, seen));
    }
  } else {
    result = {};
    seen.set(obj, result);

    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue;
      }

      result[key] = deepClone(obj[key], seen);
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

obj.b = obj;

console.dir(deepClone(obj), { depth: null });
