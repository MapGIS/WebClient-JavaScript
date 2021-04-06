## 地图探查

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例底图显示天地图地图矢量图层和影像图层，实现了图层探查功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库；

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图地图图层；

**Step 4. <font color=red>获取鼠标实时的视图位置(像素值)</font>**:
&ensp;&ensp;&ensp;&ensp;通过地图容器的Div,监听浏览器的事件(mousemove),然后通过 `ol.map`类的 `getEventPixel()`方法实时得到鼠标的像素位置；
    
* Example:

    ```javascript
        // 给地图容器mapCon添加监听事件，实时得到鼠标的像素位置
        var mousePosition = null
        document.getElementById('mapCon').addEventListener('mousemove', function(event) {
            mousePosition = map.getEventPixel(event)
            map.render()
        })
        document.getElementById('mapCon').addEventListener('mouseout', function() {
            mousePosition = null
            map.render()
        })
    ```
**Step 5. <font color=red>在瓦片图层绘制之前进行裁剪</font>**:
&ensp;&ensp;&ensp;&ensp;通过 ol.layer.Tile()类的 on 方法监听precompose事件，在事件的回调中实现图层裁剪；
    
* Example:

    ```javascript
        TiandiMap_vect.on('precompose', function(event) {
            var ctx = event.context
            var pixelRatio = event.frameState.pixelRatio
            ctx.save()
            ctx.beginPath()
            if (mousePosition) {
                //只显示一个围绕着鼠标的圆圈
                ctx.arc(mousePosition[0] * pixelRatio, mousePosition[1] * pixelRatio, radius * pixelRatio, 0, 2 * Math.PI)
                ctx.lineWidth = 5 * pixelRatio
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.stroke()
            }
            ctx.clip()
        })
    ```
**Step 6. <font color=red>实现图层探查</font>**:
&ensp;&ensp;&ensp;&ensp;图层渲染完成后,恢复画布的背景，实现图层探查的效果。
    
* Example:

    ```javascript
        TiandiMap_vect.on('postcompose', function(event) {
            var ctx = event.context
            ctx.restore()
        })
    ```

### 关键接口

#### 1.【瓦片图层类】`ol.layer.Tile`
##### 【method】`on(type，listener)`：监听地图事件

| 参数名        | 类型               | 说明                   |
| ---------- | ---------------------| ---------------------- |
| type       | String|Array{String} | 事件类型                |
| listener   | function             | 监听事件发生时触发的函数 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Layer-Layer.html#on
