## 点投影转换

### 示例功能
&ensp;&ensp;&ensp;&ensp;在GIS中，地图有数据参考系的概念，不同的数据参考系可能不一致，若要将不同参考系的数据进行叠加显示，就需要将数据的坐标值进行投影转换。

### 示例实现
&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现。通过`Zondy.Service.ProjectDots`实例化点投影转换服务，通过`execute`方法进行点投影转换。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-openlayers-local.js】脚本引入开发库；

**Step 2. <font color=red>创建源投影参数</font>**：
&ensp;&ensp;&ensp;&ensp;将数据原始参考系信息填入；

* Example

    ```javascript
        //设置源投影参数
        var srcProjParam = new Zondy.Service.CProjectParam({
            // 度分秒,即±DDDMMSS.SSSS格式
            ProjAngleUnit: 5,
            // 投影平面直角坐标系
            ProjType: 3,
            // 高斯-克吕格(横切椭圆柱等角)投影
            ProjTypeID: 5,
            // 厘米
            ProjUnit: 12,
            // 投影带号
            ProjZoneNO: 39,
            // 投影类型为3度分带
            ProjZoneType: 1,
            // 北京/克拉索夫斯基(1940年)椭球
            SphereID: 2,
            // 水平比例尺
            ProjRate: 5000,
            // 中央子午线经度
            ProjLon: 1170000
        });
    ```

**Step 3. <font color=red>目标投影参数对象</font>**：
&ensp;&ensp;&ensp;&ensp;将数据投影的目标参考系信息填入；

* Example

    ```javascript
        //设置目的投影参数
        var desProjParam = new Zondy.Service.CProjectParam({
            // 角度单位为度
            ProjAngleUnit: parseInt(document.getElementById("ProjAngleUnit_des").value.split(':')[0]),
            // 地理坐标系
            ProjType: parseInt(document.getElementById("ProjType_des").value.split(':')[0]),
            // 地理坐标系
            ProjTypeID: parseInt(document.getElementById("ProjTypeID_des").value.split(':')[0]),
            // 毫米
            ProjUnit: parseInt(document.getElementById("ProjUnit_des").value.split(':')[0]),
            // 投影带号
            ProjZoneNO: parseInt(document.getElementById("ProjZoneNO_des").value),
            // 投影类型为6度分带
            ProjZoneType: parseInt(document.getElementById("ProjZoneType_des").value.split(':')[0]),
            // 北京/克拉索夫斯基(1940年)椭球
            SphereID: parseInt(document.getElementById("SphereID_des").value.split(':')[0]),
            // 水平比例尺
            ProjRate: parseInt(document.getElementById("ProjRate_des").value),
            // 中央子午线经度
            ProjLon: parseInt(document.getElementById("ProjLon_des").value)
        });
    ```

**Step 4. <font color=red>初始化点投影转换服务</font>**：
&ensp;&ensp;&ensp;&ensp;实例化投影转换服务`Zondy.Service.ProjectDots`，调用`execute`方法执行点投影转换；

* Example

    ```javascript
        //初始化投影转换服务
        var projectDotsService = new Zondy.Service.ProjectDots(
            //设置需要投影转换的点数组
            dots,
            //设置源投影参数
            srcProjParam,
            //设置目的投影参数
            desProjParam,
            //设置Options参数,包括服务器地址、端口号、返回结果格式
            {
                ip: "develop.smaryun.com",
                port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
                resultFormat: "json"
            }
        );
        //调用execute方法，执行点投影转换功能服务，并返回结果信息，onSuccess为回调函数
        projectDotsService.execute(function(data){
            console.log(data)
        });
    ```

### 关键接口

#### 1.【投影参数对象】`Zondy.Service.CProjectParam(option)`

|参数名| 类型 |描述|
|-----------|------|----|
|option| Object |可选项，设置其他属性键值对对象|

* `option`属性主要参数

| 参数名        | 类 型               | 默认值    | 说 明          |
|---------------|---------------------|----------|----------------|
|ProjAngleUnit	|Number               |0         |角度单位        |
|ProjLat	    |Number               |0.00      |投影原点纬度     |
|ProjLat1	    |Number               |0.00      |第一标准维度     |
|ProjLat2	    |Number               |0.00      |第二标准维度     |	
|ProjLon	    |Number               |0.00      |中央子午线经度   |	
|ProjRate	    |Number               |0.00      |水平比例尺       |
|ProjType	    |Number               |0.00      |坐标系类型       |
|ProjTypeID	    |Number               |0         |投影类型         |	
|ProjUnit	    |Number               |0         |长度单位         |
|ProjZoneNO	    |Number               |0         |投影带号         |
|ProjZoneType	|Number               |0         |投影分带类型     |
|SphereID	    |Number               |0         |椭球体参数       |

#### 2.【点投影转换服务】`Zondy.Service.ProjectDots(dots, srcparam, desparam, option)`
|参数名   | 类型   |描述                        |
|--------|------  |----------------------------|
|dots    | Object |需要转换的点坐标             |
|srcparam| Object |源投影参数                   |
|desparam| Object |目标投影参数                 |
|option  | Object |可选项，设置其他属性键值对对象|