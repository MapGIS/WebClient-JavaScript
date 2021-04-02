## 区要素编辑

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现了对 MapGIS 地图文档中区图层的添加区要素，删除区要素，修改区要素操作

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现。通过`Zondy.Service.EditDocFeature`实例化服务，通过`add`方法添加区要素，通过`deletes`方法删除区要素，调用`update`方法更新区要素。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

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

**Step 4. <font color=red>加载矢量图层</font>**：
&ensp;&ensp;&ensp;&ensp;加载MapGIS矢量图层；

* Example

    ```javascript
        //加载地图文档图层
        MapDocLayer = new Zondy.Map.MapDocTileLayer("MapGIS IGS VectorMapdocLayer", "FeatureEditForPolygon", {
            ip: "develop.smaryun.com",
            port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
            isBaseLayer: true
        });
        map.addLayer(MapDocLayer);
    ```

**Step 5. <font color=red>添加区要素</font>**：
&ensp;&ensp;&ensp;&ensp;添加交互式绘制控件，通过控件绘制区，获取鼠标绘制区坐标,设置区要素信息,调用服务添加区要素；

* Example:

    ```javascript
        //实例化一个矢量图层Vector作为绘制层
        var vector = new ol.layer.Vector()
        var source = new ol.source.Vector({ wrapX: false })
        //添加绘制层数据源
        vector.setSource(source)
        //实例化交互绘制类对象并添加到地图容器中
        drawTool = new ol.interaction.Draw({
            //绘制层数据源
            source: source,
            //几何图形类型
            type: 'Polygon',
        })
        drawTool.on('drawend', function(evt){
            var geomObj = new Zondy.Object.Polygon()
            //把openlayers图形几何结构转化为
            geomObj.setByOL(evt.feature.values_.geometry)
            //获取所有顶点坐标
            for (i = 0; i < geomObj.pointArr.length; i++) {
                x[i] = geomObj.pointArr[i].x
                y[i] = geomObj.pointArr[i].y
            }
            //构成区要素的点
            var pointObj = new Array()
            for (var j = 0; j < x.length; j++) {
                pointObj[j] = new Zondy.Object.Point2D(x[j], y[j])
            }
            //设置区要素的几何信息
            var gArc = new Zondy.Object.Arc(pointObj)
            //构成区要素折线
            var gAnyLine = new Zondy.Object.AnyLine([gArc])
            //构成区要素
            var gRegion = new Zondy.Object.GRegion([gAnyLine])
            //构成区要素的几何信息
            var fGeom = new Zondy.Object.FeatureGeometry({ RegGeom: [gRegion] })

            //设置区要素的图形参数信息
            var cRegionInfo = new Zondy.Object.CRegionInfo({
                //结束填充颜色，在渐变模式下设置才有意义。（请参考MapGIS颜色库中颜色编号）
                EndColor: 1,
                //填充颜色，在渐变模式下设置才有意义。（请参考MapGIS颜色库中颜色编号）
                FillColor: 6,
                //填充模式。取值范围：0（常规模式）、1（线性渐变模式）、2（矩形渐变模式）、3（圆形渐变模式）。
                FillMode: 0,
                //填充图案笔宽
                OutPenWidth: 1,
                //填充图案角度，取值范围为0~360。
                PatAngle: 1,
                //填充图案颜色（请参考MapGIS颜色库中颜色编号）
                PatColor: 1,
                //填充图案高度
                PatHeight: 1,
                //填充图案ID（请参考MapGIS符号库中线符号编号）
                PatID: 27,
                //填充图案宽度
                PatWidth: 1,
            })
            //要素图形参数信息
            var graphicInfo = new Zondy.Object.WebGraphicsInfo({
                InfoType: 3,
                RegInfo: cRegionInfo,
            })
            //设置区要素的属性信息
            var attValue = [0, 12345, 12345, 'esstLake', 'esstLake', 'esstLake']
            //创建一个新的区要素
            var newFeature = new Zondy.Object.Feature({
                AttValue: attValue,
                fGeom: fGeom,
                GraphicInfo: graphicInfo,
            })
            newFeature.setFType(3)
            //创建一个要素数据集
            var featureSet = new Zondy.Object.FeatureSet()
            var fldNumber = 6
            var fldType = ['long', 'double', 'double', 'string', 'string', 'string']
            var fldName = ['ID', '面积', '周长', 'CNTRY_NAME', 'FIRST_FIRS', 'name']
            var cAttValue = new Zondy.Object.CAttStruct({
                FldNumber: fldNumber,
                FldType: fldType,
                FldName: fldName,
            })
            featureSet.AttStruct = cAttValue
            featureSet.addFeature(newFeature)
            //创建一个要素编辑服务对象
            var editDocFeature = new Zondy.Service.EditDocFeature('FeatureEditForPolygon', 0, {
                ip: 'develop.smaryun.com',
                port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
            })
            editDocFeature.add(featureSet, function(rlt){
                if (rlt) {
                    alert('添加区要素成功！')
                    //刷新图层
                    MapDocLayer.refresh()
                } else {
                    alert('添加区要素失败！')
                }
            })
        })
        //添加绘制控件
        map.addInteraction(drawTool)
    ```

