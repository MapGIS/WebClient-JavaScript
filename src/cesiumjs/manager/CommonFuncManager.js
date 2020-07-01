import {CesiumZondy} from "../core/Base";

export default class CommonFuncManager {
    constructor(option) {
        this._viewer = Cesium.defaultValue(option.viewer, undefined);
        if (this._viewer) {
            this._scene = Cesium.defaultValue(this._viewer.scene, undefined);
            this._shouldAnimate = this.viewer.clock.shouldAnimate;
        }
    }

    /**
     *  当前椭球
     * @memberof CommonFuncManager.protype
     * @type {Ellipsoid}
     * @readonly
     *
     */
    get ellipsoid() {
        return this._viewer.scene.globe.ellipsoid;
    }

    /**
     * 视图
     * @memberof CommonFuncManager.prototype
     * @type {Viewer}
     * @readonly
     */
    get viewer() {
        return this._viewer;
    }

    /**
     * 场景
     * @memberof CommonFuncManager.prototype
     * @readonly
     * @type {Scene}
     */
    get scene() {
        return this._scene;
    }

    /**
     * 是否允许动画
     * @memberof CommonFuncManager.protype
     * @type {ShouldAnimate}
     * @readonly
     *
     */
    get shouldAnimate() {
        return this._shouldAnimate;
    }

    /**
     * 屏幕坐标转为经纬度坐标
     * @param  {Position} position 屏幕坐标点
     * @returns {Position}  三维经纬度坐标点(单位弧度)
     * let result = screenPositionToCartesian(position);
     * let lng=Cesium.Math.toDegrees(result.longitude);//转为经度值
     * let lat=Cesium.Math.toDegrees(result.latitude);//转为纬度值
     */
    screenPositionToCartographic(position) {
        let cartesianPosition;
        let cartographicPosition = null;
        if (position) {
            if (this.scene._mode === Cesium.SceneMode.SCENE3D) {
                let ray = this.viewer.camera.getPickRay(position);
                cartesianPosition = this.scene.globe.pick(ray, this.scene);
            } else {
                cartesianPosition = this.viewer.camera.pickEllipsoid(
                    position,
                    this.ellipsoid,
                );
            }
            if (Cesium.defined(cartesianPosition)) {
                cartographicPosition = this.ellipsoid.cartesianToCartographic(
                    cartesianPosition,
                );
            }
        }
        return cartographicPosition;
    }

    /**
     * 屏幕坐标转为笛卡尔坐标
     * @param  {Position} position 屏幕坐标点
     * @returns {Position} 三维笛卡尔坐标点
     */
    screenPositionToCartesian(position) {
        let cartesianPosition = null;
        if (position) {
            if (this.scene._mode === Cesium.SceneMode.SCENE3D) {
                let ray = this.viewer.camera.getPickRay(position);
                cartesianPosition = this.scene.globe.pick(ray, this.scene);
            } else {
                cartesianPosition = this.viewer.camera.pickEllipsoid(
                    position,
                    this.ellipsoid,
                );
            }
        }
        return cartesianPosition;
    }

    /**
     * 输出屏幕截图对象，可保存为不同类型图片
     * @returns 图片对象
     * @example
     * let res = comm.outputImageObj();
     * res.downloadPng(name);
     * //res.toImg();
     * //res.toBase64();
     * //res.downloadPng(name);
     * //res.toCanvas();
     * //res.toJpeg();
     * //res.toPng();
     */
    outputImageObj() {
        this.viewer.render();
        return ReImg.fromCanvas(this.viewer.canvas);
    }

    /**
     * 屏幕截图输出为图片
     * @param {String} fileName 输出图片名称
     * @example
     * res.outputImageFile(name);
     * commfun.outputImageFile('output'); //不指定后缀默认是png格式
     * //commfun.outputImageFile('output.jpg');
     */
    outputImageFile(fileName) {
        this.viewer.render();
        ReImg.fromCanvas(this.viewer.canvas).downloadPng(fileName);
    }

    /**
     * 根据经纬度计算高度值
     * @param {Number} longitude 经度值
     * @param {Number} latitude 纬度值
     * @retuns 计算的高度值
     * @example
     * let res = commfun.getHeightFromDegrees(120.0,23.0)
     */
    getHeightFromDegrees(longitude, latitude) {
        var position;
        var height = 0;
        if (longitude && latitude) {
            position = Cesium.Cartographic.fromDegrees(longitude, latitude);
            height = this.viewer.scene.globe.getHeight(position);
        }
        return height;
    }

