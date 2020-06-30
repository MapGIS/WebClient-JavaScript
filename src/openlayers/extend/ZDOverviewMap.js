import {Zondy} from '../../service/common/Base';
import {inherits} from 'ol/util.js';
import OverviewMap from 'ol/control/OverviewMap.js';
import View from 'ol/View.js';
import * as ol_events from 'ol/events.js';
import EventType from 'ol/events/EventType.js';

var ZDOverviewMap = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    OverviewMap.call(this, options);

    this.cursor_ = 'move';
    /**
    * @type {string|undefined}
    * @private
    */
    this.previousCursor_ = undefined;

    /**
    * @type {boolean|undefined}
    * @private
    * @鹰眼视图的Box中鼠标是否按下
    */
    this.mouseDown = false;

    /**
    * @type {Array<Number>}
    * @private
    * @鹰眼视图的Box的Bottom_Left的Pixel值
    */
    this.positionBox = null;

    /**
    * @type {Array<Number>}
    * @private
    * @鹰眼视图中鼠标位置的Pixel值
    */
    this.preMousePos = null;

    /**
    * @type {Array<Number>}
    * @private
    * @鹰眼视图中鼠标Down时的Pixel值
    */
    this.startPos = null;

    /**
    * @type {Array<Number>}
    * @private
    * @鹰眼视图中鼠标Up时的Pixel值
    */
    this.endPos = null;
    //设置初始鹰眼框Box的样式
    this.SetBoxStyle("#999999", 0.5);
    //判断初始鹰眼视图是否是显示的
    if (!this.collapsed_) {
        this.ConnectEventHandle();
    }

};
inherits(ZDOverviewMap, OverviewMap);

/**
* @对鹰眼视图的view进行设置，当投影不为'EPSG:3857'时使用，2015/9/28修改
* @api stable
*/
ZDOverviewMap.prototype.InitView = function (center, projection) {
    this.ovmap_.setView(new View({ center: center, projection: projection }));
};

/**
* @对鹰眼视图的Box监听浏览器事件
* @api stable
*/
ZDOverviewMap.prototype.ConnectEventHandle = function () {
    var box = this.boxOverlay_.getElement();
    if (box !== undefined && box != null) {
        ol_events.listen(box, EventType.MOUSEMOVE,
      this.handleMouseEnter, this);
        ol_events.listen(box, EventType.MOUSEOUT,
      this.handleMouseLeave, this);
    }
};

/**
* @设置Box的背景和透明度（灰色:"#999999" ,0.5 :(半透明)）
* @api stable
*/
ZDOverviewMap.prototype.SetBoxStyle = function (fillColor, opacity) {
    if (this.boxOverlay_ !== undefined && this.boxOverlay_ != null) {
        var box = this.boxOverlay_.getElement();
        box.style['backgroundColor'] = fillColor;
        box.style['opacity'] = opacity;
    }
};


/**
* @注销对鹰眼视图的Box监听的浏览器事件
* @api stable
*/
ZDOverviewMap.prototype.DisConnectEventHandle = function () {
    var box = this.boxOverlay_.getElement();
    if (box !== undefined && box != null) {
        ol_events.unlisten(box, EventType.MOUSEMOVE,
      this.handleMouseEnter, this);
        ol_events.unlisten(box, EventType.MOUSEOUT,
      this.handleMouseLeave, this);
    }
};

/**
* @将像素值的字串转换为数字（50px-->50）
* @api stable
*/
ZDOverviewMap.prototype.ConvertPixelToNumber = function (str) {
    if (str !== undefined && str != null) {
        var index = str.indexOf("px");
        if (index > 0) {
            return Number(str.slice(0, index));
        }
    }
    return Number(str);
};

/**
* @Box中的MouseDown事件
* @api stable
*/
ZDOverviewMap.prototype.handleMouseDown = function (e) {
    this.mouseDown = true;
    var bottom = this.ConvertPixelToNumber(e.target.parentNode.style.bottom);
    var left = this.ConvertPixelToNumber(e.target.parentNode.style.left);
    this.positionBox = [bottom, left];
    this.preMousePos = [e.clientX, e.clientY];
    this.startPos = [e.clientX, e.clientY];
};

