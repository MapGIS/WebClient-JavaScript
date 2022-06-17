/*
 * @Author: your name
 * @Date: 2021-08-30 22:20:42
 * @LastEditTime: 2022-06-14 10:04:29
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\SvgElement.js
 */
import RenderedElement from './RenderedElement';

export default class SvgElement extends RenderedElement {
    constructor(node) {
        if (node) {
            super(node);
        } else {
            super(SvgElement.createDefaultNode());
        }

        this.type = 'svg';

        const widthProps = this.getAttribute('width');
        if (widthProps.hasValue()) {
            this.width = widthProps.getNumber();
        }

        const heightProps = this.getAttribute('height');
        if (heightProps.hasValue()) {
            this.height = heightProps.getNumber();
        }
    }

    _clone(cloneObject) {
        super._clone(cloneObject);
        cloneObject.width = this.width;
        cloneObject.height = this.height;
    }
}
SvgElement.createDefaultNode = function () {
    // 添加子节点
    const svg = document.createElement('svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');
    return svg;
};
