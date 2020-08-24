import { CesiumZondy } from '../core/Base';

import BaseLayer from '../layer/BaseLayer';
import CommonFuncManager from './CommonFuncManager';
import PopupElement from './PopupElement';

function calcaluteGrade(curValue, stdNearFar) {
    let curPara = -1;
    if (curValue <= stdNearFar.near) {
        curPara = stdNearFar.nearValue;
    } else if (curValue >= stdNearFar.far) {
        curPara = stdNearFar.farValue;
    } else {
        const totalGrade = Math.ceil(Math.log(stdNearFar.far / stdNearFar.near) / Math.log(2));
        const curGrade = Math.round(Math.log(curValue / stdNearFar.near) / Math.log(2));
        curPara = stdNearFar.nearValue + ((stdNearFar.farValue - stdNearFar.nearValue) * curGrade) / totalGrade;
    }
    return curPara;
}

/**
 * @author 基础平台研发中心·冯桂英
 * @class module:客户端可视化.PopupController
 * @category BaseLayer.PopupController
 * @classdesc PopupController  标绘类
 * @description 标绘管理类,实现标绘相关操作
 * @param option.viewer 场景视窗
 */
export default class PopupController extends BaseLayer {
    constructor(option) {
        super(option);
        this._popupContain = [];
    }

    /**
     *  popUp容器
     * @memberof PopupController.protype
     * @type {popupContain}
     * @readonly
     *
     */
    get popupContain() {
        return this._popupContain;
    }

    /**
     * @private
     */
    get commFun() {
        return this._commonFun;
    }

    /**
     * 添加PopUP:需考虑相机的高度对PopUp大小、透明度、偏移值的影响
     * @function module:客户端可视化.PopupController.prototype.appendPopup
     * @param {String} containID 容器的div id（注意该容器不能放在球容器中）
     * @param {String} content popup的内容，可以为带html标签的字符串
     * @param {Cartesian3} position  popup的位置（地图单位）
     * @param {Array} offset [x,y]偏移值，像素单位
     * @param {Function} closeCallback popup的close按钮点击回调函数
     * @param {Object} options 扩展参数
     * @param {Number} [options.scaleByDistance=cameraHeight] options.scaleByDistance = new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0)
     * 基于距摄像机距离指定广告牌比例
     * @param {Number} [options.translucencyByDistance=cameraHeight] options.translucencyByDistance = new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0)
     * 基于距摄像机的距离来指定广告牌的透明度
     * @param {Number} [options.pixelOffsetScaleByDistance=cameraHeight] options.pixelOffsetScaleByDistance = new Cesium.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0)
     * 基于距摄像机的距离指定广告牌像素偏移
     * @example
     *  let popup = appendPopup('aaa','这是一个测试pop<br/>测试pop<br/>',entity._position._value,[95,0],removePopup)
     */
    appendPopup(containID, content, posion, offsetParam, closeCallback, options) {
        if (this.popupContain !== null && this.popupContain.length > 0) {
            for (let i = 0; i < this.popupContain.length; i += 1) {
                const conPostion = this.popupContain[i].position;
                if (conPostion.x === posion.x && conPostion.y === posion.y && conPostion.z === posion.z) {
                    return undefined;
                }
            }
        }
        let containDiv = document.getElementById(containID);
        if (containDiv === null || containDiv === undefined) {
            containDiv = document.createElement('div');
            containDiv.id = 'popup';
        }
        const randID = CommonFuncManager.generateRandom();
        const rootContentDiv = document.createElement('div');
        rootContentDiv.setAttribute('id', `popup_${randID}`);
        rootContentDiv.setAttribute('class', 'leaflet-popup');
        rootContentDiv.setAttribute('style', 'top:5px;left:0;');
        const closeDiv = document.createElement('a');
        closeDiv.setAttribute('class', 'leaflet-popup-close-button');
        closeDiv.setAttribute('href', '#');
        closeDiv.innerHTML = '×';
        const webControl = this;
        if (typeof closeCallback === 'function') {
            closeDiv.onclick = () => {
                closeCallback(`popup_${randID}`, webControl);
            };
        }
        rootContentDiv.appendChild(closeDiv);

        const contentDiv = document.createElement('div');
        contentDiv.setAttribute('class', 'leaflet-popup-content-wrapper');
        const contentLinkDiv = document.createElement('div');
        contentLinkDiv.setAttribute('class', 'leaflet-popup-content');
        contentLinkDiv.setAttribute('style', 'max-width: 300px;');
        contentLinkDiv.innerHTML = content;
        contentDiv.appendChild(contentLinkDiv);
        rootContentDiv.appendChild(contentDiv);

        const tipContainDiv = document.createElement('div');
        tipContainDiv.setAttribute('class', 'leaflet-popup-tip-container');
        const tipDiv = document.createElement('div');
        tipDiv.setAttribute('class', 'leaflet-popup-tip');
        tipContainDiv.appendChild(tipDiv);
        rootContentDiv.appendChild(tipContainDiv);

        containDiv.appendChild(rootContentDiv);
        const wposion = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, posion);
        wposion.x = Math.round(wposion.x);
        wposion.y = Math.round(wposion.y);
        const offset = Cesium.defaultValue(offsetParam, [0, 0]);

