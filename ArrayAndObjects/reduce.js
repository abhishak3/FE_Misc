// not handling sparse arrays right now
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const currentArray = this;

  if (currentArray.length === 0 && initialValue === undefined) {
    throw Error("Empty array with undefined initial value");
  }

  if (currentArray.length === 0) {
    return initialValue;
  }

  let result = initialValue;

  for (let i = 0; i < currentArray.length; i++) {
    if (result === undefined) {
      result = currentArray[0];
      continue;
    }

    result = callbackFn.call(this, result, currentArray[i], i, currentArray);
  }

  return result;
};

const array = [1, 2, 3];

console.log(array.reduce((acc, curr) => acc + curr, 1));
console.log(array.myReduce((acc, curr) => acc + curr, 1));
