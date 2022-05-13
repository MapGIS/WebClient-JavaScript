/*
 * @Author: your name
 * @Date: 2021-09-17 11:24:29
 * @LastEditTime: 2021-12-07 10:30:11
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\Draw\DrawObject.js
 */
import Observable from "../../PlotUtilBase/Observable";

export default class DrawObject extends Observable {
  constructor() {
    super();
    this._enabled = false;
  }

  enable() {
    if (this._enabled) return;

    console.log("+++++++++++++++++++++++++")
    this.addHooks();
    this._enabled = true;
  }

  disable() {
    if (!this._enabled) return;

    this.removeHooks();
    this._enabled = false;
  }
  
  fireFinishEvent(eventParams){
    this.fire("draw:finished", eventParams);
  }

  fireCreatedEvent() {
    this.fire("draw:start");
  }

  enabled() {
    return this._enabled;
  }

  addHooks() {}

  removeHooks() {}
}
