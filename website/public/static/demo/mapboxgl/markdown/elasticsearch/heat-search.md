## 热力分析

### 示例功能

以特殊高亮的形式显示访客热衷的页面区域和访客所在的地理区域。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，核心是应用开发库中的第三方插件`elasticsearch`，使用其关键接口`client.search()`实现热力分析。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### elasticsearch

> Elasticsearch是一个基于<a target="_blank" href="https://baike.baidu.com/item/Lucene/6753302">Lucene</a>的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口，具体使用请查看<a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html">elasticsearch官方教程</a>

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 创建`id="map"`的div作为地图容器，并设置其样式；

3. 创建地图对象，设置地图的必要参数，如地图div容器、缩放层级、中心点等，包含数据源的创建，地图中添加图层，具体操作参考`互联网地图`目录下的`天地图经纬度`示例；

4. `热力分析`关键步骤，创建一个elasticsearch的客户端对象，使用该对象进行执行分析服务，**一共分为二步**：

   （1）创建elasticsearch客户端对象

   ```javascript
   var client = new elasticsearch.Client({
     host: 'http://192.168.96.101:9200'
   });
   ```

   （2）执行分析服务

   ```javascript
   client.search({
     index: 'sp_taxibj_200_2', //数据库名称
     body: {
       size: 0, //此处返回的是hits的数组大小
       query: {
         bool: {
           filter: {
             range: {
               'GPS_DateTime': {
                 from: startTimeStamp, //毫秒转换成秒
                 to: endTimeStamp //毫秒转换成秒
               }
             }
           }
         }
       },
       aggregations: {
         'mapExtent': {
           filter: {
             geo_bounding_box: {
               'geometry': {
                 top_left: {
                   lat: bound.getNorthWest().lat,
                   lon: bound.getNorthWest().lng
                 },
                 bottom_right: {
                   lat: bound.getSouthEast().lat,
                   lon: bound.getSouthEast().lng
                 }
               }
             }
           },
           aggregations: {
             'geohash': {
               geohash_grid: {
                 field: "geometry",
                 precision: prec
               }
             }
           }
         }
       }
     }
   }, getData);
   ```

   关于API的具体使用请查看<a target="_blank" href="https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html">elasticsearch官方教程</a>。

5. 使用Mapv展示数据，将elasticsearch分析的数据通过Mapv展示到地图中，Mapv使用请参考客户端可视化-Mapv中的示例

   ```javascript
   layerDataSet = new mapv.DataSet(convertData(response));
   mapvLayer = new mapboxgl.zondy.MapvLayer(map, layerDataSet, layerOptions, {
      noWrap: true
   });
   ```



# Elasticsearch的相关概念

---
## 基本概念
在这之前，Elasticsearch致力于搜索。 通过搜索，如果我们有一个查询并且希望找到匹配这个查询的文档集，就好比在大海捞针。

通过聚合，我们会得到一个数据的概览。我们需要的是分析和总结全套的数据而不是寻找单个文档：
+ 在大海里有多少针？
+ 针的平均长度是多少？
+ 按照针的制造商来划分，针的长度中位值是多少？
+ 每月加入到海中的针有多少？

聚合也可以回答更加细微的问题：
+ 你最受欢迎的针的制造商是什么？
+ 这里面有异常的针么？
聚合允许我们向数据提出一些复杂的问题。虽然功能完全不同于搜索，但它使用相同的数据结构。这意味着聚合的执行速度很快并且就像搜索一样几乎是实时的。

这对报告和仪表盘是非常强大的。你可以实时显示你的数据，让你立即回应，而不是对你的数据进行汇总（ 需要一周时间去运行的 Hadoop 任务 ），您的报告随着你的数据变化而变化，而不是预先计算的、过时的和不相关的。

最后，聚合和搜索是一起的。 这意味着你可以在单个请求里同时对相同的数据进行搜索/过滤和分析。并且由于聚合是在用户搜索的上下文里计算的，你不只是显示四星酒店的数量，而是显示匹配查询条件的四星酒店的数量。

聚合是如此强大以至于许多公司已经专门为数据分析建立了大型 Elasticsearch 集群。

---
## 高阶概念
类似于 DSL 查询表达式， 聚合也有 **可组合** 的语法：独立单元的功能可以被混合起来提供你需要的自定义行为。这意味着只需要学习很少的基本概念，就可以得到几乎无尽的组合。

> 要掌握聚合，你只需要明白两个主要的概念：

