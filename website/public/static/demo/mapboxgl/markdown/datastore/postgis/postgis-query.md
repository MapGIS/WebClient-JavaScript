## 常见错误

### 问题表现

![未指定坐标系](static/demo/mapboxgl/markdown/datastore/postgis/bug-srid.png)

### 问题原因

> 进入 pgAdmin 针对要查询的数据表进行查询

```sql
select srid from geometry_columns where f_table_schema = 'bigdata03' and f_table_name = 'mpf26126';
```

![未指定坐标系](static/demo/mapboxgl/markdown/datastore/postgis/bug-srid-query.png)

发现 srid 为 0，该情况有 2 种可能:

1. 通过 MapGIS 平台导入数据到 PostGIS 数据库中导致对应的坐标系/投影系信息缺失

    1. 请检查原始数据是否确实是精准匹配对应的坐标系/投影系
       ![未指定坐标系](static/demo/mapboxgl/markdown/datastore/postgis/bug-srid-origin.png)
    2. 请尝试通过平台链接数据
        1. 平台建立 postgis 数据源
           ![连接PostGIS](static/demo/mapboxgl/markdown/datastore/postgis/mapgis-pg-link.png)
        1. 导入`真正合法有效`的正确的数据
           ![导入数据PostGIS](static/demo/mapboxgl/markdown/datastore/postgis/postgis-import.png)
        1. 导入数据成功
           ![导入成功](static/demo/mapboxgl/markdown/datastore/postgis/postgis-import-success.png)
        1. 查看导入的数据的真实的表名称，这里举例图层名字为 4326_epsg，但是 pg 中记录的是 mpf+id 的组合名称，请使用后面的名称
           ![查看虚拟映射id](static/demo/mapboxgl/markdown/datastore/postgis/postgis-table-id.png)
        1. 查询发现其是正确的参考系
            ```sql
            select srid from geometry_columns where f_table_schema = 'bigdata03' and f_table_name = 'mpf26128';
            ```
            ![查询](static/demo/mapboxgl/markdown/datastore/postgis/postgis-table-srid.png)
    3. 无法避免的特定`暗坑`, 67 格式的数据导入 pg 会无法识别坐标系/投影系
       该情况由于 67 数据格式与 Map GIS 10 格式上的不匹配，导致 67 的数据直接入库 pg 的时候默认走自定义参考系，因此 67 数据不能直接入库 pg，而是先入库平台，然后平台再修改数据为正确的坐标系/投影系，最后通过 10 的平台再入库即可完成正确的投影坐标系的转换。
       潘卓然亲测确实如此，并与平台的胡伟潘明敏一起联调过 C++代码 `该代码无法改动`，请遵守`mapgis的规则`，时间：20200929，九州平台 10.5.0
        > 如果强行实现修正，需要针对数据库里面的对应的表进行下面的 SQL 修改操作
        
        ```sql
        select UpdateGeometrySRID('bigdata03','mpf26126', 'mpshape', 4326);
        ```

2. 通过三方工具导入 PostGIS，参考上面的类似做法
