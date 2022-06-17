/*
 * @Description: 
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-01-10 16:06:25
 */
import { fabric } from "fabric";

function commonEventInfo(eventData, transform, x, y) {
  return {
    e: eventData,
    transform,
    pointer: {
      x,
      y,
    },
  };
}

fabric.controlsUtils.dragHandler = function dragHandler(
  eventData,
  transform,
  x,
  y
) {
  const { target } = transform;
  const newLeft = x - transform.offsetX;
  const newTop = y - transform.offsetY;
  const moveX = !target.get("lockMovementX") && target.left !== newLeft;
  const moveY = !target.get("lockMovementY") && target.top !== newTop;

  if (moveX || moveY) {
    target.moveBy(newLeft - target.left, newTop - target.top);
    fabric.controlsUtils.fireEvent(
      "moving",
      commonEventInfo(eventData, transform, x, y)
    );
  }
  return moveX || moveY;
};

