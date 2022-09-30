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
     * @param {Number} lon 经度
     * @param {Number} lat 纬度
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
    appendLabel(lon, lat, height, lText, optionsParam) {
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
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
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
     * @param {Number} lon 经度
     * @param {Number} lat 纬度
     * @param {Number} height 高度
     * @param {String} name  名称
     * @param {String} imageUrl 图片地址
     * @param {Number} imageWidth 图片宽度
     * @param {Number} imageHeight 图片高度
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
    appendBillboard(lon, lat, height, name, imageUrl, imageWidth, imageHeight, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const lScaleByDistance = Cesium.defaultValue(options.scaleByDistance, new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5));
        const lTransparentByDistance = Cesium.defaultValue(options.transparentByDistance, new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0));
        const lHeightReference = Cesium.defaultValue(options.heightReference, Cesium.HeightReference.NONE);

        const para = {
            name,
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            billboard: {
                // 图标
                image: imageUrl,
                width: imageWidth,
                height: imageHeight,
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
     * @param {Number} farDist    最远显示距离,相机到注记的距离大于该值 注记不显示
     * @param {Number} nearDist   最近显示距离,相机到注记的距离小于该值 注记不显示
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
                // x,y方向偏移 相对于屏幕
                pixelOffset: new Cesium.Cartesian2(0.0, -iconHeight / 4),
                // 随远近缩放
                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(nearDist, 3.0, farDist, 0.5),
                // 随远近隐藏
                translucencyByDistance: new Cesium.NearFarScalar(nearDist, 1.0, farDist, 0.0)
            },
            description: attribute
        });
        return labelIcon;
    }

    /**
     * 添加图标注记
     * @function module:客户端可视化.LabelLayer.prototype.appendLabelIconEx
     * @param {Number} lon               经度
     * @param {Number} lat               纬度
     * @param {Number} height            高程
     * @param {Object} [options]         可配置参数
     * @param {String} [options.iconUrl] 图标路径，默认值: undefined
     * @param {String} [options.text]    注记文字内容，默认值: undefined
     * @param {Number} [options.disableDepthTestDistance] 图片和文字注记的深度测试
     * @param {NearFarScalar} [options.translucencyByDistance] 透明显示参数 默认值: new NearFarScalar(1.5e5, 1.0, 1.5e9, 0.0)
     * @param {NearFarScalar} [options.scaleByDistance] 缩放距离参数 默认值: new Cesium.NearFarScalar(1.5e2, 1.5, 1.5e7, 0.0)
     * @param {Number} [options.iconWidth]              图标宽度 默认值: 64
     * @param {Number} [options.iconHeight]             图标高度 默认值: 64
     * @param {Cartesian2} [options.icoPixelOffset]     图标偏移 默认值: Cartesian2.ZERO
     * @param {NearFarScalar} [options.icoPixelOffsetScaleByDistance] 图标偏移值缩放距离参数 默认值: undefined
     * @param {Number} [options.icoVerticalOrigin]      图标相对于原点的竖直位置 默认值: VerticalOrigin.CENTER
     * @param {Number} [options.icoHorizontalOrigin]    图标相对于原点的水平位置 默认值: HorizontalOrigin.TOP
     * @param {String} [options.font]                   字体 这里将字体和大小放在一起 eg:'14pt 楷体'
     * @param {Cartesian2} [options.labelPixelOffset]   默认值: new Cartesian2(0.0, -iconHeight / 4)
     * @param {NearFarScalar} [options.labelPixelOffsetScaleByDistance] 文字注记偏移值缩放距离参数默认值: new NearFarScalar(1.5e5, 1.5, 1.5e7, 0.0)
     * @param {Color}  [options.labelFillColor]         默认值: Color.WHITE
     * @param {Color}  [options.labelBackgroundColor]   默认值: new Color(0.165, 0.165, 0.165, 0.8)
     * @param {Bool}   [options.labelShow]              默认值: true
     * @param {BOOL}   [options.labelShowBackground]    默认值: false
     * @param {Number} [options.labelStyle]             默认值: LabelStyle.FILL_AND_OUTLINE
     * @param {Color}  [options.labelOutlineWidth]      默认值: 1
     * @param {String} [options.labelVerticalOrigin]    文字注记相对于原点的竖直位置 默认值: VerticalOrigin.BOTTOM
     * @param {String} [options.labelHorizontalOrigin]  文字注记相对于原点的水平位置 默认值: HorizontalOrigin.BOTTOM
     * @param {String} [options.attribute]              属性参数 默认值: undefined
     * @example
     *  let labelLayer = new LabelLayer({viewer:viewer});
     *  const options = { iconUrl: '/car.png', text: '注记文本', font: '14pt 楷体', labelShowBackground: true, attribute: '这是属性信息查询时可以看到' }
     *  const labelIcon = labelLayer.appendLabelIconEx(110, 33, 0, options);
     * @returns {Entity} labelIcon  图标注记对象 移除通过removeEntity(entity)
     */
    appendLabelIconEx(lon, lat, height, options) {
        // eslint-disable-next-line no-param-reassign
        options = Cesium.defaultValue(options, {});

        const text = Cesium.defaultValue(options.text, undefined);
        const iconUrl = Cesium.defaultValue(options.iconUrl, undefined);

        if (!Cesium.defined(text) && !Cesium.defined(iconUrl)) {
            // eslint-disable-next-line no-console
            console.log('text 和 iconUrl 都未定义，无法正常添加 labelIcon');
            return null;
        }

        const translucencyByDistance = Cesium.defaultValue(options.translucencyByDistance, new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e9, 0.0));
        const scaleByDistance = Cesium.defaultValue(options.scaleByDistance, new Cesium.NearFarScalar(1.5e2, 1.5, 1.5e7, 0.0));
        const disableDepthTestDistance = Cesium.defaultValue(options.disableDepthTestDistance, Number.POSITIVE_INFINITY);

        const iconWidth = Cesium.defaultValue(options.iconWidth, 64);
        const iconHeight = Cesium.defaultValue(options.iconHeight, 64);
        const icoPixelOffset = Cesium.defaultValue(options.icoPixelOffset, new Cesium.Cartesian2(0.0, 0.0));
        const icoPixelOffsetScaleByDistance = Cesium.defaultValue(options.icoPixelOffsetScaleByDistance, undefined);
        const icoVerticalOrigin = Cesium.defaultValue(options.icoVerticalOrigin, Cesium.VerticalOrigin.CENTER);
        const icoHorizontalOrigin = Cesium.defaultValue(options.icoHorizontalOrigin, Cesium.HorizontalOrigin.TOP);

        const font = Cesium.defaultValue(options.font, '14pt 楷体');
        const labelPixelOffset = Cesium.defaultValue(options.labelPixelOffset, new Cesium.Cartesian2(0.0, -iconHeight / 2));
        const labelPixelOffsetScaleByDistance = Cesium.defaultValue(
            options.labelPixelOffsetScaleByDistance,
            new Cesium.NearFarScalar(1.5e5, 1.5, 1.5e7, 0.0)
        );
        const labelFillColor = Cesium.defaultValue(options.labelFillColor, Cesium.Color.WHITE);
        const labelShowBackground = Cesium.defaultValue(options.labelShowBackground, false);
        const labelBackgroundColor = Cesium.defaultValue(options.labelBackgroundColor, new Cesium.Color(0.165, 0.165, 0.165, 0.8));
        const labelShow = Cesium.defaultValue(options.labelShow, true);
        const labelStyle = Cesium.defaultValue(options.labelStyle, Cesium.LabelStyle.FILL_AND_OUTLINE);
        const labelOutlineWidth = Cesium.defaultValue(options.labelOutlineWidth, 1);
        const labelVerticalOrigin = Cesium.defaultValue(options.labelVerticalOrigin, Cesium.VerticalOrigin.BOTTOM);
        const labelHorizontalOrigin = Cesium.defaultValue(options.labelHorizontalOrigin, Cesium.HorizontalOrigin.BOTTOM);

        const attribute = Cesium.defaultValue(options.attribute, undefined);

        const entity = {
            name: Cesium.defined(text) ? text : 'defaut',
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),

            description: attribute
        };

        if (Cesium.defined(iconUrl)) {
            entity.billboard = {
                // 图标
                image: iconUrl,
                width: iconWidth,
                height: iconHeight,
                pixelOffset: icoPixelOffset,
                pixelOffsetScaleByDistance: icoPixelOffsetScaleByDistance,
                // 随远近隐藏
                translucencyByDistance,
                // 随远近缩放
                scaleByDistance,
                // 定位点
                verticalOrigin: icoVerticalOrigin,
                horizontalOrigin: icoHorizontalOrigin,
                disableDepthTestDistance
            };
        }

        if (Cesium.defined(text)) {
            entity.label = {
                // 文字标签
                text,
                font,
                show: labelShow,
                style: labelStyle,
                fillColor: labelFillColor,
                showBackground: labelShowBackground,
                backgroundColor: labelBackgroundColor,
                outlineWidth: labelOutlineWidth,
                verticalOrigin: labelVerticalOrigin, // 垂直方向以底部来计算标签的位置
                horizontalOrigin: labelHorizontalOrigin, // 原点在下方
                // heightReference: heightReference,
                pixelOffset: labelPixelOffset, // x,y方向偏移 相对于屏幕
                pixelOffsetScaleByDistance: labelPixelOffsetScaleByDistance,
                // 随远近缩放
                scaleByDistance,
                // 随远近隐藏
                translucencyByDistance,
                disableDepthTestDistance
            };
        }

        const labelIcon = this.viewer.entities.add(entity);
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
