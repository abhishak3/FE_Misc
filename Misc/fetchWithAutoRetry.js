/**
 * Will try to refetch data even after failure
 * @param {Function} fetchData - callback function which performs data fetching
 * @param {Number} retryLimit - number of time automatic retries
 * @returns
 */
function fetchWithAutoRetry(fetchData, retryLimit) {
  return new Promise(function tryFetching(resolve, reject) {
    fetchData()
      .then((result) => resolve(result))
      .catch(() => {
        if (retryLimit === 0) {
          reject("Retry Limit Exceeded");
        } else {
          retryLimit--;
          tryFetching(resolve, reject);
        }
      });
  });
}

// Testing out
const fetchData = function () {
  let count = 0;

  return function () {
    if (count++ === 4) return Promise.resolve("Got Data");

    return Promise.reject("Didn't Got data");
  };
};

fetchWithAutoRetry(fetchData(), 3)
  .then((result) => console.log(result))
  .catch((err) => console.log(err)); // error

fetchWithAutoRetry(fetchData(), 5)
  .then((result) => console.log(result))
  .catch((err) => console.log(err)); // success
