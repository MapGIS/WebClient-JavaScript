# MapGIS Client for JavaScript 示例站点使用说明

- [MapGIS Client for JavaScript 示例站点使用说明](#mapgis-client-for-javascript-示例站点使用说明)
  - [一、目录结构](#一目录结构)
  - [二、示例运行](#二示例运行)
    - [1、安装依赖环境](#1安装依赖环境)
    - [2、编译测试](#2编译测试)
    - [3、代码格式检查](#3代码格式检查)
    - [4、打包](#4打包)
    - [5、自定义配置](#5自定义配置)
  - [三、站点发布](#三站点发布)
    - [1. Windows](#1-windows)
    - [2. Linux](#2-linux)
    - [3. Node.js](#3-nodejs)
    - [4. express windows-server-2003](#4-express-windows-server-2003)
  - [四、离线站点部署](#四离线站点部署)

## 一、目录结构

``` text
|-- website                     -- 示例网站
  |-- express                   -- node服务，在一些wind2003等老机器上替代IIS
  |-- public                    -- 网页的公共路径
    |-- docs                    -- 各项API资源目录
    |-- static                  -- 示例目录
      |-- assets                -- 公共图片
      |-- data                  -- 公共数据
      |-- demo                  -- 示例代码
        |-- cesium              -- Cesium示例
          |-- example           -- Cesium示例代码     
          |-- markdown          -- Cesium示例说明
          |-- gallery           -- Cesium示例功能效果图           
        |-- config              -- 含示例目录配置文件
        |-- leaflet             -- Leaflet示例
        |-- mapboxgl            -- MapBoxGL示例
        |-- openlayers          -- OpenLayers示例
      |-- libs                  -- 引用库
  |-- src                       -- 示例网页的vue代码
```
MapGIS Client for JavaScript资源站点编译后将生成dist目录，包括开发库、示例站点、API文档等，主要目录结构如下：
``` text
  |-- dist                      -- website编译后的目录
    |-- docs                    -- 各项API资源目录
    |-- static                  -- 示例目录
      |-- assets                -- 公共图片
      |-- data                  -- 公共数据
      |-- demo                  -- 示例代码
        |-- cesium              -- Cesium示例
          |-- example           -- Cesium示例代码     
          |-- markdown          -- Cesium示例说明
          |-- gallery           -- Cesium示例功能效果图   
        |-- config              -- 含示例目录配置文件
        |-- leaflet             -- Leaflet示例
        |-- mapboxgl            -- MapBoxGL示例
        |-- openlayers          -- OpenLayers示例
      |-- libs                  -- 引用库
    |-- index.html                -- 资源站点首页
```

>司马云-产品开发包的MapGIS Client for JavaScript开发包为编译后的产品包（对应上面dist目录），可支持离线环境下部署使用，具体操作请参考本文档第三、四部分内容。在线环境推荐从开源社区上拉取。


## 二、示例运行

提供 npm 和 yarn 两种方式编译、运行、打包站点，在安装依赖环境前，需配置 Node.js 或 yarn 环境，然后采用对应的命令执行相应的操作。

### 1、安装依赖环境

```
npm install
# or
yarn install
```

### 2、编译测试

```
npm run serve
# or
yarn serve
```

### 3、代码格式检查

```
npm run lint
# or
yarn lint
```

### 4、打包

```
npm run build
# or
yarn build
```

### 5、自定义配置

请看 [配置引用](https://cli.vuejs.org/config/).

## 三、站点发布

在示例站点目录执行如下命令打包，打包成功后会在website目录下生成dist文件夹，站点发布时需将此目录发布。（特别说明：司马云-产品开发包的MapGIS Client for JavaScript开发包为编译后的产品包，对应dist目录，直接发布即可）

```
npm run build
# or
yarn build
```

### 1. Windows

> 对于Windows 2008 后（包括 2008）的版本，直接使用 IIS 将 website/dist 目录发布到 IIS 服务中即可正常使用。

### 2. Linux

> 使用 nginx / tomcat 发布 dist 目录的网页

### 3. Node.js

> 请使用 http-server 来预览网页

需在website目录中配置http-server环境：

```
npm install -g http-server
```

然后调用如下命令发布网站：

```
cd /path/to/website/dist
http-server -p 8899
```

### 4. express windows-server-2003

express 后台运行发布

> 针对 windows-server-2003 的老操作系统,由于其不支持各种新的三维纹理以及特殊的 json 格式，mvt.pbf 格式因此统一处理成二进制文件

1. 安装全局的 express 环境
    ```sh
    npm install -g express-generator@4
    ```
2. 进入对应的 webclient-javascript-vue 的 express 目录下
    ```sh
    cd path/to/website/express
    ```
3. 在 express 目录下新建 server 文件夹,并按需修改 app.js 中的端口
    ```sh
    express server && cd server
    ```
    ```js
    app.listen(8899);
    ```
4. 在 server 目录下安装依赖
    ```sh
    npm install
    npm install --save node-windows
    npm start
    ```
5. 复制上一级中的 windowserver.js 到当前目录，并修改里面的路径
    ```js
    let svc = new Service({
        name: 'WebClientTest', //服务名称
        description: 'WebClient项目NodeJs服务器', //描述
        script: 'path/to/webclient-javascript-vue/express/server/bin/www' //nodejs项目要启动的文件路径
    });
    ```
6. 启动对应的 windowserver 脚本，注册为 windows 的服务
    ```sh
    node windowserver.js
    ```
7. 在 Windows 的服务中，启动服务，默认情况是随开机自启的

## 四、离线站点部署

> 将 public/static/libs/include-xxx-local.js 文本种尾部的 webclient 配置项中的 ip、端口、协议改成对应的局域网对应的即可实现离线部署，访问局域网的相关服务

```js
// public/static/libs/include-xxx-local.js
window.webclient = {
  ip: 'develop.smaryun.com',
  port: 6163,
  protocol: 'http'
};
```

> 示例中的服务访问地址将自动被替换成对应的局域网的地址

```js
var { protocol, ip, port } = window.webclient;
//加载M3D地图文档（服务地址，配置参数）
var landscapeLayer = m3dLayer.append(`${protocol}://${ip}:${port}/igs/rest/g3d/ZondyModels`;
//地址转换：http://develop.smaryun.com:6163  => http://ip:port
```
