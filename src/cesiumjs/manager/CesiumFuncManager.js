import { CesiumZondy } from '../core/Base';
import LayerManager from './LayerManager';

/**
 * @author 三维基础平台研发中心
 * @class CesiumFuncManager
 * @category CesiumFuncManager
 * @classdesc 实体绘制控制器类
 * @description 该类实现了实体数据的绘制与删除功能
 * @param option.viewer = viewer 视图
 */
export default class CesiumFuncManager extends LayerManager {
    constructor() {
        super();
    }

    getCesiumCartian3() {
        let car3 = new Cesium.Cartesian3(1, 2, 3);

        car3.x = 12.0;

        return car3;
    }
}

CesiumZondy.Layer.CesiumFuncManager = CesiumFuncManager;
