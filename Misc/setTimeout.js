function createSetTimeout() {
  const timers = {};
  let currentId = 0;

  // My set timeout function
  return {
    mySetTimeout: function (fn, delay, ...args) {
      const id = getId();

      const calledDate = new Date();

      function check() {
        const currentDate = new Date();
        const timeSpent = currentDate - calledDate;

        if (!(id in timers)) {
          return;
        }

        if (timeSpent >= delay) {
          fn(...args);
          delete timers[id];
        } else {
          requestIdleCallback(() => check());
        }
      }

      requestIdleCallback(() => check());

      function getId() {
        const id = ++currentId;
        timers[id] = true;
        return id;
      }

      return id;
    },

    clearMySetTimeout: function (id) {
      delete timers[id];
    },
  };
}

const { mySetTimeout, clearMySetTimeout } = createSetTimeout();

const id = mySetTimeout((msg) => console.log("logged", msg), 3000, "wow");
clearMySetTimeout(id);
