## 绘制标注

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现向天地图世界地图添加标注的功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。对于文字，图片，图文标注都是通过`ol.Feature()`方法构建要素，然后加载到地图中，对于 PopUp 标注则是通过`ol.Overlay()`方法构建 overlay 弹窗实现。通过`ol.source.Cluster()`方法创建聚合标注数据源。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div，并设置其样式;

**Step 3. <font color=red>创建地图对象类</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数;

**Step 4. <font color=red>添加矢量图层</font>**:
&ensp;&ensp;&ensp;&ensp; 构建矢量图层(用于存储标注数据)，并将图层加入到地图中;

- Example:

  ```javascript
    vectorSource = new ol.source.Vector({
        features: [],
    })
    //矢量标注图层
    vectorLayer = new ol.layer.Vector({
        source: vectorSource,
    })
    map.addLayer(vectorLayer)
  ```

**Step 5. <font color=red>添加图片标注</font>**:
&ensp;&ensp;&ensp;&ensp; 构建点几何要素，设置其样式为图片标注，并将该点加入到矢量图层中;

**5.1 创建图片标注要素**

- Example:

  ```javascript
    //新建一个要素 ol.Feature
    var newFeature = new ol.Feature({
      //几何信息
      geometry: new ol.geom.Point(coordinate),
    })
  ```
  **5.2 设置图片标注要素样式**

- Example:

  ```javascript
    function createImageStyle(feature) {
      return new ol.style.Style({
        /**{olx.style.IconOptions}类型*/
        image: new ol.style.Icon({
          anchor: [0.5, 60],
          anchorOrigin: 'top-right',
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          offsetOrigin: 'top-right',
          // offset:[0,10],
          //图标缩放比例
          // scale:0.5,
          //透明度
          opacity: 0.75,
          //图标的url
          src: './static/assets/olimages/label/blueIcon.png',
        }),
      })
    }
    //设置要素的样式
    newFeature.setStyle(createImageStyle(newFeature))
  ```

**5.3 将图片标注添加到图层数据源中**

- Example:

  ```javascript
    //将新要素添加到数据源中
    vectorSource.addFeature(newFeature)
  ```

**Step 6. <font color=red>添加文字标注</font>**:
&ensp;&ensp;&ensp;&ensp; 构建点几何要素，设置其样式为文本标注，并将该点加入到矢量图层中;

**6.1 创建文字标注要素**

- Example:

  ```javascript
    //新建一个要素 ol.Feature
    var newFeature = new ol.Feature({
      //几何信息
      geometry: new ol.geom.Point(coordinate),
      //名称属性
      name: '标注点',
    })
  ```

**6.2 设置文字标注样式**

- Example:

  ```javascript
    function createTxtStyle(feature) {
      return new ol.style.Style({
        text: new ol.style.Text({
          //位置
          textAlign: 'center',
          //基准线
          textBaseline: 'middle',
          //文字样式
          font: 'normal 14px 微软雅黑',
          //文本内容
          text: feature.get('name'),
          //文本填充样式（即文字颜色）
          fill: new ol.style.Fill({ color: '#aa3300' }),
          stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 }),
        }),
      })
    }
    //设置要素的样式
    newFeature.setStyle(createTxtStyle(newFeature))
  ```

**6.3 将文字标注添加到图层数据源中**

- Example:

  ```javascript
    vectorSource.addFeature(newFeature)
  ```

**Step 7. <font color=red>添加图文标注对象</font>**:
&ensp;&ensp;&ensp;&ensp; 构建点几何要素，设置其样式为图文标注，并将该点加入到矢量图层中;

**7.1 创建图文标注要素**

- Example:

  ```javascript
    //新建一个要素 ol.Feature
    var newFeature = new ol.Feature({
        //几何信息
        geometry: new ol.geom.Point(coordinate),
        //名称属性
        name: '标注点',
    })
  ```

  **7.2 设置图文标注样式**

- Example:

  ```javascript
    function createImgTxtLabelStyle(feature) {
        return new ol.style.Style({
            image: new ol.style.Icon(
                /** @type {olx.style.IconOptions} */
                ({
                    anchor: [0.5, 60],
                    anchorOrigin: 'top-right',
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    offsetOrigin: 'top-right',
                    // offset:[0,10],
                    //图标缩放比例
                    // scale:0.5,
                    //透明度
                    opacity: 0.75,
                    //图标的url
                    src: './static/assets/olimages/label/blueIcon.png',
                })
            ),
            text: new ol.style.Text({
                //位置
                textAlign: 'center',
                //基准线
                textBaseline: 'middle',
                //文字样式
                font: 'normal 14px 微软雅黑',
                //文本内容
                text: feature.get('name'),
                //文本填充样式（即文字颜色）
                fill: new ol.style.Fill({ color: '#aa3300' }),
                stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 }),
            }),
        })
    }
    //设置要素的样式
    newFeature.setStyle(createImgTxtLabelStyle(newFeature))
  ```

  **7.3 添加图文标注到图层数据源中**

- Example:

  ```javascript
    //将新要素添加到数据源中
    vectorSource.addFeature(newFeature)
  ```

**Step 8. <font color=red>添加 PopUP</font>**:
&ensp;&ensp;&ensp;&ensp; 添加 OverLayer，监听地图点击事件，弹出相关要素信息的 PopUP;

