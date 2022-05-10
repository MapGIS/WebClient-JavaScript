const Hex = "0123456789abcdef";

/**
 * 16进制字符串转化为byte数组
 * @function
 * @param {string} text
 * @returns {Array}
 */
export function convertHexToBytes(text) {
  const result = [];
  for (let i = 0; i < text.length; i += 2) {
    result.push(parseInt(text.substr(i, 2), 16));
  }
  return result;
}

/**
 * byte数组转换为16进制字符串
 * @function
 * @param {Array} bytes
 * @returns {string}
 */
export function convertBytesToHex(bytes) {
  const result = [];
  for (let i = 0; i < bytes.length; i += 1) {
    const byte = bytes[i];
    result.push(Hex[(byte & 0xf0) >> 4] + Hex[byte & 0x0f]);
  }

  return result.join("");
}
/**
 * 字符串工具类
 */
export class StringUtil {
  /**
   * 字符串转数字
   * @function
   *
   * @static
   *
   * @param {String} s 字符串
   * @param {Number} [prec] 精度
   * @returns {Number}
   */
  static ToFloat(s, prec) {
    const num = parseFloat(s);
    if (prec) return parseFloat(num.toFixed(prec));

    return num;
  }

  /**
   * 比较字符串是否相等(忽略大小写)
   * @function
   *
   * @static
   *
   * @param {String} left
   * @param {String} right
   * @returns 字符串相等返回true,否则返回false
   */
  static EqualsIgnoreCase(left, right) {
    return left.toLowerCase() === right.toLowerCase();
  }

  /**
   * 字符串转小写
   * @param {String} name
   * @returns {String}
   */
  static ToLowerCase(name) {
    if (StringUtil.allUppercase.test(name)) {
      return name.toLowerCase();
    }

    return name;
  }

  static compressSpaces(str) {
    return str.replace(/(?!\u3000)\s+/gm, " ");
  }

  static trimLeft(str) {
    return str.replace(/^[\n \t]+/, "");
  }

  static trimRight(str) {
    return str.replace(/[\n \t]+$/, "");
  }

  static toNumbers(str) {
    const matches =
      (str || "").match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) ||
      [];

    return matches.map(parseFloat);
  }
}
