/*
 * @Description:
 * @Version: 2.0
 * @Date: 2021-07-22 11:46:16
 * @LastEditTime: 2022-01-14 09:49:26
 * @Author: xinxiao
 * @LastEditors: Do not edit
 */
import {defined} from "../../PlotUtilBase/Check";
import {LogTool} from "../../PlotUtilBase/Log/LogTool";
import {SymbolCatalog} from "./SymbolCatalog";
import {getAction} from "../Util/request";
import axios from "axios";

export class SymbolManager {
  constructor(symbolsUrl) {
    if (!SymbolManager.instance) {
      this._symbolsUrl = symbolsUrl;
      SymbolManager.instance = this;
    }

    this._symbols = null;
    this._symbolsUrl = "";

    return SymbolManager.instance;
  }

  async getSymbols() {
    if (this._symbols) return this._symbols;

    try {
      const res = await axios.get(this._symbolsUrl);
      this._symbols = new SymbolCatalog();
      this._symbols.fromJson(res.data);
      this._leaves = this._symbols.getAllLeaves();
      return this._symbols;
    } catch (err) {
      const res = await getAction("/symbol/catalog/queryTreeListByPid");
      this._symbols = new SymbolCatalog();
      this._symbols.fromJson(res.data[0]);
      this._leaves = this._symbols.getAllLeaves();
      return this._symbols;
    }
  }

  getLeafByID(id) {
    if (!this._leaves) return null;
    const leaves = this._leaves;
    for (let i = 0; i < leaves.length; i += 1) {
      if (id === leaves[i].id) {
        return leaves[i];
      }
    }

    return null;
  }

  getImageByID(id) {
    const symbol = this.getLeafByID(id);
    if (!defined(symbol)) {
      LogTool.error(id, "对应的符号不存在");
      return undefined;
    }

    return symbol.getImage();
  }
}
