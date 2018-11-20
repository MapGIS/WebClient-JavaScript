### 军标绘制
> `示例操作步骤：`选中图标，鼠标在地图上点击确认绘制的起点，双击结束绘制；箭头绘制确定起点后，还需确定(中点，即箭头腰部的位置)；集结区绘制需确定区域各控制点。


```javascript
//实例化绘制军标的工具
 var drawTool = new MilStd.MilStdDrawTool(map);
/**
* 绘制军标
* milstdType:绘制的军标类型
* milParam:绘制的军标具体参数
* drawName:绘制军标的名称 
*/
drawTool.activate(milstdType, milParam, drawName);//添加对应的绘制监听

//实例化修改工具：在样式修改中设置好样式参数，点击样式修改，点击对应的军标，即可修改被点击军标的样式；可以修改指定图形的填充色、点半径、线头类型、拐角类型、线形、线颜色、线宽
 drawTool.drawnItems.eachLayer(function (layer) {
    modifyTool = new MilStd.ModifyTool(layer, drawTool);
    modifyTool.addHooks(); //添加修改监听
 }, this);

//实例化移动工具：点击移动图标按钮后，选中要移动的图标，按住鼠标左键拖动图标
 drawTool.drawnItems.eachLayer(function (layer) {
    dragTool = new MilStd.DragPan(layer);
    dragTool.addHooks(); //添加移动监听
 }, this);

//各工具移除监听
 drawTool.deactivate();
 modifyTool.removeHooks();
 dragTool.removeHooks();
``` 