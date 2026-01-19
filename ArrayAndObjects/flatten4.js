function flatten(object) {
  let result;

  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    result = [];

    for (const item of object) {
      const currItem = flatten(item);

      if (Array.isArray(currItem)) {
        result.push(...currItem);
      } else {
        result.push(currItem);
      }
    }

    return result;
  }

  result = {};

  for (const key in object) {
    const item = object[key];
    const currItem = flatten(item);

    if (
      typeof currItem === "object" &&
      !Array.isArray(currItem) &&
      currItem !== null
    ) {
      result = { ...result, ...currItem };
    } else {
      result[key] = currItem;
    }
  }

  return result;
}

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: [1, 2, [3, 4], { z: 3, l: { m: 5 } }],
    h: 6,
  },
};

console.log(obj);
console.log(flatten(obj));
