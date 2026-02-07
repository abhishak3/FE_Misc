function createSetInterval() {
  const interval = {};
  let currentId = 0;

  return {
    mySetInterval: function (fn, delay, ...args) {
      const id = ++currentId;

      function check() {
        interval[id] = setTimeout(() => {
          fn(...args);

          if (interval[id]) check();
        }, delay);
      }

      check();

      return id;
    },

    clearMySetInterval: function (id) {
      if (id in interval) {
        clearTimeout(interval[id]);
        delete interval[id];
      }
    },
  };
}
