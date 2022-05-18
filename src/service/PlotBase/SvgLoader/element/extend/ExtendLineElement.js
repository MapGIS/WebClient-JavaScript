/*
 * @Author: your name
 * @Date: 2021-11-03 09:47:16
 * @LastEditTime: 2022-05-18 16:58:36
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\extend\ExtendLineElement.js
 */
import MainLineElement from "./MainLineElement";

export default class ExtendLineElement extends MainLineElement {
  constructor(node) {
    super(node);
    this.type = "extendline";
  }

  deleteArr(mainLine, width, scale, defaultLine) {
    const clip = defaultLine.getClip(width);
    let rateArr = [];
    clip.forEach((s) => {
      const {abRate} = s;
      const t1 = mainLine.getTransfromByRate(abRate[0]);
      const t2 = mainLine.getTransfromByRate(abRate[1]);
      if (
        t1 &&
        t2 &&
        !Number.isNaN(t1[2]) &&
        !Number.isNaN(t1[3]) &&
        !Number.isNaN(t2[2]) &&
        !Number.isNaN(t2[3])
      ) {
        rateArr = rateArr.concat(
          this._resetRateArr([t1[2], t1[3]], [t2[2], t2[3]])
        );
      }
    });
    return rateArr;
  }
}
