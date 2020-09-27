/**
 * @author 基础平台-潘卓然
 * @param  {...any} mixins 混合的对象
 * @example 
 * class DistributedEdit extends mix(Loggable, Serializable) {
    // ...
    }
 */
export function mix(...mixins) {
    class Mix {
        constructor() {
            for (let mixin of mixins) {
                mixin && copyProperties(this, new mixin()); // 拷贝实例属性
            }
        }
    }

    for (let mixin of mixins) {
        mixin && copyProperties(Mix, mixin); // 拷贝静态属性
        mixin && copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
}

/**
 * @description 将要拷贝的源对象属性拷贝到对应的目标对象里面
 * @param {*} target 目标对象
 * @param {*} source 源对象
 */
export function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

export default mix;
