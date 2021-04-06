## 点要素编辑

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现了对<b>MapGIS点图层</b>的点要素添加，点要素删除，点要素修改等操作。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现。通过`Zondy.Service.EditLayerFeature`实例化服务，通过`add`方法添加点要素，通过`deletes`方法删除点要素，通过`update`方法更新点要素。

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
        vectorLayer = new Zondy.Map.GdbpLayer("MapGIS IGS VectorLayer", ["gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mypntlayer"], {
            ip: "develop.smaryun.com",
            port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
            isBaseLayer: true
        });
        map.addLayer(vectorLayer);
    ```

**Step 5. <font color=red>添加点要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，获取鼠标点击点坐标,设置点要素信息,调用服务添加点要素；

* Example:

    ```javascript
        map.addEventListener('click', function(e){
            //创建一个点形状，描述点形状的几何信息
            var gpoint = new Zondy.Object.GPoint(e.coordinate[0], e.coordinate[1])
            //设置当前点要素的几何信息
            var fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] })
            //随机输出1~8之间的整数,作为新添加的要素的颜色号
            var pntColor = Math.floor(Math.random() * 8 + 1)
            //描述点要素的符号参数信息
            var pointInfo = new Zondy.Object.CPointInfo({
                //子图角度，取值范围为0~360。
                Angle: 0,
                //子图颜色（请参考MapGIS颜色库中颜色编号）
                Color: pntColor,
                //子图高度
                SymHeight: 12,
                //子图ID（请参考MapGIS符号库中线符号编号）
                SymID: 114,
                //子图宽度
                SymWidth: 12,
            })
            //设置当前点要素的图形参数信息
            var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
                InfoType: 1,
                PntInfo: pointInfo,
            })
            //设置添加点要素的属性信息
            var attValue = ['中国', '中国', 1.0]
            //创建一个要素
            var feature = new Zondy.Object.Feature({
                fGeom: fGeom,
                GraphicInfo: webGraphicInfo,
                AttValue: attValue,
            })
            //设置要素为点要素
            feature.setFType(1)
            //创建一个要素数据集
            var featureSet = new Zondy.Object.FeatureSet()
            featureSet.clear()
            //设置属性结构，根据图层属性进行设置
            var cAttStruct = new Zondy.Object.CAttStruct({
                FldName: ['Cname', 'CNTRY_NAME', 'POPULATION'],
                FldNumber: 3,
                FldType: ['string', 'string', 'double'],
            })
            featureSet.AttStruct = cAttStruct
            //添加要素到要素数据集
            featureSet.addFeature(feature)
            //创建一个编辑服务类
            var editService = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mypntlayer', {
                ip: 'develop.smaryun.com',
                port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
            })
            //执行添加点要素功能
            editService.add(featureSet, function(data){
                if (data) {
                    alert('添加点要素成功！')    
                    //刷新图层
                    vectorLayer.refresh()
                } else {
                    alert('添加点要素失败！')
                }    
            })
        }) 
    ```


**Step 6. <font color=red>删除点要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中要素.在查询成功回调函数中获取要素 FID，进行删除操作;

* Example

    ```javascript
        //删除点要素
        function deletePoint(featureIds) {
            var deleteService = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mypntlayer', {
                ip: 'develop.smaryun.com',
                port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
            })
            deleteService.deletes(featureIds, onDeleteSuccess)
        }
        //删除点要素回调函数
        function onDeleteSuccess(rlt) {
            if (rlt) {
                alert('删除点要素成功！')
                //刷新图层
                vectorLayer.refresh()
            } else {
                alert('删除点要素失败！')
            }
        }
    ```

**Step 7. <font color=red>更新点要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中要素.在查询成功回调函数中获取要素 FID，进行更新操作；

* Example

    ```javascript
        //设置添加点要素的图形参数信息
        var pointInfo = new Zondy.Object.CPointInfo({
            //子图角度，取值范围为0~360。
            Angle: document.getElementById('pointAngle').value,
            //子图颜色（请参考MapGIS颜色库中颜色编号）
            Color: document.getElementById('pointColor').value,
            //子图高度
            SymHeight: document.getElementById('pointSymHeight').value,
            //子图ID（请参考MapGIS符号库中线符号编号）
            SymID: document.getElementById('pointSymID').value,
            //子图宽度
            SymWidth: document.getElementById('pointSymWidth').value,
        })
        var graphicInfo = new Zondy.Object.WebGraphicsInfo({
            InfoType: 1,
            PntInfo: pointInfo,
        })
        resultPoint.SFEleArray[0].GraphicInfo = graphicInfo
        //设置添加点要素的属性信息
        resultPoint.SFEleArray[0].AttValue[1] = document.getElementById('Cname').value
        resultPoint.SFEleArray[0].AttValue[2] = document.getElementById('CNTRY_NAME').value
        resultPoint.SFEleArray[0].AttValue[3] = document.getElementById('POPULATION').value
        //创建一个编辑服务类
        var editService = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mypntlayer', {
            ip: 'develop.smaryun.com',
            port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
        })
        editService.update(resultPoint, onPntUpdateSuccess)
        //修改点要素回调函数
        function onPntUpdateSuccess(data) {
            if (data.succeed) {
                alert('修改点要素成功！')
                //刷新图层
                vectorLayer.refresh()
            } else {
                alert('修改点要素失败！')
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