**8.1 获取要转化为 Overlay 的 HTML 元素**

- Example:

  ```javascript
    container = document.getElementById('popup')
    content = document.getElementById('popup-content')
    closer = document.getElementById('popup-closer')
  ```

**8.2 添加关闭按钮的单击事件（隐藏 popup）**

- Example:

  ```javascript
    /**
    * 添加关闭按钮的单击事件（隐藏popup）
    * @return {boolean} Don't follow the href.
    */
    closer.onclick = function() {
      //未定义popup位置
      popup.setPosition(undefined)
      //失去焦点
      closer.blur()
      return false
    }
  ```

**8.3 创建 Overlay**

- Example:

  ```javascript
    if (popup == null) {
      popup = new ol.Overlay(
        /** @type {olx.OverlayOptions} */
        ({
          //要转换成overlay的HTML元素
          element: container,
          //当前窗口可见
          autoPan: true,
          //Popup放置的位置
          positioning: 'bottom-center',
          //是否应该停止事件传播到地图窗口
          stopEvent: false,
          autoPanAnimation: {
            //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
            duration: 250,
          },
        })
      )
    }
    map.addOverlay(popup)
  ```

**8.4 设置 popup 弹窗内容**

- Example:

  ```javascript
    //示例标注点北京市的信息对象
    var featuerInfo = {
      geo: [116.28, 39.54],
      att: {
        //标注信息的标题内容
        title: '北京市(中华人民共和国首都)',
        //标注详细信息链接
        titleURL: 'http://www.openlayers.org/',
        //标注内容简介
        text: '北京（Beijing），简称京，中华人民共和国首都、直辖市，中国的政治、文化和国际交往中心……',
        //标注的图片
        imgURL: './static/assets/olimages/label/bj.png',
      },
    }

    /**
    * 动态创建popup的具体内容
    * @param {string} title
    */
    function addFeatrueInfo(info) {
      //新增a元素
      var elementA = document.createElement('a')
      elementA.className = 'markerInfo'
      elementA.href = info.att.titleURL
      //elementA.innerText = info.att.title;
      setInnerText(elementA, info.att.title)
      // 新建的div元素添加a子节点
      content.appendChild(elementA)
      //新增div元素
      var elementDiv = document.createElement('div')
      elementDiv.className = 'markerText'
      //elementDiv.innerText = info.att.text;
      setInnerText(elementDiv, info.att.text)
      // 为content添加div子节点
      content.appendChild(elementDiv)
      //新增img元素
      var elementImg = document.createElement('img')
      elementImg.className = 'markerImg'
      elementImg.src = info.att.imgURL
      // 为content添加img子节点
      content.appendChild(elementImg)
    }
    /**
    * 动态设置元素文本内容（兼容）
    */
    function setInnerText(element, text) {
      if (typeof element.textContent == 'string') {
        element.textContent = text
      } else {
        element.innerText = text
      }
    }
  ```

**8.5 为 map 添加点击事件监听，渲染弹出 popup**

- Example:

  ```javascript
    map.on('click', function(evt) {
      //判断当前单击处是否有要素，捕获到要素时弹出popup
      var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
          return feature
      })
      if (feature) {
          //清空popup的内容容器
          content.innerHTML = ''
          //在popup中加载当前要素的具体信息
          addFeatrueInfo(featuerInfo)
          popup.setPosition(feature.getGeometry().getCoordinates())
      }
    })
  ```

**Step 9. <font color=red>添加聚合标注</font>**:
&ensp;&ensp;&ensp;&ensp; 通过构建矢量图层，关联聚合数据源，实现聚合标注效果。

**9.1 创建要素数组**

- Example:

  ```javascript
    //此示例创建10000个要素
    var count = 10000
    var features = new Array(count)
    for (var i = 0; i < count; ++i) {
      var coordinates = [Math.random() * 360 - 180, Math.random() * 180 - 90]
      features[i] = new ol.Feature(new ol.geom.Point(coordinates))
    }
    vectorSource.addFeatures(features)
  ```

**9.2 创建聚合标注数据源**

- Example:

  ```javascript
    //聚合标注数据源
    var clusterSource = new ol.source.Cluster({
        distance: 30,
        source: vectorSource,
        wrapX: false,
    })
  ```

  **9.3 加载聚合标注数据图层**

- Example:

  ```javascript
    //加载聚合标注的矢量图层
    var styleCache = {}
    var clusters = new ol.layer.Vector({
      source: clusterSource,
      style: function(feature, resolution) {
        var size = feature.get('features').length
        var style = styleCache[size]
        if (!style) {
          style = [
            new ol.style.Style({
              image: new ol.style.Circle({
                radius: 10,
                stroke: new ol.style.Stroke({
                  color: '#fff',
                }),
                fill: new ol.style.Fill({
                  color: '#3399CC',
                }),
              }),
              text: new ol.style.Text({
                text: size.toString(),
                fill: new ol.style.Fill({
                  color: '#fff',
                }),
              }),
            }),
          ]
          styleCache[size] = style
        }
        return style
      },
    })
    map.addLayer(clusters)
  ```

### 关键接口

#### 1.【几何要素类】`ol.Feature`

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_Feature.html

#### 2.【Overlay 类】`ol.Overlay`

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_Overlay.html

#### 3.【聚合数据源类】`ol.source.Cluster`

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_Cluster.html
