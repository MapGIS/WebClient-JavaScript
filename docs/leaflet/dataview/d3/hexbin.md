### 蜂窝密度 Hexbin

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

### 蜂窝密度 Hexbin

#### 关键点

> + 蜂窝聚类半径，这个表示的是`数据聚类`的`范围`，而不是下面的`蜂窝显示`的半径
> + 蜂窝显示半径，这个表示的是`显示结果`的`半径`，而不是上面面的`数据聚类`的半径
> + 蜂窝计算结果，hexbin(data).sort()进行排序

``` javascript
var hexbin = d3.hexbin().radius(3); //这里才是蜂窝聚类半径--关键点1！！！！

hexbin.hexagon(radius(d.length))  //蜂窝显示半径

hexbins = hexbin(data).sort(function (a, b) {
        return b.length - a.length;
    });
```

**`主要流程`**

``` javascript
var citiesOverlay = L.zondy.d3SvgOverlay(function (sel, proj) {
    var hexbins;
    var hexbin = d3.hexbin().radius(3); //这里才是蜂窝聚类半径--关键点1！！！！

    d3.dsv("\t", "../../data/d3/walmart.tsv", function (d) {
        //这三行代码一般不需要改变，下面的代码是计算坐标换算的，不要更改
        var latLng = [+d[1], +d[0]]; //唯一要修改的就是根据数据格式传入对应的经纬度，不一定是d[0],有可能是d.lat之类的
        var xy = proj.latLngToLayerPoint(latLng);//地理坐标换算屏幕坐标--关键点2！！！！
        d[0] = xy.x, d[1] = xy.y; //将真正的屏幕坐标传回d3
        return d;
    }).then(function (data) {
        //按照之前关键点1设置的radius(3)进行聚类，数据组从3000点->1000聚类点左右
        hexbins = hexbin(data).sort(function (a, b) {
            return b.length - a.length;
        });
        var citiesUpd = sel.selectAll('path').data(hexbins);
        citiesUpd.enter()
            .append('path') //d3固定语法，path绘制方式
            .attr('d', function (d) { //根据属性设置半径
                return hexbin.hexagon(radius(d.length));
            })
            .attr("transform", function (d) { //这里一般无需改动，计算蜂窝的中心点
                return "translate(" + d.x + "," + d.y + ")";
            })；
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

#### scaleSqrt、scaleTime 字段尺度整理
[官方scaleSqrt](https://github.com/d3/d3-scale/blob/master/README.md#scaleSqrt) 以及 [官方scaleTime](https://github.com/d3/d3-scale/blob/master/README.md#scaleTime)

``` javascript
var radius = d3.scaleSqrt()  //映射规则是sqrt求根 y = k * x^n + b;  默认n = -1
                .domain([0, 50])  //数据范围是0~50， 变量x
                .range([0, 6]); //映射成的半径范围是0~6 ，因变量y
    
 var color = d3.scaleTime()
                .domain([new Date(1962, 0, 1), new Date(2006, 0, 1)])   //按照时间顺序
                .range(["black", "steelblue"])   //颜色从黑到蓝进行设置
                .interpolate(d3.interpolateLab); //使用d3默认的插值方式

```

---

#### D3 基本知识

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


