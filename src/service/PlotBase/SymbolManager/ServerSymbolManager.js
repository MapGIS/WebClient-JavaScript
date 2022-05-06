import { defined } from "../../PlotUtilBase/Check";
import { LogTool } from "../../PlotUtilBase/Log/LogTool";
import { SymbolCatalog } from "./SymbolCatalog";

/**
 * 服务端符号管理器
 */
export class ServerSymbolManager {
  getSymbols() {
    if (this._symbols) return this._symbols;

    const json = "";
    this._symbols = new SymbolCatalog(json);
    return null;
  }

  /**
   * 根据符号id获取符号
   * @param {符号id} symbolId
   * @returns
   */
  getSymbolByID(symbolId) {
    if (!this._symbolNodes) return null;

    const leaves = this._symbolNodes;
    for (let i = 0; i < leaves.length; i += 1) {
      if (symbolId === leaves[i].id) {
        return leaves[i];
      }
    }

    return null;
    
  }

  /**
   * @deprecated
   * 
   * 根据符号id获取符号
   *
   * @param {符号id} id
   * @returns {SymbolNode}
   */
  getLeafByID(id) {
    return this.getSymbolByID(id);
  }

  /**
   * 根据符号id获取符号图片
   * @param {String} symbolId 符号id
   * @returns {Image} 符号图片
   */
  getImageByID(symbolId) {
    const symbol = this.getSymbolByID(symbolId);
    if (!defined(symbol)) {
      LogTool.error(symbolId, "对应的符号不存在");
      return undefined;
    }

    return symbol.getImage();
  }
}
