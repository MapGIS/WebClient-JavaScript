/**
 * @author 基础平台/潘卓然
 * @param {*} points 已有数据坐标集合
 * @example 
 * var trues = [
        [2011, 12131],  // 当前年份的产值
        [2012, 13345],
        [2013, 14532],
        [2014, 15472],
        [2015, 16945],
    ];

    f = interpolatingPolynomial(trues);

    // 预测未来的
    let futures2016 = f(2016);  // 预测未来的产值
    let futures2017 = f(2017);
    let futures2018 = f(2018);
    let futures2019 = f(2019);

    console.log(2016, futures2016);
    console.log(2017, futures2017);
    console.log(2018, futures2018);
    console.log(2019, futures2019);

 * @returns 预测的下一个未来时间点/坐标系X下的的Y值的函数
 * @see 请注意，返回的是个函数需要再主动传递一次X来进行求值
 */
export function interpolateLagrange(points) {
    var n = points.length - 1, p;

    p = function (i, j, x) {
        if (i === j) {
            return points[i][1];
        }

        return ((points[j][0] - x) * p(i, j - 1, x) +
                (x - points[i][0]) * p(i + 1, j, x)) /
            (points[j][0] - points[i][0]);
    };

    return function (x) {
        if (points.length === 0) {
            return 0;
        }
        return p(0, n, x);
    };
};