/**
* @Box中的MouseMove事件，以控制Box的位置
* @api stable
*/
ZDOverviewMap.prototype.handleMouseMove = function (e) {
    if ((this.positionBox !== undefined && this.positionBox != null) && this.mouseDown == true) {
        var deltaX = e.clientX - this.preMousePos[0];
        var deltaY = e.clientY - this.preMousePos[1];
        this.positionBox[0] -= deltaY;
        this.positionBox[1] += deltaX;
        e.target.parentNode.style.bottom = this.positionBox[0] + "px";
        e.target.parentNode.style.left = this.positionBox[1] + "px";
        this.preMousePos = [e.clientX, e.clientY];
    }
};


/**
* @Box中的MouseUp事件，通过Box移动的距离计算主视图中心点的偏移量，
* @从而实现鹰眼与主视图的联动
* @api stable
*/
ZDOverviewMap.prototype.handleMouseUp = function (e) {
    if (this.startPos == null) {
        return;
    }
    this.mouseDown = false;
    this.endPos = [e.clientX, e.clientY];

    var map = this.getMap();
    var view = map.getView();
    // goog.asserts.assert(goog.isDef(view), 'view should be defined');

    var ovmap = this.ovmap_;
    var ovview = ovmap.getView();
    //goog.asserts.assert(goog.isDef(ovview), 'ovview should be defined');

    var deltaX = (this.endPos[0] - this.startPos[0]) * ovview.getResolution();
    var deltaY = (this.endPos[1] - this.startPos[1]) * ovview.getResolution();
    var preCenter = view.getCenter();
    var endCenter = [preCenter[0] + deltaX, preCenter[1] - deltaY];
    view.setCenter(endCenter);

    this.startPos = null;
    this.endPos = null;
};

/**
* @Box中的MouseEnter事件，修改鼠标样式为"move"
* @api stable
*/
ZDOverviewMap.prototype.handleMouseEnter = function (e) {
    if (e.target.style.cursor != this.cursor_) {
        this.previousCursor_ = e.target.style.cursor;
        e.target.style.cursor = this.cursor_;
    }
    var box = this.boxOverlay_.getElement();
    if (box !== undefined && box != null) {
        ol_events.listen(box, EventType.MOUSEDOWN,
      this.handleMouseDown, this);
        ol_events.listen(box, EventType.MOUSEMOVE,
      this.handleMouseMove, this);
        ol_events.listen(box, EventType.MOUSEUP,
      this.handleMouseUp, this);
    }

};

/**
* @Box中的MouseEnter事件，恢复鼠标的默认样式
* @api stable
*/
ZDOverviewMap.prototype.handleMouseLeave = function (e) {
    this.handleMouseUp(e);
    if (this.previousCursor_ !== undefined) {
        e.target.style.cursor = this.previousCursor_;
        this.previousCursor_ = undefined;
    }
    var box = this.boxOverlay_.getElement();
    if (box !== undefined && box != null) {
        ol_events.unlisten(box, EventType.MOUSEDOWN,
      this.handleMouseDown, this);
        ol_events.unlisten(box, EventType.MOUSEMOVE,
      this.handleMouseMove, this);
        ol_events.unlisten(box, EventType.MOUSEUP,
      this.handleMouseUp, this);
    }
};

/**
* @重载ol.control.OverviewMap的handleToggle_方法，从而实现对
* @Box监听的浏览器事件的控制
* @api stable
*/
ZDOverviewMap.prototype.handleToggle_ = function () {
    OverviewMap.prototype.handleToggle_.apply(this);

    if (!this.collapsed_) {
        this.ConnectEventHandle();
    }
    else {
        this.DisConnectEventHandle();
    }
};

export { ZDOverviewMap };
Zondy.Control.OverviewMap = ZDOverviewMap;