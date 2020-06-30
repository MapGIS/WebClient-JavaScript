import {Zondy} from '../../service/common/Base';
import {newGuid} from '../../service/common/Util';
import {Render} from './Render';

/**
 * @private
 * @class  Zondy.LevelRenderer
 * @classdesc LevelRenderer 渲染器
 */
class LevelRenderer {

    /**
     * @function Zondy.LevelRenderer.constructor
     * @description 构造函数。
     * @example
     * //在渲染器上加上图形
     * var levelRenderer = new Zondy.LevelRenderer();
     * var zr = levelRenderer.init(document.getElementById('lRendertest'));
     * zr.clear();
     * zr.addShape(new Zondy.LevelRenderer.Shape.Circle({
     *     style:{
     *         x : 100,
     *         y : 100,
     *         r : 50,
     *         brushType: 'fill'
     *     }
     * }));
     * zr.render();
     */
    constructor() {
        /**
         * @member {Object} Zondy.LevelRenderer.prototype._instances
         * @description LevelRenderer 实例 map 索引
         */
        LevelRenderer._instances = {};
        LevelRenderer.Tool = {};
        this.CLASS_NAME = "Zondy.LevelRenderer";

    }

    /**
     * @function Zondy.LevelRenderer.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为null。
     */
    destroy() {
        this.dispose();
    }

    /**
     * @function Zondy.LevelRenderer.prototype.init
     * @description 创建 LevelRenderer 实例。
     * @param {HTMLElement} dom - 绘图容器。
     * @returns {Zondy.LevelRenderer} LevelRenderer 实例。
     */
    init(dom) {
        var zr = new Render(newGuid(), dom);
        LevelRenderer._instances[zr.id] = zr;
        return zr;
    }

    /**
     * @function Zondy.LevelRenderer.prototype.dispose
     * @description LevelRenderer 实例销毁。
     *              可以通过 zrender.dispose(zr) 销毁指定 Zondy.LevelRenderer.Render 实例。
     *              也可以通过 zr.dispose() 直接销毁
     * @param {Zondy.LevelRenderer.Render} zr - ZRender对象，不传此参数则销毁全部。
     * @returns {Zondy.LevelRenderer} this。
     */
    dispose(zr) {
        if (zr) {
            zr.dispose();
            this.delInstance(zr.id);
        } else {
            for (var key in LevelRenderer._instances) {
                LevelRenderer._instances[key].dispose();
            }
            LevelRenderer._instances = {};
        }

        return this;
    }

    /**
     * @function Zondy.LevelRenderer.prototype.getInstance
     * @description 获取 Zondy.LevelRenderer.Render 实例。
     * @param {string} id - ZRender对象索引。
     * @returns {Zondy.LevelRenderer.Render} Zondy.LevelRenderer.Render 实例。
     */
    getInstance(id) {
        return LevelRenderer._instances[id];
    }

    /**
     * @function Zondy.LevelRenderer.prototype.delInstance
     * @description 删除 zrender 实例，Zondy.LevelRenderer.Render 实例 dispose 时会调用，删除后 getInstance 则返回 undefined
     * @param {string} id - ZRender对象索引。
     * @param {string} id - Zondy.LevelRenderer.Render 对象索引。
     * @returns {Zondy.LevelRenderer} this。
     */
    delInstance(id) {
        delete LevelRenderer._instances[id];
        return this;
    }
}

export {LevelRenderer};
Zondy.LevelRenderer = LevelRenderer;