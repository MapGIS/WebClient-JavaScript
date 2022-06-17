import { defined } from "../../PlotUtilBase/Check";
import SymbolBase from "./SymbolBase";
import SymbolNode from "./SymbolNode";

/**
 * 符号目录类
 */
export default class SymbolCatalog extends SymbolBase {
  constructor() {
    super();
    this._children = [];
  }

  get children() {
    return this._children;
  }

  /**
   * @override
   *
   * @param {String} json
   */
  fromJson(json) {
    super.fromJson(json);
    const children = json.children;

    if (!defined(children)) return false;

    const length = children.length;

    for (let i = 0; i < length; i += 1) {
      const child = children[i];

      let symbolBase;
      if (defined(child.children)) {
        symbolBase = new SymbolCatalog();
      } else {
        symbolBase = new SymbolNode();
      }

      if (!symbolBase.fromJson(child)) continue;

      this._children.push(symbolBase);
    }

    return true;
  }

  /**
   * 获取符号目录下所有符号
   *
   * @param {Array|undefined} symbols
   * @returns {Array}
   */
  getAllSymbolNodes(symbols) {
    if (!defined(symbols)) symbols = [];

    const children = this.children;
    const length = children.length;

    for (let i = 0; i < length; i += 1) {
      const child = children[i];

      if (child instanceof SymbolCatalog) {
        child.getAllSymbolNodes(symbols);
      } else if (child instanceof SymbolNode) {
        symbols.push(child);
      }
    }

    return symbols;
  }

  /**
   * @deprecated
   *
   * 获取符号目录下所有符号
   *
   * @returns {Array}
   */
  getAllLeaves() {
    return this.getAllSymbolNodes();
  }
}
