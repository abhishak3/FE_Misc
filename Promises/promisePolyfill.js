function MyPromise(executor) {
  let state = "PENDING";
  let value = undefined;

  const onFulfilledQueue = [];
  const onRejectedQueue = [];

  const resolve = (val) => {
    if (state !== "PENDING") return;

    state = "FULFILLED";
    value = val;

    queueMicrotask(() => onFulfilledQueue.forEach((fn) => fn(value)));
  };

  const reject = (error) => {
    if (state !== "PENDING") return;

    state = "REJECTED";
    value = error;

    queueMicrotask(() => onRejectedQueue.forEach((fn) => fn(value)));
  };

  this.then = (onFulfilled, onRejected) =>
    new MyPromise((resolveNext, rejectNext) => {
      function handleOnFulfilled(val) {
        try {
          const result = onFulfilled(val);
          resolveNext(result);
        } catch (error) {
          rejectNext(error);
        }
      }

      function handleOnRejected(err) {
        try {
          const result = onRejected(err);
          resolveNext(result);
        } catch (error) {
          rejectNext(error);
        }
      }

      if (state === "PENDING") {
        onFulfilledQueue.push(handleOnFulfilled);
        onRejectedQueue.push(handleOnRejected);
      } else if (state === "FULFILLED") {
        queueMicrotask(() => resolveNext(value));
      } else {
        queueMicrotask(() => rejectNext(value));
      }
    });

  this.catch = (onRejected) => {
    return this.then(null, onRejected);
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

const prm = new MyPromise((resolve, reject) =>
  setTimeout(() => resolve(3), 10000)
);

prm.then((res) => console.log(1, res));
prm.then((res) => console.log(2, res));
prm.then((res) => console.log(3, res));
