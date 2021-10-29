import {extend} from '../../common/Util';
import {mapgis} from '../common/base';
import {VectorStyle} from './VectorStyle';
import {Anchor} from './Enum';

function hex2int(hex) {
    let len = hex.length, a = new Array(len), code;
    for (let i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }

    return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
}

function formatColor(color, opacity) {
    let newColor;
    if (typeof color === "string") {
        if ((color.length === 7 || color.length === 4) && color.indexOf("#") === 0) {
            let c1 = color.split("#")[0].substr(0, 2);
            c1 = hex2int(c1);
            let c2 = color.split("#")[0].substr(2, 2);
            c2 = hex2int(c2);
            let c3 = color.split("#")[0].substr(4, 2);
            c3 = hex2int(c3);
            let cp = Math.floor(opacity / 1 * 255);
            newColor = [c1, c2, c3, cp];
        } else if (color.indexOf("rgba") === 0) {
            let cStr = color.split("rgba(")[1];
            cStr = cStr.split(")")[0];
            let c1 = Number(cStr.split(",")[0]);
            let c2 = Number(cStr.split(",")[1]);
            let c3 = Number(cStr.split(",")[2]);
            let cp = Math.floor(Number(cStr.split(",")[3]) / 1 * 255);
            newColor = [c1, c2, c3, cp];
        } else if (color.indexOf("rgb") === 0) {
            let cStr = color.split("rgb(")[1];
            cStr = cStr.split(")")[0];
            let c1 = Number(cStr.split(",")[0]);
            let c2 = Number(cStr.split(",")[1]);
            let c3 = Number(cStr.split(",")[2]);
            let cp = Math.floor(opacity / 1 * 255);
            newColor = [c1, c2, c3, cp];
        }
    } else if (color instanceof Array && color.length === 4) {
        newColor = color;
    }
    return newColor;
}

/**
 * 轨迹样式
 * @class mapgis.style.TrackStyle
 * @classdesc 模型样式
 * @param {Number} [radius = 1] 半径
 * @param {Number} [outlineWidth = 0] 外边线宽度，默认0，没有外边线
 * @param {String} [outlineColor = #FFFFFF] 外边线颜色，16进制颜色或rgb值或rgba值，默认#FFFFFF，白色
 * @param {String} [anchor = center] 锚点，默center
 */
export default class TrackStyle extends VectorStyle {
    constructor(option) {
        super();
        let options = option ? option : {};
        const {show, width, color, opacity, outlineColor, outlineOpacity, outlineWidth} = options;
        this.type = 'track';
        this.show = show;
        this.width = width;
        this.color = color;
        this.opacity = opacity;
        this.outlineColor = outlineColor;
        this.outlineWidth = outlineWidth;
        this.outlineOpacity = outlineOpacity;
        extend(this, options);
    }

    toMapboxStyle() {
    }

    /**
     * @link https://sandcastle.cesium.com/index.html?src=Circles%20and%20Ellipses.html&label=Geometries
     * @returns Cesium点格式的样式
     */
    toCesiumStyle(Cesium) {
        const {
            show = true,
            width = 8,
            color = [255, 0, 255],
            opacity = 1,
            outlineColor = [0, 255, 255],
            outlineWidth = 5,
            outlineOpacity = 1
        } = this;
        let newColor, newOutlineColor;
        newColor = formatColor(color, opacity);
        newOutlineColor = formatColor(outlineColor, outlineOpacity);
        if (!newColor) {
            newColor = [255, 0, 255, 255];
        }
        if(!newOutlineColor){
            newOutlineColor = [0, 255, 255, 255];
        }
        return {
            show: show,
            material: {
                polylineOutline: {
                    color: {
                        rgba: newColor,
                    },
                    outlineColor: {
                        rgba: newOutlineColor,
                    },
                    outlineWidth: outlineWidth,
                },
            },
            width: width,
            leadTime: 0,
            trailTime: 1000,
            resolution: 5,
        };
    }
}

export {TrackStyle};
mapgis.style.TrackStyle = TrackStyle;
