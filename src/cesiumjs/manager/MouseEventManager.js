import { CesiumZondy } from "../core/Base";

/**
 * @author 基础平台研发中心·周凌风
 * @class Manager.MouseEventManager
 * @category MouseEventManager
 * @classdesc 鼠标事件管理类
 * @description 鼠标事件的注册与注销
 * @param option.viewer = viewer 视图
 */
export default class MouseEventManager {
    constructor(option) {
        this._viewer = Cesium.defaultValue(option.viewer, undefined);
        this._screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
    }

    get viewer(){
        return this._viewer;
    }

    get screenSpaceEventHandler(){
        return this._screenSpaceEventHandler;
    }

    /**
     * 注册鼠标事件
     * @param {String} eventType 事件类型
     * @example
     * LEFT_CLICK  鼠标左键
     * RIGHT_CLICK 鼠标右键
     * MOUSE_MOVE 鼠标移动
     * LEFT_DOUBLE_CLICK 左键双击
     * RIGHT_DOUBLE_CLICK 右键双击
     * WHEEL 鼠标滚轮
     * @param {Function} callbackFun 回调函数
     * @param {Object} handler 回调函数
     * @returns {handler} eventHandler 事件句柄
     */
    registerMouseEvent(eventType, callbackFun, handler) {
        let eventHandler;
        if (eventType === 'LEFT_CLICK') {
            eventHandler = this.screenSpaceEventHandler.setInputAction(
                function (movement) {
                    if (typeof callbackFun === 'function') {
                        callbackFun(movement);
                    }
                },
                Cesium.ScreenSpaceEventType.LEFT_CLICK
            );
        } else if (eventType === 'RIGHT_CLICK') {
            eventHandler = this.screenSpaceEventHandler.setInputAction(
                function (movement) {
                    if (typeof callbackFun === 'function') {
                        callbackFun(movement);
                    }
                },
                Cesium.ScreenSpaceEventType.RIGHT_CLICK
            );
        } else if (eventType === 'MOUSE_MOVE') {
            eventHandler = this.screenSpaceEventHandler.setInputAction(
                function (movement) {
                    if (typeof callbackFun === 'function') {
                        callbackFun(movement);
                    }
                },
                Cesium.ScreenSpaceEventType.MOUSE_MOVE
            );
        } else if (eventType === 'LEFT_DOUBLE_CLICK') {
            eventHandler = this.screenSpaceEventHandler.setInputAction(
                function (movement) {
                    if (typeof callbackFun === 'function') {
                        callbackFun(movement);
                    }
                },
                Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
            );
        } else if (eventType === 'RIGHT_DOUBLE_CLICK') {
            eventHandler = this.screenSpaceEventHandler.setInputAction(
                function (movement) {
                    if (typeof callbackFun === 'function') {
                        callbackFun(movement);
                    }
                },
                Cesium.ScreenSpaceEventType.RIGHT_DOUBLE_CLICK
            );
        } else if (eventType === 'WHEEL') {
            eventHandler = this.screenSpaceEventHandler.setInputAction(
                function (movement) {
                    if (typeof callbackFun === 'function') {
                        callbackFun(movement);
                    }
                },
                Cesium.ScreenSpaceEventType.WHEEL
            );
        }
        return eventHandler;
    }

    /**
     * 注销鼠标事件
     * @param {String} eventType 事件类型
     * @example
     * LEFT_CLICK  鼠标左键
     * RIGHT_CLICK 鼠标右键
     * MOUSE_MOVE 鼠标移动
     * LEFT_DOUBLE_CLICK 左键双击
     * RIGHT_DOUBLE_CLICK 右键双击
     * WHEEL 鼠标滚轮
     */
    unRegisterMouseEvent(eventType) {
        if (eventType === 'LEFT_CLICK') {
            this.screenSpaceEventHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.LEFT_CLICK
            );
        } else if (eventType === 'RIGHT_CLICK') {
            this.screenSpaceEventHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.RIGHT_CLICK
            );
        } else if (eventType === 'MOUSE_MOVE') {
            this.screenSpaceEventHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.MOUSE_MOVE
            );
        } else if (eventType === 'LEFT_DOUBLE_CLICK') {
            this.screenSpaceEventHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
            );
        } else if (eventType === 'RIGHT_DOUBLE_CLICK') {
            this.screenSpaceEventHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.RIGHT_DOUBLE_CLICK
            );
        } else if (eventType === 'WHEEL') {
            this.screenSpaceEventHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.WHEEL
            );
        }
    }
}

CesiumZondy.Manager.MouseEventManager = MouseEventManager;
