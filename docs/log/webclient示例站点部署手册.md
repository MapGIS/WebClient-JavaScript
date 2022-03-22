# Webclient 示例站点部署手册

## 部署过程说明

1. 将dist中的内容放入site\static\libs下。

![image-20220322203332185](./assets/image-20220322203332185.png)

																														<center>图1</center>

2. 使用IIS或nginx发布整个site文件夹，建议使用nginx，如果使用IIS请注意使用包中附带的web.config文件。  

![image-20220322201929344](./assets/image-20220322201929344.png)

																										<center>图2 ngix中配置示例站点演示</center>

3. 配置相关文档

   3.1 将包中site/docs目录下vue-cesium、vue-mapboxgl、vue-ui 3个文件夹各自单独发布为一个站点，记录三个站点的IP和端口号。

![image-20220322203032927](./assets/image-20220322203032927.png)

																																	<center>图3</center>

![image-20220322204605275](./assets/image-20220322204605275.png)

<center>图4 nginx中3个文档站点的配置示例</center>

​	3.2 在site/static/demo/config目录下编辑config-headers.json文件，找到如图5所示位置，将3个站点的IP和端口信息按links中的顺序在文件对应位置填写正确：

![image-20210617173905445](./assets/image-20210617173905445.png)

<center>图5</center>																				

![image-20220322204226917](./assets/image-20220322204226917.png)

<center>图6</center>										

​				保证示例站点中以下3个链接可以正确访问到

![image-20220322205003780](./assets/image-20220322205003780.png)

<center>图7</center>

4. 配置新版cesium沙盒示例

   4.1 按上述第3步将包中site\cesium-sandcastle文件夹发布成单独站点并在site/static/demo/config目录下config-headers.json文件中进行对应链接的配置

![image-20220322205624788](./assets/image-20220322205624788.png)

<center>图8</center>

![image-20220322205812802](./assets/image-20220322205812802.png)

<center>图9 ngix配置文件配置沙盒站点</center>

![image-20220322205935434](./assets/image-20220322205935434.png)

<center>图10 config-headers.json文件中配置沙盒站点链接</center>

![image-20220322210503079](./assets/image-20220322210503079.png)

<center>图11 配置后的界面效果</center>
