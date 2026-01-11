Promise.prototype.myFinally = function (exectuor) {
  return new Promise((resolve) => {
    this.then((value) => {
      Promise.resolve(exectuor()).then(() => resolve(value));
    }).catch((error) => {
      Promise.resolve(exectuor()).then(() => {
        throw error;
      });
    });
  });
};
