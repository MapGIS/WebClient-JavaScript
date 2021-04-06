## 图层交互编辑

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现了对地图中几何图形的编辑

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。首先通过`ol.interaction.Select()`方法构建 Select 控件选择要素，然后通过`ol.interaction.Modify()`方法构建 Modify 控件，对选择中的几何图形进行编辑。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div，并设置其样式;

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数;

**Step 4. <font color=red>添加点、线、区</font>**:
&ensp;&ensp;&ensp;&ensp;创建点，线，区要素，并添加到不同图层，点，线，区图层添加到地图中;

- Example:

    ```javascript
        //绘制的几何图形要素
        pointFeature = new ol.Feature({
            geometry: new ol.geom.Point([116, 0]),
            name: 'Point Feature',
        })
        lineFeature = new ol.Feature({
            geometry: new ol.geom.LineString([
                [1e7, 1e6],
                [1e6, 3e6],
            ]),
            name: 'Line Feature',
        })
        polygonFeature = new ol.Feature({
            geometry: new ol.geom.Polygon([
                [
                    [1e6, -1e6],
                    [1e6, 1e6],
                    [3e6, 1e6],
                    [3e6, -1e6],
                    [1e6, -1e6],
                ],
            ]),
            name: 'Polygon Feature',
        })

        //分别实例化点、线、区图层对象
        vectorPointsLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [pointFeature],
            }),
        })

        vectorLinesLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [lineFeature],
            }),
        })
        vectorPolygonsLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [polygonFeature],
            }),
        })
    ```

  **Step 5. <font color=red>添加要素选择控件</font>**:
  &ensp;&ensp;&ensp;&ensp;构建 Select 控件;

- Example:

    ```javascript
        var select = new ol.interaction.Select({
            wrapX: false,
        })
    ```

  **Step 6. <font color=red>添加要素修改控件</font>**:
  &ensp;&ensp;&ensp;&ensp;构建 Modify 控件，编辑要素为 select 选择中的要素。

- Example:

    ```javascript
        var modify = new ol.interaction.Modify({
            features: select.getFeatures(),
        })
    ```

### 关键接口

#### 1.【交互选择类】`ol.interaction.Select(opt_options)`

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_interaction_Select-Select.html

#### 2.【几何要素交互修改类】`ol.interaction.Modify(opt_options)`

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_interaction_Modify-Modify.html
