Function.prototype.myCall = function (thisArg, ...args) {
  const currentFunction = this;
  const sym = Symbol("fn");

  let retVal = undefined;
  thisArg[sym] = currentFunction;
  retVal = thisArg[sym](...args);
  delete thisArg[sym];

  return retVal;
};

Function.prototype.myCall = function (thisArg, ...args) {
  const currentFunction = this;
  const fn = currentFunction.bind(thisArg);
  return fn(...args);
};

function test(arg1, arg2) {
  console.log(arg1, arg2, this.name);
}

test.call({ name: "abhishek" }, "1", "2");
test.myCall({ name: "my abhishek" }, "1", "2");
