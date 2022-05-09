import DefaultLinePathParser from "../Default/DefaultLine";
import PathParser from "../PathParser";
import MainElement from "./MainElement";
import {ShapePath} from "../../../../PlotUtilBase/Path2D/ShapePath";

export default class MainLineElement extends MainElement {
  constructor(node) {
    super(node);
    this.type = "mainline";
    this.flag = true;
  }

  /* --------------------------------处理默认线 ------------------------------- */

  // 获取默认线对象
  getDefaultLine() {
    if (!this.getAttribute("d").hasValue()) return;
    // eslint-disable-next-line consistent-return
    return new DefaultLinePathParser(this.getAttribute("d").getString());
  }

  setDefaultDash(mainLine, width, scale, defaultLine) {
    const rateArr = this.deleteArr(mainLine, width, scale, defaultLine);
    this.applyRateArr(rateArr, mainLine);
  }

  // 构建删除区段数组
  deleteArr(mainLine, width, scale, defaultLine, flag = this.flag) {
    const start = defaultLine.getStart();
    const end = defaultLine.getEnd();
    const firstWidth = start.x * scale;
    const limitWidth = (start.x + width - end.x) * scale;
    const clip = defaultLine.getClip(width);
    const {lengthArr} = mainLine;
    const lengthTotal = mainLine.lengthArr.reduce((total, i) => total + i);
    const middleRate = (lengthTotal - limitWidth) / lengthTotal;

    const firstRate = firstWidth / lengthTotal;

    let rateArr = [];
    clip.forEach((s) => {
      const originRate = flag
        ? s.rate * middleRate + firstRate
        : 1 - (s.rate * middleRate + firstRate);
      const tran = mainLine.getTransfromByRate(originRate);

      if (originRate < 0 || originRate > 1 || !tran) {
        return;
      }
      const [pnt, , lengthIndex, pathRate] = tran;
      if (s.type === "start") {
        const [bzIndex, rate] = this.getRateByPx(
          lengthArr,
          lengthIndex,
          pathRate,
          s.px * scale,
          !flag
        );
        if (flag) {
          rateArr = rateArr.concat(
            this._resetRateArr([bzIndex, 0], [lengthIndex, pathRate])
          );
        } else {
          rateArr = rateArr.concat(
            this._resetRateArr([lengthIndex, pathRate], [bzIndex, 1])
          );
        }
      }

      if (s.type === "on") {
        const [bzIndex2, rate2] = this.getRateByPx(
          lengthArr,
          lengthIndex,
          pathRate,
          (s.px / 2) * scale,
          false
        );
        const [bzIndex1, rate1] = this.getRateByPx(
          lengthArr,
          lengthIndex,
          pathRate,
          (s.px / 2) * scale,
          true
        );
        if (bzIndex1 !== bzIndex2 || Math.abs(rate2 - rate1) > 10e-8) {
          rateArr = rateArr.concat(
            this._resetRateArr([bzIndex2, rate2], [bzIndex1, rate1])
          );
        }
      }

      if (s.type === "end") {
        const [bzIndex, rate] = this.getRateByPx(
          lengthArr,
          lengthIndex,
          pathRate,
          s.px * scale,
          flag
        );
        if (flag) {
          rateArr = rateArr.concat(
            this._resetRateArr([lengthIndex, pathRate], [bzIndex, 1])
          );
        } else {
          rateArr = rateArr.concat(
            this._resetRateArr([bzIndex, 0], [lengthIndex, pathRate])
          );
        }
      }
    });
    return rateArr;
  }

  applyRateArr(arr, mainLine) {
    const {beziPoint} = mainLine;
    const {lengthArr} = mainLine;
    const lengthMax = lengthArr.length;
    const eObj = {};
    // 排序
    arr.sort((a, b) => {
      const v2 = b[1][0];
      const t2 = a[1][0];
      if (v2 > t2) {
        return -1;
      }
      if (v2 < t2) {
        return 1;
      }
      const s1 = b[1][1];
      const s2 = a[1][1];
      if (s1 > s2) {
        return -1;
      }
      return 1;
    });
    // 循环获取裁剪对象
    for (let i = 0; i < lengthMax; i++) {
      const v = arr
        .map((s) => {
          if (s[0][0] === i) return [s[0][1], s[1][1]];
          return false;
        })
        .filter((t) => t);
      const exArr = v.flatMap((t) => t);
      if (exArr.length !== 0) {
        exArr.push(1);
        exArr.unshift(0);
        const rateArr = [];
        for (let j = 0; j < exArr.length; j += 2) {
          if (exArr[j] !== exArr[j + 1]) {
            rateArr.push([exArr[j], exArr[j + 1]]);
          }
        }
        eObj[i] = rateArr;
      }
    }
    //  去除非裁剪部分
    const keys = Object.keys(eObj);

    keys.forEach((s) => {
      if (!eObj[s]) {
        delete eObj[s];
      }
    });

    let path = "";
    for (let i = 0; i < beziPoint.length; i++) {
      const t = beziPoint[i];

      if (eObj[i]) {
        if (eObj[i].length === 0) {
          continue;
        }
        path += this._getRatePathStr(i, eObj[i], mainLine);
      } else {
        if (i === 0) {
          path += "M" + [t[0], t[1]];
        }

        path += "C" + [t[2], t[3], t[4], t[5], t[6], t[7]];
      }
    }
    this._pathParser = new PathParser(path);
  }

