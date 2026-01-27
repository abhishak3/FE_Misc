function throttlePromises(funcArrays, limit) {
  let result = [];
  let start = 0;

  return new Promise(function (resolve, reject) {
    (function helperPromise() {
      if (start >= funcArrays.length) {
        resolve(result);
        return;
      }

      const promiseArray = funcArrays
        .slice(start, start + limit)
        .map((fn) => fn());

      Promise.all(promiseArray).then((data) => {
        result.push(...data);
        start += limit;
        helperPromise();
      });
    })();
  });
}