    /**
     * 获取颜色
     * @param {Number} red 红色分量（0-1.0）
     * @param {Number} green 绿色分量（0-1.0）
     * @param {Number} blue 蓝色分量（0-1.0）
     * @param {Number} alpha 透明度  （0-1.0）
     * @returns {Color} 颜色对象
     * @example
     * getColor(0.3,0.4,0.1,1.0);
     */
    getColor(red, green, blue, alpha) {
        return new Cesium.Color(red, green, blue, alpha);
    }

    /**
     * 计算场景的二维范围
     * @returns {Array[]} 场景范围（单位：经纬度）Array<[lon,lat]>
     */
    getSceneRange() {
        let controlDiv = document.getElementById(this.elementID);
        if (Cesium.defined(controlDiv)) {
            let h = controlDiv.offsetHeight; //高度
            let w = controlDiv.offsetWidth; //宽度
            let ua = navigator.userAgent.toLowerCase();

            let isOpera = ua.indexOf("opera") !== -1;
            let isIE = ua.indexOf("msie") !== -1 && !isOpera;

            if (
                controlDiv.parentNode === null ||
                controlDiv.style.display === "none"
            ) {
                return;
            }
            let parent = null;
            let pos = [];
            let box;
            let x, y;
            if (isIE) {
                box = controlDiv.getBoundingClientRect();
                let scrollTop = Math.max(
                    document.documentElement.scrollTop,
                    document.body.scrollTop,
                );
                let scrollLeft = Math.max(
                    document.documentElement.scrollLeft,
                    document.body.scrollLeft,
                );
                x = box.left + scrollLeft;
                y = box.top + scrollTop;
            } else if (document.getBoxObjectFor) {
                box = document.getBoxObjectFor(controlDiv);
                let borderLeft = controlDiv.style.borderLeftWidth
                    ? parseInt(controlDiv.style.borderLeftWidth)
                    : 0;
                let borderTop = controlDiv.style.borderTopWidth
                    ? parseInt(controlDiv.style.borderTopWidth)
                    : 0;
                pos = [box.x - borderLeft, box.y - borderTop];
            } // safari & opera
            else {
                pos = [controlDiv.offsetLeft, controlDiv.offsetTop];
                parent = controlDiv.offsetParent;
                if (parent !== controlDiv) {
                    while (parent) {
                        pos[0] += parent.offsetLeft;
                        pos[1] += parent.offsetTop;
                        parent = parent.offsetParent;
                    }
                }
                if (
                    ua.indexOf("opera") !== -1 ||
                    (ua.indexOf("safari") !== -1 &&
                        controlDiv.style.position === "absolute")
                ) {
                    pos[0] -= document.body.offsetLeft;
                    pos[1] -= document.body.offsetTop;
                }
            }

            if (controlDiv.parentNode) {
                parent = controlDiv.parentNode;
            } else {
                parent = null;
            }
            while (
                parent &&
                parent.tagName !== "BODY" &&
                parent.tagName !== "HTML"
            ) {
                pos[0] -= parent.scrollLeft;
                pos[1] -= parent.scrollTop;
                if (parent.parentNode) {
                    parent = parent.parentNode;
                } else {
                    parent = null;
                }
            }
            x = pos[0];
            y = pos[1];

            let position1 = new Cesium.Cartesian2(x, y);
            let position2 = new Cesium.Cartesian2(x + w, y + h);
            let viewer = this.viewer;
            let pick1, pick2;

            if (this.scene.mode === Cesium.SceneMode.SCENE3D) {
                pick1 = this.scene.globe.pick(
                    viewer.camera.getPickRay(position1),
                    this.scene,
                );
                pick2 = this.scene.globe.pick(
                    viewer.camera.getPickRay(position2),
                    this.scene,
                );
            } else {
                pick1 = viewer.camera.pickEllipsoid(position1, this.ellipsoid);
                pick2 = viewer.camera.pickEllipsoid(position2, this.ellipsoid);
            }
            if (pick1 === undefined || pick2 === undefined) {
                return null;
            }
            //将三维坐标转成地理坐标
            let geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(
                pick1,
            );
            let geoPt2 = viewer.scene.globe.ellipsoid.cartesianToCartographic(
                pick2,
            );

            //地理坐标转换为经纬度坐标
            let point1 = [
                (geoPt1.longitude / Math.PI) * 180,
                (geoPt2.latitude / Math.PI) * 180,
            ];
            let point2 = [
                (geoPt2.longitude / Math.PI) * 180,
                (geoPt1.latitude / Math.PI) * 180,
            ];
            return [point1, point2];
        }
        return null;
    }

