/**
 * 队列类
 */
export class Queue {
  
  constructor() {
    this.que = []
  }

  /**
   * 入队
   * @function
   * 
   * @param {*} value  
   */
  push(value) {
    this.que.push(value)
  }

  front() {
    if (this.que.length < 1) return null

    return this.que[0]
  }

  back() {
    const len = this.que.length()
    if (len < 1) return null
    return this.que[len - 1]
  }

  /**
   * 出队
   * @function
   * @returns {*} 队头元素
   */
  pop() {
    return this.que.shift()
  }

  /**
   * 判断队列是否为空
   * @function
   * 
   * @returns 队列为空返回true,否则返回false
   */
  isEmpty() {
    return this.que.length < 1
  }

  /**
   * 获取队列元素个数
   * @function
   * 
   * @returns {Number} 队列元素个数
   */
  size() {
    return this.que.length
  }
}
