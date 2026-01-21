function pipe(fns) {
  return function (arg) {
    let result = arg;

    for (const fn of fns) {
      result = fn(result);
    }

    return result;
  };
}

function pipe(fns) {
  return function (arg) {
    return fns.reduce((acc, fn) => fn(acc), arg);
  };
}

/**
 * Handling asynchronous functions
 */
function pipe(fns) {
  return function (arg) {
    return fns.reduce(
      (chain, fn) => chain.then((result) => fn(result)),
      Promise.resolve(arg),
    );
  };
}
