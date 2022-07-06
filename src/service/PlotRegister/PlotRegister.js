/*
 * @class: PlotRegister
 * @Description: 自定义标绘注册类
 * @Author: zk
 * @Date: 2022-06-22 16:53:01
 * @LastEditors: zk
 * @LastEditTime: 2022-07-06 12:08:10
 */
import { ElementFactory } from '../PlotBase/SvgLoader/element';
import { PlotObjectFactory } from '../2DPlot/Shapes/PlotObjectFactory';
import { PrimitiveFactory } from '../3DPlot/Primitive/PrimitiveFactory';
import { DrawPlotObjectFactory2D } from '../2DPlot/Draw/DrawPlotObjectFactory2D';
import { DrawPlotObjectFactory3D } from '../3DPlot/Draw/DrawPlotObjectFactory3D';
import LogTool from '../PlotUtilBase/Log/LogTool';
import { Zondy } from '../common/Base';
class PlotRegister {
    constructor() {
        this._cacheRegisterTypes = [];
    }
    /**
     * @function: Module:PlotRegister.prototype.register
     * @description: 注册方法
     * @param {*} type 新类名
     * @param {*} func 处理新类名原型
     * @return {*}
     */
    register(type, func) {
        this.rewrite('irregular', type, func);
    }
    /**
     * @function: Module:PlotRegister.prototype.rewrite
     * @description: 重新方法
     * @param {*} baseType 继承类类名
     * @param {*} type 新类名
     * @param {*} func 处理新类名原型
     * @return {*}
     */
    rewrite(baseType, type, func) {
        const baseProto = ElementFactory.getProto(baseType);
        const factories = [PlotObjectFactory, PrimitiveFactory, DrawPlotObjectFactory2D, DrawPlotObjectFactory3D];
        const protos = factories.map((f) => f.getProto(baseType));

        const isFactoryAllow = protos.every((t) => !!t);

        if (!baseProto || !isFactoryAllow) {
            LogTool.warn(`类型${baseType}对应的原型不存在！`);
        }

        const newProto = class t extends baseProto {};

        // 修改原型
        newProto.prototype.type = type;
        Object.assign(newProto.prototype, func(newProto));

        // 注册
        ElementFactory.setProto(type, newProto);

        factories.forEach((f, i) => {
            f.setProto(type, protos[i]);
        });

        this._cacheRegisterTypes.push(type);
    }
    /**
     * @function: Module:PlotRegister.prototype.rewrite
     * @description: 移除注册类
     * @param {*} type
     * @return {*}
     */
    remove(type) {
        if (!(type in this._cacheRegisterTypes)) return;
        const factories = [ElementFactory, PlotObjectFactory, PrimitiveFactory, DrawPlotObjectFactory2D, DrawPlotObjectFactory3D];
        factories.forEach((t) => {
            t.removeProto(type);
        });
    }

    /**
     * @function: Module:PlotRegister.prototype.removeAll
     * @description: 移除所有注册类
     * @return {*}
     */
    removeAll() {
        this._cacheRegisterTypes.forEach((type) => {
            this.remove(type);
        });
    }
}

export default PlotRegister;
Zondy.Plot.PlotRegister=PlotRegister