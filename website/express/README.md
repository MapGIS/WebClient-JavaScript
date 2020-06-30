# express

1. 安装全局的express环境
    ``` sh
    npm install -g express-generator@4
    ```
2. 进入对应的webclient-javascript-vue的express目录下
    ``` sh
    cd path/to/webclient-javascript-vue/express
    ```
3. 在express目录下新建server文件夹,并按需修改app.js中的端口
    ``` sh
    express server && cd server
    ```
    ``` js
    app.listen(8899)
    ```
4. 在server目录下安装依赖
    ``` sh
    npm install
    npm install --save node-windows
    npm start
    ```
5. 复制上一级中的windowserver.js到当前目录，并修改里面的路径
    ``` js
    let svc = new Service({
        name: "WebClientTest", //服务名称
        description: "WebClient项目NodeJs服务器", //描述
        script: "path/to/webclient-javascript-vue/express/server/bin/www", //nodejs项目要启动的文件路径
    });
    ```
6. 启动对应的windowserver脚本，注册为windows的服务
    ``` sh
    node windowserver.js
    ```
7. 在windows的服务中，启动服务，默认情况是随开机自启的




