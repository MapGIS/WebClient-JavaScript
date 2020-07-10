import { CesiumZondy } from '../core/Base';

import BaseLayer from '../layer/BaseLayer';

/**
 * @author 三维基础平台研发中心·冯桂英
 * @class LabelLayer
 * @category  LabelLayer
 * @classdesc LabelLayer注记图层管理类
 * @description 注记图层管理类,处理注记相关操作
 * @param options.viewer 场景视图
 */
export default class LabelLayer extends BaseLayer {
    constructor(option) {
        super(option);
	}
	
    /**
     * 添加文字标签
     * @param {Number} lat 经度
     * @param {Number} lon 纬度
     * @param {Number} height 高程
     * @param {String} lText 标签内容
     * @param {Object} options 参数
     * @param {String} [options.font='14pt monospace'] 字体
     * @param {Color}  [options.fillColor =Cesium.Color.WHITE ] 字体的填充色
     * @param {Color}  [options.outlineColor =Cesium.Color.WHITE ] 字体的填充色
     * @param {LabelStyle} [options.style = Cesium.LabelStyle.FILL_AND_OUTLINE ] 样式
     * @param {Number} [options.outlineWidth =1 ] 外边线宽度
     * @param {Number} [options.heightReference =Cesium.HeightReference.NONE ] 外边线宽度
     * @param {VerticalOrigin} [options.verticalOrigin = Cesium.VerticalOrigin.CENTER] 标签位置 Cesium.VerticalOrigin.Cesium.VerticalOrigin.LEFT Cesium.VerticalOrigin.RIGHT
     * @param {HorizontalOrigin} [options.horizontalOrigin = Cesium.HorizontalOrigin.CENTER] 标签位置 Cesium.HorizontalOrigin.Cesium.HorizontalOrigin.LEFT Cesium.HorizontalOrigin.RIGHT
     * @param {String} [options.description] 属性描述
     * @example
	 *  let labelLayer = new LabelLayer({viewer:viewer});
     *  let label = labelLayer.appendLabel(114.2, 31, 200, '这是一个标签', {
     *      font:'14pt 楷体',
     *      style:Cesium.LabelStyle.FILL_AND_OUTLINE,
     *      verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
     *      pixelOffset:new Cesium.Cartesian2(0, -9)});
     * @returns {entity} 标签对象 移除通过removeEntity(entity)
     */
    appendLabel (lat, lon, height, lText, options) {
        options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
        let lFont = Cesium.defaultValue(options.font, '14pt monospace');
        let lFillColor = Cesium.defaultValue(options.fillColor, Cesium.Color.WHITE);
        let lOutlineColor = Cesium.defaultValue(options.outlineColor, Cesium.Color.WHITE);
        let lStyle = Cesium.defaultValue(options.style, Cesium.LabelStyle.FILL_AND_OUTLINE);
        let lOutlineWidth = Cesium.defaultValue(options.outlineWidth, 1);
        //垂直位置
        let lVerticalOrigin = Cesium.defaultValue(
            options.verticalOrigin,
            Cesium.VerticalOrigin.CENTER
        );
        //水平位置
        let lHorizontalOrigin = Cesium.defaultValue(
            options.horizontalOrigin,
            Cesium.HorizontalOrigin.CENTER
        );
        //相对于原点的偏移量 以像素为单位（原点从左到右为x正方向→，从上到下为正方向↓）
        let lPixelOffset = Cesium.defaultValue(
            options.pixelOffset,
            new Cesium.Cartesian2(0.0, 0.0)
        );
        let lScaleByDistance = Cesium.defaultValue(
            options.scaleByDistance,
            new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5)
        );
        let lTransparentByDistance = Cesium.defaultValue(
            options.transparentByDistance,
            new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0)
        );
        let lHeightReference = Cesium.defaultValue(
            options.heightReference,
            Cesium.HeightReference.NONE
        );

        let para = {
            name: '标签',
            position: Cesium.Cartesian3.fromDegrees(lat, lon, height),
            label: {
                //文字标签
                text: lText,
                font: lFont,
                fillColor: lFillColor,
                style: lStyle,
                outlineWidth: lOutlineWidth,
                outlineColor: lOutlineColor,
                verticalOrigin: lVerticalOrigin, //垂直方向以底部来计算标签的位置
                horizontalOrigin: lHorizontalOrigin,
                pixelOffset: lPixelOffset, //偏移量
                heightReference: lHeightReference,
                pixelOffsetScaleByDistance: lScaleByDistance, //随远近缩放
                translucencyByDistance: lTransparentByDistance //随远近隐藏
            },
            description: options.description //'这是一个标签的描述'
        };

        if (Cesium.defined(options)) {
            Object.extend(para, options);
		}
        let label = this.viewer.entities.add(para);
        return label;
	}
	
	 /**
     * 添加图片标签
     * @param {Number} lat 经度
     * @param {Number} lon 纬度
     * @param {Number} height 高度
     * @param {String} name  名称
     * @param {String} bImageUrl 图片地址
     * @param {Number} bWidth 图片宽度
     * @param {Number} bHeight 图片高度
     * @param {Object} options 扩展参数
     * @param {String} options.description 描述信息
	 * @returns {entity}  添加的公告板对象   移除通过removeEntity(entity)
     * @example
	 * let labelLayer = new LabelLayer({viewer:viewer});
     * let options = {
     *      id:125,
     *      description:'描述'
     *    };
     *  let billBoard = labelLayer.appendBillboard(113.2, 31, 200, 'name','http://localhost:8088/car.png', 64, 64,options);
    
     */
    appendBillboard(lat, lon, height, name, bImageUrl, bWidth, bHeight, options) {
        if (options === undefined || options === null) {
            options = {};
        }
        let lScaleByDistance = Cesium.defaultValue(options.scaleByDistance, new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5));
        let lTransparentByDistance = Cesium.defaultValue(options.transparentByDistance, new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0));
        let lHeightReference = Cesium.defaultValue(options.heightReference, Cesium.HeightReference.NONE);

        let para = {
            name: name,
            position: Cesium.Cartesian3.fromDegrees(lat, lon, height),
            billboard: { //图标
                image: bImageUrl,
                width: bWidth,
                height: bHeight,
                heightReference: lHeightReference,
                //随远近缩放
                pixelOffsetScaleByDistance: lScaleByDistance,//new NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
                //随远近隐藏
                translucencyByDistance: lTransparentByDistance,//new NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
                //定位点
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            description: Cesium.defaultValue(options.description, '这是一个公告板的描述')
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        let billBoard = this.viewer.entities.add(para);
        return billBoard;
	}
	
	/**
     * 添加图标注记
     * @param  {String} text       注记文字内容
     * @param  {Number} lon        经度
     * @param  {Number} lat        纬度
     * @param  {Number} height     高程
     * @param  {String} font       字体 这里将字体和大小放在一起 eg:'14pt 楷体'
     * @param  {Color}  fillColor  字体的填充色
     * @param  {String} iconUrl    图标路径
     * @param  {Number} iconWidth  图标宽度
     * @param  {Number} iconHeight 图标高度
     * @param  {Number} farDist    最远显示距离
     * @param  {Number} nearDist   最近显示距离
     * @param  {String} txtPos     位置 'center','top','bottom'
     * @param  {String} attribute  其他属性信息
	 * @returns {entity} labelIcon  图标注记对象 移除通过removeEntity(entity)
     * @example
	 * let labelLayer = new LabelLayer({viewer:viewer});
     * let labelIcon = labelLayer.appendLabelIcon('注记文本',110,33,0,'14pt 楷体','/car.png',64,64,10000000,1,bottom,'这是属性信息查询时可以看到');    
     */
    appendLabelIcon(text, lon, lat, height, font, fillColor, iconUrl, iconWidth, iconHeight, txtPos, attribute) {
        if (txtPos === undefined) {
            txtPos = Cesium.VerticalOrigin.BOTTOM;
        } else if (txtPos === 'center') {
            txtPos = Cesium.VerticalOrigin.CENTER;
        } else if (txtPos === 'top') {
            txtPos = Cesium.VerticalOrigin.TOP;
        } else {
            txtPos = Cesium.VerticalOrigin.BOTTOM;
        }
        let labelIcon = this.viewer.entities.add({
            name: text,
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            billboard: { 
                image: iconUrl,
                width: iconWidth,
                height: iconHeight,
                //随远近缩放
                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
                //随远近隐藏
                translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
                //定位点
                horizontalOrigin: Cesium.HorizontalOrigin.TOP

            },
            label: { //文字标签
                text: text,
                font: font,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                fillColor: fillColor,
                outlineWidth: 1,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
                horizontalOrigin: Cesium.HorizontalOrigin.BOTTOM, //原点在下方
                //随远近缩放
                pixelOffset: new Cesium.Cartesian2(0.0, -iconHeight / 4), //x,y方向偏移 相对于屏幕
                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
                //随远近隐藏
                translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0)
            },
            description: attribute
        });
        return labelIcon;
	}
	
	/**
     * 添加图标注记
     * @param  {String} name         注记文字内容
     * @param  {String} description  描述
     * @param  {Cartesian3} position 位置
     * @param  {BillboardGraphics} billboardGraphics  图片对象
     * @param  {LabelGraphics} labelGraphics      文本对象
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
        let labelIcon = this.viewer.entities.add({
            name: name,
            description: description,
            position: position,
            billboard: billboardGraphics,
            label: labelGraphics
        });
		return labelIcon;
	}
    
}

CesiumZondy.Manager.LabelLayer = LabelLayer;
