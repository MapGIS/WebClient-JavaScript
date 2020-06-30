import {
  Zondy
} from './Base';
import { Evented } from "./Evented";
import {
  SubscribePrefix,
  BroadcastPrefix,
  SubscribeEvent,
  BroadcastEvent
} from "./SocketEvent";

Zondy.Socket.ISocketService = undefined;

/**
 * Socket的基类
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 *
 * @alias ISocketService
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
 */
export class ISocketService {
  constructor(url, options) {
    this.url = url || "";

    this.options = options;

    this.subscribesocket = null;
    this.subscribesocket = null;

    this.evented = new Evented();
  }

  createSubscribe() {
    var self = this;
    this.subscribesocket = this.connect(this.url + SubscribePrefix);

    this.subscribesocket.onopen = function(event) {
      event.eventType = SubscribeEvent.OPEN;
      self.evented.fire(SubscribeEvent.OPEN, event);
    };
    this.subscribesocket.onmessage = function(event) {
      var feature = JSON.parse(event.data);
      event.feature = feature;
      event.eventType = SubscribeEvent.MESSAGE;
      self.evented.fire(SubscribeEvent.MESSAGE, event);
    };
    this.subscribesocket.onclose = function(event) {
      event.eventType = SubscribeEvent.CLOSE;
      self.evented.fire(SubscribeEvent.CLOSE, event);
    };
    this.subscribesocket.onerror = function(event) {
      event.eventType = SubscribeEvent.ERROR;
      self.evented.fire(SubscribeEvent.ERROR, event);
    };
  }

  createBroadcast() {
    var self = this;

    this.broadcastsocket = this.connect(this.url + BroadcastPrefix);

    this.broadcastsocket.onopen = function(event) {
      event.eventType = BroadcastEvent.OPEN;
      self.evented.fire(BroadcastEvent.OPEN, event);
    };
    this.broadcastsocket.onmessage = function(event) {
      var feature = JSON.parse(event.data);
      event.feature = feature;
      event.eventType = BroadcastEvent.MESSAGE;
      self.evented.fire(BroadcastEvent.MESSAGE, event);
    };
    this.broadcastsocket.onclose = function(event) {
      event.eventType = BroadcastEvent.CLOSE;
      self.evented.fire(BroadcastEvent.CLOSE, event);
    };
    this.broadcastsocket.onerror = function(event) {
      event.eventType = BroadcastEvent.ERROR;
      self.evented.fire(BroadcastEvent.ERROR, event);
    };
  }

  connect(url) {
    var socketFactory =
      "MozWebSocket" in window ? window.MozWebSocket : WebSocket;
    return new socketFactory(url);
  }

  broadcast(data) {
    if (!this.broadcastWebSocket || !this.broadcastWebSocket.isOpen) {
      return;
    }
    this.broadcastsocket.send(JSON.stringify(data));
  }

  closeSubscribe() {
    this.subscribesocket.close();
    this.subscribesocket = null;
  }

  closeBroadcast() {
    this.broadcastsocket.close();
    this.broadcastsocket = null;
  }

  close() {
    this.subscribesocket.close();
    this.broadcastsocket.close();
    this.subscribesocket = null;
    this.broadcastsocket = null;
  }
}

Zondy.Socket.ISocketService = ISocketService;
