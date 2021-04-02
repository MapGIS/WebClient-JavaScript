## 线要素编辑

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现了对<b>MapGIS线图层</b>的线要素添加，线要素删除，线要素修改操作；

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现。通过`Zondy.Service.EditLayerFeature`实例化服务，通过`add`方法添加线要素，通过`deletes`方法删除线要素，调用`update`方法更新线要素。

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
        //初始化矢量图层
        vectorLayer = new Zondy.Map.GdbpLayer("MapGIS IGS VectorLayer", ["gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mylinelayer"], {
            ip: "develop.smaryun.com",
            port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
            isBaseLayer: true
        });
        map.addLayer(vectorLayer);
    ```
**Step 5. <font color=red>添加线要素</font>**：
&ensp;&ensp;&ensp;&ensp;添加交互式绘制控件，通过控件绘制线，获取鼠标绘制线坐标,设置线要素信息,调用服务添加线要素；

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
            type: 'LineString',
        })
        drawTool.on('drawend', function(evt){
            //查询绘制线的信息
            var geomObj = new Zondy.Object.PolyLine()
            geomObj.setByOL(evt.feature.values_.geometry)
            //获取绘制线端点（折点）坐标
            for (i = 0; i < geomObj.pointArr.length; i++) {
                x[i] = geomObj.pointArr[i].x
                y[i] = geomObj.pointArr[i].y
            }
            //构成线要素的点
            var pointObj = new Array()
            for (var j = 0; j < i; j++) {
                pointObj[j] = new Zondy.Object.Point2D(x[j], y[j])
            }
            //构成折线的弧段
            var gArc = new Zondy.Object.Arc(pointObj)
            //构成线的折线
            var gAnyLine = new Zondy.Object.AnyLine([gArc])
            //设置线要素的几何信息
            var gline = new Zondy.Object.GLine(gAnyLine)
            //设置要素的几何信息
            var fGeom = new Zondy.Object.FeatureGeometry({ LinGeom: [gline] })
            //随机输出1~8之间的整数,作为新添加的要素的颜色号
            var lineColor = Math.floor(Math.random() * 8 + 1)
            //设置添加线要素的图形参数信息
            var clineInfo = new Zondy.Object.CLineInfo({
                //线颜色（请参考MapGIS颜色库中颜色编号）
                Color: lineColor,
                //线型ID（请参考MapGIS符号库中线符号编号）
                LinStyleID: 0,
                //辅助线型ID（请参考MapGIS符号库中线符号编号）
                LinStyleID2: 1,
                //线宽度
                LinWidth: 2,
                //x比例系数
                Xscale: 10,
                //y比例系数
                Yscale: 10,
            })
            //设置要素的图形参数信息
            var graphicInfo = new Zondy.Object.WebGraphicsInfo({
                InfoType: 2,
                LinInfo: clineInfo,
            })
            //设置添加线要素的属性信息，根据地图文档图形属性设置
            var attValue = [0, 46.191, 'Huanghe', '', 33, 0, '黄河']
            //创建一个线要素
            var newFeature = new Zondy.Object.Feature({
                fGeom: fGeom,
                GraphicInfo: graphicInfo,
                AttValue: attValue,
            })
            //设置要素为线要素
            newFeature.setFType(2)
            //创建一个要素数据集，根据地图文档图形属性设置
            var featureSet = new Zondy.Object.FeatureSet()
            var fldNumber = 7
            var fldName = ['ID', '长度', 'NAME', 'SYSTEM', 'FID1', 'LayerID', 'CName']
            var fldType = ['long', 'double', 'string', 'string', 'long', 'long', 'string']
            //创建属性结构设置对象
            var cAttStruct = new Zondy.Object.CAttStruct({
                FldName: fldName,
                FldNumber: fldNumber,
                FldType: fldType,
            })
            //设置要素数据集的树形结构
            featureSet.AttStruct = cAttStruct
            //将添加的线要素添加到属性数据集中
            featureSet.addFeature(newFeature)
            //创建一个地图编辑对象
            var editLayerFeature = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mylinelayer', {
                ip: 'develop.smaryun.com',
                port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
            })
            editLayerFeature.add(featureSet, onAddLineSuccess)
            //添加线要素回调函数
            function onAddLineSuccess(rlt) {
                if (rlt) {
                    alert('添加线要素成功！')
                    //刷新图层
                    vectorLayer.refresh()
                } else {
                    alert('添加线要素失败！')
                }
            }
        })
        //添加绘制控件
        map.addInteraction(drawTool)
    ```

