import ImageCanvas from 'ol/source/ImageCanvas'
import * as ol from '../core/Base';
import { MapvLayer } from './MapvLayer';

/**
 * @origin author kyle / http://nikai.us/
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class openlayers.zondy.MapvSource
 * @classdesc 基于mapboxgl的Layer对象进行的拓展
 * @param map - {Object} 传入的mapboxgl的地图对象
 * @param dataset - {MapvDataSet} 传入的mapv的属性。 <br>
 * @param mapvoption - {MapvOption} 可选参数。<br>
 */
export class MapvSource extends ImageCanvas {

    constructor(options) {
        super({
            canvasFunction: renderCanvas,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });
        this.map = options.map;
        this.dataSet = options.dataSet;
        this.mapVOptions = options.mapVOptions;
        this.layer = undefined;
        let self = this;
        this.mapHeight = 0;
        this.mapWidth = 0;

        this.initDevicePixelRatio();

        function renderCanvas(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
            
            var mapWidth = size[0] / pixelRatio;
            var mapHeight = size[1] / pixelRatio;
            var width = this.map.getSize()[0];
            var height = this.map.getSize()[1];
            let offset = [(mapWidth - width) / 2 , (mapHeight - height) / 2 ];      
            self.mapHeight = mapHeight;      
            self.mapWidth = mapWidth;      

            if (!self.layer) {
                self.layer = new MapvLayer(self.map, self.dataSet, self.mapVOptions, self,  mapWidth, mapHeight, offset, pixelRatio);
            }      
            
            self.layer.pixelRatio = pixelRatio;
            self.layer.setOffset(offset);

            self.layer.resizeCanvas( mapWidth, mapHeight);
            self.rotate = self.map.getView().getRotation()
         
            var canvas = self.layer.getCanvas();
            if (!self.context) {
                canvas = document.createElement('CANVAS');
                canvas.width = mapWidth;
                canvas.height = mapHeight;
                self.context = canvas.getContext('2d');
            }

            if (!self.layer.isEnabledTime()) {
                self.layer.resizeCanvas( mapWidth, mapHeight);
                self.layer.render();
            }

            var canvas2 = self.context.canvas;
            self.context.canvas.getContext('2d').scale(pixelRatio, pixelRatio);
            self.context.clearRect(0, 0, canvas2.width, canvas2.height);
            self.context.canvas.width = size[0] / pixelRatio;
            self.context.canvas.height = size[1] / pixelRatio;
            self.context.drawImage(canvas, 0, 0);
            if (self.resolution !== resolution || JSON.stringify(self.extent) !== JSON.stringify(extent)) {
                self.resolution = resolution;
                self.extent = extent;
            }
            return self.context.canvas;
        }

        if (!this.layer) {
/*             let size = this.map.getSize();
            let width = size[0]
            let height = size[1]
            this.layer = new MapvLayer(map, dataSet, self.mapVOptions, self,  width, height, offset, pixelRatio);
            this.layer.resizeCanvas( width, height); */
        }      
        self.refresh();
    }

    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    //-----------------------------------Start Data Operation---------------------------------
    /**
     * 增加数据
     * @function openlayers.zondy.MapvSource.prototype.addData
     * 
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     */
    addData(data, options) {
        this.layer.addData(data, options);
    }

    /**
     * 更新数据
     * @function openlayers.zondy.MapvSource.prototype.addData
     * 
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     */
    updateData(data, options) {
        this.layer.updateData(data, options);
    }

    update(options){
        this.layer.update(options);
    }

    removeData(filter) {
        this.layer.removeData(filter);
    }

    removeAllData() {
        this.layer.clearData();
    }

    destroy() {
        this.layer.clearData();    
        this.layer.destroy()
    }
    //-----------------------------------End Data Operation---------------------------------
}
ol.source = ol.source || {};
ol.source.Mapv = MapvSource;