> **桶（Buckets）**
满足特定条件的文档的集合

> **指标（Metrics）**
对桶内的文档进行统计计算

这就是全部了！每个聚合都是一个或者多个桶和零个或者多个指标的组合。翻译成粗略的SQL语句来解释吧：

``` sql
SELECT COUNT(color)
FROM table
GROUP BY color
```

* `COUNT(color) 相当于指标。`
* `GROUP BY color 相当于桶。`

桶在概念上类似于 SQL 的分组（GROUP BY），而指标则类似于 COUNT() 、 SUM() 、 MAX() 等统计方法。

让我们深入这两个概念 并且了解和这两个概念相关的东西。

---
### 桶
**桶** 简单来说就是满足特定条件的文档的集合：

+ 一个雇员属于 `男性` 桶或者 `女性` 桶
+ 武汉属于 `湖北` 桶
+ 日期2014-10-28属于 `十月` 桶

> 当聚合开始被执行，每个文档里面的值通过计算来决定符合哪个桶的条件。如果匹配到，文档将放入相应的桶并接着进行聚合操作。

> 桶也可以被嵌套在其他桶里面，提供层次化的或者有条件的划分方案。例如，辛辛那提会被放入俄亥俄州这个桶，而 整个 俄亥俄州桶会被放入美国这个桶。

Elasticsearch 有很多种类型的桶，能让你通过很多种方式来划分文档（时间、最受欢迎的词、年龄区间、地理位置等等）。其实根本上都是通过同样的原理进行操作：基于条件来划分文档。

---
### 指标
桶能让我们划分文档到有意义的集合， 但是最终我们需要的是对这些桶内的文档进行一些指标的计算。分桶是一种达到目的的手段：它提供了一种给文档分组的方法来让我们可以计算感兴趣的指标。

大多数 指标 是简单的数学运算（例如最小值、平均值、最大值，还有汇总），这些是通过文档的值来计算。在实践中，指标能让你计算像平均薪资、最高出售价格、95%的查询延迟这样的数据。

### 桶和指标的组合
聚合 是由桶和指标组成的。 聚合可能只有一个桶，可能只有一个指标，或者可能两个都有。也有可能有一些桶嵌套在其他桶里面。例如，我们可以通过所属国家来划分文档（桶），然后计算每个国家的平均薪酬（指标）。

由于桶可以被嵌套，我们可以实现非常多并且非常复杂的聚合：

1. 通过国家划分文档（桶）

2. 然后通过性别划分每个国家（桶）

3. 然后通过年龄区间划分每种性别（桶）

4. 最后，为每个年龄区间计算平均薪酬（指标）

最后将告诉你每个 <国家, 性别, 年龄> 组合的平均薪酬。
> 所有的这些都在一个请求内完成并且只遍历一次数据！

---
## 尝试聚合
我们可以用以下几页定义不同的聚合和它们的语法， 但学习聚合的最佳途径就是用实例来说明。 一旦我们获得了聚合的思想，以及如何合理地嵌套使用它们，那么语法就变得不那么重要了。

> 聚合的桶操作和度量的完整用法可以在 Elasticsearch 参考 中找到。本章中会涵盖其中很多内容，但在阅读完本章后查看它会有助于我们对它的整体能力有所了解。

所以让我们先看一个例子。我们将会创建一些对汽车经销商有用的聚合，数据是关于汽车交易的信息：车型、制造商、售价、何时被出售等。

首先我们批量索引一些数据：

``` json
{ "price" : 10000, "color" : "red", "make" : "honda", "sold" : "2014-10-28" }
{ "price" : 20000, "color" : "red", "make" : "honda", "sold" : "2014-11-05" }
{ "price" : 30000, "color" : "green", "make" : "ford", "sold" : "2014-05-18" }
{ "price" : 15000, "color" : "blue", "make" : "toyota", "sold" : "2014-07-02" }
{ "price" : 12000, "color" : "green", "make" : "toyota", "sold" : "2014-08-19" }
{ "price" : 20000, "color" : "red", "make" : "honda", "sold" : "2014-11-05" }
{ "price" : 80000, "color" : "red", "make" : "bmw", "sold" : "2014-01-01" }
{ "price" : 25000, "color" : "blue", "make" : "ford", "sold" : "2014-02-12" }
```

