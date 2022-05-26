//样式模板
let iconStyle = {
    //SVG符号ID
    "symbolId": 22,
    //符号名称
    "symbolName": "",
    //标绘图元是否显示
    "show": true,
    //标绘图元ID，自动生成
    "featureId": "f73227b3-44b0-4040-8629-f89a0e992d74",
    //是否开启衬线，仅二维有效
    "compareLine": 0,
    //衬线宽度
    "compareLineWidth": 6,
    //衬线颜色，rgb或16进制颜色
    "compareLineColor": "#099563",
    //墙体高度，仅三维有效
    "dimModHeight": 500,
    //三维姿态，1：直立，0：平躺，全局属性，影响整个标绘图元
    "dimModAttitude": 1,
    //是否启用墙，仅三维有效
    "isOpenWall": true,
    //墙体颜色，rgb或16进制颜色，仅三维有效
    "wallColor": "rgba(255,0,0,0.3)",
    //部件样式，分为线样式、区样式、文字样式
    "symbolNodes": {
        //文字样式，tspan3918为部件ID，从SVG上读取
        "tspan3918": {
            //文字颜色，rgb或16进制颜色
            "fillStyle": "rgba(0,0,0,1)",
            //canvas属性，可忽略
            "fillRule": "nonzero",
            //字体样式，normal:标准，italic：斜体，仅二维有效，canvas属性
            "fontStyle": "normal",
            //定义小型大写字母文本，normal：标准，small-caps：浏览器会显示小型大写字母的字体，仅二维有效，canvas属性
            "fontVariant": "normal",
            //字体粗细，normal，bold，bolder，lighter，100~900，仅二维有效，canvas属性
            "fontWeight": "normal",
            //字体大小，单位px
            "fontSize": "15.86400509px",
            //文字字体
            "fontFamily": "\"Arial\"",
            //笔触的颜色、渐变或模式，color：纯色，gradient：渐变，pattern：指定方向重复，仅二维有效，canvas属性
            "strokeStyle": "none",
            //线条末端线帽的样式，butt：向线条的每个末端添加平直的边缘，round：向线条的每个末端添加圆形线帽，square：向线条的每个末端添加正方形线帽，仅二维有效，canvas属性
            "lineCap": "butt",
            //当两条线交汇时，边角的类型，bevel：斜角，round：圆角，miter：尖角，仅二维有效，canvas属性
            "lineJoin": "miter",
            //最大斜接长度，指的是在两条线交汇处内角和外角之间的距离，边角的角度越小，斜接长度就会越大，仅二维有效，canvas属性
            "miterLimit": 4,
            //当前线条的宽度，以像素计，仅二维有效，canvas属性
            "lineWidth": 1
        },
        //线样式，path3000-17为部件ID，从SVG上读取
        "path3000-17": {
            //线颜色，rgb或16进制颜色
            "strokeStyle": "rgba(255,0,0,1)",
            //线条末端线帽的样式，butt：向线条的每个末端添加平直的边缘，round：向线条的每个末端添加圆形线帽，square：向线条的每个末端添加正方形线帽，仅二维有效，canvas属性
            "lineCap": "butt",
            //当两条线交汇时，边角的类型，bevel：斜角，round：圆角，miter：尖角，仅二维有效，canvas属性
            "lineJoin": "miter",
            //最大斜接长度，指的是在两条线交汇处内角和外角之间的距离，边角的角度越小，斜接长度就会越大，仅二维有效，canvas属性
            "miterLimit": 4,
            //当前线条的宽度
            "lineWidth": 10,
            //canvas属性，可忽略
            "fillRule": "nonzero"
        },
        //区样式，rect4184为部件ID，从SVG上读取
        "rect4184": {
            //线颜色，rgb或16进制颜色
            "strokeStyle": "rgba(255,0,0,1)",
            //线条末端线帽的样式，butt：向线条的每个末端添加平直的边缘，round：向线条的每个末端添加圆形线帽，square：向线条的每个末端添加正方形线帽，仅二维有效，canvas属性
            "lineCap": "square",
            //当两条线交汇时，边角的类型，bevel：斜角，round：圆角，miter：尖角，仅二维有效，canvas属性
            "lineJoin": "miter",
            //最大斜接长度，指的是在两条线交汇处内角和外角之间的距离，边角的角度越小，斜接长度就会越大，仅二维有效，canvas属性
            "miterLimit": 4,
            //当前线条的宽度
            "lineWidth": 10,
            //填充颜色
            "fillStyle": "rgba(255,255,255,0.5)",
            //canvas属性，可忽略
            "fillRule": "nonzero"
        }
    },
}