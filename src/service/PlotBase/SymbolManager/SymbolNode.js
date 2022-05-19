/*
 * @Description:
 * @Version: 2.0
 * @Date: 2021-07-22 11:46:54
 * @LastEditTime: 2022-01-14 12:04:54
 * @Author: xinxiao
 * @LastEditors: Do not edit
 */
// import $ from "jquery";
import {ElementFactory} from "../SvgLoader/element";
import { defined } from "../../PlotUtilBase/Check";
import LogTool from "../../PlotUtilBase/Log/LogTool";
import SymbolBase from "./SymbolBase";
import axios from "axios";

export default class SymbolNode extends SymbolBase {
  constructor() {
    super();
    this._src = "";
    this._type = "";
    this._elem = undefined;
  }
  get src() {
    return this._src;
  }

  set src(value) {
    this._src = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  /**
   * @override
   *
   * @param {String} json
   */
  fromJson(json) {
    super.fromJson(json);
    if (!defined(json.type)) {
      LogTool.error("json.type is not defined");
      return false;
    }

    if (!defined(json.src)) {
      LogTool.error("json.src is not defined");
      return false;
    }

    this.type = json.type;

    this.src = json.src;

    this._elem = null;

    return true;
  }

  /**
   * 获取符号对应的Element(走克隆)
   *
   * @returns {Element}
   */
  async getElement() {
    const elem = ElementFactory.createInstance(await this.getSvg(), this.type);
    elem.symbolManager(this);
    return elem;
  }

  /**
   * 获取符号对应图片
   *
   * @returns {Image}
   */
  getImage() {
    const img = new Image();
    img.id = this.id;
    img.src = this.src;
    return img;
  }

  /**
   * 获取符号对应svg
   */
  async getSvg() {
    const url = this.src;
    const res = await axios({
      method: 'get',
      url: url,
      dataType: "text",
      timeout: 1000,
    });

    const xml = await new DOMParser().parseFromString(
      res.data,
      "image/svg+xml"
    );
    return xml.documentElement;
  }
}
