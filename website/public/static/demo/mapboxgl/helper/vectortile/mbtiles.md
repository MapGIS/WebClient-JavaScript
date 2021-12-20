# 0 矢量瓦片的核心5大服务
1. 元数据信息服务  (**mbtile**中的**metadata**表)
2. 瓦片服务        (**mbtile**中的**tiles**表/视图)
3. 地图文档服务    (**mapgis**生成的样式文件 **xxx_style.json**)  ~~mbtile未定义~~
4. 字体服务     (**mapgis**生成的样式文件 xxx_style.json中的**glyphs**) ~~mbtile未定义~~
5. 符号库服务   (**mapgis**生成的样式文件 xxx_style.json中的**sprite**) ~~mbtile未定义~~

# 1 MBTiles格式
1. 为什么要使用MBTiles?
2. MBTiles解决了什么问题?
3. MBTiles的局限?
4. MBTiles注意的细节?
   
## 1. 为什么要使用MBTiles
1.1 mbtiles本质上是sqlite，sqlite是开源公有领域项目。它的设计目标是嵌入式的，占用资源非常的低，适合嵌入式设备/移动端设备。
1.2 mbtiles本质上文件数据库，方便拷贝与传输。
1.3 mapboxgl公司规定了mbtiles的规范与[协议](https://github.com/mapbox/mbtiles-spec)
1.4 简单方便容易上手

## 2. MBTiles解决了什么问题
2.1 矢量瓦片的元数据信息和瓦片信息
   1. 元数据信息，下图中的空间范围、发布的图层、中心点、最大最小级别等
   2. 瓦片信息，下图中的实际的点线面图元
2.2 方便geoserver/qgis/mapbox-mobile等不同的开源体系之间数据交换（未解决制图综合的交换问题）
> 以下是4种不同平台打开/生产mbtiles的效果图

| **mapgis**                                                                       |
| :------------------------------------------------------------------------------- |
| ![mapgis](../../static/demo/mapboxgl/helper/vectortile/mbtiles/mapgis.png)       |
| **geoserver** + mbtiles-store-plugin + mbtiles-plugin                            |
| ![geoserver](../../static/demo/mapboxgl/helper/vectortile/mbtiles/geoserver.png) |
| **qgis**                                                                         |
| ![qgis](../../static/demo/mapboxgl/helper/vectortile/mbtiles/qgis.png)           |
| **mapbox-mobile**                                                                |
| ![qgis](../../static/demo/mapboxgl/helper/vectortile/mbtiles/mapbox-mobile.png)  |

2.3 可以发现一个mbtile在不同的平台都可以展示对应的底图信息，但是不同平台的展示效果各不相同，这是因为mbtiles没有记录对应的地图文档信息导致的。这也是下一章节要重点说明的。

## 3. MBTiles没解决什么问题
1. ~~地图文档服务~~  ~~mbtile未定义~~  (**mapgis**生成的样式文件 **xxx_style.json**中)
2. ~~字体服务~~      ~~mbtile未定义~~ (**mapgis**生成的样式文件 xxx_style.json中的**glyphs**)
3. ~~符号库服务~~    ~~mbtile未定义~~ (**mapgis**生成的样式文件 xxx_style.json中的**sprite**)

### 3.1 针对地图文档服务：  
(**mapgis**生成的样式文件 **xxx_style.json**) 通过文件服务转发即可。内部做了规则转换保证桌面和web端的显示保持尽可能一致,**一次编图制图，全平台重复使用**
| 平台样式                                                                   | web端样式 |
| :------------------------------------------------------------------------- | :-------- |
| ![mapgis](../../static/demo/mapboxgl/helper/vectortile/mbtiles/mapgis.png) |     ![mapgis](../../static/demo/mapboxgl/helper/vectortile/mbtiles/web.png)       |


### 3.2 针对字体服务：     
 (**mapgis**提供的字体文件库) 通过文件服务转发即可
![字体](../../static/demo/mapboxgl/helper/vectortile/mbtiles/font.png)

### 3.3 针对符号服务：      
(**mapgis**提供的符号库 sprite.json sprite.png sprite@2x.json sprite@2x.png) 通过文件服务转发即可
**会在裁剪目录下生成** sprite.json sprite.png sprite@2x.json sprite@2x.png 4个文件
![符号](../../static/demo/mapboxgl/helper/vectortile/mbtiles/sprites.png)

## 4. MBTiles的局限
由于MBTiles本身没有设计对应的机制，因此需要人为的约定一些规范操作

### 4.1 **数据量上限**，由于瓦片在切片+过滤的过程中会出现如下的情况

| 级别 | 平均大小 | 该级别瓦片张数 |
| :--- | :------- | :------------- |
| 1    | 1.69M    | 1              |
| 2    | 471Kb    | 4              |
| 3    | 256Kb    | 8              |
| 4    | 144Kb    | 17             |
| 5    | 61Kb     | 47             |
| 6    | 40Kb     | 155            |
| 7    | 20Kb     | 559            |
| 8    | 2 Kb     | 2117           |
| 9    | 800字节  | 8208           |
| 10   | 250字节  | 366            |

    简而言之就是：
   1. 前面几级单张瓦片存储空间大（空间范围过大导致的图元化简力度大+图元过滤多）
   2. 中间几级瓦片图元数量多（化简力度适中+图元过滤少）
   3. 尾部几级（图元无过滤+图元无化简）
   4. **关系型数据库**（按行存储）在处理这类每条记录都大小不一致(**方差较大**)的情形下没有**NoSQL**(按列存储 monggodb)的高效
### 4.2 坐标系支持相对单一
   1. 瓦片数据**只支持EPSG:3857** web墨卡托投影
   ![EPSG:3857](../../static/demo/mapboxgl/helper/vectortile/mbtiles/epsg3857.png)
   2. mapboxgl-2.6.0的版本支持了6类投影，但是最新的1.3的版本协议中仍然只支持EPSG:3857
   3. 元数据的坐标却是采取经纬度表示，没有从坐标上统一参考系
   ![EPSG:4326](../../static/demo/mapboxgl/helper/vectortile/mbtiles/epsg4326.png)
### 4.3 数据只记录了元数据信息和瓦片信息，缺失**符号**信息和**字体**信息与**地图文档**信息
### 4.4 不明确是否**采取gzip的compress**[压缩策略](https://github.com/mapbox/mbtiles-spec/blob/master/1.3/spec.md#future-directions)
   ![compress](../../static/demo/mapboxgl/helper/vectortile/mbtiles/compress.png)
### 4.5. tms的瓦片切片策略与直观的xyz不符合，需要前端主动传入(tms切片格式)或者后台转发处理成xyz格式

## 5. 如何避免MBTiles的局限
### 5.1 针对数据量上限
MapGIS桌面生成矢量瓦片的时候尽量只生成0-16级的瓦片，剩余的17-20通过mapbox的[瓦片延申机制实现](/#/demo/mapboxgl/client-view/vectortile/tiledelay)
### 5.2 针对坐标系
统一采取 **EPSG3857-Web墨卡托坐标系**
![compress](../../static/demo/mapboxgl/helper/vectortile/mbtiles/proj.png)

### 5.3 针对符号/字体/地图文档
通过上面提到文件服务发布对应的3类服务

### 5.4 针对压缩策略
**特别注意** geoserver/qgis需要二次压缩操作
请生产端和服务端保持下面**策略一致**即可

|桌面生产端 |服务端|
|:---|:---|
|![压缩](../../static/demo/mapboxgl/helper/vectortile/mbtiles/compress_bool.png)|**1.** sprint/nodejs/NET需要主动给对应的瓦片服务一个G-ZIP的标识**Accept-Encoding: gzip**  **Content-Encodin:gzip**|
|![未压缩](../../static/demo/mapboxgl/helper/vectortile/mbtiles/compress_unbool.png)|**2.** spring/nodejs/NET**直接转发**即可|
|![未压缩](../../static/demo/mapboxgl/helper/vectortile/mbtiles/compress_unbool.png)|**3.** spring/nodejs/NET **服务端进行gzip二次压缩**，并加入G-ZIP的标识**Accept-Encoding: gzip**  **Content-Encodin:gzip**|

### 5.5 针对瓦片切片策略
1. [xyz](http://docs.opengeospatial.org/is/13-082r2/13-082r2.html#32)瓦片 最容易理解与认识 (monggo postgis mapgis mapboxgl arcgis的默认规则)
   1. 原点在左上角
   ![左上角](../../static/demo/mapboxgl/helper/vectortile/mbtiles/xyz_rule.png)
   2. 计算规则得出的xyz就是文件夹中的 x <-> column;  y <-> row;  z <-> level
   ``` js
   let x = x;
   let y = y;
   let z = z;
   ```
2. [tms](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification)瓦片 移动设备的切片策略 (mapboxgl-mobile的默认规则)
   1. 原点在左下角
   ![左下角](../../static/demo/mapboxgl/helper/vectortile/mbtiles/tms_rule.png)
   2. 计算规则,得出的xyz就是mbtiles中的 x <-> tile_column;  y <-> tile_row;  z <-> tile_level
   ``` js
   let x = x;
   let y = Math.pow(2, z) - y - 1; // Tiles on database are tms (inverted y axis)
   let z = z;
   ```

|桌面生产端 |服务端|
|:---|:---|
|![xyz](../../static/demo/mapboxgl/helper/vectortile/mbtiles/xyz.png)|**1.** sprint/nodejs/NET发布一个**xyz**的瓦片服务即可|
|![tms](../../static/demo/mapboxgl/helper/vectortile/mbtiles/tms.png)|**2.** sprint/nodejs/NET发布一个**tms**的瓦片服务即可|

目录型瓦片（xyz）转 MBtiles (tms)
|桌面生产端 |服务端|
|:---|:---|
|![xyz](../../static/demo/mapboxgl/helper/vectortile/mbtiles/xyz_tms.png)|**3.** sprint/nodejs/NET发布一个**tms**的瓦片服务即可|

## 6.建议
1. 生成**文件型**的目录瓦片作为**中间交换格式**，然后**不设置**对应的压缩策略
2. 根据需求定制不同的策略
   1. 针对**移动端**通过矢量瓦片转换目录型-> mbtiles,移动端**离线**使用
   2. 针**对在线大数据**，通过批处理脚本加入mongodb中（**3台节点**配置）
3. 如果需要二次压缩建议是**服务端**进行操作，这样加gzip的标签由服务端**统一规划**