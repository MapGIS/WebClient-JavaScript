# Esri地图
> Esri ArcGIS地图请注意`藏南`与`南海九段线`问题，建议使用天地图

# 坐标系
> EPSG:3857

# 网络地址
> 该网络为公网地址

## arcgis wms服务

> [ArcGIS服务](http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer)

> > 点击上面的网页，弹出对应的网页如下所示：


![igserver](./static/demo/leaflet/markdown/internet/arcserver.png)

1. `关注上面的红色框，第一个红色框需要注意的是一定要发布对应的WMS服务即出现“WMS”关键字眼`
    > 如果没有WMS选项，请先发布个WMS服务，要不然webclient脚本调用不了
2. 点击wms，获得对应的链接 http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer?request=GetCapabilities&service=WMS
3. 将上面链接 `？` 号之前的地址复制到脚本里面
    ``` javascript
    var Layer = L.tileLayer.wms('http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer?', {
        //图层序列号
        layers: '0,1,2',
        //wms版本号
        version: '1.3.0',
        //设置地图不连续显示
        noWrap:true
    }).addTo(map);
    ```
4. 设置对应的中心点，请注意 `纬度在前面， 经度在后面` 与正常的习惯相反
5. 设置对应的显示级别