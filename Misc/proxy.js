const obj = {
  username: "abhishek",
  password: "******",
};

// we can intercept certain actions using proxies
const proxy = new Proxy(obj, {
  get(target, property) {
    if (property === "password") {
      return "Confidential data";
    }

    return target[property];
  },
});

console.log(proxy.username); // abhishek
console.log(proxy.password); // Confidential data

/**
 * Function wrap which will enable negative indexing in arrays
 */
function wrap(arr) {
  return new Proxy(arr, {
    get(target, property) {
      let index = Number(property);

      if (index < 0) {
        index += target.length;
      }

      return target[index];
    },
    set(target, property, value) {
      let index = Number(property);

      if (index < 0) {
        index += target.length;

        if (index < 0) {
          throw new Error("Index out of bounds");
        }
      }

      target[index] = value;
      return true;
    },
  });
}

const arr = wrap([1, 2, 3, 4, 5]);
console.log(arr[-1]);
console.log(arr[-2]);
console.log(arr[0]);
console.log(arr[1]);

arr[-1] = 4;
console.log(arr);
