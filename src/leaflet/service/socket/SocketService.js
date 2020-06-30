import L from "leaflet";

import {
  SubscribeEvent,
  BroadcastEvent
} from "../../../service/common/SocketEvent";
import { ISocketService } from "../../../service/common/ISocketService";

import { ServiceEvent } from "../ServiceEvent";

L.zondy.SocketService = undefined;

/**
 * LeafeltSocket的代理类，实际上是接受websocket的事件，然后转换成leaflet的事件再进行发送
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 *
 * @alias SocketService
 * @constructor
 *
 * @param {Object} url Socket流地址的url：
 * @param {Number} options 其他预留参数.
 *
 * @example
 * 固定url  ws://{ip}:{socket}/websocket/{servicename}
 * 服务名 streamdemo
 * 消息接收 ws://192.168.91.121:9382/websocket/streamdemo/subscribe
 * 消息发送 ws://192.168.91.121:9382/websocket/streamdemo/broadcast
 *
 * @exception {DeveloperError} options.styleOption 必须是正确的样式.
 *
 */
export var SocketService = ServiceEvent.extend({
  initialize(url, options) {
    this.url = url || "";

    this.options = options || {};
    
    this.socket = new ISocketService(url, options);
  },

  createSubscribe() {
    console.log("在使用流图层的时候容易出现回调堆栈溢出的问题，其核心原因是socket通信是双工通信，因此上下文环境context在不同的场景下是不一样的，以leaflet的on为例，其函数原型off(types, fn, context)第三个参数context的默认会是运行时的this而不是绑定时的this，最好在使用on监听的时候主动传入真正的上下文环境this");
    this.socket.createSubscribe();
    this.socket.evented.on(SubscribeEvent.OPEN, this.mapEvent, this);
    this.socket.evented.on(SubscribeEvent.MESSAGE, this.mapEvent, this);
    this.socket.evented.on(SubscribeEvent.CLOSE, this.mapEvent, this);
    this.socket.evented.on(SubscribeEvent.ERROR, this.mapEvent, this);
  },

  createBroadcast() {
    this.socket.createBroadcast();
    this.socket.evented.on(BroadcastEvent.OPEN, this.mapEvent, this);
    this.socket.evented.on(BroadcastEvent.MESSAGE, this.mapEvent, this);
    this.socket.evented.on(BroadcastEvent.CLOSE, this.mapEvent, this);
    this.socket.evented.on(BroadcastEvent.ERROR, this.mapEvent, this);
  },

  mapEvent(event) {
    this.fire(event.eventType || event.type, event);
  },

  broadcast(data) {
    if(!this.socket){
        return;
    }
    this.socket.broadcast(data);
  },  

  closeSubscribe() {
    this.socket.closeSubscribe();
    this.socket.evented.off(SubscribeEvent.OPEN, this.mapEvent, this);
    this.socket.evented.off(SubscribeEvent.MESSAGE, this.mapEvent, this);
    this.socket.evented.off(SubscribeEvent.CLOSE, this.mapEvent, this);
    this.socket.evented.off(SubscribeEvent.ERROR, this.mapEvent, this);
  },

  closeBroadcast() {
    this.socket.closeBroadcast();
    this.socket.evented.off(BroadcastEvent.OPEN, this.mapEvent);
    this.socket.evented.off(BroadcastEvent.MESSAGE, this.mapEvent);
    this.socket.evented.off(BroadcastEvent.CLOSE, this.mapEvent);
    this.socket.evented.off(BroadcastEvent.ERROR, this.mapEvent);
  }
});

export var socketService = function(url, options) {
  return new SocketService(url, options);
};

L.zondy.SocketService = socketService;
