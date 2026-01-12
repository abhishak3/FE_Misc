function debounce(executor, delay) {
  let timer;

  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => executor.apply(context, args), delay);
  };
}

/**
 * First call is also delayed in debounce which is not necessary
 */
function improvedDebounce(executor, delay) {
  let timer = null;

  return function (...args) {
    const context = this;

    if (timer == null) {
      executor.apply(context, args);
    }

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}
