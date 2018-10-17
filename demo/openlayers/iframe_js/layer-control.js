/* 图层控件层样式设置 */
.layerControl {
    position: absolute;
    bottom: 5px;
    min-width: 200px;
    max-height: 200px;
    right: 0px;
    top: 5px;
   /*在地图容器中的层，要设置z-index的值让其显示在地图上层*/
    z-index: 2001;
    color: #ffffff;
    background-color: #4c4e5a;
    /*边缘的宽度*/
    border-width: 10px;
    /*圆角的大小 */
    border-radius: 10px;
    /*边框颜色*/
    border-color: #000 #000 #000 #000;
}

.layerControl .title {
    font-weight: bold;
    font-size: 15px;
    margin: 10px;
}

.layerTree li {
    list-style: none;
    margin: 5px 10px;
}
/* 鼠标位置控件层样式设置 */
#mouse-position {
    float: left;
    position: absolute;
    bottom: 5px;
    width: 330px;
    height: 20px;
    /*在地图容器中的层，要设置z-index的值让其显示在地图上层*/
    z-index: 2000;
}