## 问题描述

> mapgis桌面程序导出矢量瓦片数据是，里面所有的链接地址都是localhost:6163，上传到igs（JAVA）服务器后，链接地址仍未做修改，因此或造成客户端无法访问服务器资源的问题。

## 如何解决

# 一、矢量瓦片数据已经上传到到igs（JAVA）服务器，但未保存最原始的样式文件

> 1、进入管理台
> 2、点击左边菜单栏的地图与数据服务

<img src="../../static/assets/guid/vectorStep1.png" alt="步骤一" width="1034" height="600" align="bottom" />

> 3、点击矢量瓦片资源管理，选择上传按钮，上传数据

<img src="../../static/assets/guid/vectorStep2.png" alt="步骤二" width="1034" height="600" align="bottom" />

> 4、上传完成后点击矢量瓦片资源管理，选择查看按钮

<img src="../../static/assets/guid/vectorStep3.png" alt="步骤三" width="1034" height="600" align="bottom" />

> 5、这里可以看到已上传的矢量瓦片资源

<img src="../../static/assets/guid/vectorStep4.png" alt="步骤四" width="1034" height="600" align="bottom" />

> 6、在右侧的资源列表里选择你刚刚发布的资源，我这里选择名称为‘北京市_Java’的矢量瓦片，并点击预览按钮，进入到矢量瓦片编辑页面

<img src="../../static/assets/guid/vectorStep5.png" alt="步骤五" width="1034" height="600" align="bottom" />

> 7、在编辑界面的最上方的工具栏中选择保存按钮，点击下载样式按钮，下载刚刚上传矢量瓦片资源

<img src="../../static/assets/guid/vectorStep6.png" alt="步骤五" width="1034" height="600" align="bottom" />
<img src="../../static/assets/guid/vectorStep7.png" alt="步骤五" width="1034" height="600" align="bottom" />

> 8、打开下载好的样式文件，将所有的locaolhost:6163替换为当前igs（JAVA）服务的地址即可，之后重复第三步上传矢量瓦片资源，
> 由于下载的文件名英文字母会全部变成小写，请在上传前确保文件名与地图名称完全一致，这样即可正常访问矢量瓦片。

# 二、可以拿到最原始的样式文件

> 1、打开原样式文件，将所有的locaolhost:6163替换为当前igs（JAVA）服务的地址即可，之后重复上述第三步上传矢量瓦片资源，
> 由于下载的文件名英文字母会全部变成小写，请在上传前确保文件名与地图名称完全一致，这样即可正常访问矢量瓦片。