function flatten(array, depth = 1) {
  const result = [];

  if (depth === 0) {
    return array;
  }

  for (const item of array) {
    if (!Array.isArray(item)) {
      result.push(item);
    } else {
      result.push(...flatten(item, depth - 1));
    }
  }

  return result;
}

/**
 * My implementation
 */
function flattenIterative(array, depth = 1) {
  const result = [];
  const stack = [[array, 0]];

  while (stack.length) {
    const [currentArray, idx] = stack[stack.length - 1];
    let finished = true;

    for (let i = idx; i < currentArray.length; i++) {
      if (depth + 1 === stack.length || !Array.isArray(currentArray[i])) {
        result.push(currentArray[i]);
      } else {
        stack[stack.length - 1][1] = i + 1;
        stack.push([currentArray[i], 0]);
        finished = false;
        break;
      }
    }

    if (finished) stack.pop();
  }

  return result;
}

function flattenIterative(array, depth) {
  const result = [];
  const stack = [];

  const newArr = array.map((curr) => [curr, depth]);
  stack.push(...newArr);

  while (stack.length > 0) {
    const top = stack.pop();
    const [curr, depth] = top;

    if (depth === 0) {
      result.push(curr);
      continue;
    }

    if (!Array.isArray(curr)) {
      result.push(curr);
    } else {
      const newArr = curr.map((elem) => [elem, depth - 1]);
      stack.push(...newArr);
    }
  }

  return result.reverse();
}

const arr = [1, [2, [4, [2, 4], "hello", 5], 3], 9];
console.log(arr);
console.log(flatten(arr, 9));
console.log(flattenIterative(arr, 9));