    /**
     * 绕点旋转 相机绕点飞行一周 或者相机绕自身旋转一周
     * @param {Number} [type='rotationAroundPos'] 旋转类型  默认绕相机自身旋转
     * @param {Object} [options] 附加参数系信息
     * @param {Cartesian3} [options.position] 要进行围绕旋转的点
     * @param {Number} [options.pitch=-30] 相机的俯仰角   单位（度）
     * @param {Number} [options.distance=500000] 相机距离点的距离 单位（米）
     * @param {Number} [options.duration=10] 绕点飞行一周所用的时间  单位（秒）
     * @param {Number} [options.ClockRange=Cesium.ClockRange.CLAMPED] 循环方式
     * @returns Event 绕点旋转事件
     * @example
     * let opt ={
     *   position:Cesium.Cartesian3.fromDegrees(110,20,100),
     *   pitch:-30,
     *   distance:500000,
     *   duration:10,
     *   ClockRange:Cesium.ClockRange.CLAMPED
     * };
     * let update = commfun.rotationView('rotationAroundPos',opt) ;
     *
     */
    rotationView(type, options) {
        if (!Cesium.defined(type)) {
            return new Cesium.DeveloperError("必须指定旋转类型");
        }
        if (!Cesium.defined(options)) {
            options = {};
        }
        let position = options.position;
        if (type === "rotationAroundPos" && !Cesium.defined(position)) {
            return new Cesium.DeveloperError("必须指定旋转点");
        }
        let pitch = Cesium.Math.toRadians(
            Cesium.defaultValue(options.pitch, -30),
        );
        let distance = Cesium.defaultValue(options.distance, 5000);
        let duration = Cesium.defaultValue(options.duration, 8);
        let angle = 360.0 / duration;
        let startTime = Cesium.JulianDate.fromDate(new Date());
        let stopTime = Cesium.JulianDate.addSeconds(
            startTime,
            duration,
            new Cesium.JulianDate(),
        );
        this.viewer.clock.startTime = startTime.clone();
        this.viewer.clock.stopTime = stopTime.clone();
        this.viewer.clock.currentTime = startTime.clone();
        this.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
        this.viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
        let currentHeading = this.viewer.camera.heading;
        let update = () => {
            let delTime = Cesium.JulianDate.secondsDifference(
                this.viewer.clock.currentTime,
                this.viewer.clock.startTime,
            );
            let heading =
                -Cesium.Math.toRadians(delTime * angle) + currentHeading;
            let nowPostion = this.scene.camera.position;
            if (type === "rotationAroundPos" && Cesium.defined(position)) {
                nowPostion = position;
            }
            this.scene.camera.setView({
                destination: nowPostion,
                orientation: {
                    heading: heading,
                    pitch: pitch,
                },
            });
            this.scene.camera.moveBackward(distance);
            if (
                Cesium.JulianDate.compare(
                    this.viewer.clock.currentTime,
                    this.viewer.clock.stopTime,
                ) >= 0
            ) {
                this.viewer.clock.onTick.removeEventListener(update);
            }
        };
        this.viewer.clock.shouldAnimate = true;
        this.viewer.clock.onTick.addEventListener(update);
        return update;
    }

    /**
     * 移除绕点自旋转事件
     * @param {Event} event 绕点旋转事件
     * @example
     * let opt ={
     *   position:Cesium.Cartesian3.fromDegrees(110,20,100),
     *   pitch:-30,
     *   distance:500000,
     *   duration:10,
     *   ClockRange:Cesium.ClockRange.CLAMPED
     * };
     * let update = commfun.rotationView('rotationAroundPos',opt) ;
     * commfun.removeRotationView(update);
     */
    removeRotationView(event) {
        if (Cesium.defined(event)) {
            this.viewer.clock.onTick.removeEventListener(event);
            this.viewer.clock.shouldAnimate = this.shouldAnimate;
        }
    }

    /**
     * 暂停围绕旋转
     * @example
     * //let opt ={
     * //    position:Cesium.Cartesian3.fromDegrees(110,20,100),
     * //    pitch:-30,
     * //    distance:500000,
     * //    duration:10,
     * //    ClockRange:Cesium.ClockRange.CLAMPED
     * //   };
     * //let update = commfun.rotationView('rotationAroundPos',opt) ;
     * commfun.pauseRotationView(update);
     */
    pauseRotationView() {
        this.viewer.clock.shouldAnimate = false;
    }

