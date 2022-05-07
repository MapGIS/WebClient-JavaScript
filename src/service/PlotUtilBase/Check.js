/**
 * 判断value是否未定义或者为null
 * @function
 *
 * @param {*} value
 *
 * @returns {Boolean} 如果value未定义或者为null返回false,否则返回true
 */
function defined(value) {
  return value !== undefined && value !== null;
}

/**
 * 为参数设置默认值
 * @function
 * @param {*} a
 * @param {*} b
 * @returns {*} 如果第一个参数未定义或为null返回b,否则返回a
 *
 * @example
 * param=defaultValue(param,"default")
 */
function defaultValue(a, b) {
  if (a !== undefined && a !== null) {
    return a;
  }
  return b;
}

/**
 * 判断func是否是函数
 * @function
 * @param {*} func
 * @returns {Boolean} 如果func是函数类型返回true,否则返回false
 */
export function isFunc(func) {
  return typeof func === "function";
}

/**
 * 判断arr是否是数组类型
 * @function
 * @param {*} arr
 * @returns {Boolean} 如果arr是数组类型返回true,否则返回false
 */
export function isArray(arr) {
  if (isFunc(Array.isArray))
    return Array.isArray(arr);
  else {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
}

class DeveloperError extends Error {
  constructor(message) {
    let stack = null;
    try {
      throw new Error();
    } catch (e) {
      stack = e.stack;
    }

    super("DeveloperError", message, stack);
  }

  toString() {
    const str = this.name + ": " + this.message;

    if (defined(this.stack)) {
      str += "\n" + this.stack.toString();
    }

    return str;
  }
}

function getUndefinedErrorMessage(name) {
  return name + " is required, actual value was undefined";
}

function getFailedTypeErrorMessage(actual, expected, name) {
  return (
    "Expected " +
    name +
    " to be typeof " +
    expected +
    ", actual typeof was " +
    actual
  );
}

class Check {
  static defined(name) {
    if (!defined(name)) {
      throw new DeveloperError(getUndefinedErrorMessage(name));
    }
  }

  static typeOfNumber(name, test) {
    if (typeof test !== "number") {
      throw new DeveloperError(
        getFailedTypeErrorMessage(typeof test, "number", name)
      );
    }
  }

  static typeOfFunc(name, test) {
    if (typeof test !== "function") {
      throw new DeveloperError(
        getFailedTypeErrorMessage(typeof test, "function", name)
      );
    }
  }

  static typeOfString(name, test) {
    if (typeof test !== "string") {
      throw new DeveloperError(
        getFailedTypeErrorMessage(typeof test, "string", name)
      );
    }
  }

  static typeOfBool(name, test) {
    if (typeof test !== "boolean") {
      throw new DeveloperError(
        getFailedTypeErrorMessage(typeof test, "boolean", name)
      );
    }
  }

  static typeOfArray(name, test) {
    if (!isArray(test)) {
      throw new DeveloperError(
        getFailedTypeErrorMessage(typeof test, "array", name)
      );
    }
  }

  static typeofNumberAndLessThan(name, test, limit) {
    Check.typeOfNumber(name, test);
    if (test >= limit) {
      throw new DeveloperError(
        "Expected " +
        name +
        " to be less than " +
        limit +
        ", actual value was " +
        test
      );
    }
  }

}

export {defined, defaultValue, DeveloperError, Check}
