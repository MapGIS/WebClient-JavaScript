//实例化Map对象加载地图
var map = new ol.Map({
    //地图容器div的ID
    target: 'mapCon',
    //地图容器中加载的图层
    layers: [
        //加载瓦片图层数据
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    //地图视图设置
    view: new ol.View({
        //地图初始中心点
        center: [-10997148, 4569099],
        //地图初始显示级别
        zoom: 3
    })
});
//加载矢量数据图层（geojson）
var vectorSource = new ol.source.Vector({
    url: "../../data/geojson/countries.geojson",
    format: new ol.format.GeoJSON()
});
var vectorLayer = new ol.layer.Vector({
    //矢量数据源
    source: vectorSource
});
map.addLayer(vectorLayer);
//加载ArcGIS瓦片数据图层
var arcGISSource = new ol.source.TileArcGISRest({
    url: 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' +
        'Specialty/ESRI_StateCityHighway_USA/MapServer'
});
var arcGISLayers = new ol.layer.Tile({
    source: arcGISSource,
    extent: [-13884991, 2870341, -7455066, 6338219]
});
map.addLayer(arcGISLayers);

//绑定图层显示样式控件
function bindInputs(layerid, layer) {
    //是否可见控件
    var visibilityInput = $(layerid + ' input.visible');
    //绑定change事件
    visibilityInput.on('change', function () {
        //设置图层的可见性
        layer.setVisible(this.checked);
    });
    //更新可见控件状态
    visibilityInput.prop('checked', layer.getVisible());
    //遍历其他显示样式属性，依次绑定change事件
    $.each(['opacity', 'hue', 'saturation', 'contrast', 'brightness'],
        function (i, v) {
            var input = $(layerid + ' input.' + v);
            input.on('input change', function () {
                //根据当前控件值设置对应的图层显示属性值
                layer.set(v, parseFloat(this.value));
            });
            //更新当前显示属性控件状态（值）
            input.val(String(layer.get(v)));
        }
    );
}

map.getLayers().forEach(function (layer, i) {
    //调用绑定图层显示样式控件的处理函数
    bindInputs('#layer' + i, layer);
});
//设置样式面板
$('#layertree li > span').click(function () {
    //切换图层样式面板的可见状态(显示与隐藏)
    // $(this).siblings('fieldset').toggle();
    $('#layertree li > span').siblings('fieldset').hide();
    $(this).next().show();
}).siblings('fieldset').hide(); //默认隐藏各图层显示样式面板
$("fieldset:eq(0)").show();