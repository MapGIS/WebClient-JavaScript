import L from 'leaflet';
import { MapvLayer } from '../MapvLayer';

/**
 * @class MapvStreamLayer
 * @classdesc SocketLayer MapV渲染器
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @extends {L.MapvLayer}
 * @param {string} url - 数据流图层服务地址
 * @param {Object} options - 其他参数，先保留。
 *
 * @param {Object} options.field - geojson的唯一标识字段，请确保该字段的唯一性。
 */
export var MapvStreamLayer = MapvLayer.extend({
    initialize: function (map, url, options) {
        options = options || {};

        L.Util.setOptions(this, options);

        this.mapvOption = options.mapvOption || {};
        this.data = [];
        this.lastDate = new Date();
        this.url = url;
        this.fieldHash = {};

        this.fieldDeg = options.fieldDeg;
        this.iconUrl = options.iconUrl;
        this.timeSpeed = options.timeSpeed || 100;
        this.createIcon();

        MapvLayer.prototype.initialize.call(this, map, new window.mapv.DataSet([]), this.mapvOption, options);
    },

    onMessage: function (msg) {
        const feature = msg.feature;
        const field = msg.feature.properties[this.options.field];

        let layer = this.parasIcon(feature);

        if (field !== undefined && this.fieldHash[field]) {
            this.data[this.fieldHash[field]] = layer;
        } else {
            if (field !== undefined) {
                this.data.push(layer);
                this.fieldHash[field] = this.data.length - 1;
            }
        }

        this.updateLayer();
    },

    createIcon: function () {
        var iconUrl = this.iconUrl || 'http://client.snanyun.com:8899/img/leaflet/marker/bike.png';
        this.icon = new Image();
        this.icon.src = iconUrl;
    },

    parasIcon: function (feature) {
        this.mapvOption = {
            draw: 'icon'
        };
        var deg = feature.properties[this.fieldDeg] || 0;
        var icon = {
            geometry: {
                type: 'Point',
                coordinates: feature.geometry.coordinates
            },
            deg: deg,
            icon: this.icon
        };
        return icon;
    },

    updateLayer: function () {
        var currentDate = new Date();
        if (currentDate - this.lastDate < this.timeSpeed) return;
        this.updateData(this.data, this.mapvOption);
        this.lastDate = currentDate;
    }
});
