### 边界图展示

> 特别注意： D3 的图层是SVG的机制，因此`没有Z-index这个属性`，如果需要设置压盖关系，请自己维护图层的压盖关系，后面添加的svg会压盖在之前添加的svg图层上。

> 动态创建的svg必须拥有下面两个属性作为这个svg图片的宽高,本例中的L.zondy.d3SvgOverlay(function (svg, proj))已经内部帮你创建了一个svg图层了，`不再需要`下面的新建的svg图层语法。
``` html
<svg width="960" height="600" id="histogram-svg"></svg>
```

**本例中的 L.zondy.d3SvgOverlay(function (svg, proj))，`svg`是`内部创建`的svg,该svg和前端的地图坐标进行了联动，通过proj对象进行坐标换算，`proj`主要提供下面几个重要函数**

|函数|功能|说明|
|:---|:---|:---|
|latLngToLayerPoint|将经纬度反算成屏幕上的坐标|经常由于非geojson的格式转换|
|layerPointToLatLng|将屏幕上的坐标反算成经纬度|用于查询时的换算|
|`pathFromGeojson`|将geojson的数据自动转换到对应的地图上|一般是`固定语法`，用于geojson的对接|

---

### 边界图主要流程

``` javascript

var color = d3.scaleThreshold().domain([0.02, 0.04, 0.06, 0.08, 0.10])
        .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

svg.append("g")
    .attr("class", "counties")  //绑定对应的类型
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features) //topojson转换成geojson
    .enter().append("path")   //通过path的绘制方式  请参考d3-path
    .attr("d", proj.pathFromGeojson)//geojson转换成屏幕坐标
    .style("fill", function (d) {
        return color(rateById[d.id]); //设置颜色
    });
```

> 上面的topojson来自于 **<script include="d3,geojson" src="../../libs/zondyclient/include-leaflet-local.js"></script>**

---
#### scaleThreshold 字段尺度整理
[官方ScaleThreshold](https://github.com/d3/d3-scale/blob/master/README.md#scaleThreshold)

``` javascript
var color = d3.scaleThreshold()
    .domain([0, 1])   //2个间隔区分3种颜色
    .range(["red", "white", "green"]);

    color(-1);   // "red"
    color(0);    // "white"
    color(0.5);  // "white"
    color(1);    // "green"
    color(1000); // "green"
    
    //5个间隔区分六种颜色
var color = d3.scaleThreshold().domain([0.02, 0.04, 0.06, 0.08, 0.10])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

```

---

> **D3的使用基本上可以分为三大步**
> > `数据整理`，排序 对应的核心类是`d3-scales`
> > `数据业务处理`，根据数据的业务，针对不同的需要建立不同的`颜色,形状,分类函数`来进行对应的数据图表适配，这部分代码一般是`调用者自己的逻辑`
> > `数据展示`，使用D3的对应的语法实现图表的展现，对应的核心类是`d3-path,d3-shape,d3-select`，数据展示的流程一般是3段式：


1. 数据选取，绘制前的数据获取截断,核心语法是先使用svg的方式绘制，然后加载对应的数据，再结束整个选取操作;
    ~~~ javascript
    d3.select("svg")
        .data(data)
        .enter();
    ~~~
2. 数据绘制，数据绘制的时候常见的语法是
    ~~~ javascript
    gs.append("rect")  //选择绘制的类型是矩形
        .style("x", function (d, i) {//x的偏移
            return 10;//x宽度为固定10
        })
        .style("y", function (d) {//y的偏移
            return 100;//y长度为固定100
        })
        .style("fill", function () {
            return "#003400";//颜色设置
        })  
    ~~~

3. 数据个性化定制,根据不同的数据数值，设置不同的表现
    ~~~ javascript
    var xScale = d3.scaleBand() //按照带进行统计
        .domain(d3.range(xAxisData.length))  //域是数据的长度
        .rangeRound([0, width - marge.left - marge.right]); //将数据映射到图表的宽度上
    gs.append("rect")  //选择绘制的类型是矩形
        .style("x", function (d, i) {//x的偏移由对应的数据所在列来实现
            return xScale(i) + rectPadding / 2;
        })
        .style("y", function (d) {
            return yScale(d); //同理，yscale也是一个函数
        })
        .style("fill", function (d) {
            if(d.name == "特定条件")
            return "#003400";//颜色设置
        })
    ~~~


