## 加载第三方

### 示例功能

加载第三方开放的矢量瓦片地图服务，本示例中加载MapBox提供的服务。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过关键接口`mapboxgl.Map()`实现第三方矢量瓦片的加载。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### MapBox服务

1. 付费token：mapbox的token是收费的，并非免费使用 <a href="https://account.mapbox.com" target="_blank">收费地址</a>

2. 编辑style：<a href="https://studio.mapbox.com/" target="_blank">在线样式编辑地址</a>，在MapBox官网编辑自己喜欢的样式，编辑完成后通过**分享**按钮获取**Style URL**与**Access token**，通过这2个参数访问编辑好样式的地图服务

   <img src="../static/demo/mapboxgl/markdown/client-view/vectortile/mapbox_style.png" alt="MapBox样式" style="zoom:50%;" />

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 创建`id="map"`的div作为地图容器，并设置其样式；

3. 创建地图对象，设置地图的必要参数，如地图div容器、缩放层级、中心点等，具体操作参考`互联网地图`目录下的`天地图墨卡托`示例；

4. 加载矢量瓦片，通过**矢量瓦片样式URL**加载MapBox矢量瓦片地图服务；

   ```js
   //一定要去mapbox注册一个key,这个key会失效的
   mapboxgl.accessToken =
     'pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA';
   var map = new mapboxgl.Map({
     container: 'map', // 绑定div
     style: 'mapbox://styles/mapbox/streets-v9',
     center: [106.563777, 29.578285],
     zoom: 3
   });
   map.addControl(new mapboxgl.NavigationControl(), 'top-left');
   ```

5. 浏览矢量瓦片地图服务；