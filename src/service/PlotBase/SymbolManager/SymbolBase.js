import { defined } from "../../PlotUtilBase/Check";
import LogTool from "../../PlotUtilBase/Log/LogTool";

/**
 * 符号基类
 */
export default class SymbolBase {
  constructor() {
    this._id="";
    this._name="";
  }

  /**
   * 设置id
   */
  set id(value) {
    this._id = value;
  }

  /**
   * 获取id
   */
  get id() {
    return this._id;
  }

  /**
   * 设置名称
   */
  set name(value) {
    this._name = value;
  }

  /**
   * 获取名称
   */
  get name() {
    return this._name;
  }

  /**
   * json转对象
   * 
   * @param {String} json
   */
  fromJson(json) {
    if (!defined(json)) {
      LogTool.error("param json is not defined");
      return false;
    }

    this.id = json.id;

    this.name = json.name;

    return true;
  }
}
