import {Zondy} from '../../../service/common/Base';

/**
 * @private
 * @class  Zondy.LevelRenderer.Animation.Easing
 * @classdesc 缓动
 */
class Easing {

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.constructor
     * @description 构造函数。
     */
    constructor() {
        this.CLASS_NAME = "Zondy.LevelRenderer.Animation.Easing";
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {

    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.Linear
     * @description 线性缓动
     * @param {number} k - 参数
     * @return {number} 输入值
     */
    Linear(k) {
        return k;
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.QuadraticIn
     * @description 二次方的缓动（t^2）
     * @param {number} k - 参数
     * @return {number} 二次方的缓动的值
     */
    QuadraticIn(k) {
        return k * k;
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.QuadraticOut
     * @description 返回按二次方缓动退出的值
     * @param {number} k - 参数
     * @return {number} 按二次方缓动退出的值
     */
    QuadraticOut(k) {
        return k * (2 - k);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.QuadraticInOut
     * @description 返回按二次方缓动进入和退出的值
     * @param {number} k - 参数
     * @return {number} 按二次方缓动进入和退出的值
     */
    QuadraticInOut(k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.CubicIn
     * @description 三次方的缓动（t^3）
     * @param {number} k - 参数
     * @return {number} 按三次方缓动的值
     */
    CubicIn(k) {
        return k * k * k;
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.CubicOut
     * @description 返回按三次方缓动退出的值
     * @param {number} k - 参数
     * @return {number} 按三次方缓动退出的值
     */
    CubicOut(k) {
        return --k * k * k + 1;
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.CubicInOut
     * @description 返回按三次方缓动进入退出的值
     * @param {number} k - 参数
     * @return {number} 按三次方缓动进入退出的值
     */
    CubicInOut(k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.QuarticIn
     * @description  返回按四次方缓动进入的值
     * @param {number} k - 参数
     * @return {number}  按四次方缓动进入的值
     */
    QuarticIn(k) {
        return k * k * k * k;
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.QuarticOut
     * @description  返回按四次方缓动退出的值
     * @param {number} k - 参数
     * @return {number}  按四次方缓动退出的值
     */
    QuarticOut(k) {
        return 1 - (--k * k * k * k);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.QuarticInOut
     * @description  返回按四次方缓动进入退出的值
     * @param {number} k - 参数
     * @return {number}  按四次方缓动进入退出的值
     */
    QuarticInOut(k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k - 2);
    }

    // 五次方的缓动（t^5）
    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.QuinticIn
     * @description  返回按五次方缓动的值
     * @param {number} k - 参数
     * @return {number}  按五次方缓动的值
     */
    QuinticIn(k) {
        return k * k * k * k * k;
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.QuinticOut
     * @description  返回按五次方缓动退出的值
     * @param {number} k - 参数
     * @return {number}  按五次方缓动退出的值
     */
    QuinticOut(k) {
        return --k * k * k * k * k + 1;
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.QuinticInOut
     * @description 返回按五次方缓动进入退出的值
     * @param {number} k - 参数
     * @return {number} 按五次方缓动进入退出的值
     */
    QuinticInOut(k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }

    // 正弦曲线的缓动（sin(t)）
    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.SinusoidalIn
     * @description 返回按正弦曲线的缓动进入的值
     * @param {number} k - 参数
     * @return {number} 按正弦曲线的缓动进入的值
     */
    SinusoidalIn(k) {
        return 1 - Math.cos(k * Math.PI / 2);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.SinusoidalOut
     * @description 返回按正弦曲线的缓动退出的值
     * @param {number} k - 参数
     * @return {number} 按正弦曲线的缓动退出的值
     */
    SinusoidalOut(k) {
        return Math.sin(k * Math.PI / 2);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.SinusoidalInOut
     * @description 返回按正弦曲线的缓动进入退出的值
     * @param {number} k - 参数
     * @return {number} 按正弦曲线的缓动进入退出的值
     */
    SinusoidalInOut(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    // 指数曲线的缓动（2^t）
    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.ExponentialIn
     * @description 返回按指数曲线的缓动进入的值
     * @param {number} k - 参数
     * @return {number} 按指数曲线的缓动进入的值
     */
    ExponentialIn(k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.ExponentialOut
     * @description 返回按指数曲线的缓动退出的值
     * @param {number} k - 参数
     * @return {number} 按指数曲线的缓动退出的值
     */
    ExponentialOut(k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.ExponentialInOut
     * @description 返回按指数曲线的缓动进入退出的值
     * @param {number} k - 参数
     * @return {number} 按指数曲线的缓动进入退出的值
     */
    ExponentialInOut(k) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }

    // 圆形曲线的缓动（sqrt(1-t^2)）
    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.CircularIn
     * @description 返回按圆形曲线的缓动进入的值
     * @param {number} k - 参数
     * @return {number} 按圆形曲线的缓动进入的值
     */
    CircularIn(k) {
        return 1 - Math.sqrt(1 - k * k);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.CircularOut
     * @description 返回按圆形曲线的缓动退出的值
     * @param {number} k - 参数
     * @return {number} 按圆形曲线的缓动退出的值
     */
    CircularOut(k) {
        return Math.sqrt(1 - (--k * k));
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.CircularInOut
     * @description 返回按圆形曲线的缓动进入退出的值
     * @param {number} k - 参数
     * @return {number} 按圆形曲线的缓动进入退出的值
     */
    CircularInOut(k) {
        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }

    // 创建类似于弹簧在停止前来回振荡的动画
    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.ElasticIn
     * @description 返回按类似于弹簧在停止前来回振荡的动画的缓动进入的值
     * @param {number} k - 参数
     * @return {number} 按类似于弹簧在停止前来回振荡的动画的缓动进入的值
     */
    ElasticIn(k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return -(a * Math.pow(2, 10 * (k -= 1)) *
            Math.sin((k - s) * (2 * Math.PI) / p));
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.ElasticOut
     * @description 返回按类似于弹簧在停止前来回振荡的动画的缓动退出的值
     * @param {number} k - 参数
     * @return {number} 按类似于弹簧在停止前来回振荡的动画的缓动退出的值
     */
    ElasticOut(k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return (a * Math.pow(2, -10 * k) *
            Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.ElasticInOut
     * @description 返回按类似于弹簧在停止前来回振荡的动画的缓动进入退出的值
     * @param {number} k - 参数
     * @return {number} 按类似于弹簧在停止前来回振荡的动画的缓动进入退出的值
     */
    ElasticInOut(k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1))
                * Math.sin((k - s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (k -= 1))
            * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

    }

    // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.BackIn
     * @description 返回按在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动的缓动进入的值
     * @param {number} k - 参数
     * @return {number} 按在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动的缓动进入的值
     */
    BackIn(k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.BackOut
     * @description 返回按在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动的缓动退出的值
     * @param {number} k - 参数
     * @return {number} 按在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动的缓动退出的值
     */
    BackOut(k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.BackInOut
     * @description 返回按在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动的缓动进入退出的值
     * @param {number} k - 参数
     * @return {number} 按在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动的缓动进入退出的值
     */
    BackInOut(k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }

    // 创建弹跳效果
    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.BounceIn
     * @description 返回按弹跳效果的缓动进入的值
     * @param {number} k - 参数
     * @return {number} 按弹跳效果的缓动进入的值
     */
    BounceIn(k) {
        return 1 - this.BounceOut(1 - k);
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.prototype.BounceOut
     * @description 返回按弹跳效果的缓动退出的值
     * @param {number} k - 参数
     * @return {number} 按弹跳效果的缓动退出的值
     */
    BounceOut(k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        } else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        } else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        } else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    }

    /**
     * @function Zondy.LevelRenderer.Animation.Easing.BounceInOut
     * @description 返回按弹跳效果的缓动进入退出的值
     * @param {number} k - 参数
     * @return {number} 按弹跳效果的缓动进入退出的值
     */
    BounceInOut(k) {
        if (k < 0.5) {
            return this.BounceIn(k * 2) * 0.5;
        }
        return this.BounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
}

export {Easing};
Zondy.LevelRenderer.Animation.Easing = Easing;