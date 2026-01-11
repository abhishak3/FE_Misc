let p1 = new Promise((_, reject) => setTimeout(() => reject("1000ms"), 1000));
let p2 = new Promise((_, reject) => setTimeout(() => reject("2000ms"), 2000));
let p3 = new Promise((_, reject) => setTimeout(() => reject("5000ms"), 5000));

const promises = [p1, p2, p3];

function myAnyPromise(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve(new AggregateError([], "All promises were rejected"));
    }

    let rejectedCount = 0;
    let errors = new Array(promises.length);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          resolve(value);
        })
        .catch((error) => {
          rejectedCount++;
          errors[index] = error;

          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

myAnyPromise(promises).then((value) => console.log(value));
