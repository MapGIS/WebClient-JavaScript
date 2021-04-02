## 要素缓冲分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现针对几何要素的单圈或多圈的缓冲分析。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库；

**Step 2. <font color=red>构建地图对象,创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建以`id="mapCon"`的div作为容器的地图对象，并设置当前视图的中心点及投影信息；
    
* Example:

    ```javascript
        var map = new ol.Map({
            target: 'mapCon', //地图容器div的ID
            controls: ol.control.defaults({
                attributionOptions: {
                    collapsible: true,
                },
            }),
            view: new ol.View({
                center: [108, 34], //地图初始中心点
                maxZoom: 28, //最大瓦片显示级数
                minZoom: 1, //最小瓦片显示级数
                zoom: 5, //地图初始显示级数
                projection: 'EPSG:4326',
            }),
        });
    ```
**Step 3. <font color=red>添加源几何多边形</font>**:
&ensp;&ensp;&ensp;&ensp;创建矢量图层，和矢量数据源，添加多边形要素，作为源数据在地图上显示；
   
* Example:

    ```javascript
        var vectorSource = new ol.source.Vector();
        //创建一个多变形
        var polygon = new ol.Feature({
            geometry: new ol.geom.Polygon([[[0.46, 30.1], [11.48, 6.22], [36.73, 7.6],[58.77, 25.51],[41.33, 49.39]]])
        });
        //设置区样式信息
        polygon.setStyle(new ol.style.Style({
            //填充色
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.5)'
            }),
            //边线颜色
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            })
        }));
        vectorSource.addFeatures([polygon]);

            //创建一个图层
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            zIndex:1
        });
        //将绘制层添加到地图容器中
        map.addLayer(vectorLayer);
    ```
**Step 4. <font color=red>构建MapGIS自定义的多边形要素对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建与上一步相同坐标的MapGIS自定义的`Zondy.Object.FeatureGeometry()`几何要素对象，同时构建该要素的属性结构及属性记录信息；
   
* Example:

    ```javascript
        //初始化Zondy.Object.FeatureGeometry对象
        var regGeo = new Zondy.Object.FeatureGeometry();
        //设置区要素的空间几何信息
        var gReg = new Zondy.Object.GRegion([
                new Zondy.Object.AnyLine([new Zondy.Object.Arc([
                    new Zondy.Object.Point2D(0.46, 30.1),
                    new Zondy.Object.Point2D(11.48, 6.22),
                    new Zondy.Object.Point2D(36.73, 7.6),
                    new Zondy.Object.Point2D(58.77, 25.51),
                    new Zondy.Object.Point2D(41.33, 49.39),
                    new Zondy.Object.Point2D(0.46, 30.1)
                ])
            ])
        ]);
        regGeo.setRegGeom([gReg]);
        //设置属性结构
        var regAttStr = new Zondy.Object.CAttStruct({
            FldName: ["ID", "面积", "周长", "LayerID"],
            FldNumber: 4,
            FldType: ["FldLong", "FldDouble", "FldDouble", "FldLong"]
        });
        //实例化CAttDataRow类
        var values = [0, 62.566714, 50.803211, 0];
        var valuesRow = new Zondy.Object.CAttDataRow(values, 1);
    ```


**Step 5. <font color=red>实现要素单圈缓冲分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建要素单圈缓冲服务对象，设置相应的源几何要素、结果数据的URL及缓冲半径，并执行缓冲分析；
    
* Example:

    ```javascript
        //实例化FeatureBuffBySingleRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲分析结果图层
        var featureBufBySR = new Zondy.Service.FeatureBuffBySingleRing({
            ip: "develop.smaryun.com",
            port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
            //设置要素缓冲分析左半径
            leftRad: 2,
            //设置要素缓冲分析右半径    
            rightRad: 2     
        });
        /*设置缓冲分析参数*/
        //设置几何信息
        featureBufBySR.sfGeometryXML = JSON.stringify([regGeo]); 
        //设置属性结构
        featureBufBySR.attStrctXML = JSON.stringify(regAttStr);
        //设置属性值
        featureBufBySR.attRowsXML = JSON.stringify([valuesRow]);
        //设置追踪半径
        featureBufBySR.traceRadius = 0.0001;
        //设置缓冲结果的名称以及存放地址
        var resultname = "singleBuffResultLayer" + getCurentTime();
        featureBufBySR.resultName = resultBaseUrl + resultname;
        //调用Zondy.Service.AnalysisBase基类的execute方法执行要素缓冲分析，AnalysisSuccess为回调函数。
        featureBufBySR.execute(AnalysisSuccess,"post",()=>{});
    ```

**Step 6. <font color=red>实现要素多圈缓冲分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建要素多圈缓冲服务对象，设置相应的源几何要素包括几何信息、属性结构和属性记录、结果数据的URL及缓冲半径，并执行缓冲分析；
    
