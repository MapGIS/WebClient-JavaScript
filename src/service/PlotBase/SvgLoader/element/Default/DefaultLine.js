/*
 * @Author: your name
 * @Date: 2021-05-27 12:45:39
 * @LastEditTime: 2021-11-15 18:10:43
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript-Babel-Starter\src\Object\Default\DefaultLine.ts
 */
import { Point } from "../../../../PlotUtilBase/Geometry/Point";

import { PathParser } from "../PathParser";

export class DefaultLinePathParser extends PathParser {
  constructor(path) {
    super(path);
    this.pathStr=path
    this.pathArr = this._getPath();
  }
  _getPath() {
    const commands = [];
    const absoluteCom = this.absolutePoint(this.commands);

    let arr = [];
    for (let i = 0; i < absoluteCom.length; i++) {
      const com = absoluteCom[i];
      if (com.type === 2) {
        arr.push(i);
      }
    }

    arr = arr.concat([absoluteCom.length]);
    let currentIndex = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] - currentIndex <= 0) continue;
      commands.push(this.getPartPath(absoluteCom.slice(currentIndex, arr[i])));
      currentIndex = arr[i];
    }
    if (commands.length > 1) {
      commands.sort((a, b) => a[0].x - b[0].x);
    }
    return commands;
  }

  getPartPath(commands) {
    const pathArr = [];
    for (let i = 0; i < commands.length; i++) {
      pathArr.push(new Point(commands[i].x, commands[i].y));
    }

    pathArr.sort((a, b) => a.x - b.x);
    return pathArr;
  }
  absolutePoint(commands) {
    const com = commands.slice(0);
    let originx = 0,
      originy = 0;
    for (let i = 0; i < commands.length; i++) {
      if (typeof commands[i].x === "undefined") continue;

      if (commands[i].relative) {
        originx = i > 0 ? commands[i - 1].x : 0;
        originy = i > 0 ? commands[i - 1].y : 0;
      } else {
        originx = 0;
        originy = 0;
      }
      com[i].x = commands[i].x + originx;
      com[i].y = commands[i].y + originy;
    }
    return com;
  }

  getStart() {
    return new Point(this.pathArr[0][0].x, this.pathArr[0][0].y);
  }

  getEnd() {
    const { pathArr } = this;
    const index1 = pathArr.length - 1;
    const index2 = pathArr[index1].length - 1;
    return new Point(pathArr[index1][index2].x, pathArr[index1][index2].y);
  }
  getPath() {
    return this.pathArr;
  }

  getClip(width = 200) {
    const start = this.getStart();
    const end = this.getEnd();
    const limitWidth = end.x - start.x;

    const rateArr = [];

    const path = this.pathArr.slice(0);

    if (start.x !== 0) {
      rateArr.push({
        type: "start",
        px: start.x - 0,
        rate: 0,
        abRate: [0, start.x / width],
      });
    }

    if (path.length > 1) {
      for (let i = 0; i < path.length; i++) {
        if (i + 1 === path.length) break;
        rateArr.push({
          type: "on",
          px: path[i + 1][0].x - path[i][1].x,
          rate:
            ((path[i + 1][0].x - start.x) / limitWidth +
              (path[i][1].x - start.x) / limitWidth) /
            2,
          abRate: [
            (path[i][1].x - start.x) / width,
            (path[i + 1][0].x - start.x) / width,
          ],
        });
      }
    }

    if (end.x !== width) {
      rateArr.push({
        type: "end",
        px: width - end.x,
        rate: 1,
        abRate: [end.x / width, 1],
      });
    }
    return rateArr;
  }
  clone(){
    return new DefaultLinePathParser(this.pathStr)
  }
}
