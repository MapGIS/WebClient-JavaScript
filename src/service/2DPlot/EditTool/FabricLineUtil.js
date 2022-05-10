/*
 * @Description: 修改线节点
 * @Author: zk
 * @Date: 2022-04-06 10:22:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-07 09:46:39
 */
const _ = require("lodash");

export default class FabricLineUtil {
  constructor(fabricCanvas) {
    // 处理action poly
    fabricCanvas.on("selection:created", (event) => {
      if (event.selected) {
        event.selected.forEach((s) => {
          this.applyFabricObjectControls(s);
        });
      }
    });
    fabricCanvas.on("selection:updated", (event) => {
      if (event.selected) {
        event.selected.forEach((s) => {
          this.applyFabricObjectControls(s);
        });
      }
    });
  }
  applyFabricObjectControls(target) {
    if (target.innerInitControls) {
      target.innerInitControls();
    } 
  }
}