**Step 6. <font color=red>删除线要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中线要素，在查询成功回调函数中获取要素 FID，进行线要素删除操作;

* Example:

    ```javascript
        //删除线要素
        function deleteLineByService(featureIds) {
            var deleteService = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mylinelayer', {
                ip: 'develop.smaryun.com',
                port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
            })
            deleteService.deletes(featureIds, onDeleteSuccess)
        }

        //删除线要素回调函数
        function onDeleteSuccess(rlt) {
            if (rlt) {
                alert('删除线要素成功！')
                //刷新图层
                vectorLayer.refresh()
            } else {
                alert('删除线要素失败！')
            }
        }
    ```

**Step 7. <font color=red>更新线要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中线要素.在查询成功回调函数中获取要素 FID，进行线要素更新操作；

* Example:

    ```javascript
            //线要素符号参数信息。
            var clineInfo = new Zondy.Object.CLineInfo({
                //线颜色（请参考MapGIS颜色库中颜色编号）
                Color: document.getElementById('lineColor').value,
                //线型ID（请参考MapGIS符号库中线符号编号）
                LinStyleID: document.getElementById('LinStyleID').value,
                //辅助线型ID（请参考MapGIS符号库中线符号编号）
                LinStyleID2: document.getElementById('LinStyleID2').value,
                //线宽度
                LinWidth: document.getElementById('LinWidth').value,
                //x比例系数
                Xscale: document.getElementById('lineXscale').value,
                //y比例系数
                Yscale: document.getElementById('lineYscale').value,
            })

            //设置要素的图形参数信息
            var graphicInfo = new Zondy.Object.WebGraphicsInfo({
                //要素图形参数类型
                InfoType: 2,
                //线要素符号参数信息。
                LinInfo: clineInfo,
            })
            resultLine.SFEleArray[0].graphicInfo = graphicInfo
            //设置要素属性信息(创建线图层时属性信息数组会自动添加两个属性信息，设置从第三个开始)
            resultLine.SFEleArray[0].AttValue[2] = document.getElementById('ID').value
            resultLine.SFEleArray[0].AttValue[3] = document.getElementById('length').value
            resultLine.SFEleArray[0].AttValue[4] = document.getElementById('NAME').value
            resultLine.SFEleArray[0].AttValue[5] = document.getElementById('SYSTEM').value
            resultLine.SFEleArray[0].AttValue[6] = document.getElementById('FID1').value
            resultLine.SFEleArray[0].AttValue[7] = document.getElementById('LayerID').value
            resultLine.SFEleArray[0].AttValue[8] = document.getElementById('CName').value
            //创建一个编辑服务类
            var editService = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mylinelayer', {
                ip: 'develop.smaryun.com',
                port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
            })
            editService.update(resultLine, onLineUpdateSuccess)
        }
        //修改线要素回调函数
        function onLineUpdateSuccess(data) {
            if (data.succeed) {
                alert('修改线要素成功！')
                //刷新图层
                vectorLayer.refresh()
            } else {
                alert('修改线要素失败！')
            }
        }
    ```

### 关键接口

#### 1.【图层要素编辑类】`Zondy.Service.EditLayerFeature(gdbp, opt_options)`

|参数名| 类型 |描述|
|-----------|------|----|
| gdbp      |String| 矢量图层地址信息（包括源要素类存储路径与名称），用户根据语法设置 URL 地址，或在数据库中图层节点上右击选择“复制 URL”获得。|
| opt_options|Object| 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 Zondy.Service.EditServiceBase 、 Zondy.Service.HttpRequest 类的属性。例如：{key1： value1, key2 ：value2 …} |

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
