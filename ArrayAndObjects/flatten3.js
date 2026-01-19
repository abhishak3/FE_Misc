function flatten(object, depth = 1, prefix = "") {
  let result = {};

  for (const key in object) {
    const item = object[key];
    const currPrefix = `${prefix.length > 0 ? `${prefix}.` : ""}${key}`;

    if (
      typeof item === "object" &&
      !Array.isArray(item) &&
      item !== null &&
      depth !== 0
    ) {
      result = {
        ...result,
        ...flatten(item, depth - 1, currPrefix),
      };
    } else {
      result[currPrefix] = item;
    }
  }

  return result;
}

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: {
      f: 4,
      g: 5,
    },
    h: 6,
  },
};

console.log(obj);
console.log(flatten(obj, 13));
