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

# 常见语法
