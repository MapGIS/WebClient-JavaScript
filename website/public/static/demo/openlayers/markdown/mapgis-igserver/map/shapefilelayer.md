# ShapeFile 图层

1. ShapeFile 图层实际上也是通过 GDBP 的方式来实现对应的地图加载显示
1. 首先郑重声明，这个功能不是我想加的，在接口设计上`完全按照` igserver + 平台的方式传参
1. 我是绝对不会对这个接口后续维护工作负责的 Orz......

## 核心关键

1. 服务器上记录对应的 ShapeFile 的文件位置。
    ```javascript
    var gdbps = ['C:\\Users\\Administrator\\Documents\\WXWork\\1688852418315641\\Cache\\File\\2020-12\\公路通行圈\\bj_point_4h_1test_60.shp'];
    ```
2. 服务器上记录对应的 ShapeFile 的样式文件位置。
    ```javascript
    VecLayer = new Zondy.Map.GdbpLayer(name, gdbps, {
        ip: '192.168.22.97',
        port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
        // 服务器样式文件路径
        mapstyUri: 'C:\\Users\\Administrator\\Documents\\WXWork\\1688852418315641\\Cache\\File\\2020-12\\公路通行圈\\公路通行圈样式.mapsty',
        mapstyOption: {
            // 下面参数和平台参数保持一致
            DefaultShow: true,
            MapInfoShow: true,
            DynamicAnnShow: true,
            ThemeShow: true,
            SrsShow: true,
            SystemLibraryShow: true,
            LayerMappingType: 1
        }
    });
    ```

## mapstyOption 参数

![导入样式](static/demo/openlayers/markdown/mapgis-igserver/map/importstyle.png)

![导入样式](static/demo/openlayers/markdown/mapgis-igserver/map/styleinfo.png)

| 名称              | 中文名称 | 类型       | 默认值 |
| :---------------- | :------- | :--------- | :----- |
| DefaultShow       | 常规显示 | 布尔值     | true   |
| MapInfoShow       | 地图信息 | 布尔值     | true   |
| DynamicAnnShow    | 动态注记 | 布尔值     | true   |
| ThemeShow         | 专题图   | 布尔值     | true   |
| SrsShow           | 参考系   | 布尔值     | false  |
| SystemLibraryShow | 系统库   | 布尔值     | false  |
| LayerMappingType  | 图层映射 | 数值(枚举) | 1      |

> 图层映射 LayerMappingType`不支持`自定义匹配
