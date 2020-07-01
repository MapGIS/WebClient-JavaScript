import { CesiumZondy } from '../core/Base';
import LayerManager from '../manager/LayerManager';

/**
 * @author
 * @class
 * @category
 * @classdesc
 * @description
 * @see
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
