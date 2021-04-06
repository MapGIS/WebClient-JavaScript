## 获取几何信息

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现了在绘制几何图形时，同时输出几何图形的信息。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。首先通过`ol.interaction.Draw()`方法构建交互式绘制控件，通过`drawTool.on('drawend', function (e) {})`设置绘制完成时事件。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div，并设置其样式;

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数;

**Step 4. <font color=red>添加交互式绘制控件</font>**:
&ensp;&ensp;&ensp;&ensp;构建交互式绘制控件;

* Example:

    ```javascript
        //绘制类型
        var value = pType;
        if (pType != "") {
            var geometryFunction, maxPoints;
            if (pType === 'Square') {
                value = 'Circle';
                //正方形图形（圆）
                geometryFunction = ol.interaction.Draw.createRegularPolygon(4);

            } else if (pType === 'Box') {
                value = 'LineString';
                maxPoints = 2;
                geometryFunction = function (coordinates, geometry) {
                    if (!geometry) {
                        //多边形
                        geometry = new ol.geom.Polygon(null);
                    }
                    var start = coordinates[0];
                    var end = coordinates[1];
                    geometry.setCoordinates([
                        [start, [start[0], end[1]], end, [end[0], start[1]], start]
                    ]);
                    return geometry;
                };
            }else if (pType==="ArrowLine")
            {
                value  = "LineString";
                geometryFunction = null;
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
                maxPoints: maxPoints
            });
        }
    ```
**Step 5. <font color=red>添加绘制完成回调函数</font>**:
&ensp;&ensp;&ensp;&ensp;监听绘制完成事件，回调函数实现获取绘制的几何信息;

* Example:

    ```javascript
        drawTool.on('drawend', function(e) {
            switch (pType) {
                case 'Circle':
                    var center = e.feature.getGeometry().getCenter()
                    var radius = e.feature.getGeometry().getRadius()
                    alert('圆心坐标：' + center + '\n圆半径为：' + radius)
                    break
                case 'Point':
                    var coordinates_Point = e.feature.getGeometry().getCoordinates()
                    alert(coordinates_Point)
                    break
                case 'LineString':
                    var coordinates_Line = e.feature.getGeometry().getCoordinates()
                    var str = ''
                    for (var i = 0; i < coordinates_Line.length; i++) {
                        str += coordinates_Line[i] + '\n'
                    }
                    alert(str)
                    break
                default:
                    var coordinates_Polygon = e.feature.getGeometry().getCoordinates()
                    var str = ''
                    for (var i = 0; i < coordinates_Polygon[0].length; i++) {
                        str += coordinates_Polygon[0][i] + '\n'
                    }
                    alert(str)
            }
        })
    ```

### 关键接口

#### 1.【交互绘制类】`ol.interaction.Draw()`

##### 【method】`on(type, listener)`：监听交互绘制事件
| 参数名        | 类型               | 说明                   |
| ---------- | ---------------------| ---------------------- |
| type       | String|Array{String} | 事件类型                |
| listener   | function             | 监听事件发生时触发的函数 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_interaction_Draw.html

#### 2.`ol.interaction.Draw.on(DrawEventType, function (e) {})`

**详细信息见 Openlayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_interaction_Draw.html#~DrawEventType
