## 量算工具

### 示例功能
&ensp;&ensp;&ensp;&ensp;该示例实现了在地图容器中加载测量控件的功能，能够完成在地图上进长度测量、面积测量功能。

### 示例实现
&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现。通过`ol.Sphere`实例化球对象类，通过`getLength`方法获取几何对象长度，通过`getArea`方法获取几何对象面积。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-openlayers-local.js】脚本引入开发库；

**Step 2. <font color=red>创建地图容器</font>**：
&ensp;&ensp;&ensp;&ensp;再创建`id="mapCon"`的 div，并设置其样式；

* Example

    ```javascript
        <div id="mapCon"></div>
    ```

**Step 3. <font color=red>创建地图对象</font>**：
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数；

* Example

    ```javascript
        //初始化地图容器
        map = new ol.Map({
            target: 'mapCon',     //地图容器div的ID
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: true
                })
            }),
            view: new ol.View({
                center: [0, 0],
                zoom: 3,
                projection: 'EPSG:4326'
            }),
            layers:[TiandiMap_vectIGS,TiandiMap_ciaIGS]
        });
    ```

**Step 4. <font color=red>初始化交互绘制类对象</font>**：
&ensp;&ensp;&ensp;&ensp;实例化一个矢量图层作为交互绘制层，例化交互绘制类对象`ol.interaction.Draw`，设置绘制类型为点类型，并通过`Map`对象的 `addInteraction`方法添加到地图容器中；

* Example

    ```javascript
        interActionSource = new ol.source.Vector({ wrapX: false })
        interActionLayer = new ol.layer.Vector({
            source: interActionSource,
            style: new ol.style.Style({
                //填充色
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                //边线样式
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2,
                }),
            }),
        })
        //实例化交互绘制类对象并添加到地图容器中
        draw = new ol.interaction.Draw({
            type: /** @type {ol.geom.GeometryType} */ (type),  //几何图形类型
            //绘制层数据源
            source: interActionSource,
        })
        //绑定交互绘制工具开始绘制的事件
        draw.on('drawstart',function (evt) {
            sketch = evt.feature; //绘制的要素
            /** @type {ol.Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;// 绘制的坐标
            //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
            listener = sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;//绘制几何要素
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(/** @type {ol.geom.Polygon} */(geom));//面积值
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();//坐标
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength( /** @type {ol.geom.LineString} */(geom));//长度值
                    tooltipCoord = geom.getLastCoordinate();//坐标
                }
                measureTooltipElement.innerHTML = output;//将测量值设置到测量工具提示框中显示
                measureTooltip.setPosition(tooltipCoord);//设置测量工具提示框的显示位置
            });
        }, this);
        //绑定交互绘制工具结束绘制的事件
        draw.on('drawend',function (evt) {
            measureTooltipElement.className = 'tooltip tooltip-static'; //设置测量提示框的样式
            measureTooltip.setOffset([0, -7]);
            sketch = null; //置空当前绘制的要素对象
            // unset tooltip so that a new one can be created
            measureTooltipElement = null; //置空测量工具提示框对象
            createMeasureTooltip();//重新创建一个测试工具提示框显示结果
            ol.Observable.unByKey(listener);
        }, this);
        //将交互绘制层添加到地图容器中
        map.addLayer(interActionLayer)
        map.addInteraction(draw)
    ```

**Step 5. <font color=red>初始化球对象类</font>**：
&ensp;&ensp;&ensp;&ensp;实例化一个求对象类`ol.Sphere`,通过`getLength`方法获取几何对象长度，通过`getArea`方法获取几何对象面积；

* Example

    ```javascript
        var area;
        var sphere = new ol.Sphere();
        if (geodesicCheckbox.checked) {//若使用测地学方法测量
            var sourceProj = map.getView().getProjection();//地图数据源投影坐标系
            var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(sourceProj, 'EPSG:4326')); //将多边形要素坐标系投影为EPSG:4326
            area = Math.abs(sphere.getArea(geom, { "projection": sourceProj, "radius": 6378137 })); //获取面积
        } else {
            area = polygon.getArea();//直接获取多边形的面积
        }
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>'; //换算成KM单位
        } else {
            output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';//m为单位
        }
        return output; //返回多边形的面积
    ```


### 关键接口

#### 1.【球对象类】`ol.Sphere`
**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_sphere.html