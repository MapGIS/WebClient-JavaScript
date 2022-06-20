/*
 * @Description:
 * @Version: 2.0
 * @Date: 2021-07-22 11:46:16
 * @LastEditTime: 2022-01-14 09:49:26
 * @Author: xinxiao
 * @LastEditors: Do not edit
 */
import {defined} from "../../PlotUtilBase/Check";
import LogTool from "../../PlotUtilBase/Log/LogTool";
import SymbolCatalog from "./SymbolCatalog";
import {getAction} from "../Util/request";
import axios from "axios";

export default class SymbolManager {
  constructor(symbolsUrl, options) {
    options = options || {};

    this._symbols = null;
    this._symbolsUrl = "";

    const {fontURL = '', baseUrl = ''} = options;

    if (!window._mapgisSymanagerConfig_) {
      window._mapgisSymanagerConfig_ = {};
    }

    if (fontURL) {
      window._mapgisSymanagerConfig_._fontURL = fontURL;
    }

    if (baseUrl) {
      window._mapgisSymanagerConfig_._baseUrl = baseUrl;
    }

    if (!SymbolManager.instance) {
      this._symbolsUrl = symbolsUrl;
      SymbolManager.instance = this;
    }

    return SymbolManager.instance;
  }

  formatData(data) {
    const {symbols} = data;
    let result = [];
    for (let i = 0; i < symbols.length; i++) {
      result.push({
        title: symbols[i].name,
        children: []
      });
      const {items} = symbols[i];
      for (let j = 0; j < items.length; j++) {
        if (items[j].type === 'folder') {
          result[i].children.push({
            type: items[j].name,
            children: []
          });
          let icons = items[j].items;
          for (let k = 0; k < icons.length; k++) {
            result[i].children[j].children.push({
              "id": icons[k].id,
              "name": icons[k].name,
              "type": icons[k].type,
              "src": icons[k].path
            });
          }
        }
      }
    }

    return {
      name: data.name,
      children: result
    };
  }

  async getSymbols() {
    if (this._symbols) return this._symbols;

    try {
      const res = await axios.get(this._symbolsUrl);
      this._symbols = new SymbolCatalog();
      this._symbols.fromJson(this.formatData(res.data));
      this._leaves = this._symbols.getAllLeaves();
      this._symbols._config = res.data;
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
