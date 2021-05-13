### 数据格式要求
> 通用可视化的格式要求是 GeoJSON
> 聚类图目前支持持`点数据`的 GeoJSON 格式

#### 示例数据
``` json
{
"type": "FeatureCollection",
"features": [
{ "type": "Feature", 
  "properties": { "AREA": 0, "PERIMETER": 0, "name": "三亚市", "mapgis_style": 1 }, 
  "geometry": { "type": "Point", "coordinates": [ 109.513357866988571, 18.2382733141521243 ] } },
{ "type": "Feature", 
  "properties": { "AREA": 0, "PERIMETER": 0, "name": "临沧", "mapgis_style": 1 }, 
  "geometry": { "type": "Point", "coordinates": [ 100.088115020674039, 23.880495588961768 ] } }
]
}
```
### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库，本示例通过本地离线【include-leaflet-local.js 】脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="map"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，具体操作参考`互联网地图`目录下的`天地图经纬度`示例；

**Step 4. <font color=red>创建天地图图层对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建**天地图图层对象**cva和vec，添加图层到地图对象中。

**Step 5. <font color=red>创建AnimatedMarkerLayer对象</font>**；
&ensp;&ensp;&ensp;&ensp;创建AnimatedMarkerLayer对象，示例和参数如下；
* Example：
  ```javascript
     var marker = L.zondy.AnimatedMarkerLayer(routeLine.getLatLngs(), {
         icon: bikeIcon,
         autoStart: true,
         distance: 200, // meters,表示每帧移动的距离,越大则一秒移动的距离越远,速度越快
         interval: 200, // milliseconds,每帧之间移动的时间间隔,与distance相互配合
         onEnd: function () {
               // TODO:
             this.remove();//消除该图标marker
         }
     });
  ```
### 参数说明
| 名称     | 类型   | 说明                                                               |
| ---      | ---    | ---                                                                |
| icon     | L.icon() | 动画的图标样式                                             |
| autoStart      | boolean | 是否自动开启该marker                                                   |
| distance    | 数字型 | meters,表示每帧移动的距离,越大则一秒移动的距离越远,速度越快 |
| interval    | 数字型 | milliseconds,每帧之间移动的时间间隔,与distance相互配合 |
| clickable   | boolean|如果是false，注记marker则不产生鼠标事件并表现为底层地图的一部分。|
|onEnd() | function | animate动画结束的回调

