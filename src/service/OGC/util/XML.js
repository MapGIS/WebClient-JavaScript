import {
    Zondy
} from '../../common/Base';
import {
    isDocument,
    isNode,
    parse
} from './base/xml';

/**
 * @private
 * @classdesc
 * Generic format for reading non-feature XML data
 * 用于读取通用格式的XML数据
 * @abstract
 */
class XML {
    /**
     * @private
     * @function Zondy.Format.XML.prototype.read
     * @description Read the source document 读取源文档
     * @param {Document|Element|string} XML源文档.
     * @return {Object} An object representing the source 代表源文档的对象.
     */
    read(source) {
        if (isDocument(source)) {
            return this.readFromDocument(source);
        } else if (isNode(source)) {
            return this.readFromNode(source);
        } else if (typeof source === 'string') {
            const doc = parse(source);
            return this.readFromDocument(doc);
        } else {
            return null;
        }
    }

    /**
     * @private
     * @function Zondy.Format.XML.prototype.readFromDocument
     * @description 从文档中读取信息
     * @abstract
     * @param {Document} doc文档.
     * @return {Object} 对象.
     */
    readFromDocument(doc) {
    }

    /**
     * @private
     * @function Zondy.Format.XML.prototype.readFromNode
     * @description 从节点中读取信息
     * @abstract
     * @param {Element} node 节点.
     * @return {Object} 对象
     */
    readFromNode(node) {
    }
}

export default XML;
Zondy.Format.XML = XML;
