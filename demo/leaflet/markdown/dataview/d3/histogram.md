### D3 的基本示例

> 特别注意： D3 的图层是SVG的机制，因此`没有Z-index这个属性`，如果需要设置压盖关系，请自己维护图层的压盖关系，后面添加的svg会压盖在之前添加的svg图层上。

> **D3的使用基本上可以分为三大步**
> > `数据整理`，排序 对应的核心类是`d3-scales`
> > `数据业务处理`，根据数据的业务，针对不同的需要建立不同的`颜色,形状,分类函数`来进行对应的数据图表适配，这部分代码一般是`调用者自己的逻辑`
> > `数据展示`，使用D3的对应的语法实现图表的展现，对应的核心类是`d3-path,d3-shape,d3-select`，数据展示的流程一般是3段式：

> 动态创建的svg必须拥有下面两个属性作为这个svg图片的宽高
``` html
<svg width="960" height="600" id="histogram-svg"></svg>
```

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

### 直方图主要流程

> 1. 排序 x轴-数据按照顺序排序，字段按照名称排序
> 2. 绘制x轴，y轴  [官方教程](https://github.com/d3/d3-axis/blob/master/README.md#axisBottom)
> 3. 绘制中间数据直方图


#### Band Scales
[原文地址，英语好的直接上](https://github.com/d3/d3-scale/blob/master/README.md#band-scales)
[band.js源码链接](https://github.com/d3/d3-scale/blob/master/src/band.js#L4 "Source")

直方图`频带尺度` 与有序尺度类似[ordinal scales](#ordinal-scales)，他们接受的数据范围都是数值或者d3-range（这里意会就行）. `频带尺度`强调的是将将连续的数据划分为`均匀的频带`。即直方图的直观表现。这里通俗的话就是将数据采取分类或者统计直方图等分的方式实现对应的划分。

![band](https://raw.githubusercontent.com/d3/d3-scale/master/img/band.png)



一般构造一个Band Scales需要 [domain](#band_domain), the unit [range](#band_range) [0, 1], no [padding](#band_padding), no [rounding](#band_round) and center [alignment](#band_align).

``` javascript
var xScaleText = d3.scaleBand() //由于是直方图，因此选择scaleBand
    .domain(xAxisData) //针对数据的横坐标
    .rangeRound([0, width - marge.left - marge.right]); //设置宽度
var xScale = d3.scaleBand() //由于是直方图，因此选择scaleBand
    .domain(d3.range(xAxisData.length)) //针对数据进行统计
    .rangeRound([0, width - marge.left - marge.right]);
```

##### **domain**
1. 如果一个value在给定的域domain中，则返回对应的直方图的位置，否则返回undefined。

2. 使用数组来制定特定的域. 则直接按照数组的顺序进行对应的直方图展示。

##### **range、rangeRound**
range后的参数是一个两个元素的数组，可以简单的理解为，分别表示[`左边边界`，`右边边界`]
rangeRound其实就是执行range后执行.round(true);  这两个是几乎等价的，一般下面用的多。
