import { CesiumZondy } from '../core/Base';

/**
 * 计算三点的角度（0-180之间）
 * @param {Array} p1 第一个点
 * @param {Array} p2 第二个点
 * @param {Array} p3 第三个点
 * @returns {Number} 角度值
 */
function calAngleOf3Pnt(p1, p2, p3) {
    const p = (p1[0] - p2[0]) * (p3[0] - p2[0]) + (p1[1] - p2[1]) * (p3[1] - p2[1]) + (p1[2] - p2[2]) * (p3[2] - p2[2]);
    const a = Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2 + (p2[2] - p1[2]) ** 2);
    const b = Math.sqrt((p3[0] - p2[0]) ** 2 + (p3[1] - p2[1]) ** 2 + (p3[2] - p2[2]) ** 2);
    const angle = Math.acos(p / (a * b));
    return (angle * 180) / Math.PI;
}

/**
 * @author 三维基础平台研发中心·冯桂英
 * @class module:客户端公共方法.CommonFuncManager
 * @category CommonFuncManager
 * @classdesc 辅助计算类
 * @description 该类实提供加密点等辅助计算函数
 * @param optionsParam.viewer 场景视窗
 */
export default class CommonFuncManager {
    constructor(optionsParam) {
        const options = optionsParam;
        this._viewer = Cesium.defaultValue(options.viewer, undefined);
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
     * @function module:客户端公共方法.CommonFuncManager.prototype.screenPositionToCartographic
     * @param {Position} position 屏幕坐标点
     * @returns {Position} 三维经纬度坐标点(单位弧度)
     * @example
     * let result = commfun.screenPositionToCartesian(position);
     * let lng=Cesium.Math.toDegrees(result.longitude);//转为经度值
     * let lat=Cesium.Math.toDegrees(result.latitude);//转为纬度值
     */
    screenPositionToCartographic(position) {
        let cartesianPosition;
        let cartographicPosition = null;
        if (position) {
            if (this.scene._mode === Cesium.SceneMode.SCENE3D) {
                const ray = this.viewer.camera.getPickRay(position);
                cartesianPosition = this.scene.globe.pick(ray, this.scene);
            } else {
                cartesianPosition = this.viewer.camera.pickEllipsoid(position, this.ellipsoid);
            }
            if (Cesium.defined(cartesianPosition)) {
                cartographicPosition = this.ellipsoid.cartesianToCartographic(cartesianPosition);
            }
        }
        return cartographicPosition;
    }

    /**
     * 屏幕坐标转为笛卡尔坐标
     * @function module:客户端公共方法.CommonFuncManager.prototype.screenPositionToCartesian
     * @param {Position} position 屏幕坐标点
     * @returns {Position} 三维笛卡尔坐标点
     */
    screenPositionToCartesian(position) {
        let cartesianPosition = null;
        if (position) {
            if (this.scene._mode === Cesium.SceneMode.SCENE3D) {
                const ray = this.viewer.camera.getPickRay(position);
                cartesianPosition = this.scene.globe.pick(ray, this.scene);
            } else {
                cartesianPosition = this.viewer.camera.pickEllipsoid(position, this.ellipsoid);
            }
        }
        return cartesianPosition;
    }

    /**
     * 输出屏幕截图对象，可保存为不同类型图片
     * @function module:客户端公共方法.CommonFuncManager.prototype.outputImageObj
     * @returns {Object} 图片对象
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
        return Cesium.reimg.fromCanvas(this.viewer.canvas);
    }

    /**
     * 屏幕截图输出为图片
     * @function module:客户端公共方法.CommonFuncManager.prototype.outputImageFile
     * @param {String} fileName 输出图片名称
     * @example
     * res.outputImageFile(name);
     * commfun.outputImageFile('output'); //不指定后缀默认是png格式
     * //commfun.outputImageFile('output.jpg');
     */
    outputImageFile(fileName) {
        this.viewer.render();
        Cesium.reimg.fromCanvas(this.viewer.canvas).downloadPng(fileName);
    }

    /**
     * 根据经纬度计算高度值
     * @function module:客户端公共方法.CommonFuncManager.prototype.getHeightFromDegrees
     * @param {Number} longitude 经度值
     * @param {Number} latitude 纬度值
     * @returns {Number} 计算的高度值
     * @example
     * let res = commfun.getHeightFromDegrees(120.0,23.0)
     */
    getHeightFromDegrees(longitude, latitude) {
        let position;
        let height = 0;
        if (longitude && latitude) {
            position = Cesium.Cartographic.fromDegrees(longitude, latitude);
            height = this.viewer.scene.globe.getHeight(position);
        }
        return height;
    }

    /**
     * 获取颜色
     * @function module:客户端公共方法.CommonFuncManager.prototype.getColor
     * @param {Number} red 红色分量（0-1.0）
     * @param {Number} green 绿色分量（0-1.0）
     * @param {Number} blue 蓝色分量（0-1.0）
     * @param {Number} alpha 透明度 (0-1.0）
     * @returns {Color} 颜色对象
     * @example
     * let res = CommonFun.getColor(0.3, 0.4, 0.1, 1.0);
     */
    static getColor(red, green, blue, alpha) {
        return new Cesium.Color(red, green, blue, alpha);
    }

    /**
     * 计算场景的二维范围
     * @function module:客户端公共方法.CommonFuncManager.prototype.getSceneRange
     * @param {String} 视图元素ID
     * @returns {Array[]} 场景范围（单位：经纬度）Array<[lon,lat]>
     */
    getSceneRange(elementID) {
        const controlDiv = document.getElementById(elementID);
        if (Cesium.defined(controlDiv)) {
            const h = controlDiv.offsetHeight; // 高度
            const w = controlDiv.offsetWidth; // 宽度
            const ua = navigator.userAgent.toLowerCase();

            const isOpera = ua.indexOf('opera') !== -1;
            const isIE = ua.indexOf('msie') !== -1 && !isOpera;

            if (controlDiv.parentNode === null || controlDiv.style.display === 'none') {
                return undefined;
            }
            let parent = null;
            let pos = [];
            let box;
            let x;
            let y;
            if (isIE) {
                box = controlDiv.getBoundingClientRect();
                const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                const scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                x = box.left + scrollLeft;
                y = box.top + scrollTop;
            } else if (document.getBoxObjectFor) {
                box = document.getBoxObjectFor(controlDiv);
                const borderLeft = controlDiv.style.borderLeftWidth ? parseInt(controlDiv.style.borderLeftWidth, 10) : 0;
                const borderTop = controlDiv.style.borderTopWidth ? parseInt(controlDiv.style.borderTopWidth, 10) : 0;
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
                if (ua.indexOf('opera') !== -1 || (ua.indexOf('safari') !== -1 && controlDiv.style.position === 'absolute')) {
                    pos[0] -= document.body.offsetLeft;
                    pos[1] -= document.body.offsetTop;
                }
            }

            if (controlDiv.parentNode) {
                parent = controlDiv.parentNode;
            } else {
                parent = null;
            }
            while (parent && parent.tagName !== 'BODY' && parent.tagName !== 'HTML') {
                pos[0] -= parent.scrollLeft;
                pos[1] -= parent.scrollTop;
                if (parent.parentNode) {
                    parent = parent.parentNode;
                } else {
                    parent = null;
                }
            }
            const { 0: posx, 1: posy } = pos;
            x = posx;
            y = posy;

            const position1 = new Cesium.Cartesian2(x, y);
            const position2 = new Cesium.Cartesian2(x + w, y + h);
            const { viewer } = this;
            let pick1;
            let pick2;

            if (this.scene.mode === Cesium.SceneMode.SCENE3D) {
                pick1 = this.scene.globe.pick(viewer.camera.getPickRay(position1), this.scene);
                pick2 = this.scene.globe.pick(viewer.camera.getPickRay(position2), this.scene);
            } else {
                pick1 = viewer.camera.pickEllipsoid(position1, this.ellipsoid);
                pick2 = viewer.camera.pickEllipsoid(position2, this.ellipsoid);
            }
            if (pick1 === undefined || pick2 === undefined) {
                return undefined;
            }
            // 将三维坐标转成地理坐标
            const geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
            const geoPt2 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick2);

            // 地理坐标转换为经纬度坐标
            const point1 = [(geoPt1.longitude / Math.PI) * 180, (geoPt2.latitude / Math.PI) * 180];
            const point2 = [(geoPt2.longitude / Math.PI) * 180, (geoPt1.latitude / Math.PI) * 180];
            return [point1, point2];
        }
        return undefined;
    }

