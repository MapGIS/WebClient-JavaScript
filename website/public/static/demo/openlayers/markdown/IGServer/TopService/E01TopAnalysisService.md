## 拓扑分析

### 示例功能
&ensp;&ensp;&ensp;&ensp;本示例实现了在地图容器中判断要素之间拓扑关系的功能，主要可以判断要素之间相邻、相离、相交、包含等拓扑关系。

### 示例实现
&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现。通过`Zondy.Service.TopAnalysis1`实例化拓扑分析功能服务类，通过`execute`方法执行拓扑分析。

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

**Step 3. <font color=red>创建要素对象</font>**：
&ensp;&ensp;&ensp;&ensp;构造拓扑分析使用的要素对象；

**Step 4. <font color=red>初始化拓扑分析功能服务类</font>**：
&ensp;&ensp;&ensp;&ensp;初始化拓扑分析功能服务类`Zondy.Service.TopAnalysis`,调用`excute`方法执行拓扑分析；

* Example

    ```javascript
        var topParam = new Zondy.Service.TopAnalysis({
            ip: "develop.smaryun.com",
            port: "6163"    //访问IGServer的端口号，.net版为6163，Java版为8089
        });
        //调用setPnt方法，设置点类型
        topParam.setPnt(firstGeomZD);
        //调用setPnt方法，设置点类型
        topParam.setLine(firstGeomZD);
        //调用setRelativeObj方法，设置拓扑分析参照物
        topParam.setRelativeObj(secondGeomZD);
        //设置拓扑分析半径
        topParam.nearDis = "0.05";
        //执行拓扑分析，成功执行后返回执行结果，onSuccess为回调函数
        topParam.execute(function(data){
            alert("两几何之间的拓扑关系为:"+data);
        }, function(e){
            //停止进度条
            alert("分析失败！");
        });
    ```

### 关键接口

#### 1.【拓扑分析功能服务类】`Zondy.Service.ProjectDots(option)`

|参数名| 类型 |描述|
|-----------|------|----|
|option| Object |可选项，设置其他属性键值对对象。|

* `option`属性主要参数

| 参数名        | 类 型               | 默认值    | 说 明          |
|---------------|---------------------|----------|----------------|
|pnt	        |Zondy.Object.GPoint  | null	 |需要设置的点类型 |
|line	        |Zondy.Object.GLine	  | null	 |需要设置的线类型 |
|reg	        |Zondy.Object.GRegion | null	 |需要设置的区类型 |
|nearDis	    |Number               | 0.01     |分析半径        |
|relativeObj	|Zondy.Object.GRegion |	null	 |相对对象        |
|p_onSuccess	|function	          | null	 |回调函数        |