import { CesiumZondy } from '../core/Base';

import BaseLayer from '../layer/BaseLayer';

/**
 * @author 三维基础平台研发中心·冯桂英
 * @class module:客户端可视化.LabelLayer
 * @category  LabelLayer
 * @classdesc LabelLayer注记图层管理类
 * @description 注记图层管理类,处理注记相关操作
 * @param options.viewer 场景视图
 */
export default class LabelLayer extends BaseLayer {
    constructor(optionsParam) {
        const options = optionsParam;
        super(options);
    }

    /**
     * 添加文字标签
     * @function module:客户端可视化.LabelLayer.prototype.appendLabel
     * @param {Number} lat 经度
     * @param {Number} lon 纬度
     * @param {Number} height 高程
     * @param {String} lText 标签内容
     * @param {Object} optionsParam 参数
     * @param {String} [optionsParam.font='14pt monospace'] 字体
     * @param {Color}  [optionsParam.fillColor =Cesium.Color.WHITE ] 字体的填充色
     * @param {Color}  [optionsParam.outlineColor =Cesium.Color.WHITE ] 字体的填充色
     * @param {LabelStyle} [optionsParam.style = Cesium.LabelStyle.FILL_AND_OUTLINE ] 样式
     * @param {Number} [optionsParam.outlineWidth =1 ] 外边线宽度
     * @param {Number} [optionsParam.heightReference =Cesium.HeightReference.NONE ] 外边线宽度
     * @param {VerticalOrigin} [optionsParam.verticalOrigin = Cesium.VerticalOrigin.CENTER] 标签位置 Cesium.VerticalOrigin.Cesium.VerticalOrigin.LEFT Cesium.VerticalOrigin.RIGHT
     * @param {HorizontalOrigin} [optionsParam.horizontalOrigin = Cesium.HorizontalOrigin.CENTER] 标签位置 Cesium.HorizontalOrigin.Cesium.HorizontalOrigin.LEFT Cesium.HorizontalOrigin.RIGHT
     * @param {String} [optionsParam.description] 属性描述
     * @returns {Entity} 标签对象 移除通过removeEntity(entity)
     * @example
     *  let labelLayer = new LabelLayer({viewer:viewer});
     *  let label = labelLayer.appendLabel(114.2, 31, 200, '这是一个标签', {
     *      font:'14pt 楷体',
     *      style:Cesium.LabelStyle.FILL_AND_OUTLINE,
     *      verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
     *      pixelOffset:new Cesium.Cartesian2(0, -9)});
     */
    appendLabel(lat, lon, height, lText, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, Cesium.defaultValue.EMPTY_OBJECT);
        const lFont = Cesium.defaultValue(options.font, '14pt monospace');
        const lFillColor = Cesium.defaultValue(options.fillColor, Cesium.Color.WHITE);
        const lOutlineColor = Cesium.defaultValue(options.outlineColor, Cesium.Color.WHITE);
        const lStyle = Cesium.defaultValue(options.style, Cesium.LabelStyle.FILL_AND_OUTLINE);
        const lOutlineWidth = Cesium.defaultValue(options.outlineWidth, 1);
        // 垂直位置
        const lVerticalOrigin = Cesium.defaultValue(options.verticalOrigin, Cesium.VerticalOrigin.CENTER);
        // 水平位置
        const lHorizontalOrigin = Cesium.defaultValue(options.horizontalOrigin, Cesium.HorizontalOrigin.CENTER);
        // 相对于原点的偏移量 以像素为单位（原点从左到右为x正方向→，从上到下为正方向↓）
        const lPixelOffset = Cesium.defaultValue(options.pixelOffset, new Cesium.Cartesian2(0.0, 0.0));
        const lScaleByDistance = Cesium.defaultValue(options.scaleByDistance, new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5));
        const lTransparentByDistance = Cesium.defaultValue(options.transparentByDistance, new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0));
        const lHeightReference = Cesium.defaultValue(options.heightReference, Cesium.HeightReference.NONE);

        const para = {
            name: '标签',
            position: Cesium.Cartesian3.fromDegrees(lat, lon, height),
            label: {
                // 文字标签
                text: lText,
                font: lFont,
                fillColor: lFillColor,
                style: lStyle,
                outlineWidth: lOutlineWidth,
                outlineColor: lOutlineColor,
                verticalOrigin: lVerticalOrigin, // 垂直方向以底部来计算标签的位置
                horizontalOrigin: lHorizontalOrigin,
                pixelOffset: lPixelOffset, // 偏移量
                heightReference: lHeightReference,
                pixelOffsetScaleByDistance: lScaleByDistance, // 随远近缩放
                translucencyByDistance: lTransparentByDistance // 随远近隐藏
            },
            description: options.description // '这是一个标签的描述'
        };

        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        const label = this.viewer.entities.add(para);
        return label;
    }

    /**
     * 添加图片标签
     * @function module:客户端可视化.LabelLayer.prototype.appendBillboard
     * @param {Number} lat 经度
     * @param {Number} lon 纬度
     * @param {Number} height 高度
     * @param {String} name  名称
     * @param {String} bImageUrl 图片地址
     * @param {Number} bWidth 图片宽度
     * @param {Number} bHeight 图片高度
     * @param {Object} optionsParam 扩展参数
     * @param {String} [optionsParam.description] 描述信息
     * @returns {Entity}  添加的公告板对象   移除通过removeEntity(entity)
     * @example
     * let labelLayer = new LabelLayer({viewer:viewer});
     * let options = {
     *      id:125,
     *      description:'描述'
     *    };
     *  let billBoard = labelLayer.appendBillboard(113.2, 31, 200, 'name','http://localhost:8088/car.png', 64, 64,options);
     */
    appendBillboard(lat, lon, height, name, bImageUrl, bWidth, bHeight, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const lScaleByDistance = Cesium.defaultValue(options.scaleByDistance, new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5));
        const lTransparentByDistance = Cesium.defaultValue(options.transparentByDistance, new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0));
        const lHeightReference = Cesium.defaultValue(options.heightReference, Cesium.HeightReference.NONE);

        const para = {
            name,
            position: Cesium.Cartesian3.fromDegrees(lat, lon, height),
            billboard: {
                // 图标
                image: bImageUrl,
                width: bWidth,
                height: bHeight,
                heightReference: lHeightReference,
                // 随远近缩放
                pixelOffsetScaleByDistance: lScaleByDistance, // new NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
                // 随远近隐藏
                translucencyByDistance: lTransparentByDistance, // new NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
                // 定位点
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            description: Cesium.defaultValue(options.description, '这是一个公告板的描述')
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        const billBoard = this.viewer.entities.add(para);
        return billBoard;
    }

    /**
     * 添加图标注记
     * @function module:客户端可视化.LabelLayer.prototype.appendLabelIcon
     * @param {String} text       注记文字内容
     * @param {Number} lon        经度
     * @param {Number} lat        纬度
     * @param {Number} height     高程
     * @param {String} font       字体 这里将字体和大小放在一起 eg:'14pt 楷体'
     * @param {Color}  fillColor  字体的填充色
     * @param {String} iconUrl    图标路径
     * @param {Number} iconWidth  图标宽度
     * @param {Number} iconHeight 图标高度
     * @param {Number} farDist    最远显示距离
     * @param {Number} nearDist   最近显示距离
     * @param {String} txtPos     图片位置 'center','top','bottom'
     * @param {String} attribute  其他属性信息
     * @returns {Entity} labelIcon  图标注记对象 移除通过removeEntity(entity)
     * @example
     * //更多参数设置可以使用appendLabelIconComm方法
     * let labelLayer = new LabelLayer({viewer:viewer});
     * let labelIcon = labelLayer.appendLabelIcon('注记文本',110,33,0,'14pt 楷体','/car.png',64,64,10000000,1,bottom,'这是属性信息查询时可以看到');
     */
    appendLabelIcon(text, lon, lat, height, font, fillColor, iconUrl, iconWidth, iconHeight, farDist, nearDist, txtPosParam, attribute) {
        let txtPos = Cesium.VerticalOrigin.BOTTOM;
        if (txtPosParam === 'center') {
            txtPos = Cesium.VerticalOrigin.CENTER;
        } else if (txtPosParam === 'top') {
            txtPos = Cesium.VerticalOrigin.TOP;
        } else {
            txtPos = Cesium.VerticalOrigin.BOTTOM;
        }
        const labelIcon = this.viewer.entities.add({
            name: text,
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            billboard: {
                image: iconUrl,
                width: iconWidth,
                height: iconHeight,
                // 随远近缩放
                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(nearDist, 3.0, farDist, 0.5),
                // 随远近隐藏
                translucencyByDistance: new Cesium.NearFarScalar(nearDist, 1.0, farDist, 0.0),
                verticalOrigin: txtPos,
                // 定位点
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER
            },
            label: {
                // 文字标签
                text,
                font,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                fillColor,
                outlineWidth: 1,
                verticalOrigin: Cesium.VerticalOrigin.CENTER, // 垂直方向以底部来计算标签的位置
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 原点在下方
                // 随远近缩放
                pixelOffset: new Cesium.Cartesian2(0.0, -iconHeight / 4), // x,y方向偏移 相对于屏幕
                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
                // 随远近隐藏
                translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0)
            },
            description: attribute
        });
        return labelIcon;
    }

    /**
     * 添加图标注记
     * @function module:客户端可视化.LabelLayer.prototype.appendLabelIconComm
     * @param {String} name 注记文字内容
     * @param {String} description 描述
     * @param {Cartesian3} position 位置
     * @param {BillboardGraphics} billboardGraphics 图片对象
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/BillboardGraphics.html } 图片对象参数
     * @param {LabelGraphics} labelGraphics 文本对象
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/LabelGraphics.html } 文本对象参数
     * @example
     * let labelLayer = new LabelLayer({viewer:viewer});
     * let labelGraphics = { //文字标签
     *    text: "文字标签内容",
     *    font: '14pt monospace',
     *    fillColor: Cesium.Color.WHITE,
     *    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
     *    outlineWidth: 1,
     *    outlineColor: Cesium.Color.WHITE,
     *    verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直方向以底部来计算标签的位置
     *    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
     *    pixelOffset: new Cesium.Cartesian2(0.0, 0.0), //偏移量
     *    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
     *    pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5), //随远近缩放
     *    translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0) //随远近隐藏
     * };
     * let billboardGraphics ={
     * //图标
     *   image: iconUrl,
     *   width: iconWidth,
     *   height: iconHeight,
     *   //heightReference: this.root.HeightReference.CLAMP_TO_GROUND,
     *   //随远近缩放
     *   //pixelOffset:new this.root.Cartesian2(0.0, -image.height),
     *   pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e5, 3.0, 1.5e7, 0.5),
     *   //随远近隐藏
     *   translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
     *   //定位点
     *   //verticalOrigin: Cesium.VerticalOrigin.BOTTOM
     *   horizontalOrigin: Cesium.HorizontalOrigin.TOP
     *  };
     *  let labelIcon = labelLayer.appendLabelIcon('注记文本','这是属性信息查询时可以看到',Cesium.Cartesian3.fromDegrees(110,33,0),billboardGraphics,labelGraphics);
     */
    appendLabelIconComm(name, description, position, billboardGraphics, labelGraphics) {
        const labelIcon = this.viewer.entities.add({
            name,
            description,
            position,
            billboard: billboardGraphics,
            label: labelGraphics
        });
        return labelIcon;
    }
}

CesiumZondy.Manager.LabelLayer = LabelLayer;