    /**
     * 开始围绕旋转 与暂停配合使用
     * @example
     * //let opt ={
     * //    position:Cesium.Cartesian3.fromDegrees(110,20,100),
     * //    pitch:-30,
     * //    distance:500000,
     * //    duration:10,
     * //    ClockRange:Cesium.ClockRange.CLAMPED
     * //   };
     * //let update = commfun.rotationView('rotationAroundPos',opt) ;
     * //commfun.pauseRotationView(update);
     * commfun.startRotationAroundPos(update);
     */
    startRotationAroundPos() {
        this.viewer.clock.shouldAnimate = true;
    }

    /**
     * 计算两点间的heading 航向角
     * @param {Cartographic} center 中心点 （第一个点） 坐标为弧度
     * @param {Cartographic} target 目标点 （第二个点）坐标为弧度
     * @returns {Number} heading
     */
    caculHeadingFromCartographic(center, target) {
        let centerCar3 = Cesium.Cartesian3.fromRadians(
            center.longitude,
            center.latitude,
            center.height,
            this.ellipsoid,
            new Cesium.Cartesian3(),
        );
        let targetCar3 = Cesium.Cartesian3.fromRadians(
            target.longitude,
            target.latitude,
            target.height,
            this.ellipsoid,
            new Cesium.Cartesian3(),
        );
        return this.getHeadingFromCartesian3(centerCar3, targetCar3);
    }

    /**
     * @private
     * 计算两点间的heading 航向角
     * @param {Cartesian3} center 中心点 世界坐标（第一个点）
     * @param {Cartesian3} target 目标点 世界坐标（第二个点）
     * @returns {Number} heading
     */
    getHeadingFromCartesian3(center, target) {
        let carCenter = new Cesium.Cartographic();
        carCenter = Cesium.Cartographic.fromCartesian(
            center,
            this.ellipsoid,
            carCenter,
        );
        carCenter.height = 0;
        let centerUse = Cesium.Cartesian3.fromRadians(
            carCenter.longitude,
            carCenter.latitude,
            carCenter.height,
            this.ellipsoid,
            new Cesium.Cartesian3(),
        );
        let centerUseEx = Cesium.Cartesian3.fromRadians(
            carCenter.longitude,
            carCenter.latitude + 0.1,
            carCenter.height,
            this.ellipsoid,
            new Cesium.Cartesian3(),
        );
        let tempdir = Cesium.Cartesian3.subtract(
            centerUseEx,
            centerUse,
            new Cesium.Cartesian3(),
        );
        tempdir = Cesium.Cartesian3.normalize(tempdir, tempdir);

        let carTarget = new Cesium.Cartographic();
        carTarget = Cesium.Cartographic.fromCartesian(
            target,
            this.ellipsoid,
            carTarget,
        );
        carTarget.height = 0;
        let targetUse = Cesium.Cartesian3.fromRadians(
            carTarget.longitude,
            carTarget.latitude,
            carTarget.height,
            this.ellipsoid,
            new Cesium.Cartesian3(),
        );

        let tarDir = Cesium.Cartesian3.subtract(
            targetUse,
            centerUse,
            new Cesium.Cartesian3(),
        );
        tarDir = Cesium.Cartesian3.normalize(tarDir, tarDir);
        let heading = Cesium.Cartesian3.angleBetween(tempdir, tarDir);
        if (carTarget.longitude < carCenter.longitude) {
            heading = 2 * Math.PI - heading;
        }

        return heading;
    }

     /**
      * @private
     * 深度拷贝对象
     * @param  {object} o 被拷贝对象
     * @return {object} 拷贝结果
     */
    deepCopy(o) {
        if (o instanceof Array) {
            var n = [];
            for (var i = 0; i < o.length; ++i) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;

        } else if (o instanceof Object) {
            var n = {}
            for (var i in o) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;
        } else {
            return o;
        }
    }

