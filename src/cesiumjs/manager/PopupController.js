import { CesiumZondy } from '../core/Base';

import BaseLayer from '../layer/BaseLayer';
import CommonFuncManager from './CommonFuncManager';

export default class PopupController extends BaseLayer {
    constructor(option) {
        super(option);
        this._popupContain = [];
        this._commonFun = new CommonFuncManager(option);
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
     * @param  {string} containID 容器的div id（注意该容器不能放在球容器中）
     * @param  {string} content popup的内容，可以为带html标签的字符串
     * @param  {Posion:Cartesian3} posion     popup的位置（地图单位）
     * @param  {Array} offset [x,y]偏移值，像素单位
     * @param  {Function} closeCallback popup的close按钮点击回调函数
     * @param  {{scaleByDistance:Cesium.NearFarScalar,translucencyByDistance:Cesium.NearFarScalar,pixelOffsetScaleByDistance:Cesium.NearFarScalar}}  options
     * @example
     *  appendPopUp('aaa','测试1测试1测试1<br/>测试1测试2<br/>',entity._position._value,[95,0],removePopUp)
     */
    appendPopUp(containID, content, posion, offset, closeCallback, options) {
        if (this.popupContain !== null && this.popupContain.length > 0) {
            for (let i = 0; i < this.popupContain.length; i++) {
                let t_postion = this.popupContain[i].position;
                if (
                    t_postion.x === posion.x &&
                    t_postion.y === posion.y &&
                    t_postion.z === posion.z
                ) {
                    return;
                }
            }
        }
        let containDiv = document.getElementById(containID);
        if (containDiv === null || containDiv === undefined) {
            containDiv = document.createElement('div');
            containDiv.id = 'popup';
        }
        let randID = this.commFun.generateRandom();
        let rootContentDiv = document.createElement('div');
        rootContentDiv.setAttribute('id', 'popup_' + randID);
        rootContentDiv.setAttribute('class', 'leaflet-popup');
        rootContentDiv.setAttribute('style', 'top:5px;left:0;');
        let closeDiv = document.createElement('a');
        closeDiv.setAttribute('class', 'leaflet-popup-close-button');
        closeDiv.setAttribute('href', '#');
        closeDiv.innerHTML = '×';
        let webControl = this;
        if (typeof closeCallback === 'function') {
            closeDiv.onclick = function () {
                closeCallback('popup_' + randID, webControl);
            };
        }
        rootContentDiv.appendChild(closeDiv);

        let contentDiv = document.createElement('div');
        contentDiv.setAttribute('class', 'leaflet-popup-content-wrapper');
        let contentLinkDiv = document.createElement('div');
        contentLinkDiv.setAttribute('class', 'leaflet-popup-content');
        contentLinkDiv.setAttribute('style', 'max-width: 300px;');
        contentLinkDiv.innerHTML = content;
        contentDiv.appendChild(contentLinkDiv);
        rootContentDiv.appendChild(contentDiv);

        let tipContainDiv = document.createElement('div');
        tipContainDiv.setAttribute('class', 'leaflet-popup-tip-container');
        let tipDiv = document.createElement('div');
        tipDiv.setAttribute('class', 'leaflet-popup-tip');
        tipContainDiv.appendChild(tipDiv);
        rootContentDiv.appendChild(tipContainDiv);

        containDiv.appendChild(rootContentDiv);
        let wposion = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            this.viewer.scene,
            posion
        );
        wposion.x = Math.round(wposion.x);
        wposion.y = Math.round(wposion.y);

        if (offset === null || offset === undefined) {
            offset = [0, 0];
        }

        //根据相机高度计算偏移值和比例及透明度（opacity ）
        let cameraHeight = Math.ceil(
            this.viewer.camera.positionCartographic.height
        );
        let scaleSize = -1;
        let opacity = -1;
        let pixelOffsetScale = -1;

        if (Cesium.defined(options)) {
            if (Cesium.defined(options.scaleByDistance)) {
                scaleSize = calcaluteGrade(
                    cameraHeight,
                    options.scaleByDistance
                );
            }

            if (Cesium.defined(options.translucencyByDistance)) {
                opacity = calcaluteGrade(
                    cameraHeight,
                    options.translucencyByDistance
                );
            }
            if (Cesium.defined(options.pixelOffsetScaleByDistance)) {
                pixelOffsetScale = calcaluteGrade(
                    cameraHeight,
                    options.pixelOffsetScaleByDistance
                );
            }
        }
        pixelOffsetScale = pixelOffsetScale > 0 ? pixelOffsetScale : 1;
        opacity = opacity >= 0 ? opacity : 1;

        rootContentDiv.style.transformOrigin = 'left top';
        let x = 0;
        let y = 0;
        if (scaleSize > 0) {
            x =
                wposion.x -
                (rootContentDiv.offsetWidth * scaleSize) / 2 +
                offset[0] * pixelOffsetScale * scaleSize;
            y =
                wposion.y -
                rootContentDiv.offsetHeight * scaleSize +
                offset[1] * pixelOffsetScale * scaleSize;
            rootContentDiv.style.transform =
                'translate3d(' +
                x +
                'px, ' +
                y +
                'px, 0)  scale(' +
                scaleSize +
                ', ' +
                scaleSize +
                ') ';
        } else {
            x =
                wposion.x -
                rootContentDiv.offsetWidth / 2 +
                offset[0] * pixelOffsetScale;
            y =
                wposion.y -
                rootContentDiv.offsetHeight +
                offset[1] * pixelOffsetScale;
            rootContentDiv.style.transform =
                'translate3d(' + x + 'px, ' + y + 'px, 0) ';
        }
        if (opacity >= 0) {
            rootContentDiv.style.opacity = opacity;
        }
        if (Cesium.defined(options)) {
            this.popupContain.push(
                new PopupElement({
                    id: 'popup_' + randID,
                    containID: containID,
                    position: posion,
                    element: rootContentDiv,
                    offset: offset,
                    scaleByDistance: options.scaleByDistance,
                    translucencyByDistance: options.translucencyByDistance,
                    pixelOffsetScaleByDistance:
                        options.pixelOffsetScaleByDistance
                })
            );
        } else {
            this.popupContain.push(
                new PopupElement({
                    id: 'popup_' + randID,
                    containID: containID,
                    position: posion,
                    element: rootContentDiv,
                    wPosition: wposion,
                    offset: offset
                })
            );
        }
        return 'popup_' + randID;
    }

