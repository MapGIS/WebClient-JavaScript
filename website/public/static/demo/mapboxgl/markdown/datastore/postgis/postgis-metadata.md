# 环境

> 所有操作必须在内网执行

## 登录

http://192.168.96.101:9091/AdminLTE/userlogin.jsp
账号： admin
密码： admin

## 检查数据目录

![目录信息](static/demo/mapboxgl/markdown/datastore/postgis/catlog.png)

## 进入对应的某个数据目录

![目录表集合](static/demo/mapboxgl/markdown/datastore/postgis/catlog-tables.png)

> 发现该数据目录集合`bigdata03`下有 2 个数据库

    1. public (建库内置默认表)
    2. bigdata03 (此处可以是任意名字，这里示例表与库的名字一致是举例)

## 进入对应的某个表

![目录表](static/demo/mapboxgl/markdown/datastore/postgis/catlog-table-metadata.png)

## 查询

```js
let param = {
    networkProtocol: 'http',
    ip: '192.168.96.101',
    port: 9091,
    path: 'bigdata03/bigdata03', // bigdata03工作空间下的bigdata03数据库
    tableNames: 'mpf24091'
};

let catlog = new Zondy.DataStore.PostGIS.PostgisTableService(param);
```