* Example:

    ```javascript
        //实例化FeatureBuffByMultiplyRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲分析结果图层
        var featureBufByMR = new Zondy.Service.FeatureBuffByMultiplyRing({
            ip: "develop.smaryun.com",
            port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
            //设置多圈缓冲分析的缓冲半径字符串
            radiusStr: "2,4,6"		
        });
        featureBufByMR.sfGeometryXML = JSON.stringify([regGeo]);
        featureBufByMR.attStrctXML = JSON.stringify(regAttStr);
        featureBufByMR.attRowsXML = JSON.stringify([valuesRow]);
        featureBufByMR.traceRadius = 0.0001;

        var resultname = "multiBuffResultLayer" + getCurentTime();
        featureBufByMR.resultName = resultBaseUrl + resultname;
        //调用Zondy.Service.AnalysisBase基类的execute方法执行要素缓冲分析，AnalysisSuccess为回调函数。
        featureBufByMR.execute(AnalysisSuccess,"post",()=>{});
    ```

**Step 7. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用Step5和Step6的分析服务执行成功的回调函数中返回的结果数据名称，构建MapGIS的服务图层对象，添加到地图容器中进行显示；
    
* Example:

    ```javascript
        //分析成功后的回调
        function AnalysisSuccess(data) {
            if (!data.results) {
                alert("缓冲失败，请检查参数！");
            }
            else {
                if (data.results.length != 0) {
                    var resultLayerUrl = data.results[0].Value || data.results[0].value;
                    //将结果图层添加到地图视图中显示
                    var resultLayer = new Zondy.Map.GdbpLayer("MapGIS IGS BuffAnalyResultLayer", [resultLayerUrl], {
                        ip: "develop.smaryun.com",
                        port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
                        isBaseLayer: false
                    });
                    map.addLayer(resultLayer);
                    resultLayerArr.push(resultLayer);
                }
            }
        }
    ```

### 关键接口

#### 1.【要素单圈缓冲分析服务】`Zondy.Service.FeatureBuffBySingleRing(options)`

| 参数名    | 类 型             | 说 明             |
| --------- | ----------------- | ----------------- |
| options   | Object            | （可选）附加属性  |

* `options`属性主要参数

| 参数名      | 类 型    | 默认值 | 说 明                                      |
| ------------| ------- | ------ | ------------------------------------------|
| leftRad     | Number  | 0.001  | （可选）缓冲分析左半径                      |
| rightRad    | Number  | 0.001  | （可选）缓冲分析右半径                      |
 
##### 【method】`execute(onSuccess, way, onError)`：执行空间缓冲分析服务

| 参数名     | 类型     | 说明                                                |
| ---------- | ------- | --------------------------------------------------- |
| onSuccess  | function | 必要参数，执行成功后的回调函数                        |
| way        | String   | 必要参数，服务器请求类型,'POST' or 'GET'，默认为'Get' |
| onError    | function | 必要参数，执行失败回调函数                            |

#### 2.【要素多圈缓冲分析服务】`Zondy.Service.FeatureBuffByMultiplyRing(options)`

| 参数名    | 类 型             | 说 明             |
| --------- | ----------------- | ----------------- |
| options   | Object            | （可选）附加属性  |

* `options`属性主要参数

| 参数名      | 类 型    | 默认值   | 说 明                                  |
| ------------| ------- | -------- | --------------------------------------|
| radiusStr   | String  |"0.003,0.002,0.001"|(可选)多圈缓冲分析各圈的缓冲半径 |

#### 3.【MapGIS矢量地图图层】`Zondy.Map.GdbpLayer(opt_name,opt_gdbps,opt_options)`

| 参数名       | 类 型          | 说 明                     |
| ----------- | ---------------|---------------------------|
| opt_name    | String         | 显示图层的名称             |
| opt_gdbps   | Array.{String}  | 简单要素类的URL地址信息数组 |
| opt_options | Object         | （可选）附加属性           |

* `opt_options`属性主要参数

| 参数名    | 类 型                             | 默认值      | 说 明                         |
| ---------| -----------------------------------|-----------|-------------------------------|
| ip       | String                             |"127.0.0.1"| （必选）服务器ip地址            |
| port     | String                             | "6163"    |（必选）服务器端口号              |
| gdbps    | Array{String}                      | Null      | 简单要素类的URL地址信息数组      |
| f        | String                             | "png"     | 图像类型，取值为：jpg、png、gif  |
| filters  | String                             | Null      | 图层过滤条件                    |  
| style    | Array{Zondy.Object.CDisplayStyle}  | Null      | 矢量图层显示样式参数             |  
| extent   | Array.{Number}                     |           | 图层数据范围                    |  
| guid     | String                             |           | 矢量图层缓存的唯一标识           |  

**详细信息见 OpenLayers API**
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.FeatureBuffBySingleRing.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.FeatureBuffByMultiplyRing.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.FeatureBuffBase.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.AnalysisBase.html



