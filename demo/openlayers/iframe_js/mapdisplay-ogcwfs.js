/**创建基于矢量地图文档的WFS要素图层对象**/
wfsDocSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: function (extent) {
            return 'http://develop.smaryun.com:6163/igs/rest/ogc/doc/WorldMKTVector/WFSServer?service=WFS&' +
                'version=1.0.0&request=GetFeature&typename=世界政区.wp:阿富汗&' +
                'outputFormat=gml2&srsname=EPSG:3857&' +
                'bbox=' + extent.join(',') + ',EPSG:3857';
        },
        strategy: ol.loadingstrategy.bbox
    });

wfsDocLayer = new ol.layer.Vector({
    source: wfsDocSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: "#32b94b"
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
            width: 2
        })
    })
});
