let p1 = new Promise((_, reject) => setTimeout(() => reject("1000ms"), 1000));
let p2 = new Promise((resolve) => setTimeout(() => resolve("2000ms"), 2000));
let p3 = new Promise((_, reject) => setTimeout(() => reject("5000ms"), 5000));

const promises = [p1, p2, p3];

function myRace(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return;
    }
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((error) => reject(error));
    });
  });
}

myRace(promises)
  .then((value) => console.log(value))
  .catch((err) => console.log(err));
