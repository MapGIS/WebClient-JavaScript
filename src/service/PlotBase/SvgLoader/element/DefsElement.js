/*
 * @class: 
 * @Description: 
 * @Author: zk
 * @Date: 2022-06-14 14:07:24
 * @LastEditors: zk
 * @LastEditTime: 2022-06-14 14:07:24
 */
import Element from './Element';

export default class DefsElement extends Element {
    constructor(node){
        super(node)
        this.type = 'defs';
    }

	render() {
		// NOOP
	}
}