拷贝为 CURL在 SENSE 中查看
有了数据，开始构建我们的第一个聚合。汽车经销商可能会想知道哪个颜色的汽车销量最好，用聚合可以轻易得到结果，用 terms 桶操作：

``` javascript
GET /cars/transactions/_search
{
    "size" : 0,
    "aggs" : {
        "popular_colors" : {
            "terms" : {
              "field" : "color"
            }
        }
    }
}
```


> 聚合操作被置于顶层参数 aggs 之下（如果你愿意，完整形式 aggregations 同样有效）。



然后，可以为聚合指定一个我们想要名称，本例中是： popular_colors 。

最后，定义单个桶的类型 terms 。

聚合是在特定搜索结果背景下执行的， 这也就是说它只是查询请求的另外一个顶层参数（例如，使用 /_search 端点）。 聚合可以与查询结对，但我们会晚些在 限定聚合的范围（Scoping Aggregations） 中来解决这个问题。

> `注意`
可能会注意到我们将 size 设置成 0 。我们并不关心搜索结果的具体内容，所以将返回记录数设置为 0 来提高查询速度。 设置 size: 0 与 Elasticsearch 1.x 中使用 count 搜索类型等价。

然后我们为聚合定义一个名字，名字的选择取决于使用者，响应的结果会以我们定义的名字为标签，这样应用就可以解析得到的结果。

随后我们定义聚合本身，在本例中，我们定义了一个单 terms 桶。 这个 terms 桶会为每个碰到的唯一词项动态创建新的桶。 因为我们告诉它使用 color 字段，所以 terms 桶会为每个颜色动态创建新桶。

让我们运行聚合并查看结果：
``` json
{
...
   "hits": {
      "hits": []
   },
   "aggregations": {
      "popular_colors": {
         "buckets": [
            {
               "key": "red",
               "doc_count": 4
            },
            {
               "key": "blue",
               "doc_count": 2
            },
            {
               "key": "green",
               "doc_count": 2
            }
         ]
      }
   }
}
```

因为我们设置了 size 参数，所以不会有 hits 搜索结果返回。

popular_colors 聚合是作为 aggregations 字段的一部分被返回的。

> 每个桶的 key 都与 color 字段里找到的唯一词对应。它总会包含 doc_count 字段，告诉我们包含该词项的文档数量。

> 每个桶的数量代表该颜色的文档数量。

响应包含多个桶，每个对应一个唯一颜色（例如：红 或 绿）。每个桶也包括 聚合进 该桶的所有文档的数量。例如，有四辆红色的车。

前面的这个例子完全是实时执行的：一旦文档可以被搜到，它就能被聚合。这也就意味着我们可以直接将聚合的结果源源不断的传入图形库，然后生成实时的仪表盘。 不久，你又销售了一辆银色的车，我们的图形就会立即动态更新银色车的统计信息。

> 瞧！这就是我们的第一个聚合！

> 说句实话，地理空间上的聚合语法调用真心比这复杂晦涩多了。

## 添加度量
前面的例子告诉我们每个桶里面的文档数量，这很有用。 但通常，我们的应用需要提供更复杂的文档度量。 例如，每种颜色汽车的平均价格是多少？

为了获取更多信息，我们需要告诉 Elasticsearch 使用哪个字段，计算何种度量。 这需要将度量 嵌套 在桶内， 度量会基于桶内的文档计算统计结果。

让我们继续为汽车的例子加入 average 平均度量：
``` javascript
GET /cars/transactions/_search
{
   "size" : 0,
   "aggs": {
      "colors": {
         "terms": {
            "field": "color"
         },
         "aggs": {
            "avg_price": {
               "avg": {
                  "field": "price"
               }
            }
         }
      }
   }
}
```

1. 为度量新增 aggs 层。

2. 为度量指定名字： avg_price 。

3. 最后，为 price 字段定义 avg 度量。

正如所见，我们用前面的例子加入了新的 aggs 层。这个新的聚合层让我们可以将 avg 度量嵌套置于 terms 桶内。实际上，这就为每个颜色生成了平均价格。

正如 颜色 的例子，我们需要给度量起一个名字（ avg_price ）这样可以稍后根据名字获取它的值。最后，我们指定度量本身（ avg ）以及我们想要计算平均值的字段（ price ）：

```json
{
...
   "aggregations": {
      "colors": {
         "buckets": [
            {
               "key": "red",
               "doc_count": 4,
               "avg_price": {
                  "value": 32500
               }
            },
            {
               "key": "blue",
               "doc_count": 2,
               "avg_price": {
                  "value": 20000
               }
            },
            {
               "key": "green",
               "doc_count": 2,
               "avg_price": {
                  "value": 21000
               }
            }
         ]
      }
   }
...
}
```

