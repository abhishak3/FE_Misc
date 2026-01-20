function curry(fn) {
  return function curried(...args) {
    if (fn.length <= args.length) {
      return fn(...args);
    }

    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}

/**
 * My implementation - Works correctly
 */
function curryWithPlaceholder(fn, placeholder = "_") {
  return function curried(...args) {
    if (fn.length <= args.length) {
      let containsPlaceholder = false;

      for (let i = 0; i < fn.length; i++) {
        if (args[i] === placeholder) {
          containsPlaceholder = true;
          break;
        }
      }

      if (!containsPlaceholder) {
        return fn(...args);
      }
    }

    return function (...nextArgs) {
      const newArgs = [];
      let nextArgsIndex = 0;
      let currArgsIndex = args.length;

      for (let i = 0; i < args.length; i++) {
        const item = args[i];

        if (nextArgsIndex === nextArgs.length) {
          currArgsIndex = i;
          break;
        }

        if (item !== placeholder) {
          newArgs.push(item);
        } else {
          newArgs.push(nextArgs[nextArgsIndex]);
          nextArgsIndex++;
        }
      }

      newArgs.push(
        ...args.slice(currArgsIndex),
        ...nextArgs.slice(nextArgsIndex),
      );

      return curried(...newArgs);
    };
  };
}

function curryWithPlaceholder(fn, placeholder = "_") {
  return function curried(...args) {
    const hasEnoughArgs = fn.length <= args.length;
    const hasPlaceholder = args.slice(0, fn.length).includes(placeholder);

    if (hasEnoughArgs && !hasPlaceholder) {
      return fn(...args);
    }

    return function (...nextArgs) {
      const processedArgs = args.map((arg) => {
        if (arg === placeholder && nextArgs.length > 0) {
          return nextArgs.shift();
        }

        return arg;
      });

      const mergedArgs = [...processedArgs, ...nextArgs];
      return curried(...mergedArgs);
    };
  };
}

const _ = "_";

function sum(a, b, c) {
  return `${a}_${b}_${c}`;
}

const curriedSum = curryWithPlaceholder(sum);
console.log(curriedSum(_, "b")("a")("c"));
