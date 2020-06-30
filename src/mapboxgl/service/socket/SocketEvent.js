import { Zondy } from "../../core/Base";

export const SubscribePrefix = "/subscribe";
export const BroadcastPrefix = "/broadcast";

/**
 * SubscribeEvent WebSocket消息订阅通信事件流程
 * @readonly
 * @enum {String}
 */
export const SubscribeEvent = {
  /** 广播流打开事件 */
  OPEN: "subscribeOpen",
  /** 广播流消息事件 */
  MESSAGE: "subscribeMessage",
  /** 广播流关闭事件 */
  CLOSE: "subscribeClose",
  /** 广播流错误事件 */
  ERROR: "subscribeError"
};

/**
 * BroadcastEvent WebSocket消息广播通信事件流程
 * @readonly
 * @enum {String}
 */
export const BroadcastEvent = {
  /** 广播流打开事件 */
  OPEN: "broadcastOpen",
  /** 广播流消息事件 */
  MESSAGE: "broadcastMessage",
  /** 广播流关闭事件 */
  CLOSE: "broadcastClose",
  /** 广播流错误事件 */
  ERROR: "broadcastError"
};

/**
 * BroadcastEvent WebSocket 图层事件，用户、二次开发一般关注这个事件
 * @readonly
 * @enum {String}
 */
export const LayerEvent = {
    /** 图层更新事件事件 */
    UPDATE: "layerupdate"
  };

Zondy.Event.SubscribeEvent = SubscribeEvent;
Zondy.Event.BroadcastEvent = BroadcastEvent;
Zondy.Event.LayerEvent = BroadcastEvent;