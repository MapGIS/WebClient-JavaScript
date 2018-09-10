### 定时器动画

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
|scale|根据地图的级别设置对应的缩放数值，`以地图初始化级数为基准`|如果地图加载该svg的级别是`setView（10）,第10级`，则表示10级的时候scale = 1,11级等于2|

---

### 定时器动画

#### 关键点

**关键点有两点：1.数据d3.nest的数据分组使用方式[通俗教程](https://blog.csdn.net/gdp12315_gu/article/details/51721988) 2.海岸线渐进绘制**

> + d3.nest的使用
> >   1. 先制定`分组规则` .`key`(function (d) {return d.distance;}) //按照distance进行分组
> >   2. 传入`原始数据` .`entries`(counties.features)  //表示要分组的原始数据
> >   3. 按照`聚类映射成不同的geojson`的多组FeatureCollection.   .`map`() 
        ``` javascript
        .map(function (e) {   //映射成geojson的格式
            return {
                type: "FeatureCollection",
                features: e.values,  //之前的数据变成了这样{"key":"distance_value_number","values":[geojson_features_item]},
                distance: +e.key  //该距离可以看做组与组之间的分类标识，用以区别
            };
        }))
        ```

> + 海岸线渐进绘制其实原理很简单
> >   1. 从最外层的数据开始不断的向内部遍历与其`拓扑相邻`的内圈，
> >   2. 然后，`内圈再向内内圈`进行遍历，这样就遍历出向中心点的的不同的环状区域了
> >   3. 不同的时间段给不同的区域上`不同的颜色`，注意颜色是从外圈向内圈传递即可实现波浪效果

---

``` javascript
//只显示核心流程，业务数据的预处理过程省略
var countriesOverlay = L.zondy.d3SvgOverlay(function (svg, proj) {
        county = svg.attr("class", "counties")
            .selectAll("path")
            .data(d3.nest()
                .key(function (d) {
                    return d.distance;//按照distance进行分组
                })
                .entries(counties.features)  //表示要分组的原始数据
                .map(function (e) {   //映射成geojson的格式
                    return {
                        type: "FeatureCollection",
                        features: e.values,//    之前的数据变成了这样{"key":"distance_value_number","values":[geojson_feature_object_array]},
                        distance: +e.key//该距离可以看做组与组之间的分类标识，用以区别不同的海岸线圈圈
                    };
                }))
            .enter().append("path")
            .attr("d", proj.pathFromGeojson);//geojson转屏幕坐标
    }, {
        zoomDraw: false //缩放时，继续动画
    });


    //定时器，不同的时间播放不同的颜色,这里距离是定值，但是时间是增加的，
    //因此某一时刻的内圈的颜色和前一时刻的外圈颜色是相似的，实现波浪的效果
    d3.timer(function (elapsed) {
            county.style("fill", function (d) {
                return d3.hsl(d.distance * 10 - elapsed / 10, 1, .5);
            });
        });
```

---

#### 常见问题

> GeoJSON的常见问题一般集中在线在绘制的时候出现填充效果和坐标转化上

1. **如果只想让线生效，fill填充不生效则需要`.style('fill', 'none')`**
2. **attr('d', proj.pathFromGeojson) //这里是固定语法，一般不变**
3. **缩放时，是否重新绘制或者保持动画效果， 考虑性能请false**
4. **csv格式--d3.dsv(`","`, "../../data/d3/swiss-cities.csv", function (d) {}**
5. **tsv格式--d3.dsv(`"\t"`, "../../data/d3/swiss-cities.tsv", function (d) {}**

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

#### D3 基本知识

> **D3的使用基本上可以分为三大步**
> > `数据整理`，排序 对应的核心类是`d3-scales`
> > `数据业务处理`，根据数据的业务，针对不同的需要建立不同的`颜色,形状,分类函数`来进行对应的数据图表适配，这部分代码一般是`调用者自己的逻辑`
> > `数据展示`，使用D3的对应的语法实现图表的展现，对应的核心类是`d3-path,d3-shape,d3-select`，数据展示的流程一般是3段式：


1. 数据选取，绘制前的数据获取截断,核心语法是先使用svg的方式绘制，然后加载对应的数据，再结束整个选取操作;
    ``` javascript
    d3.select("svg")
        .data(data)
        .enter();
    ```
2. 数据绘制，数据绘制的时候常见的语法是
    ``` javascript
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
    ```

3. 数据个性化定制,根据不同的数据数值，设置不同的表现
    ``` javascript

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
    ```


