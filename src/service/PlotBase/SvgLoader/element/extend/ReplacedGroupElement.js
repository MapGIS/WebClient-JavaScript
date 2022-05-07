/*
 * @Author: your name
 * @Date: 2021-11-04 17:02:07
 * @LastEditTime: 2022-02-18 12:42:40
 * @LastEditors: Do not edit
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\extend\ReplacedGroupElement.js
 */
import { defined } from "../../../../PlotUtilBase/Check";
import GElement from "../GElement";
import SymbolManager from "../../../SymbolManager/SymbolManager";
import ElementFactory from "..";

export default class ReplacedGroupElement extends GElement {
  constructor(node) {
    super(node);

    const property = this.getAttribute("ReplacedParts");
    if (!defined(property) || !property.hasValue())
      throw new Error("ReplacedParts Attribute 不存在");

    const strVal = property.getValue();

    this._replacedParts = strVal.split(";");

    this.setReplacePartId(this._replacedParts[0]);
  }

  get replacedParts() {
    return this._replacedParts;
  }

  setReplacePartId(id, symbolManager) {
    if (!defined(symbolManager)) symbolManager = new SymbolManager();

    const symbol = symbolManager.getLeafByID(parseInt(id,10));

    this._children = ElementFactory.createInstance(symbol.getSvg(), symbol.type)._children;

    for(let i=0;i<this._children.length;i+=1)
    {
        this._children[i]._parent=this;
    }
  }
  _clone(cloneObject){
    super._clone(cloneObject)
    cloneObject._replacedParts=this._replacedParts.map((s)=> s)
  }
}