    /**
     * 绕点旋转 相机绕点飞行一周 或者相机绕自身旋转一周
     * @function module:客户端公共方法.CommonFuncManager.prototype.rotationView
     * @param {String} [type='rotationAroundPos'] 旋转类型  默认绕相机自身旋转
     * @param {Object} [optionsParam] 附加参数系信息
     * @param {Cartesian3} [optionsParam.position] 要进行围绕旋转的点
     * @param {Number} [optionsParam.pitch=-30] 相机的俯仰角   单位（度）
     * @param {Number} [optionsParam.distance=500000] 相机距离点的距离 单位（米）
     * @param {Number} [optionsParam.duration=10] 绕点飞行一周所用的时间  单位（秒）
     * @param {Number} [optionsParam.ClockRange=Cesium.ClockRange.CLAMPED] 循环方式
     * @returns {Event} 绕点旋转事件
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
    rotationView(type, optionsParam) {
        if (!Cesium.defined(type)) {
            return new Cesium.DeveloperError('必须指定旋转类型');
        }
        const options = Cesium.defaultValue(optionsParam, {});
        const { position } = options;
        if (type === 'rotationAroundPos' && !Cesium.defined(position)) {
            return new Cesium.DeveloperError('必须指定旋转点');
        }
        const pitch = Cesium.Math.toRadians(Cesium.defaultValue(options.pitch, -30));
        const distance = Cesium.defaultValue(options.distance, 5000);
        const duration = Cesium.defaultValue(options.duration, 8);
        const angle = 360.0 / duration;
        const startTime = Cesium.JulianDate.fromDate(new Date());
        const stopTime = Cesium.JulianDate.addSeconds(startTime, duration, new Cesium.JulianDate());
        this.viewer.clock.startTime = startTime.clone();
        this.viewer.clock.stopTime = stopTime.clone();
        this.viewer.clock.currentTime = startTime.clone();
        this.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
        this.viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
        const currentHeading = this.viewer.camera.heading;
        const update = () => {
            const delTime = Cesium.JulianDate.secondsDifference(this.viewer.clock.currentTime, this.viewer.clock.startTime);
            const heading = -Cesium.Math.toRadians(delTime * angle) + currentHeading;
            let nowPostion = this.scene.camera.position;
            if (type === 'rotationAroundPos' && Cesium.defined(position)) {
                nowPostion = position;
            }
            this.scene.camera.setView({
                destination: nowPostion,
                orientation: {
                    heading,
                    pitch
                }
            });
            this.scene.camera.moveBackward(distance);
            if (Cesium.JulianDate.compare(this.viewer.clock.currentTime, this.viewer.clock.stopTime) >= 0) {
                this.viewer.clock.onTick.removeEventListener(update);
            }
        };
        this.viewer.clock.shouldAnimate = true;
        this.viewer.clock.onTick.addEventListener(update);
        return update;
    }

    /**
     * 移除绕点自旋转事件
     * @function module:客户端公共方法.CommonFuncManager.prototype.removeRotationView
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
     * @function module:客户端公共方法.CommonFuncManager.prototype.pauseRotationView
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
     * @function module:客户端公共方法.CommonFuncManager.prototype.startRotationAroundPos
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
     * @function module:客户端公共方法.CommonFuncManager.prototype.caculHeadingFromCartographic
     * @param {Cartographic} center 中心点 （第一个点） 坐标为弧度
     * @param {Cartographic} target 目标点 （第二个点）坐标为弧度
     * @returns {Number} heading 
     * @example 
     *      let center = new Cesium.Cartographic(113, 23, 200);
            let target = new Cesium.Cartographic(114, 24, 200);
            let res = commfun.caculHeadingFromCartographic(source,target);
     */
    caculHeadingFromCartographic(center, target) {
        const centerCar3 = Cesium.Cartesian3.fromRadians(center.longitude, center.latitude, center.height, this.ellipsoid, new Cesium.Cartesian3());
        const targetCar3 = Cesium.Cartesian3.fromRadians(target.longitude, target.latitude, target.height, this.ellipsoid, new Cesium.Cartesian3());
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
        carCenter = Cesium.Cartographic.fromCartesian(center, this.ellipsoid, carCenter);
        carCenter.height = 0;
        const centerUse = Cesium.Cartesian3.fromRadians(carCenter.longitude, carCenter.latitude, carCenter.height, this.ellipsoid, new Cesium.Cartesian3());
        const centerUseEx = Cesium.Cartesian3.fromRadians(carCenter.longitude, carCenter.latitude + 0.1, carCenter.height, this.ellipsoid, new Cesium.Cartesian3());
        let tempdir = Cesium.Cartesian3.subtract(centerUseEx, centerUse, new Cesium.Cartesian3());
        tempdir = Cesium.Cartesian3.normalize(tempdir, tempdir);

        let carTarget = new Cesium.Cartographic();
        carTarget = Cesium.Cartographic.fromCartesian(target, this.ellipsoid, carTarget);
        carTarget.height = 0;
        const targetUse = Cesium.Cartesian3.fromRadians(carTarget.longitude, carTarget.latitude, carTarget.height, this.ellipsoid, new Cesium.Cartesian3());

        let tarDir = Cesium.Cartesian3.subtract(targetUse, centerUse, new Cesium.Cartesian3());
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
     * @param  {Object} o 被拷贝对象
     * @returns {Object} 拷贝结果
     */
    deepCopy(o) {
        if (o instanceof Array) {
            const n = [];
            for (let i = 0; i < o.length; i += 1) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;
        }
        if (o instanceof Object) {
            const n = {};
            Object.keys(o).forEach((key) => {
                n[key] = this.deepCopy(o[key]);
            });
            return n;
        }
        return o;
    }

    /**
     * 化简抽稀(用于折线路绘制)
     * @function module:客户端公共方法.CommonFuncManager.prototype.simplifyLine
     * @param  {Array<Cartesian3>} positions 坐标点序列
     * @returns {Array<Cartesian3>} 抽稀后的坐标点序列
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
        // 该抽稀对于三点之间夹角>175度则删除，如果是高程拐点则必须保留，高程没有赋值的也需删除（因为可能没取到地形数据）
        if (positions !== null && positions.length >= 3) {
            let posCopy = this.deepCopy(positions);
            // 先删除高程值有异常坐标
            const len = posCopy.length;
            for (let j = 0; j < len; j += 1) {
                if (posCopy[j].z === undefined || posCopy[j].z === null) {
                    posCopy = posCopy.slice(0, j).concat(posCopy.slice(j + 1));
                }
            }
            for (let i = 0; i <= posCopy.length - 3; i += 1) {
                const isVertice = !((posCopy[i].z - posCopy[i + 1].z) * (posCopy[i + 1].z - posCopy[i + 2].z) > 0);
                const angle = calAngleOf3Pnt([posCopy[i].x, posCopy[i].y, posCopy[i].z], [posCopy[i + 1].x, posCopy[i + 1].y, posCopy[i + 1].z], [posCopy[i + 2].x, posCopy[i + 2].y, posCopy[i + 2].z]);

                if (angle > 175 && !isVertice) {
                    posCopy = posCopy.slice(0, i + 1).concat(posCopy.slice(i + 2));
                }
            }
            return posCopy;
        }
        return null;
    }

    /**
     * 按照分段加密
     * @function module:客户端公共方法.CommonFuncManager.prototype.calcParabola
     * @param {Object} options 参数
     * @param {Array} [options.position] 经纬度点数组
     * @param {Array} [options.height] 高度
     * @param {Number} [options.num] 数量
     * @returns {Array} 点数组结果
     * @example
     * let opt = {
                num: 5,
                heigtht: 500,
                position1: {
                    lon: 112, lat: 30
                },
                position2: {
                    lon: 113, lat: 32
                }
            }
            let res = CommonFun.calcParabola(opt);
     */
    static calcParabola(options) {
        // 方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
        const h = options.height && options.height > 5000 ? options.height : 5000;
        const L = Math.abs(options.position1.lon - options.position2.lon) > Math.abs(options.position1.lat - options.position2.lat) ? Math.abs(options.position1.lon - options.position2.lon) : Math.abs(options.position1.lat - options.position2.lat);
        const num = options.num && options.num > 50 ? options.num : 50;
        const result = [];
        let dlt = L / num;
        if (Math.abs(options.position1.lon - options.position2.lon) > Math.abs(options.position1.lat - options.position2.lat)) {
            // 以lon为基准
            const delLat = (options.position2.lat - options.position1.lat) / num;
            if (options.position1.lon - options.position2.lon > 0) {
                dlt = -dlt;
            }
            for (let i = 0; i < num; i += 1) {
                const tempH = h - ((-0.5 * L + Math.abs(dlt) * i) ** 2 * 4 * h) / L ** 2;
                const lon = options.position1.lon + dlt * i;
                const lat = options.position1.lat + delLat * i;
                result.push([lon, lat, tempH]);
            }
        } else {
            // 以lat为基准
            const delLon = (options.position2.lon - options.position1.lon) / num;
            if (options.position1.lat - options.position2.lat > 0) {
                dlt = -dlt;
            }
            for (let j = 0; j < num; j += 1) {
                const tempH2 = h - ((-0.5 * L + Math.abs(dlt) * j) ** 2 * 4 * h) / L ** 2;
                const lon2 = options.position1.lon + delLon * j;
                const lat2 = options.position1.lat + dlt * j;
                result.push([lon2, lat2, tempH2]);
            }
        }
        return result;
    }

    /**
     * 线性插值（二维坐标）
     * @function module:客户端公共方法.CommonFuncManager.prototype.linearInterpolate
     * @param {Array<Cartesian2>} positions 坐标点序列
     * @param {Number} step 步长
     * @returns {Array<Cartesian2>} 插值后的坐标点序列
     */
    static linearInterpolate(positions, step) {
        const pnts = [];
        const len = positions.length - 1;
        for (let m = 0; m < len; m += 1) {
            const pntS = positions[m];
            const pntE = positions[m + 1];
            if (m === 0) {
                pnts.push(pntS);
            }
            const dis = Math.sqrt((pntE.x - pntS.x) ** 2 + (pntE.y - pntS.y) ** 2);
            if (dis > step) {
                const n = dis / step;
                for (let i = 1; i < n; i += 1) {
                    const x = (pntE.x - pntS.x) * ((i * step) / dis) + pntS.x;
                    const y = (pntE.y - pntS.y) * ((i * step) / dis) + pntS.y;
                    pnts.push(new Cesium.Cartesian2(x, y));
                }
            }
            pnts.push(pntE);
        }
        return pnts;
    }

    /**
     * 线性插值(三维坐标)
     * @function module:客户端公共方法.CommonFuncManager.prototype.linearInterpolate3D
     * @param {Array<Cartesian3>} positions 坐标点序列
     * @param {Number} step 步长
     * @returns {Array<Cartesian3>} 插值后的坐标点序列
     */
    static linearInterpolate3D(positions, step) {
        const pnts = [];
        for (let m = 0; m < positions.length - 1; m += 1) {
            const pntS = positions[m];
            const pntE = positions[m + 1];
            if (m === 0) {
                pnts.push(pntS);
            }
            const dis = Math.sqrt((pntE.x - pntS.x) ** 2 + (pntE.y - pntS.y) ** 2);
            if (dis > step) {
                const n = dis / step;
                for (let i = 1; i < n; i += 11) {
                    const x = (pntE.x - pntS.x) * ((i * step) / dis) + pntS.x;
                    const y = (pntE.y - pntS.y) * ((i * step) / dis) + pntS.y;
                    const z = (pntE.z - pntS.z) * ((i * step) / dis) + pntS.z;
                    pnts.push(new Cesium.Cartesian3(x, y, z));
                }
            }
            pnts.push(pntE);
        }
        return pnts;
    }

    /**
     * 生成随机数
     * @function module:客户端公共方法.CommonFuncManager.prototype.generateRandom
     */
    static generateRandom() {
        let guid = '';
        for (let i = 1; i <= 32; i += 1) {
            const n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i === 8 || i === 12 || i === 16 || i === 20) guid += '-';
        }
        return guid;
    }

    /**
     * 根据地形设置二维坐标的高程值
     * @param {CesiumTerrainProvider} TerrainProvider 地形
     * @param {Number} level 以地形的级数为基准
     * @param {Array<Cartesian2>} positions 需设置高程的二维坐标点序列
     * @returns {Function} 设置成功后的回调
     */
    setZValueByTerrain(terrainProvider, level, positions, ellipsoid, callback) {
        const cartographics = [];
        if (positions != null && positions.length > 0) {
            for (let i = 0; i < positions.length; i += 1) {
                const cartographic = ellipsoid.cartesianToCartographic(Cesium.Cartesian3.fromDegrees(positions[i].x, positions[i].y, 0, ellipsoid));
                cartographics.push(cartographic);
            }
        }

        Cesium.sampleTerrain(terrainProvider, level, cartographics).then((updatedPositions) => {
            const cartesianPositions = this.ellipsoid.cartographicArrayToCartesianArray(updatedPositions);
            if (typeof callback === 'function') {
                callback(cartesianPositions);
            }
        });
    }
}

CesiumZondy.Manager.CommonFuncManager = CommonFuncManager;
