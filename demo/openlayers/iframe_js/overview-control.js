var overviewMapControl = new ol.control.OverviewMap({
    /**鹰眼控件样式**/
    className: 'ol-overviewmap ol-custom-overviewmap', 
    /**鹰眼中加载同坐标系下不同数据源的图层**/
    layers: [ 
        new ol.layer.Tile({
            source: new ol.source.OSM({
                'url': 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
            })
        })
    ],
    /**鹰眼控件展开时功能按钮上的标识**/
    collapseLabel: '\u00BB',
    /**鹰眼控件折叠时功能按钮上的标识**/
    label: '\u00AB',   
    collapsed: false 
});

/**实例化Map对象加载地图**/
var map = new ol.Map({
    target: 'mapCon',
    layers: [
        /**加载瓦片图层数据**/
        new ol.layer.Tile({           
            source: new ol.source.OSM() 
        })
    ],
    view: new ol.View({        
        center: [0, 0],    
        zoom: 2  
    }),
    /**加载控件到地图容器中**/
    controls: ol.control.defaults().extend([overviewMapControl])
});