	/**
	 * 添加popup更新事件
	 */
    refreshPopUps() {
        this.viewer.camera.percentageChanged = 0.01;
        this.viewer.camera.changed.addEventListener(this.updatePopups, this);
    }

    /**
     * @private
     */
    updatePopups(e) {
        let popupArray = this.popupContain;
        if (popupArray !== null && popupArray.length > 0) {
            let cameraHeight = Math.ceil(
                this.viewer.camera.positionCartographic.height
            );
            for (let i = 0; i < popupArray.length; i++) {
                let popEle = popupArray[i];
                let scaleSize = -1;
                let opacity = -1;
                let pixelOffsetScale = -1;
                if (Cesium.defined(popEle.scaleByDistance)) {
                    scaleSize = calcaluteGrade(
                        cameraHeight,
                        popEle.scaleByDistance
                    );
                }

                if (Cesium.defined(popEle.translucencyByDistance)) {
                    opacity = calcaluteGrade(
                        cameraHeight,
                        popEle.translucencyByDistance
                    );
                }
                if (Cesium.defined(popEle.pixelOffsetScaleByDistance)) {
                    pixelOffsetScale = calcaluteGrade(
                        cameraHeight,
                        popEle.pixelOffsetScaleByDistance
                    );
                }
                pixelOffsetScale = pixelOffsetScale > 0 ? pixelOffsetScale : 1;
                opacity = opacity >= 0 ? opacity : 1;

                if (opacity >= 0) {
                    popEle.element.style.opacity = opacity;
                }

                let cur_wp = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                    this.viewer.scene,
                    popEle.position
                );
                if (cur_wp === undefined) {
                    return;
                }

                cur_wp.x = Math.round(cur_wp.x);
                cur_wp.y = Math.round(cur_wp.y);

                popEle.element.style.transformOrigin = 'left top';

                let x = 0;
                let y = 0;

                if (scaleSize > 0) {
                    x = Math.round(
                        cur_wp.x -
                            (popEle.element.offsetWidth * scaleSize) / 2 +
                            popEle.offset[0] * pixelOffsetScale * scaleSize
                    );
                    y = Math.round(
                        cur_wp.y -
                            popEle.element.offsetHeight * scaleSize +
                            popEle.offset[1] * pixelOffsetScale * scaleSize
                    );
                    popEle.element.style.transform =
                        'translate3d(' +
                        x +
                        'px, ' +
                        y +
                        'px, 0)  scale(' +
                        scaleSize +
                        ', ' +
                        scaleSize +
                        ') ';
                } else {
                    x = Math.round(
                        cur_wp.x -
                            popEle.element.offsetWidth / 2 +
                            popEle.offset[0] * pixelOffsetScale
                    );
                    y = Math.round(
                        cur_wp.y -
                            popEle.element.offsetHeight +
                            popEle.offset[1] * pixelOffsetScale
                    );
                    popEle.element.style.transform =
                        'translate3d(' + x + 'px, ' + y + 'px, 0)';
                }
            }
        }
    }

    /**
     * 删除PopUP
     * @param {string} popID popup的的div id
	 * @param {Object} popup 所有者
	 * @param {Options} 扩展参数
	 * @param {Options} options.removeDiv = false 是否移除div
	 * @example
	 * popupControl.removePopUp('popup', null, { removeDiv: false });
     */
    removePopUp(popID, popupOwner, options) {
        let owner = Cesium.defaultValue(popupOwner, this);
        let popDiv = document.getElementById(popID);
        if (popDiv === null || popDiv === undefined) {
            return;
        }
        while (popDiv.hasChildNodes()) {
            popDiv.removeChild(popDiv.firstChild);
        }
        let removeDiv = true;
        if (Cesium.defined(options.removeDiv)) {
            removeDiv = options.removeDiv;
        }
        if (removeDiv && popDiv.parentNode !== null) {
            popDiv.parentNode.removeChild(popDiv);
        }
        if (owner.popupContain !== null && owner.popupContain.length > 0) {
            for (let i = 0, n = 0; i < owner.popupContain.length; i++) {
                if (owner.popupContain[i].id !== popID) {
                    owner.popupContain[n++] = owner.popupContain[i];
                }
            }
            owner.popupContain.length -= 1;
        }
        if (owner.popupContain.length <= 0) {
            owner.viewer.camera.percentageChanged = 0.5;
            owner.viewer.camera.changed.removeEventListener(
                this.updatePopups,
                this
            );
        }
    }

    /**
     * 清空所有的PopUP
     * @param
     */
    clearPopUps() {
        if (this.popupContain !== null && this.popupContain.length > 0) {
            for (let i = 0; i < this.popupContain.length; i++) {
                let popID = this.popupContain[i].id;
                if (popID !== null) {
                    let popDiv = document.getElementById(popID);
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
            this.viewer.camera.changed.removeEventListener(
                this.updatePopups,
                this
            );
        }
    }
}

function calcaluteGrade(curValue, std_NearFar) {
    let curPara = -1;
    if (curValue <= std_NearFar.near) {
        curPara = std_NearFar.nearValue;
    } else if (curValue >= std_NearFar.far) {
        curPara = std_NearFar.farValue;
    } else {
        let totalGrade = Math.ceil(
            Math.log(std_NearFar.far / std_NearFar.near) / Math.log(2)
        );
        let curGrade = Math.round(
            Math.log(curValue / std_NearFar.near) / Math.log(2)
        );
        curPara =
            std_NearFar.nearValue +
            ((std_NearFar.farValue - std_NearFar.nearValue) * curGrade) /
                totalGrade;
    }
    return curPara;
}

/**
 * @private
 * PopUp元素对象
 * @param  {object} options
 */
class PopupElement {
    constructor(option) {
        this.id = Cesium.defaultValue(option.id, null); //代表divID
        this.containID = Cesium.defaultValue(option.containID, null); //容器divID
        this.position = Cesium.defaultValue(option.position, null); //坐标（地图坐标）
        this.element = Cesium.defaultValue(option.element, null); //div元素
        this.wPosition = Cesium.defaultValue(option.wPosition, null); //窗口位置
        this.offset = Cesium.defaultValue(option.offset, [0, 0]);
        this.scaleByDistance = Cesium.defaultValue(option.scaleByDistance, null);
        this.translucencyByDistance = Cesium.defaultValue(
            option.translucencyByDistance,
            null
        );
        this.pixelOffsetScaleByDistance = Cesium.defaultValue(
            option.pixelOffsetScaleByDistance,
            null
        );
    }
}

CesiumZondy.Manager.PopupController = PopupController;
