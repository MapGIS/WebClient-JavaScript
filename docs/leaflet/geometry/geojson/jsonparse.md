### GeoJSON

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

> 实际上这个数据转成的geojson特别的大，因此需要进行化简抽稀，如果数据量过大，请联系基础平台/创新中心的`潘卓然` 协同解决

#### 关于JSON.parse(), $.parseJSON()的用法区别
------

***注:*** 从jQuery 3.0开始,不推荐使用`$.parseJSON`。要解析JSON字符串，请改用原生的`JSON.parse`方法。

**1. JSON.parse()**

JSON.parse (JSON字符串) :接受一个`标准格式`的JSON字符串，并返回解析后的JavaScript对象。
示例如下：
```JavaScript
var str = '[{
    "href":"MapGIS.com",
    "text":"test",
    "orgId":123,
    "dataType":"curry",
    "activeClass":"haha"
    }]';
JSON.parse(str);
```
输出结果：
```JavaScript
Array = [{
    activeClass:"haha"
    dataType:"curry"
    href:"MapGIS.com"
    orgId:123
    text:"test"
}];
```

**2. $.parseJSON()**

用法同上，得到的结果与JSON.parse()一致。

**3. 两者区别：**

若浏览器不支持JSON.parse()方法，可更换使用$.parseJSON()方法，浏览器支持时会返回JSON.parse()方法相同的结果。IE6,7标准模式以及IE8兼容模式下不支持JSON.parse()方法,IE8及其以上版本标准模式支持。浏览器兼容性详情请参考[JSON.parse](https://msdn.microsoft.com/zh-cn/library/s4esdbwz(v=vs.94).aspx)


**4. 传入格式有误的JSON字符串可能导致抛出异常。例如,下面这些无效的JSON字符串:**

|   字符串   |    错误原因   |
|:---------:|:------------:|
|`{test: 1}`|test 没有使用双引号包裹|
|`{'test': 1}`|'test'用了单引号而不是双引号包裹|
|`"{test: 1}"`|test没有使用双引号包裹|
|`"{'test': 1}"`|'test'用了单引号而不是双引号包裹|
|`"'test'"`|'test' 用单引号代替双引号|
|`".1"`|number 必须以数字开头;"0.1"将是有效的|
|`"undefined"`|undefined不能表示一个JSON字符串;然而null,可以|
|`"NaN"`|NaN 不能表示一个JSON字符串;用Infinity直接表示无限也是不允许的|

**5. 更多关于JSON格式的细节请参考[JSON](http://json.org/)。**
