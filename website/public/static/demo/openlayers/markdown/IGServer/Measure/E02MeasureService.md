## 量算服务

### 示例功能
&ensp;&ensp;&ensp;&ensp;该示例实现了在地图容器中添加测量功能，能够完成在地图上进长度测量、面积测量功能。

### 示例实现
&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现。通过`Zondy.Service.CalPolyLineLength`实例化折线长度测量功能服务，通过`execute`执行长度测量服务；通过`Zondy.Service.CalArea`实例化面积测量功能服务，通过`execute`执行面积测量服务。

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
                var geom = evt.target //绘制几何要素
                var flatCoordinates = geom.flatCoordinates
                var dots = []
                var length = flatCoordinates.length
                for (var i = 0; i < length; i += 2) {
                    dots.push(new Zondy.Object.Point2D(flatCoordinates[i], flatCoordinates[i + 1]))
                }
                var output
                if (geom instanceof ol.geom.Polygon) {
                    CalArea(dots)
                    tooltipCoord = geom.getInteriorPoint().getCoordinates() //坐标
                } else if (geom instanceof ol.geom.LineString) {
                    CalPolyLineLength(dots)
                    tooltipCoord = geom.getLastCoordinate() //坐标
                }
                measureTooltip.setPosition(tooltipCoord) //设置测量工具提示框的显示位置
            });
        }, this);
        //绑定交互绘制工具结束绘制的事件
        draw.on('drawend',function (evt) {
            measureTooltipElement.className = 'tooltip tooltip-static' //设置测量提示框的样式
            measureTooltip.setOffset([0, -7])
            sketch = null //置空当前绘制的要素对象
            // unset tooltip so that a new one can be created
            measureTooltipElement = null //置空测量工具提示框对象
            createMeasureTooltip() //重新创建一个测试工具提示框显示结果
            ol.Observable.unByKey(listener)
        }, this);
        //将交互绘制层添加到地图容器中
        map.addLayer(interActionLayer)
        map.addInteraction(draw)
    ```

**Step 5. <font color=red>初始化折线长度测量功能服务</font>**：
&ensp;&ensp;&ensp;&ensp;实例化一个求对象类`Zondy.Service.CalPolyLineLength`,通过`execute`方法获取几何对象长度;

* Example

    ```javascript
    //初始化长度测量服务
        var calLength = new Zondy.Service.CalPolyLineLength(dots, {
            //IP地址
            ip: `${ip}`,
            //端口号
            port: `${port}`,
        })
        //建议普通用户采用此类直接获取MapGIS GDB已经提供的空间参考系
        var gdbInfo = new Zondy.Object.CGDBInfo({
            //数据库名称
            GDBName: 'OpenLayerVecterMap',
            //数据源名称
            ServerName: 'MapGISLocal',
            //除MapGISLocal数据源，其它的都设置
            Password: '',
            //除MapGISLocal数据源，其它的都设置
            User: '',
        })
        //用于进行SRSID投影的参数类
        var projBySRSID = new Zondy.Service.CProjectBySRSID(601, gdbInfo)
        //执行长度测量服务，measureCallBack为测量回调函数
        calLength.execute(projBySRSID, function(data){
            if (data && data.succeed) {
                var length = data.value
                var output
                if (length > 100) {
                    output = Math.round((length / 1000) * 100) / 100 + '' + 'km'
                } else {
                    output = Math.round(length * 100) / 100 + '' + 'm'
                }
                measureTooltipElement.innerHTML = output
                measureTooltip.setPosition(tooltipCoord)
                measureTooltipElement.className = 'tooltip tooltip-static'
                measureTooltipElement.id = 'tooltip-static'
                // measureTooltip.setOffset([0, -7]);
                sketch = null
                measureTooltipElement = null
                createMeasureTooltip()
                ol.Observable.unByKey(listener)
            }
        })
    ```

**Step 6. <font color=red>初始化面积测量功能服务</font>**：
&ensp;&ensp;&ensp;&ensp;实例化一个求对象类`Zondy.Service.CalArea`,通过`execute`方法获取几何对象面积；

* Example

    ```javascript
        //初始化长度测量服务
        var calArea = new Zondy.Service.CalArea(dots, {
            //IP地址
            ip: `${ip}`,
            //端口号
            port: `${port}`,
        })
        //建议普通用户采用此类直接获取MapGIS GDB已经提供的空间参考系
        var gdbInfo = new Zondy.Object.CGDBInfo({
            //数据库名称
            GDBName: 'OpenLayerVecterMap',
            //数据源名称
            ServerName: 'MapGISLocal',
            //除MapGISLocal数据源，其它的都设置
            Password: '',
            //除MapGISLocal数据源，其它的都设置
            User: '',
        })
        //用于进行SRSID投影的参数类
        var projBySRSID = new Zondy.Service.CProjectBySRSID(601, gdbInfo)
        //执行长度测量服务，measureCallBack为测量回调函数
        calArea.execute(projBySRSID, function(data){
            if (data && data.succeed) {
                var area = data.value
                var output
                if (area > 10000) {
                    output = Math.round((area / 1000000) * 100) / 100 + '' + 'km<sup>2</sup>'
                } else {
                    output = Math.round(area * 100) / 100 + '' + 'm<sup>2</sup>'
                }
                measureTooltipElement.innerHTML = output
                measureTooltip.setPosition(tooltipCoord)
                measureTooltipElement.className = 'tooltip tooltip-static'
                measureTooltipElement.id = 'tooltip-static'
                // measureTooltip.setOffset([0, -7]);
                sketch = null
                measureTooltipElement = null
                createMeasureTooltip()
                ol.Observable.unByKey(listener)
            }
        })
    ```

### 关键接口

#### 1.【折线长度测量功能服务】`Zondy.Service.CalPolyLineLength(obj, opt_options)`

|参数名| 类型 |描述|
|-----------|------|----|
|obj        | Array-[Zondy.Object.Point2D] |需要计算的点数组|
|opt_options| Object |可选项，设置其他属性键值对对象。对象中的属性来自 Zondy.Service.CalServiceBase 、 Zondy.Service.GeometryAnalysisBase 类、Zondy.Service.HttpRequest 类的属性。例如：{key1： value1, key2 ：value2 …}|

#### 2.【面积测量功能服务】`Zondy.Service.CalArea(obj, opt_options)`

|参数名| 类型 |描述|
|-----------|------|----|
|obj        | Array-[Zondy.Object.Point2D] |需要计算的点数组，为保证多边形闭合，起点和终点需重合。|
|opt_options| Object |可选项，设置其他属性键值对对象。对象中的属性来自Zondy.Service.CalServiceBase 、 Zondy.Service.GeometryAnalysisBase 类、Zondy.Service.HttpRequest 类的属性。例如：{key1： value1, key2 ：value2 …}|