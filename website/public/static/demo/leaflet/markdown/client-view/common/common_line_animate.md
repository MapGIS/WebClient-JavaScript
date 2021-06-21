### 数据格式要求
> 通用可视化的格式要求是 GeoJSON
> 轨迹动画图目前支持`线数据`的 GeoJSON 格式

#### 示例数据
``` json
{
  "type": "Feature",
  "properties": {
    "mpLength": 0.009034870261226563,
    "mpLayer": 0,
    "编码": 140311,
    "测量人": "彭万里",
    "测量工具": "平板仪",
    "工具编号": "ZDBQ123456",
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [
        104.28810279829807,
        25.29834562080224
      ],
      [
        104.28813940993842,
        25.298321537786496
      ],
      [
        104.28840833594697,
        25.29814463878448
      ],
      [
        104.28854277993777,
        25.298093200788042
      ]
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
&ensp;&ensp;&ensp;&ensp;创建**天地图图层对象**cva和vec

**Step 5. <font color=red>创建实例化timeDimension对象</font>**；
&ensp;&ensp;&ensp;&ensp;创建timeDimension对象，参数如下；
* Example：
  ```javascript
        var timeDimension = new L.zondy.TimeDimension({
        period: "PT5M",
    });
  ```
### 参数说明
| 名称     | 类型   | 说明                                                               |
| ---      | ---    | ---                                                                |
| period     | 字符串 | 默认"P1D",用于构造从第一个可用时间开始的可用时间数组,格式：ISO8601持续时间                                             |
| currentTime      | 数字型 | milliseconds，当前加载时间                                                   |
| loadingTimeout    | 数字型 | 加载延迟时间 |

**Step 6. <font color=red>在所有图层中共享timeDimension对象</font>**；
&ensp;&ensp;&ensp;&ensp;创建timeDimension对象，参数如下；

- 在map中创建timeDimension对象。否则，必须在所有图层中设置“timeDimension”选项

* Example：
  ```javascript
    map.timeDimension = timeDimension;
  ```
**Step 7. <font color=red>创建播放器，将播放器player放入timeDimensionControl控制器中</font>**；
* Example：
  ```javascript
    var player = new L.zondy.TimeDimensionPlayer({
        transitionTime: 100,
        loop: false,
        startOver: true
    }, timeDimension);
    var timeDimensionControlOptions = {
        player: player,
        timeDimension: timeDimension,
        position: 'bottomleft',
        autoPlay: true,
        minSpeed: 1,
        speedStep: 0.5,
        maxSpeed: 15,
        timeSliderDragUpdate: true
    };
  ```
**Step 8. <font color=red>将timeDimensionControl添加到地图中</font>**；
* Example：
  ```javascript
    var timeDimensionControl = new L.zondy.TimeDimensionControl(timeDimensionControlOptions);
    map.addControl(timeDimensionControl);
  ```
  
**Step 9. <font color=red>将GeoJSON数据传入TimeDimensionLayerGeoJson</font>**
* Example:
   ```javascript
    $.get('./static/data/geojson/line-string.json', function (res) {
        geojson = initGeojson(res);
        var geoJSONLayer = L.geoJSON(geojson, {
            pointToLayer: function (feature, latLng) {
                if (feature.properties.hasOwnProperty("last")) {
                    return new L.Marker(latLng, {
                        icon: icon,
                    });
                }
                return L.circleMarker(latLng);
            },
        });
        var gpxTimeLayer = L.zondy.TimeDimensionLayerGeoJson(geoJSONLayer, {
            updateTimeDimension: true,
            duration: "PT2M",
            updateTimeDimensionMode: "replace",
            addlastPoint: true,
        });
        gpxTimeLayer.addTo(map);
    });
  ```
### 参数说明
| 名称     | 类型   | 说明                                                               |
| ---      | ---    | ---                                                                |
| updateTimeDimension     | Boolean | 用这个GeoJSON的可用时间更新附加TimeDimension的可用时间列表                                             |
| duration      | String | milliseconds，当前加载时间                                                |
| updateTimeDimensionMode    | 数字型 | 合并TimeDimension和图层的可用时间（相交(intersect)，并集(union)，替换(replace)或极端(extremes)）的操作，默认为"extremes" |
| addlastPoint    | Boolean | 在LineString的最后一个有效坐标处添加一个Point。默认为false|
| updateCurrentTime |Boolean|自动将地图的当前时间更改为GeoJSON图层的第一个可用时间,默认为updateTimeDimension的值|

  
