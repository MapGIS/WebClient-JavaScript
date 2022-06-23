/*
 * @Author: your name
 * @Date: 2021-08-30 16:00:26
 * @LastEditTime: 2022-06-23 11:49:41
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\element-factory.js
 */
export default class ElementFactory {
    static register(type, proto) {
        ElementFactory._elementTypes[type] = proto;
    }

    /**
     * @description: 根据类型获取原型
     * @param {*} type
     * @return {*}
     */
    static getProto(type) {
        return this._elementTypes[type];
    }

    /**
     * @description: 根据类型获取原型
     * @param {*} type
     * @return {*}
     */
    static setProto(type, proto) {
        return this.register(type, proto);
    }

    /**
     * @description: 根据类型删除原型
     * @param {*} type
     * @return {*}
     */
    static removeProto(type) {
        const proto = this.getProto(type);
        if (proto) {
            delete this._elementTypes[type];
        }
    }

    static createInstance(node, elemtype) {
        let type = elemtype;
        if (!type) type = node.nodeName.replace(/^[^:]+:/, '');

        let proto = null;

        Object.keys(ElementFactory._elementTypes).forEach((stype) => {
            if (new RegExp(`^${stype}$`, 'i').test(type)) {
                proto = ElementFactory._elementTypes[stype];
            }
        });

        if (proto == null || proto === 'undefined') return null;
        const tempProto = new proto(node);

        return tempProto;
    }
}

ElementFactory._elementTypes = {};
