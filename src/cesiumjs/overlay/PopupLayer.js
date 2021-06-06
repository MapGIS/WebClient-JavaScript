import { CesiumZondy } from '../core/Base';

import { updataPopupPosition } from './popup/popup';
import Cesium from '../../../node_modules/cesium/Source/Cesium';

var popupsIdIndex = 0;

/**
 * @author 基础平台/创新中心 潘卓然
 * @class module:客户端可视化.PopupLayer
 * @classdesc 弹出窗图层
 * @description CesiumZondy.zondy.PopupLayer cesium的popup的实现
 * @param {Viewer} map 传入的cesium的地图对象viewer
 * @param {Entity} [position.entity]  实体,内部获取坐标点cartesian, 输入此参数可忽略下面的，cartesian，longitude,latitude
 * @param {Cartesian3} [position.cartesian] 笛卡尔积坐标点cartesian, 输入此参数可忽略下面的longitude,latitude
 * @param {Number} [position.longitude] 经度, 先判断cartesian是否存在，存在忽略此参数
 * @param {Number} [position.latitude] 纬度, 先判断cartesian是否存在，存在忽略此参数
 * @param {Number}  [position.height] 高度, 可选 默认0
 * @param {String} [options.popupId] 本次popup对应的唯一id,不传随机生成
 * @param {String} [options.popupContentId] 本次popup对应的唯一内容id
 * @param {Boolean} [options.postRender=true] 是否实时渲染
 * @param {Boolean} [options.showClose=true]  是否显示关闭按钮
 * @param {Element|String} container 外部传入的div的字符串描述方式，一般是文字或者echarts的div;
 *
 * @example 这里唯一要注意的是我们中地数码的ceisum的右键事件不是放大缩小而是旋转视角
 * var cartesian1 = Cesium.Cartesian3.fromDegrees(
          100.108861,
          27.871516,
          0
        );
        var cartesian2 = Cesium.Cartesian3.fromDegrees(
          90.108861,
          37.871516,
          0
        );
        var cartesian3 = Cesium.Cartesian3.fromDegrees(
          116.108861,
          30.871516,
          0
        );
        popups = [cartesian1, cartesian2, cartesian3].map((c) => {
          const popup = new CesiumZondy.Overlayer.PopupLayer(
            webGlobe.viewer,
            {
              cartesian: c,
            },
            {
              popupId: "cesium-popup-id-1", //要保证唯一性
              popupContentId: "cesium-popup-content-id-1", //要保证唯一性
              postRender: true, //是否实时刷新
              showClose: false,
            },
          '<div id="echarts_id" style="height:100px;width:200px;color:#fff;">echats内容</div>'
        );
        return popup;
      });
 */
export default class PopupLayer {
    constructor(map, position, options, container) {
        this.map = map;
        this.scene = map.scene;

        this.position = position;
        this.options = options;
        this.container = container;

        this.popupId = options.popupId || 'cesium-popup-id-' + popupsIdIndex++;
        this.popupClass = options.popupClass || 'cesium-popup';
        this.popupContentId = options.popupContentId || 'cesium-popup-content-id-' + popupsIdIndex++;

        this.options.postRender = this.options.postRender === undefined ? true : this.options.postRender;

        this.scene = map.scene;
        this.camera = map.camera;
        this.isShow = true;

        let ScreenSpaceEventHandler = Cesium.ScreenSpaceEventHandler || window['Cesium'].ScreenSpaceEventHandler;

        this.handler = new ScreenSpaceEventHandler(this.scene.canvas);

        this.infoDiv = null;
        // this.px_position = null;
        if (position.entity) {
            this.cartesian = position.entity.position._value;
        }

        this.cartesian =
            this.cartesian ||
            this.position.cartesian ||
            Cesium.Cartesian3.fromDegrees(this.position.longitude, this.position.latitude, this.position.height);

        let vc = this.map.container;
        let cesumWidgetContainer = undefined;
        if (vc.children && vc.children.length > 0) {
            if (vc.children[0].children && vc.children[0].children.length > 0) {
                if (vc.children[0].children[0].children && vc.children[0].children[0].children.length > 0) {
                    cesumWidgetContainer = vc.children[0].children[0].children[0];
                }
            }
        }

        if (!cesumWidgetContainer) {
            let parents = document.getElementsByClassName('cesium-widget');
            parent = parents.length > 0 ? parents[0] : map.container;
            this.parent = parent;
        } else {
            this.parent = cesumWidgetContainer;
        }

        // this.initDevicePixelRatio();
        this.showClose = options.showClose === undefined ? true : options.showClose;
        this.popup = this._createPopup();

        this.moveStart = this.eventMoveStart.bind(this);
        this.moveEnd = this.eventMoveEnd.bind(this);
        this.movement = this.movement.bind(this);
        this.update = this.update.bind(this);

        this.bindEvent();

        return this;
    }

