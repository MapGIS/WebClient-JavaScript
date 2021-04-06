## 交互式绘制几何图形

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现向天地图世界地图交互式绘制几何图形的功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现。先通过`ol.interaction.Draw()`方法构建交互式绘制控件，然后使用`map.addInteraction()`方法把交互式绘制控件添加到地图中。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div，并设置其样式;

**Step 3. <font color=red>创建地图</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图地图图层;

**Step 4. <font color=red>创建下拉菜单</font>**:
&ensp;&ensp;&ensp;&ensp;添加下拉菜单，实现菜单条响应事件，选择不同类型的几何图形绘制;

**Step 5. <font color=red>创建矢量图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化一个矢量图层 Vector 作为绘制层;

- Example:

  ```javascript
    //实例化一个矢量图层Vector作为绘制层
    vectorSource = new ol.source.Vector({ wrapX: false })
    commonStyle = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2,
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33',
        }),
      }),
    })
    vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: commonStyle,
    })
    //将绘制层添加到地图容器中
    map.addLayer(vectorLayer)
  ```

**Step 6. <font color=red>添加交互绘制控件，实现图形绘制</font>**:
&ensp;&ensp;&ensp;&ensp;添加交互式绘制控件,正方形需设置 value 为 circle 并且使用 createRegularPolygon 方法，长方形需要重写 geometryFunction 方法的几何信息。

- Example:

  ```javascript
    //绘制类型
    var value = pType
    if (pType != '') {
      var geometryFunction, maxPoints
      if (pType === 'Square') {
        value = 'Circle'
        //正方形图形（圆）
        geometryFunction = ol.interaction.Draw.createRegularPolygon(4)
      } else if (pType === 'Box') {
        value = 'LineString'
        maxPoints = 2
        geometryFunction = function(coordinates, geometry) {
          if (!geometry) {
            //多边形
            geometry = new ol.geom.Polygon(null)
          }
          var start = coordinates[0]
          var end = coordinates[1]
          geometry.setCoordinates([[start, [start[0], end[1]], end, [end[0], start[1]], start]])
          return geometry
        }
      } else if (pType === 'ArrowLine') {
        value = 'LineString'
        geometryFunction = null
      }

      //实例化交互绘制类对象并添加到地图容器中
      drawTool = new ol.interaction.Draw({
        //绘制层数据源
        source: vectorSource,
        /** @type {ol.geom.GeometryType}几何图形类型 */
        type: value,
        //几何信息变更时调用函数
        geometryFunction: geometryFunction,
        //最大点数
        maxPoints: maxPoints,
      })
      map.addInteraction(drawTool)
    }
  ```

### 关键接口

#### 1.【交互绘制类】`ol.interaction.Draw()`

##### 【method】`createRegularPolygon(opt_sides, opt_angle)`：添加规则多边形

| 参数名    | 类型   | 说明 |
| --------- | ------ | ---- |
| opt_sides | Number | 边数 |
| opt_angle | Number | 角度 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_interaction_Draw.html
https://openlayers.org/en/v5.3.0/apidoc/module-ol_interaction_Draw.html#.createRegularPolygon

#### 2.【地图容器类】`ol.Map`

##### 【method】`addInteraction(interaction)`：添加交互对象

| 参数名      | 类型           | 说明           |
| ----------- | -------------- | -------------- |
| interaction | ol.interaction | 交互类基类对象 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_Map-Map.html#addInteraction
