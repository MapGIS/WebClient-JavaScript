# MapGIS Webclient Javascript Website

## 安装依赖环境

```
npm install
# or
yarn install
```

### 编译测试

```
npm run serve
# or
yarn serve
```

### 打包

```
npm run build
# or
yarn build
```

### 代码格式检查

```
npm run lint
# or
yarn lint
```

### 自定义配置

请看 [配置引用](https://cli.vuejs.org/config/).

# 发布

直接将

```
npm run build
# or
yarn build
```

## 1. windows

> window2008 后（包括 2008）版本直接使用 IIS 的 dist 目录发布到对应的 IIS 服务中即可正常使用。

## 2. linux

> 使用 nginx / tomcat 发布 dist 目录的网页

## 3. nodejs

> 请使用 http-server 来预览网页

```
cd /path/to/website
http-server -p 8899
```

## 4. express windows-server-2003

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
7. 在 windows 的服务中，启动服务，默认情况是随开机自启的

# 离线部署站点

> 将 public/static/libs/include-xxx-local.js 文本种尾部的 webclient 的配置项中的 ip,端口,协议改成对应的局域网 ip 即可实现。

```js
// public/static/libs/include-xxx-local.js
window.webclient = {
    ip: 'develop.smaryun.com',
    port: 6163,
    protocol: 'http'
};
```

> 示例中的地址自动被替换成对应的局域网的地址

```js
    //加载M3D地图文档（服务地址，配置参数）
    var { protocol, ip, port } = window.webclient;
    landscapeLayer = m3dLayer.append(`${protocol}://${ip}:${port}/igs/rest/g3d/ZondyModels`;
    // http://develop.smaryun.com:6163  => http://ip:port
```
