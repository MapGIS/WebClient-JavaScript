### 样式管理

> 样式管理一共分为四步
   1. 样式制作
   1. 样式保存
   1. 样式上传
   1. 样式预览

#### `样式制作`
   1. 点击发布的矢量瓦片的左边的预览按钮，进入对应的编辑界面
      ![预览界面](./static/assets/vectortile/preview.png)

   2. 按照个性化需求进行样式配色等操作
      ![编辑界面](./static/assets/vectortile/edit.png)


#### `样式保存`
   3. 样式配置完毕后， 点击左上方的保存按钮保存对应的样式json文件到当前计算机
      ![样式保存](./static/assets/vectortile/save.png)

#### `样式上传`
   4. 将第三步保存的文件上传到对应的服务器上, `该按钮在第1步的最右边有个绿色上传箭头，`
      ![样式上传](./static/assets/vectortile/upload.png)

   5. 上传完成的提示如下:
      ![成功上传](./static/assets/vectortile/upload_success.png)

#### `样式预览`
   6. 将5步上传的样式通过前端的加载方式进行对应的加载显示
``` javascript
var map = new mapboxgl.Map({
    container: 'map', // 绑定div
    style: 'http://localhost:6163/igs/rest/mrms/vtiles/styles/街道样式.json',
    center: [106.563777, 29.578285],
    zoom: 3
});
```