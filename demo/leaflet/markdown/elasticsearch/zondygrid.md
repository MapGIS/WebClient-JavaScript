## 重点提示

中地封装的els的接口唯一要注意的就是名称的对应

> `db`对应的是elasticsearch的`index`的名字

> `table`对应的是elasticsearch的`type`的名字

### 字段对应

> `geometry` 表示的是几何字段，不一定是这个名字，与数据导入的时候的命名相关

> `GPS_DateTime` 表示的是时间字段，不一定是这个名字，与数据导入的时候的命名相关
> > 特别注意，该字段必须是unix时间戳格式，如果不是请在数据导入的时候处理对应的格式为从`date类型改为int类型`（使用spoon工具）

![import](../demo/leaflet/markdown/elasticsearch/import.png)


### 聚类精度

> percision表示聚类精度，范围必须在 `1-12`之间

``` javascript
function getQueryOptions(){
    return {
            db: "sp_taxibj_200_2",  //对应els的index的名字
            table: "sptype",        //对应els的type的名字
            space:{
                field:"geometry",
                percision:5,
                west:-180,
                esat:180,
                north:90,
                south:-90
            },
            time:{
                field:"GPS_DateTime",
                starttime:"00000",
                endtime:"10000"
            }
        }
}
```