import {Zondy} from "../../common/Base";

/**
 * @private
 * @const NAMESPACE_URI 命名空间标识符
 * @type {string}
 */
const NAMESPACE_URI = 'http://www.w3.org/1999/xlink';

/**
 * @private
 * @description 读取href
 * @param {Element} node 节点.
 * @return {string|undefined} href.
 */
var readHref = function (node) {
    return node.getAttributeNS(NAMESPACE_URI, 'href');
}
export{
    readHref
};
Zondy.XLink.readHref = readHref;