    /**
     * 化简抽稀(用于折线路绘制)
     * @param  {Array<Cartesian3>} positions 坐标点序列
     * @return {Array<Cartesian3>} 抽稀后的坐标点序列
     * @example
     * let polyline;
     * let drawElement = new Cesium.DrawElement(viewer);
     * let commfun = new CommonFun({viewer:viewer});
     * drawElement.startDrawingPolyline({
     *               callback: function(positions){
     *                   let simplify = commfun.simplifyLine(positions);
     *                   polyline = new Cesium.DrawElement.PolylinePrimitive({
     *                       positions: simplify,
     *                       width: 1,
     *                       geodesic: true
     *                   });
     *                  viewer.scene.primitives.add(polyline);
     *               }
     *           });
     */
    simplifyLine(positions) {
        //该抽稀对于三点之间夹角>175度则删除，如果是高程拐点则必须保留，高程没有赋值的也需删除（因为可能没取到地形数据）
        if (positions !== null && positions.length >= 3) {
            let pos_copy = this.deepCopy(positions);
            //先删除高程值有异常坐标
            let len = pos_copy.length;
            for (let j = 0; j<len; j++) {
                if (pos_copy[j].z === undefined || pos_copy[j].z === null) {
                    pos_copy = pos_copy
                        .slice(0, j)
                        .concat(pos_copy.slice(j + 1));
                }
            }
            len = len - 3;
            for (let i = 0; i <= len; i++) {

                let isVertice =
                    (pos_copy[i].z - pos_copy[i + 1].z) *
                        (pos_copy[i + 1].z - pos_copy[i + 2].z) >
                    0
                        ? false
                        : true;
                let angle = calAngleOf3Pnt(
                    [pos_copy[i].x, pos_copy[i].y, pos_copy[i].z],
                    [pos_copy[i + 1].x, pos_copy[i + 1].y, pos_copy[i + 1].z],
                    [pos_copy[i + 2].x, pos_copy[i + 2].y, pos_copy[i + 2].z],
                );
                if (angle > 175.0 && !isVertice) {
                    pos_copy = pos_copy
                        .slice(0, i + 1)
                        .concat(pos_copy.slice(i + 2));
                }
            }
            return pos_copy;
        }
        return null;
    }

    /**
     * @private
     * 计算2点高差
     * @param {Object} options 参数
     * @param {Array} options.position 经纬度点数组
     * @param {Array} options.height 高度 
     * @param {Array} resultOut 经纬度高程数组
     * @return 点数组结果
     */
    calcParabola(options, resultOut) {
        //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
        let h = options.height && options.height > 5000 ? options.height : 5000;
        let L =
            Math.abs(options.position1.lon - options.position2.lon) >
            Math.abs(options.position1.lat - options.position2.lat)
                ? Math.abs(options.position1.lon - options.position2.lon)
                : Math.abs(options.position1.lat - options.position2.lat);
        let num = options.num && options.num > 50 ? options.num : 50;
        let result = [];
        let dlt = L / num;
        if (
            Math.abs(options.position1.lon - options.position2.lon) >
            Math.abs(options.position1.lat - options.position2.lat)
        ) {
            //以lon为基准
            let delLat = (options.position2.lat - options.position1.lat) / num;
            if (options.position1.lon - options.position2.lon > 0) {
                dlt = -dlt;
            }
            for (var i = 0; i < num; i++) {
                var tempH =
                    h -
                    (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * h) /
                        Math.pow(L, 2);
                var lon = options.position1.lon + dlt * i;
                var lat = options.position1.lat + delLat * i;
                result.push([lon, lat, tempH]);
            }
        } else {
            //以lat为基准
            let delLon = (options.position2.lon - options.position1.lon) / num;
            if (options.position1.lat - options.position2.lat > 0) {
                dlt = -dlt;
            }
            for (var j = 0; j < num; j++) {
                var tempH2 =
                    h -
                    (Math.pow(-0.5 * L + Math.abs(dlt) * j, 2) * 4 * h) /
                        Math.pow(L, 2);
                var lon2 = options.position1.lon + delLon * j;
                var lat2 = options.position1.lat + dlt * j;
                result.push([lon2, lat2, tempH2]);
            }
        }
        if (resultOut !== undefined) {
            resultOut = result;
        }
        return result;
    }
}
    /**
     * 计算三点的角度（0-180之间）
     */
    function calAngleOf3Pnt(p1, p2, p3) {
        //var p = (p1[0]-p2[0])*(p2[0]-p3[0])+(p1[1]-p2[1])*(p2[1]-p3[1])+(p1[2]-p2[2])*(p2[2]-p3[2]);
        var p = (p1[0] - p2[0]) * (p3[0] - p2[0]) + (p1[1] - p2[1]) * (p3[1] - p2[1]) + (p1[2] - p2[2]) * (p3[2] - p2[2]);
        var a = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[2] - p1[2], 2));
        var b = Math.sqrt(Math.pow(p3[0] - p2[0], 2) + Math.pow(p3[1] - p2[1], 2) + Math.pow(p3[2] - p2[2], 2));
        var angle = Math.acos(p / (a * b));  //0-PI
        return angle * 180 / Math.PI;
    }
CesiumZondy.Manager.CommonFuncManager = CommonFuncManager;
