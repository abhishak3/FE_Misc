Function.prototype.myBind = function (thisArg, ...args) {
  const currentFunction = this;

  return function (...restArgs) {
    const sym = Symbol("currentFunction");
    try {
      thisArg[sym] = currentFunction;
      return thisArg[sym](...args, ...restArgs);
    } finally {
      delete thisArg[sym];
    }
  };
};

Function.prototype.myBind = function (thisArg, ...args) {
  const currentFunction = this;

  return function (...restArgs) {
    return currentFunction.apply(thisArg, [...args, ...restArgs]);
  };
};
