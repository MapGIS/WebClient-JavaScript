#### 地图文档配置

![地图文档](http://client.snanyun.com:8899/demo/leaflet/markdown/vectortile/mapx.png)

> **下面出现的图层的名字必须和上面的地图文档的名字`一模一样`**

``` javascript
vectorTileStyling = {
        武汉市: {
          weight: 1,
          fillColor: '#eeeeee',
          fillOpacity: 0.5,
          fill: true
        },
        武汉市行政区: {
          weight: 1,
          fillColor: '#888888',
          fillOpacity: 0.5,
          fill: true
        },
        绿地: {
          weight: 1,
          fillColor: '#00FF00',
          fillOpacity: 1,
          fill: true
        },
        水域: {
          weight: 1,
          fillColor: '#0000FF',
          fillOpacity: 1,
          fill: true
        },
        铁路: {
          weight: 4,
          color: '#FFFFFF',
          dashArray: '0, 6',
          fillOpacity: 1
        }
      }
```
---

#### 样式配置如下所示

```javascript
var vectorTileOptions = {
    vectorTileLayerStyles: {
        // A plain set of L.Path options.
        landuse: {
            weight: 0,
            fillColor: '#9bc2c4',
            fillOpacity: 1,
            fill: true
        },
        // A function for styling features dynamically, depending on their
        // properties and the map's zoom level
        admin: function(properties, zoom) {
            var level = properties.admin_level;
            var weight = 1;
            if (level == 2) {weight = 4;}
            return {
                weight: weight,
                color: '#cf52d3',
                dashArray: '2, 6',
                fillOpacity: 0
            }
        },
        // A function for styling features dynamically, depending on their
        // properties, the map's zoom level, and the layer's geometry
        // dimension (point, line, polygon)
        water: function(properties, zoom, geometryDimension) {
	    if (geometryDimension === 1) {   // point
	        return ({
                    radius: 5,
                    color: '#cf52d3',
                });
	    }
	    
	    if (geometryDimension === 2) {   // line
                 return ({
                    weight: 1,
                    color: '#cf52d3',
                    dashArray: '2, 6',
                    fillOpacity: 0
                });
	    }
	    
	    if (geometryDimension === 3) {   // polygon
	         return ({
                    weight: 1,
                    fillColor: '#9bc2c4',
                    fillOpacity: 1,
                    fill: true
                });
	    }
        },
        // An 'icon' option means that a L.Icon will be used
        place: {
            icon: new L.Icon.Default()
        },
        road: []
    }
};
var pbfLayer = L.vectorGrid.protobuf(url, vectorTileOptions).addTo(map);
```

