function throttle(executor, delay) {
  let timer = null;

  return function (...args) {
    const context = this;

    if (timer !== null) {
      return;
    }

    executor.apply(context, args);

    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

function throttleWithTrailingExecution(executor, delay) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;

  return function (...args) {
    lastArgs = args;
    lastThis = this;

    if (timer !== null) return;

    executor.apply(lastThis, lastArgs);

    timer = setTimeout(() => {
      timer = null;

      // run trailing if there was a call during the wait
      if (lastArgs === null) {
        executor.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }
    }, delay);
  };
}
