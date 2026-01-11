let p1 = new Promise((resolve) => setTimeout(() => resolve("1000ms"), 1000));
let p2 = new Promise((resolve) => setTimeout(() => resolve("2000ms"), 2000));
let p3 = new Promise((resolve) => setTimeout(() => resolve("5000ms"), 5000));

function myAllPromise(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve([]);
    }

    const allResolved = new Array(promises.length);
    let resolvedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // Promise.resolve is used instead of promise to include non promises
        .then((value) => {
          allResolved[index] = value;
          resolvedCount++;

          if (resolvedCount === promises.length) {
            resolve(allResolved);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

const promises = [p1, p2, p3];

Promise.all(promises).then((values) => console.log(values));
myAllPromise(promises).then((values) => console.log(values));
