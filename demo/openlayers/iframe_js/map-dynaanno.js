function MapDispSetting(element) {
        //如果复选框被选中
        if (element.checked) {
            //点要素动态注记方位属性，当需要设置动态注记的图层为点图层时，设置此类
            var labelPntInfo = new Zondy.Object.LablePntInfo({
                //动态注记方位角度值
                Ang: null,
                //是否不完全注记
                ClientOutLabel: false,
                //注记偏离要素的距离
                Distance: 0,
                //注记方位优先级组合
                EightDirLableType: [0, 2],
                //点的动态注记的方位类型
                PntType: 1
            });
            var dynNoteLabelType = new Zondy.Object.DynNoteLableType({
                //点要素动态注记方位属性
                PntInfo: labelPntInfo
            });
            ///创建一个CDynNoteInfo对象，用来描述动态注记的一些信息
            var cDynNoteInfo = new Zondy.Object.CDynNoteInfo({
                //注记字段名称
                FieldName: "Cname",
                //注记字体角度
                FontAngle: 0.5,
                //注记颜色，颜色库索引
                FontColor: 1,
                //注记字体大小
                FontSize: 14,
                //注记西文字体id，主要针对字母;0:宋体、1：黑体、2：仿宋、3：隶书、4：楷体、5：微软雅黑、6：幼圆、7：新宋体
                FontStyle: 5,
                //注记中文字体id，主要针对中文;0:宋体、1：黑体、2：仿宋、3：隶书、4：楷体、5：微软雅黑、6：幼圆、7：新宋体
                Ifnt: 4,
                //注记字形状
                Ifnx: 0,
                //是否填充背景色
                IsFilled: false,
                //注记背景颜色编号，仅当IsFilled参数设置为true时有效
                Backclr: 12,
                //注记轮廓宽度,仅当IsFilled参数设置为true时有效，为0时表示背景宽度为适应注记的宽度
                Backexp: 0,
                //是否水平线上
                IsHzpl: true,
                //注记冲突策略（注记优先级）
                LabelLevel: 1,
                //注记方位属性
                LabelType: dynNoteLabelType,
                //注记字的间距
                Space: 0,
                //注记删除线
                StrikeThrough: false,
                //注记下划线
                UnderLine: false
            });
            //创建一个DynShowStyle对象，用来描述注记显示的样式
            dynShowStyle = new Zondy.Object.DynShowStyle({
                //是否显示动态注记

                DynNoteFlag: true,
                //设置显示的动态注记参数
                DynNoteInfo: cDynNoteInfo
            });
        }
        else {
            //设置不显示动态标记
            dynShowStyle.DynNoteFlag = false;
        }

        //图层显示样式数组，按顺序每个数组元素依次对应一个图层的样式
        var dynShowStyleArr = new Array();
        //本示例中，地图文档中只有一个图层，故只用push这一个图层的样式
        dynShowStyleArr.push(dynShowStyle);
        //创建一个地图显示参数对象
        cDisplayStyle = new Zondy.Object.CDisplayStyle({
            //图层显示样式
            ShowStyle: dynShowStyleArr
        });
}
function Submit1_onclick() {
    if (document.getElementById('dynaAnno').checked) {
        if (cDisplayStyle != null) {
            //设置矢量图层的动态注记
            docLayer.setStyle(cDisplayStyle);
            docLayer.refresh();
        }
    }
    else {
        docLayer.refresh();
    }
}
