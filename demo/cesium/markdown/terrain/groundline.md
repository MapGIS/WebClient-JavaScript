## 贴地线

> 贴地线的基本原理是基于地形的基础上针对给定的线进行插值操作。让线更加贴合地形。

> `一定要保证地形图加入，才能保证后面的插值操作成功，否则会报错误`, 插值函数***appendLineOnTerrain***强依赖于地形图。


### 加载地形

> 加载地形是通过IGServer的方式实现对应的加载操作。

``` javascript        
var type = 'lyrs=s@130'; //type 地图类型 矢量‘m@207000000’ 影像‘s@130’ 栅格‘t@130,r@207000000 道路‘h@207000000’
var googLayer = webGlobe.appendGoogleMap(type);

//url 可从IGserver发布的瓦片信息中获取
var url = 'http://192.168.10.14:6163/igs/rest/g3d/dem';
var sceneIndex = 0;
var layerRenderIndex = 0;
var terrainLayer = webGlobe.appendMapGISTerrain(url, sceneIndex, layerRenderIndex); //, '/Handler.ashx'
```


### 插值贴地

> appendLineOnTerrain(name, points, `step`, `level`, `callback(afterpoints)`)

|行参|类型|说明|
|:---|:---|:---|
|name|String|这是该贴地线的名字|
|points|数组|格式类型是 *** [point_1_x, point_1_y, ..... point_n_x, point_n_y] ***，`请特别注意，这里是一维数组`|
|step|Number|步长，决定多少米进行一次插值，`单位：米`|
|level|Number|级别，`由于地形数据存在不同的级别类型LOD，因此需要选定一个级别的地形数据进行插值`|
|callback|回调函数|返回插值后的点，类型是`PolylineGeometry`|

``` javascript
function convertPoints(points) {
    var positions = [];
    for (var i = 0; i < points.length; i++) {
        positions.push(points[i][0]);
        positions.push(points[i][1]);
        //positions.push(0);
    }
    return positions;
}

webGlobe.appendLineOnTerrain("text123", convertPoints(points), 100, 7, callback);
```