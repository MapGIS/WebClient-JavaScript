import { extend }  from  "../common/Util";
import { indexOf }  from  "../common/Util";

/*
* @classdesc 事件类。
* @param object - {Object} 当前事件对象被添加到的JS对象。
* @param eventTypes - {Array<string>} 自定义应用事件的数组。
* @param fallThrough - {boolean} 是否允许事件处理之后向上传递（冒泡），为false的时候阻止事件冒泡。
* @param options - {Object} 事件对象选项。
*/
var  Events  = function(object, element, eventTypes, options)
{
    this.listeners = {};

    /**
        * @description  发布应用程序事件的对象。
        */
    this.object = object;

    /**
        * @description 支持的事件类型列表。
        */
    this.eventTypes = [];

    this.extensions = {};

    /**
        */
    this.extensionCount = {};


    extend(this, options);

    if (eventTypes != null) {
        for (var i = 0, len = eventTypes.length; i < len; i++) {
            this.addEventType(eventTypes[i]);
        }
    }
};

/**
* @description 移除当前要素element上的所有事件监听和处理。
*/
Events.prototype.destroy = function() {
    for (var e in this.extensions) {
        if (typeof this.extensions[e] !== "boolean") {
            this.extensions[e].destroy();
        }
    }
    this.extensions = null;
    this.listeners = null;
    this.object = null;
    this.eventTypes = null;
};

/**
* @description 在此事件对象中添加新的事件类型，如果这个事件类型已经添加过了，则不做任何事情。
* @param eventName - {string} 事件名。
*/
Events.prototype.addEventType =function(eventName) {
    if (!this.listeners[eventName]) {
        this.eventTypes.push(eventName);
        this.listeners[eventName] = [];
    }
};
/**
* @description 在一个相同的范围内注册监听器的方法，此方法调用register函数。
* @example
* // 注册一个"loadstart"监听事件
* events.on({"loadstart": loadStartListener});
*
* // 同样注册一个"loadstart"监听事件
* events.register("loadstart", undefined, loadStartListener);
*
* // 同时为对象注册多个监听事件
* events.on({
*     "loadstart": loadStartListener,
*     "loadend": loadEndListener,
*     scope: object
* });
*
* // 同时为对象注册多个监听事件，多次调用register方法
* events.register("loadstart", object, loadStartListener);
* events.register("loadend", object, loadEndListener);
*
*
* @param  object - {Object} 添加监听的对象。
*/
Events.prototype.on = function(object) {
    for (var type in object) {
        if (type !== "scope" && object.hasOwnProperty(type)) {
            this.register(type, object.scope, object[type]);
        }
    }
};


/**
* @description 在事件对象上注册一个事件。当事件被触发时，'func'函数被调用
* @param type - {string} 事件注册者的名字。
* @param obj - {Object} 对象绑定的回调。如果没有特定的对象，则默认是事件的object属性。
* @param func - {function} 回调函数，如果没有特定的回调，则这个函数不做任何事情。
* @param priority - {boolean|Object} 当为true时将新的监听加在事件队列的前面。
*/
Events.prototype.register =function(type, obj, func, priority) {
    if (type in Events && !this.extensions[type]) {
        this.extensions[type] = new Events[type](this);
    }
    if ((func != null) &&
        (indexOf(this.eventTypes, type) !== -1)) {

        if (obj == null) {
            obj = this.object;
        }
        var listeners = this.listeners[type];
        if (!listeners) {
            listeners = [];
            this.listeners[type] = listeners;
            this.extensionCount[type] = 0;
        }
        var listener = {obj: obj, func: func};
        if (priority) {
            listeners.splice(this.extensionCount[type], 0, listener);
            if (typeof priority === "object" && priority.extension) {
                this.extensionCount[type]++;
            }
        } else {
            listeners.push(listener);
        }
    }
};

/**
    * @description 相同的注册方法，但是在前面增加新的监听者事件查询而代替到方法的结束。
    * @param type - {string} 事件注册者的名字。
    * @param obj - {Object} 对象绑定方面的回调。如果没有特定的对象，则默认是事件的object属性。
    * @param func - {function} 回调函数，如果没有特定的回调，则这个函数不做任何事情。
    */
Events.prototype.registerPriority=function(type, obj, func) {
    this.register(type, obj, func, true);
};


/**
* @description 在一个相同的范围内取消注册监听器的方法，此方法调用unregister函数。
* @example
* // 移除"loadstart" 事件监听
* events.un({"loadstart": loadStartListener});
*
* // 使用unregister方法移除"loadstart" 事件监听
* events.unregister("loadstart", undefined, loadStartListener);
*
* // 取消对象多个事件监听
* events.un({
*     "loadstart": loadStartListener,
*     "loadend": loadEndListener,
*     scope: object
* });
*
* // 取消对象多个事件监听，多次调用unregister方法。
* events.unregister("loadstart", object, loadStartListener);
* events.unregister("loadend", object, loadEndListener);
*
* @param object - {Object} 移除监听的对象。
*/
Events.prototype.un =function(object) {
    for (var type in object) {
        if (type !== "scope" && object.hasOwnProperty(type)) {
            this.unregister(type, object.scope, object[type]);
        }
    }
};

/**
* @description 取消注册。
* @param type - {string} 事件类型。
* @param obj - {Object} 默认为 this.object。
* @param func - {function} 事件监听。
*/
Events.prototype.unregister =function(type, obj, func) {
    if (obj == null) {
        obj = this.object;
    }
    var listeners = this.listeners[type];
    if (listeners != null) {
        for (var i = 0, len = listeners.length; i < len; i++) {
            if (listeners[i].obj === obj && listeners[i].func === func) {
                listeners.splice(i, 1);
                break;
            }
        }
    }
};


/**
* @description 删除某个事件类型的所有监听，如果该事件类型没有注册，则不做任何操作。
* @param type - {string} 事件类型。
*/
Events.prototype.remove=function(type) {
    if (this.listeners[type] != null) {
        this.listeners[type] = [];
    }
};

/**
* @description 触发一个特定的注册事件。
* @param type - {string} 触发事件类型。
* @param evt - {Event} 事件对象。
* @returns {boolean} 返回监听对象，如果返回是falee，则停止监听。
*/
Events.prototype.triggerEvent =function(type, evt) {
    var listeners = this.listeners[type];

    // fast path
    if (!listeners || listeners.length == 0) {
        return undefined;
    }

    // prep evt object with object & div references
    if (evt == null) {
        evt = {};
    }
    evt.object = this.object;
    if (!evt.type) {
        evt.type = type;
    }

    // execute all callbacks registered for specified type
    // get a clone of the listeners array to
    // allow for splicing during callbacks
    listeners = listeners.slice();
    var continueChain;
    for (var i = 0, len = listeners.length; i < len; i++) {
        var callback = listeners[i];
        // bind the context to callback.obj
        // continueChain = callback.func.apply(callback.obj, [evt]);

        continueChain = callback.func.apply(callback.obj, [evt.result]);//by xie 因为在结果集中包了一层  所以前台的查询返回值 都得发生变化  为了最小变化 直接返回最原先的值

        if ((continueChain != undefined) && (continueChain == false)) {
            // if callback returns false, execute no more callbacks.
            break;
        }
    }
    // don't fall through to other DOM elements
//    if (!this.fallThrough) {
//        Event.stop(evt, true);
//    }
    return continueChain;
};
export { Events }; 