  _getRatePathStr(i, arr, mainLine) {
    const {beziPoint} = mainLine;
    const s = beziPoint[i];
    let path = "";
    arr.forEach((t) => {
      path += mainLine.getBPathStr(
        s[0],
        s[1],
        s[2],
        s[3],
        s[4],
        s[5],
        s[6],
        s[7],
        t[0],
        t[1]
      );
    });
    return path;
  }

  _resetRateArr(arr1, arr2) {
    const eArr = [];
    if (arr1[0] === arr2[0]) {
      return [[arr1, arr2]];
    }
    const dx = arr2[0] - arr1[0];
    for (let i = 0; i <= dx; i++) {
      if (i === 0) {
        eArr.push([arr1, [arr1[0], 1]]);
      } else if (i === dx) {
        eArr.push([[arr2[0], 0], arr2]);
      } else {
        eArr.push([
          [arr1[0] + i, 0],
          [arr1[0] + i, 1],
        ]);
      }
    }
    return eArr;
  }

  getRateByPx(lengthArr, bzIndex, rate, px, sort = true) {
    const flag = sort ? 1 : -1;
    const lengthVal = lengthArr[bzIndex];
    const rateVal = rate * lengthVal + flag * px;

    let eIndex = bzIndex;
    let eRate = rate;
    let num = 0;
    for (let i = bzIndex; i < lengthArr.length; i += flag) {
      if (i < 0) {
        break;
      }
      if (flag > 0) {
        num += lengthArr[i];
        if (num - rateVal >= 0) {
          eIndex = i;
          eRate = 1 - (num - rateVal) / lengthArr[i];
          break;
        }
      } else {
        if (num + rateVal >= 0) {
          eIndex = i;
          eRate = (rateVal + num) / lengthArr[i];
          break;
        }
        num += lengthArr[i - 1];
      }
    }
    return [eIndex, eRate];
  }

  isAllowDraw(mainLine, defaultLine, width, scale) {
    const start = defaultLine.getStart();
    const end = defaultLine.getEnd();

    if (!mainLine || mainLine.lengthArr.length === 0) return false;

    const lengTotal = mainLine.lengthArr.reduce(
      (total, current) => total + current
    );
    if ((width - end.x + start.x) * scale < lengTotal) {
      return true;
    }
    return false;
  }

  applyMainGeo(mainGeo, width) {
    super.applyMainGeo(mainGeo);
    this._setDashLine(this.mainGeometry, width);
  }

  applyMapScale(x, y, width) {
    super.applyMapScale(x, y);
    this._setDashLine(this.mainGeometry, width);
  }

  _setDashLine(mainGeometry, width) {
    if (mainGeometry) {
      const defaultLine = this.getDefaultLine();
      if (this.isAllowDraw(mainGeometry, defaultLine, width, this.m_scaleX)) {
        this.setDefaultDash(mainGeometry, width, this.m_scaleX, defaultLine);
      }
    }
  }

  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject.flag = this.flag;
    cloneObject._pathParser = this._pathParser
      ? this._pathParser.clone()
      : null;
  }

  getCoords() {
    let pointNumber = 40
    // 处理主轴点数过少导致墙与线不贴合
    if (this.mainGeometry) {
      const len = this.mainGeometry.getTotalLength()
      if (len > 10000000) {
        pointNumber = Math.round(len / 10000000) * 40
      }
    }

    const pathParser = this._pathParser;
    pathParser.reset();

    const path2d = new ShapePath();

    while (!pathParser.isEnd()) {
      switch (pathParser.next().type) {
        case PathParser.MOVE_TO:
          this.pathM(path2d);
          break;

        case PathParser.LINE_TO:
          this.pathL(path2d);
          break;

        case PathParser.HORIZ_LINE_TO:
          this.pathH(path2d);
          break;

        case PathParser.VERT_LINE_TO:
          this.pathV(path2d);
          break;

        case PathParser.CURVE_TO:
          this.pathC(path2d);
          break;

        case PathParser.SMOOTH_CURVE_TO:
          this.pathS(path2d);
          break;

        case PathParser.QUAD_TO:
          this.pathQ(path2d);
          break;

        case PathParser.SMOOTH_QUAD_TO:
          this.pathT(path2d);
          break;

        case PathParser.ARC:
          this.pathA(path2d);
          break;

        case PathParser.CLOSE_PATH:
          this.pathZ(path2d);
          break;

        default:
      }
    }

    const pathArr = [];

    if (this.isAllowCoords) {
      for (let i = 0; i < path2d.subPaths.length; i += 1) {
        const subPath = path2d.subPaths[i];
        pathArr.push(subPath.getPoints(pointNumber));
      }
    }

    return pathArr;
  }
}
