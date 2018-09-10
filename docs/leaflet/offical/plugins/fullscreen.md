## Leaflet.fullscreen
#### 用法示例
提供用于切换全屏开启和关闭的按钮：

```javascript
// 创建一个带有全屏按钮的新地图
var map = new L.Map('map', {
    fullscreenControl: true,
    // OR
    fullscreenControl: {
        pseudoFullscreen: false // 如果为true,全屏到页面的宽度和高度
    }
});

// 或者，添加一个现有的地图
map.addControl(new L.Control.Fullscreen());
```
即使您选择不使用全屏按钮，该插件也会将几种方法添加到始终可用的L.Map中：

```javascript
map.isFullscreen() // 地图是全屏吗？
map.toggleFullscreen() // 要么全屏，要么取消现有的全屏。

// 进入或退出全屏模式时触发事件`fullscreenchange`。
map.on('fullscreenchange', function () {
    if (map.isFullscreen()) {
        console.log('entered fullscreen');
    } else {
        console.log('exited fullscreen');
    }
});
```
更改全屏控制文本：

```javascript
map.addControl(new L.Control.Fullscreen({
    title: {
        'false': 'View Fullscreen',
        'true': 'Exit Fullscreen'
    }
}));
```
