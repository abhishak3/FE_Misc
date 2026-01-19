function flatten(object, depth = 1) {
  let result = {};

  if (depth === 0) {
    return object;
  }

  for (const key in object) {
    if (
      typeof object[key] === "object" &&
      !Array.isArray(object[key]) &&
      object[key] !== null
    ) {
      result = { ...result, ...flatten(object[key], depth - 1) };
    } else {
      result[key] = object[key];
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
console.log(flatten(obj, 1));