**Step 6. <font color=red>删除区要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中区要素，在查询成功回调函数中获取要素 FID，进行区要素删除操作;

* Example:

    ```javascript
        //选择点所在的地图文档
        var deleteService = new Zondy.Service.EditDocFeature('FeatureEditForPolygon', 0, {
            ip: 'develop.smaryun.com',
            port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
        })
        deleteService.deletes(featureIds, function(rlt){
            if (rlt) {
                alert('删除区要素成功！')
                //刷新图层
                MapDocLayer.refresh()
            } else {
                alert('删除区要素失败！')
            }
        })
    ```

**Step 7. <font color=red>更新线要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中线要素.在查询成功回调函数中获取要素 FID，进行线要素更新操作；

* Example:

    ```javascript
        //设置区要素的图形参数信息
        var cRegionInfo = new Zondy.Object.CRegionInfo({
            //结束填充颜色，在渐变模式下设置才有意义。（请参考MapGIS颜色库中颜色编号）
            EndColor: document.getElementById('EndColor').value,
            //填充颜色，在渐变模式下设置才有意义。（请参考MapGIS颜色库中颜色编号）
            FillColor: document.getElementById('FillColor').value,
            //填充模式。取值范围：0（常规模式）、1（线性渐变模式）、2（矩形渐变模式）、3（圆形渐变模式）。
            FillMode: document.getElementById('FillMode').value,
            //填充图案笔宽
            OutPenWidth: document.getElementById('OutPenWidth').value,
            //填充图案角度，取值范围为0~360。
            PatAngle: document.getElementById('PatAngle').value,
            //填充图案颜色（请参考MapGIS颜色库中颜色编号）
            PatColor: document.getElementById('PatColor').value,
            //填充图案高度
            PatHeight: document.getElementById('PatHeight').value,
            //填充图案ID（请参考MapGIS符号库中线符号编号）
            PatID: document.getElementById('PatID').value,
            //填充图案宽度
            PatWidth: document.getElementById('PatWidth').value,
        })
        //要素图形参数信息
        var graphicInfo = new Zondy.Object.WebGraphicsInfo({
            InfoType: 3,
            RegInfo: cRegionInfo,
        })
        //设置区要素图形信息
        resultReg.SFEleArray[0].graphicInfo = graphicInfo
        //设置区素属性信息(创建线图层时属性信息数组会自动添加三个个属性信息，设置从第四个开始)
        resultReg.SFEleArray[0].AttValue[3] = document.getElementById('ID').value
        resultReg.SFEleArray[0].AttValue[4] = document.getElementById('area').value
        resultReg.SFEleArray[0].AttValue[5] = document.getElementById('perimeter').value
        resultReg.SFEleArray[0].AttValue[6] = document.getElementById('CNTRY_NAME').value
        resultReg.SFEleArray[0].AttValue[7] = document.getElementById('FIRST_FIRS').value
        resultReg.SFEleArray[0].AttValue[8] = document.getElementById('name').value
        //创建一个要素编辑服务对象
        var editDocFeature = new Zondy.Service.EditDocFeature('FeatureEditForPolygon', '0', {
            ip: 'develop.smaryun.com',
            port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
        })
        editDocFeature.update(resultReg, function(data){
            if (data.succeed) {
                alert('修改区要素成功！')
                //刷新图层
                MapDocLayer.refresh()
            } else {
                alert('修改区要素失败！')
            }
        })
    ```

### 关键接口

#### 1.【地图文档要素编辑类】`Zondy.Service.EditDocFeature(docName, layerIndex, opt_options)`

|参数名| 类型 |描述|
|-----------|------|----|
|docName    |String|地图文档名称|
|layerIndex |Number|图层的索引号，默认从 0 开始。|
|opt_options|Object|可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 Zondy.Service.EditServiceBase 、 Zondy.Service.HttpRequest 类的属性。例如：{key1： value1, key2 ：value2 …}。例如：{key1：value1, key2：value2…} |

##### 【method】`add(features,onSuccess,onError,options)`添加要素

| 参数名  | 类 型        | 说 明    |
| ------- | ------------ | -------- |
| features  | Zondy.Object.FeatureSet | 添加的要素集合                        |
| onSuccess | Function                | 成功回调函数                          |
| onError   | Function                | 失败回调函数                          |
| options   | Object                  | 可选项，设置其他扩展 ajax 请求补充参数 |

##### 【method】`update(features,onSuccess,onError,options)`更新要素

| 参数名  | 类 型        | 说 明    |
| ------- | ------------ | -------- |
| features  | Zondy.Object.FeatureSet | 更新的要素集合                        |
| onSuccess | Function                | 成功回调函数                          |
| onError   | Function                | 失败回调函数                          |
| options   | Object                  | 可选项，设置其他扩展 ajax 请求补充参数 |

##### 【method】`deletes(featureIds,onSuccess, onError, options)`删除要素

| 参数名  | 类 型        | 说 明    |
| ------- | ------------ | -------- |
| featureIds | String                  | 需要删除的要素的 OID 号，多个用“，”分隔，例如”OID1,OID2,OID3…”。|
| onSuccess  | Function                | 成功回调函数                          |
| onError    | Function                | 失败回调函数                          |
| options    | Object                  | 可选项，设置其他扩展 ajax 请求补充参数 |
