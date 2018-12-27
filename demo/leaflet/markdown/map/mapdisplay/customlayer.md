### 情况说明
由于各个事业单位对天地图，或者其他世界地图的标准不一致，导致自己裁剪的级别可能与标准的差一级或者错位一级

### 解决方案
自定义图层 拓展一个TileLayer， `并重写 getTileUrl函数`

``` js
var TianDiTuLayer = window.L.TileLayer.extend({    
    layerLabelMap: {
        "vec": "cva",
        "ter": "cta",
        "img": "cia"
    },
    layerZoomMap: {
        "vec": 18,
        "ter": 14,
        "img": 18
    },
     options: {
        layerType: "vec",    //(vec:矢量图层，vec:矢量标签图层，img:影像图层,cia:影像标签图层，ter:地形,cta:地形标签图层)
        isLabel: false,
        url: "http://t{s}.tianditu.com/{layer}_{proj}/wmts?",
        zoomOffset: 1,
        dpi: 96,
        style: "default",
        format: "tiles",
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
        version: '1.0.0',
        tilematrixSet: '',   
        tileSize: 256,
        matrixIds: null,
        layer: '',
        attribution: "天地图"
    },

    initialize: function (options) {
        options = options || {};
        window.L.setOptions(this, options);
        this.options.layer = this.options.isLabel ? this.layerLabelMap[this.options.layerType] : this.options.layerType;
        this.options.maxZoom = this.layerZoomMap[this.options.layerType];

        this._url = this.options.url;
        window.L.setOptions(this, this.options);
        window.L.stamp(this);
    },
    onAdd: function (map) {
        this._crs = this.options.crs || map.options.crs;
        this.options.tilematrixSet = this._crs.code === "EPSG:4326" ? "c" : "w";
        this._url = this._url.replace("{layer}", this.options.layer).replace("{proj}", this.options.tilematrixSet);
        window.L.TileLayer.prototype.onAdd.call(this, map);
    },
    getTileUrl: function (coords) { // (Point, Number) -> String
        var zoom = this._getZoomForUrl();
        var ident = this.options.matrixIds ? this.options.matrixIds[zoom].identifier : zoom;
        var url = window.L.Util.template(this._url, {s: this._getSubdomain(coords)});
        var obj = {
            service: 'WMTS',
            request: 'GetTile',
            version: this.options.version,
            style: this.options.style,
            tilematrixSet: this.options.tilematrixSet,
            format: this.options.format,
            width: this.options.tileSize,
            height: this.options.tileSize,
            layer: this.options.layer,
            tilematrix: ident,
            tilerow: coords.y,
            tilecol: coords.x
        };
        return url + window.L.Util.getParamString(obj, url);
    }

});
```