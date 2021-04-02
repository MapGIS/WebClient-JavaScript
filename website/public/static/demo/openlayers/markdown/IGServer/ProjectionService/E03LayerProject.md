## 图层投影转换

### 示例功能
&ensp;&ensp;&ensp;&ensp;在GIS中，地图有数据参考系的概念，不同的数据参考系可能不一致，若要将不同参考系的数据进行叠加显示，就需要将数据进行投影转换。

### 示例实现
&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现。通过`Zondy.Service.ProjectByLayer`实例化图层投影转换服务，通过`execute`方法进行图层投影转换。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-openlayers-local.js】脚本引入开发库；

**Step 2. <font color=red>初始化图层投影转换服务</font>**：
&ensp;&ensp;&ensp;&ensp;实例化图层投影转换服务`Zondy.Service.ProjectByLayer`，通过`execute`方法进行图层投影转换；

* Example

    ```javascript
        //初始化图层投影转换服务类Zondy.Service.ProjectByLayer类
        var projByLayer = new Zondy.Service.ProjectByLayer({
            //设置服务ip
            ip: "develop.smaryun.com",
            //设置端口号
            port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
            //投影类型，0地理坐标系，1UTM，2兰伯特等角圆锥投影坐标系
            projTypeID: 23,
            //椭球体类型，2为西安80
            sphereType: 2,
            //弧度单位，1为毫米，2为米，3为秒，4为度，6为英尺，7为分，8为弧度
            projAngleUnit: 5,
            //坐标系类型，0为自定义坐标系、1地理坐标系，3投影平面直角坐标系
            projType: 0,
            //投影分带类型
            projZoneType: 0,
            //投影带号
            projZoneNO: 0,
            //中央子午线经度
            projLon: 0,
            //投影原点纬度
            projLat: 0,
            //第一标准维度
            projLat1: 0,
            //第二标准维度
            projLat2: 0,
            //水平单位，1为毫米，2为米，3为秒，4为度，6为英尺，7为分，8为弧度，详细请参见EnumProjAngleUnit
            projUnit: 2,
            //水平比例尺
            projRate: 1,
            x: 0,
            y: 0,
            resultName: "rel"
        });
        //需转换的要素类地址，继承于ProjectBase类属性
        projByLayer.clsName = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区";
        //结果要素类地址，继承ProjectBase类属性
        projByLayer.desClsName = resultname;
        //调用基类的execute方法，执行投影变换， projectLayerSuccess为结果回调函数，服务器请求方式为POST
        projByLayer.execute(projectLayerSuccess, 'post', false, 'json', AnalysisError);
    ```

### 关键接口

#### 1.【图层投影转换服务】`Zondy.Service.ProjectByLayer(project, option)`

|参数名| 类型 |描述|
|-----------|------|----|
|project| Object |属性键值对|
|option| Object |可选项，设置其他属性键值对对象|