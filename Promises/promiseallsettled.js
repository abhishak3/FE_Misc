let p1 = new Promise((_, reject) => setTimeout(() => reject("1000ms"), 1000));
let p2 = new Promise((resolve) => setTimeout(() => resolve("2000ms"), 2000));
let p3 = new Promise((resolve) => setTimeout(() => resolve("5000ms"), 5000));

const promises = [p1, p2, p3];

function myAllSettled(promises) {
  return new Promise((resolve) => {
    if (promises.length === 0) {
      return resolve([]);
    }

    const allSettled = new Array(promises.length);
    let settledCount = 0;
    promises.forEach((promise, index) =>
      Promise.resolve(promise) // Promise.resolve is used instead of promise to include non promises
        .then((value) => {
          allSettled[index] = { status: "fulfilled", value };
        })
        .catch((error) => {
          allSettled[index] = { status: "rejected", reason: error };
        })
        .finally(() => {
          settledCount++;

          if (settledCount === promises.length) {
            resolve(allSettled);
          }
        })
    );
  });
}

Promise.allSettled(promises).then((value) => console.log(value));
myAllSettled(promises).then((value) => console.log(value));