        // 根据相机高度计算偏移值和比例及透明度（opacity ）
        const cameraHeight = Math.ceil(this.viewer.camera.positionCartographic.height);
        let scaleSize = -1;
        let opacity = -1;
        let pixelOffsetScale = -1;

        if (Cesium.defined(options)) {
            if (Cesium.defined(options.scaleByDistance)) {
                scaleSize = calcaluteGrade(cameraHeight, options.scaleByDistance);
            }

            if (Cesium.defined(options.translucencyByDistance)) {
                opacity = calcaluteGrade(cameraHeight, options.translucencyByDistance);
            }
            if (Cesium.defined(options.pixelOffsetScaleByDistance)) {
                pixelOffsetScale = calcaluteGrade(cameraHeight, options.pixelOffsetScaleByDistance);
            }
        }
        pixelOffsetScale = pixelOffsetScale > 0 ? pixelOffsetScale : 1;
        opacity = opacity >= 0 ? opacity : 1;

        rootContentDiv.style.transformOrigin = 'left top';
        let x = 0;
        let y = 0;
        if (scaleSize > 0) {
            x = wposion.x - (rootContentDiv.offsetWidth * scaleSize) / 2 + offset[0] * pixelOffsetScale * scaleSize;
            y = wposion.y - rootContentDiv.offsetHeight * scaleSize + offset[1] * pixelOffsetScale * scaleSize;
            rootContentDiv.style.transform = `translate3d(${x}px, ${y}px, 0)  scale(${scaleSize}, ${scaleSize}) `;
        } else {
            x = wposion.x - rootContentDiv.offsetWidth / 2 + offset[0] * pixelOffsetScale;
            y = wposion.y - rootContentDiv.offsetHeight + offset[1] * pixelOffsetScale;
            rootContentDiv.style.transform = `translate3d(${x}px, ${y}px, 0) `;
        }
        if (opacity >= 0) {
            rootContentDiv.style.opacity = opacity;
        }
        if (Cesium.defined(options)) {
            this.popupContain.push(
                new PopupElement({
                    id: `popup_${randID}`,
                    containID,
                    position: posion,
                    element: rootContentDiv,
                    offset,
                    scaleByDistance: options.scaleByDistance,
                    translucencyByDistance: options.translucencyByDistance,
                    pixelOffsetScaleByDistance: options.pixelOffsetScaleByDistance
                })
            );
        } else {
            this.popupContain.push(
                new PopupElement({
                    id: `popup_${randID}`,
                    containID,
                    position: posion,
                    element: rootContentDiv,
                    wPosition: wposion,
                    offset
                })
            );
        }
        return `popup_${randID}`;
    }

    /**
     * 添加popup更新事件
     * @function module:客户端可视化.PopupController.prototype.refreshPopups
     */
    refreshPopups() {
        this.viewer.camera.percentageChanged = 0.01;
        this.viewer.camera.changed.addEventListener(this.updatePopups, this);
    }

    /**
     * @private
     */
    updatePopups() {
        const popupArray = this.popupContain;
        if (popupArray !== null && popupArray.length > 0) {
            const cameraHeight = Math.ceil(this.viewer.camera.positionCartographic.height);
            for (let i = 0; i < popupArray.length; i += 1) {
                const popEle = popupArray[i];
                let scaleSize = -1;
                let opacity = -1;
                let pixelOffsetScale = -1;
                if (Cesium.defined(popEle.scaleByDistance)) {
                    scaleSize = calcaluteGrade(cameraHeight, popEle.scaleByDistance);
                }

                if (Cesium.defined(popEle.translucencyByDistance)) {
                    opacity = calcaluteGrade(cameraHeight, popEle.translucencyByDistance);
                }
                if (Cesium.defined(popEle.pixelOffsetScaleByDistance)) {
                    pixelOffsetScale = calcaluteGrade(cameraHeight, popEle.pixelOffsetScaleByDistance);
                }
                pixelOffsetScale = pixelOffsetScale > 0 ? pixelOffsetScale : 1;
                opacity = opacity >= 0 ? opacity : 1;

                if (opacity >= 0) {
                    popEle.element.style.opacity = opacity;
                }

                const curWp = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, popEle.position);
                if (curWp === undefined) {
                    return;
                }

                curWp.x = Math.round(curWp.x);
                curWp.y = Math.round(curWp.y);

                popEle.element.style.transformOrigin = 'left top';

                let x = 0;
                let y = 0;

                if (scaleSize > 0) {
                    x = Math.round(curWp.x - (popEle.element.offsetWidth * scaleSize) / 2 + popEle.offset[0] * pixelOffsetScale * scaleSize);
                    y = Math.round(curWp.y - popEle.element.offsetHeight * scaleSize + popEle.offset[1] * pixelOffsetScale * scaleSize);
                    popEle.element.style.transform = `translate3d(${x}px, ${y}px, 0)  scale(${scaleSize}, ${scaleSize}) `;
                } else {
                    x = Math.round(curWp.x - popEle.element.offsetWidth / 2 + popEle.offset[0] * pixelOffsetScale);
                    y = Math.round(curWp.y - popEle.element.offsetHeight + popEle.offset[1] * pixelOffsetScale);
                    popEle.element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                }
            }
        }
    }

    /**
     * 删除PopuP
     * @function module:客户端可视化.PopupController.prototype.removePopup
     * @param {String} popID popup的div id 添加popup返回值
     * @param {Object} popupOwner 所有者
     * @param {Object} options 扩展参数
     * @param {Boolean} options.removeDiv = false 是否移除div
     * @example
     *   popupControl.removePopup(popup, null, { removeDiv: false });
     */
    removePopup(popID, popupOwner, options) {
        const owner = Cesium.defaultValue(popupOwner, this);
        const popDiv = document.getElementById(popID);
        if (popDiv === null || popDiv === undefined) {
            return;
        }
        while (popDiv.hasChildNodes()) {
            popDiv.removeChild(popDiv.firstChild);
        }
        let removeDiv = false;
        if (Cesium.defined(options.removeDiv)) {
            removeDiv = options.removeDiv;
        }
        if (removeDiv && popDiv.parentNode !== null) {
            popDiv.parentNode.removeChild(popDiv);
        }
        if (owner.popupContain !== null && owner.popupContain.length > 0) {
            for (let i = 0, n = 0; i < owner.popupContain.length; i += 1) {
                if (owner.popupContain[i].id !== popID) {
                    owner.popupContain[(n += 1)] = owner.popupContain[i];
                }
            }
            owner.popupContain.length -= 1;
        }
        if (owner.popupContain.length <= 0) {
            owner.viewer.camera.percentageChanged = 0.5;
            owner.viewer.camera.changed.removeEventListener(this.updatePopups, this);
        }
    }

    /**
     * 清空所有的PopuP
     * @function module:客户端可视化.PopupController.prototype.clearPopups
     */
    clearPopups() {
        if (this.popupContain !== null && this.popupContain.length > 0) {
            for (let i = 0; i < this.popupContain.length; i += 1) {
                const popID = this.popupContain[i].id;
                if (popID !== null) {
                    const popDiv = document.getElementById(popID);
                    while (popDiv.hasChildNodes()) {
                        popDiv.removeChild(popDiv.firstChild);
                    }
                    if (popDiv.parentNode !== null) {
                        popDiv.parentNode.removeChild(popDiv);
                    }
                }
            }
            this.popupContain.length = 0;
        }
        if (this.popupContain.length <= 0) {
            this.viewer.camera.percentageChanged = 0.5;
            this.viewer.camera.changed.removeEventListener(this.updatePopups, this);
        }
    }
}

CesiumZondy.Manager.PopupController = PopupController;