    _createPopup() {
        const self = this;
        this.hide = this.hide.bind(this);
        let infoDiv = window.document.createElement('div');
        infoDiv.id = this.popupId;
        infoDiv.style.display = 'none';
        infoDiv.innerHTML =
            '<div id="' +
            this.popupContentId +
            '" class="cesium-popup">' +
            // '<a class="cesium-popup-close-button" href="javascript:void(0)" onClick="function remove(){self.remove()}">×</a>' +
            '<div class="cesium-popup-content-wrapper">' +
            this.container +
            '</div>' +
            '<div class="cesium-popup-tip-container">' +
            '<div class="cesium-popup-tip" />' +
            '</div>' +
            '</div>';
        let close = window.document.createElement('div');
        close.className = 'cesium-popup-close-button';
        close.addEventListener('click', () => self.hide());
        close.innerText = 'x';
        this.parent.appendChild(infoDiv);
        // window.document.getElementById(this.popupId).style.display = 'block';
        if (this.showClose) {
            let parent = window.document.getElementById(this.popupContentId);
            parent && parent.appendChild(close);
        }
        this.infoDiv = infoDiv;
    }

    bindEvent() {
        let self = this;
        this.handler.setInputAction(this.movement, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        if (!this.map) {
            return;
        }

        if (this.options.postRender) {
            this.map.scene.postRender.addEventListener(() => self.update());
        } else {
            this.map.camera.changed.addEventListener(() => self.update());
            this.handler.setInputAction(this.moveStart, Cesium.ScreenSpaceEventType.LEFT_DOWN);
            this.handler.setInputAction(this.moveEnd, Cesium.ScreenSpaceEventType.LEFT_UP);
            this.map.scene.camera.moveEnd.addEventListener(() => self.update());
        }
    }

    unbindEvent() {
        let self = this;
        if (!this.map) {
            return;
        }

        if (this.options.postRender) {
            this.map.scene.postRender.removeEventListener(() => self.update());
        } else {
            this.map.camera.changed.removeEventListener(() => self.update());
            this.map.scene.camera.moveEnd.removeEventListener(() => self.update());
            this.handler.destroy();
        }
    }

    movement(movement) {
        var pickedPrimitive = this.map.scene.pick(movement.position);
        var pickedEntity = Cesium.defined(pickedPrimitive) ? pickedPrimitive.id : undefined;
        if (Cesium.defined(pickedEntity) /* && Cesium.defined(pickedEntity.billboard) */) {
            if (this.position && this.position.entity) {
                pickedPrimitive.id === this.position.entity.id;
                this.show();
            }
        }
    }

    eventMoveStart(movement) {
        this.hide();
    }

    eventMoveEnd() {
        this.update();
    }

    update() {
        if (this.cartesian && this.isShow) {
            updataPopupPosition(this.map, this.cartesian, this.popupId, this.popupContentId, this.options);
        }
    }

    /**
     * 显示图层
     * @function module:客户端可视化.PopupLayer.prototype.show
     */
    show() {
        this.isShow = true;
        let node = window.document.getElementById(this.popupId);
        if (node && node.style) {
            node.style.display = 'block';
        }
    }

    /**
     * 隐藏图层
     * @function module:客户端可视化.PopupLayer.prototype.hide
     */
    hide() {
        this.isShow = false;
        let node = window.document.getElementById(this.popupId);
        if (node && node.style) {
            node.style.display = 'none';
        }
    }

    /**
     * 删除图层
     * @function module:客户端可视化.PopupLayer.prototype.remove
     */
    remove() {
        this.unbindEvent();
        let node = window.document.getElementById(this.popupId);
        if (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            } else {
                node.remove();
            }
        }
        return this;
    }
}

CesiumZondy.Overlayer.PopupLayer = PopupLayer;
