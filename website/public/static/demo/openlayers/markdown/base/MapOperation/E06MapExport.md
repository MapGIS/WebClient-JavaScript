## 导出图片和 PDF

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例底图显示一个天地图世界地图，实现导出图片功能和导出 PDF 功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】，同时需要引入第三方库 FileSaver.min.js 实现图片导出功能和引入 jspdf.min.js 来实现 PDF 导出功能

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>引用第三方库</font>**:
&ensp;&ensp;&ensp;&ensp;引入第三方库，本示例通过本地离线 FileSaver.min.js 和 jspdf.min.js 脚本引入;

**Step 3. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式;

**Step 4. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图地图图层;

**Step 5. <font color=red>导出图片</font>**:
&ensp;&ensp;&ensp;&ensp;通过监听 map 的 postcompose 事件，获取图形绘制的 canvas 对象，从而实现导出图片的功能；

- Example:

  ```javascript
    map.once('postcompose', function(event) {
        var canvas = event.context.canvas

        canvas.toBlob(function(blob) {
            saveAs(blob, 'map.png')
        })
    })
    map.renderSync()
  ```

  **Step 6. <font color=red>导出 PDF</font>**:
  &ensp;&ensp;&ensp;&ensp;通过监听 map 的 postcompose 事件，获取图形绘制的 canvas 对象，利用第三方库提供的导出 PDF 功能，从而实现导出 PDF 的功能。

- Example:

  ```javascript
    var dims = {
      a0: [1189, 841],
      a1: [841, 594],
      a2: [594, 420],
      a3: [420, 297],
      a4: [297, 210],
      a5: [210, 148],
    }
    var format = document.getElementById('format').value
    var resolution = document.getElementById('resolution').value
    var dim = dims[format]
    var width = Math.round((dim[0] * resolution) / 25.4)
    var height = Math.round((dim[1] * resolution) / 25.4)
    var size = /** @type {ol.Size} */ (map.getSize())
    var extent = map.getView().calculateExtent(size)

    map.once('postcompose', function(event) {
      var canvas = event.context.canvas
      var data = canvas.toDataURL('image/jpeg')
      var pdf = new jsPDF('landscape', undefined, format)
      pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1])
      pdf.save('map.pdf')
    })
    map.setSize([width, height])
    map.getView().fit(extent, map.getSize())
    map.renderSync()
  ```

### 关键接口

#### 1.【地图类】`ol.map`

##### 【method】`once(type，listener)`：监听一次某类型的地图事件

| 参数名   | 类型     | 说明                     |
| -------- | -------- | ------------------------ |
| type     | String   | Array{String}            | 事件类型 |
| listener | function | 监听事件发生时触发的函数 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_PluggableMap-PluggableMap.html#once
