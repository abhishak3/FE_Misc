function deepEqual(obj1, obj2, seen = new Map()) {
  // Two NaNs are not equal
  if (Number.isNaN(obj1) && Number.isNaN(obj2)) {
    return true;
  }

  if (obj1 === null && obj2 === null) {
    return true;
  }

  if (typeof obj1 !== "object" && typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  // same reference objects
  if (obj1 === obj2) {
    return true;
  }

  if (
    (typeof obj1 === "object" && typeof obj2 !== "object") ||
    (typeof obj1 !== "object" && typeof obj2 === "object") ||
    (Array.isArray(obj1) && !Array.isArray(obj2)) ||
    (!Array.isArray(obj1) && Array.isArray(obj2))
  ) {
    return false;
  }

  /**
   * If we have compard these two, then return true
   * Why true?
   * If they would've not matched, then we would not have reached here
   * as it would have returned false immediately.
   *
   * Let's say object is partially matched but we don't know further,
   * then it would still be true, since we'll check that eventually
   */
  if (seen.has(obj1) && seen.get(obj1) === obj2) {
    return true;
  }

  seen.set(obj1, obj2);

  // Both are arrays (can be checked using one only)
  if (Array.isArray(obj1)) {
    return (
      obj1.length === obj2.length &&
      obj1.every((val, index) => deepEqual(val, obj2[index]))
    );
  }

  const obj1Entries = Object.entries(obj1);
  const obj2Entries = Object.entries(obj2);

  if (obj1Entries.length !== obj2Entries.length) {
    return false;
  }

  return obj1Entries.every((val, index) => deepEqual(val, obj2Entries[index]));
}

obj1 = { a: 1, b: [1, [2, [3, { c: 4 }]]], c: 4 };
obj2 = { a: 1, b: [1, [2, [3, { c: 4 }]]], c: 4 };
console.log(deepEqual(obj1, obj2)); // true
