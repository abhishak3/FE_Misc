Function.prototype.myApply = function (thisArg, args) {
  const currentFunction = this;
  const sym = Symbol("fn");

  let retVal = undefined;
  thisArg[sym] = currentFunction;

  if (args === undefined || args === null) {
    retVal = thisArg[sym]();
  } else {
    retVal = thisArg[sym](...args);
  }

  delete thisArg[sym];

  return retVal;
};

Function.prototype.myApply = function (thisArg, args) {
  const currentFunction = this;
  const fn = currentFunction.bind(thisArg);

  if (args === undefined || args === null) {
    return fn();
  }

  return fn(...args);
};