响应中的新字段 avg_price 。

尽管响应只发生很小改变，实际上我们获得的数据是增长了。之前，我们知道有四辆红色的车，现在，红色车的平均价格是 $32，500 美元。这个信息可以直接显示在报表或者图形中。

---
## 嵌套桶
在我们使用不同的嵌套方案时，聚合的力量才能真正得以显现。 在前例中，我们已经看到如何将一个度量嵌入桶中，它的功能已经十分强大了。

但真正令人激动的分析来自于将桶嵌套进 另外一个桶 所能得到的结果。 现在，我们想知道每个颜色的汽车制造商的分布：

``` javascript
{
   "size" : 0,
   "aggs": {
      "colors": {
         "terms": {
            "field": "color"
         },
         "aggs": {
            "avg_price": {
               "avg": {
                  "field": "price"
               }
            },
            "make": {
                "terms": {
                    "field": "make"
                }
            }
         }
      }
   }
}
```


1. 注意前例中的 avg_price 度量仍然保持原位。

2. 另一个聚合 make 被加入到了 color 颜色桶中。

3. 这个聚合是 terms 桶，它会为每个汽车制造商生成唯一的桶。

> 这里发生了一些有趣的事。 首先，我们可能会观察到之前例子中的 avg_price 度量完全没有变化，还在原来的位置。 一个聚合的每个 层级 都可以有多个度量或桶， avg_price 度量告诉我们每种颜色汽车的平均价格。它与其他的桶和度量相互独立。

这对我们的应用非常重要，因为这里面有很多相互关联，但又完全不同的度量需要收集。聚合使我们能够用一次数据请求获得所有的这些信息。

> 另外一件值得注意的重要事情是我们新增的这个 make 聚合，它是一个 terms 桶（嵌套在 colors 、 terms 桶内）。这意味着它 会为数据集中的每个唯一组合生成（ color 、 make ）元组。

让我们看看返回的响应（为了简单我们只显示部分结果）：
``` json
{
...
   "aggregations": {
      "colors": {
         "buckets": [
            {
               "key": "red",
               "doc_count": 4,
               "make": {
                  "buckets": [
                     {
                        "key": "honda",
                        "doc_count": 3
                     },
                     {
                        "key": "bmw",
                        "doc_count": 1
                     }
                  ]
               },
               "avg_price": {
                  "value": 32500
               }
            },

...
}
```

1. 正如期望的那样，新的聚合嵌入在每个颜色桶中。

2. 现在我们看见按不同制造商分解的每种颜色下车辆信息。

3. 最终，我们看到前例中的 avg_price 度量仍然维持不变。

**响应结果告诉我们以下几点：**

1. 红色车有四辆。
2. 红色车的平均售价是 $32，500 美元。
3. 其中三辆是 Honda 本田制造，一辆是 BMW 宝马制造。

# 库与表
> elasticsearch的库用index,表用type表示.

------

# 查询语法

### 伪代码
> loadElsService(extent, precision, start, end);

`` 参数说明 ``

|参数|类型|说明|
|:----|:---|:---|
|extent|object|地图当前的可是范围,如[top_lef, bottm_right]|
|precision|Number|表示聚合计算的级别,类似与地图的level|
|start|Numner|查询起始时间-Unix 时间戳表示,请注意单位可以是 `秒`和`毫秒`|
|end|Number|查询结束时间-Unix 时间戳表示,请注意单位可以是 `秒`和`毫秒`|
------

### 真实代码

~~~ javascript
client.search({
        index: 'db_name',//数据库名称
        type: 'table_name',//数据库-表名称
        body: {
          query: {   
            filter: {//时间过滤
              range: {
                'dataTime': { //这里的dataTime是过滤字段
                  from: start, //查询起始时间,对应startTime
                  to: end,//查询结束时间,对应endTime
                }
              }
            }
          },
          aggregations: {  //结果聚合
            geohash: {     //按照geohash的方式进行聚合
              geohash_grid: {  //geohash_网格索引方式
                field: "geo",
                precision: precision  //聚类精度, 对应参数level
              }
            }
          }
        }
      }, function(error, responsive) {
        updateView(responsive.aggregations.geohash.buckets);
      });
~~~
