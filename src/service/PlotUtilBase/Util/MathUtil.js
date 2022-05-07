/**
 * 字节数据转Int32数组(每四个字节转为一个Int32)
 * @function
 * @param {Array} bytes 字节数组
 * @returns {Array} Int32数组
 */
export function byteArrToInt32Arr(bytes) {
  const result = [];
  for (let i = 0; i < bytes.length; i += 4) {
    result.push(
      (bytes[i] << 24) |
        (bytes[i + 1] << 16) |
        (bytes[i + 2] << 8) |
        bytes[i + 3]
    );
  }
  return result;
}

export default class MathUtil {
  static EqualFuzzy(a, b, tolerance) {
    if (!tolerance) tolerance = MathUtil.DEFAULT_TOLERANCE;
    return Math.abs(a - b) <= tolerance;
  }

  static toFloat(number, prec) {
    if (prec == null) {
      prec = MathUtil.DEFAULT_PRECISION;
    }
    if (typeof number !== "number") {
      number = parseFloat(number);
    }
    return prec === 0 ? number : parseFloat(number.toPrecision(prec));
  }

  /**
   * 弧度转度
   * @param {*} rad 弧度
   * @returns
   */
  static toDegrees(rad) {
    return rad * MathUtil.RTOD;
  }

  /**
   * 度转弧度
   * @param {*} degree 度
   * @returns
   */
  static toRad(degree) {
    return degree * MathUtil.DTOR;
  }
}

MathUtil.DEFAULT_PRECISION = 14;

MathUtil.DEFAULT_TOLERANCE = 1e-18;

MathUtil.TWO_PI = Math.PI * 2;
MathUtil.HALF_PI = Math.PI / 2;

MathUtil.RTOD = 180.0 / Math.PI;
MathUtil.DTOR = Math.PI / 180.0;
