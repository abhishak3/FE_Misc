function once(executor) {
  let called = false;
  let result;

  return function (...args) {
    if (called === true) return result;

    called = true;
    result = executor.apply(this, args);

    return result;
  };
}
