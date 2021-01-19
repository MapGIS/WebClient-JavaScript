# Vue 内存溢出

> 由于 Cesium 本身就存在纹理/多线程等重框架，导致无法像 leaflet/openalers 一样简单的独立引用，因此很容易导致内存溢出问题

## 表现

```sh
JVM Out Of Memery
```

## 解决方式

针对该问题的统一解决方式是提升 NodeJS 的运行内存 `node --max_old_space_size=8196`

1. `Vue CLi 2.0` 的工程命令
   通过 Vue Cli 2.0 建立的工程的 package.json 的内容如下：

    ```json
    {
        "scripts": {
            "serve": "vue-cli-service serve",
            "build": "vue-cli-service build",
            "lint": "vue-cli-service lint"
        }
    }
    ```

    将上面的`vue-cli-service`修改为`node --max_old_space_size=8196 ./node_modules/@vue/cli-service/bin/vue-cli-service serve`

    修改后结果为

    ```json
    {
        "scripts": {
            "serve": "node --max_old_space_size=8196 ./node_modules/@vue/cli-service/bin/vue-cli-service serve",
            "build": "node --max_old_space_size=8196 ./node_modules/@vue/cli-service/bin/vue-cli-service build",
            "lint": "node --max_old_space_size=8196 ./node_modules/@vue/cli-service/bin/vue-cli-service lint"
        }
    }
    ```

2. 自定义运行命令
   参照上面的命名按照 ./node_modules/目录下的内容进行修改替换

3. 屏蔽编译选项
   在 ./node_modules/@mapgis/webclient-vue-cesium/package.json 下，其内容如下：
    ```json
    {
        "name": "@mapgis/webclient-vue-cesium",
        "version": "1.0.6",
        "description": "mapgis webclient-vue-cesium",
        "main": "dist/webclient-vue-cesium.umd.1.js",
        "module": "src/index.js"
    }
    ```
    上面的module表示，如果你的工程存在对应的ES6依赖环境，会走编译模式，`可以进行代码调试`，main表示直接走编译后的运行包，`无法代码调试`。
    直接`删除module`或者`重命名module`,  让其直接走main分支，进行运行时开发。
    ```json
    {
        "name": "@mapgis/webclient-vue-cesium",
        "version": "1.0.5",
        "description": "mapgis webclient-vue-cesium",
        "main": "dist/webclient-vue-cesium.umd.1.js",
        "module-bakup": "src/index.js"
    }
    ```