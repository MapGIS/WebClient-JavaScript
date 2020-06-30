import {
    Zondy
} from '../../common/Base';
import {
    getAllTextContent,
    DOCUMENT
} from './base/xml';
import {
    padNumber
} from './base/string';

/**
 * @private
 * @description 读取指定节点中所有的Boolean字符
 * @param {Node} node 节点.
 * @return {boolean|undefined} Boolean.
 */
var readBoolean = function (node) {
    const s = getAllTextContent(node, false);
    return readBooleanString(s);
}

/**
 * @private
 * @description 读取Boolean字符
 * @param {string} string String.
 * @return {boolean|undefined} Boolean.
 */
var readBooleanString = function (string) {
    const m = /^\s*(true|1)|(false|0)\s*$/.exec(string);
    if (m) {
        return m[1] !== undefined || false;
    } else {
        return undefined;
    }
}

/**
 * @private
 * @description 读取指定节点中所有的时间字符
 * @param {Node} node Node.
 * @return {number|undefined} DateTime in seconds.
 */
var readDateTime = function (node) {
    const s = getAllTextContent(node, false);
    const dateTime = Date.parse(s);
    return isNaN(dateTime) ? undefined : dateTime / 1000;
}

/**
 * @private
 * @description 读取指定节点中所有的十进制字符
 * @param {Node} node Node.
 * @return {number|undefined} Decimal.
 */
var readDecimal = function (node) {
    const s = getAllTextContent(node, false);
    return readDecimalString(s);
}

/**
 * @private
 * @description 读取十进制字符
 * @param {string} string String.
 * @return {number|undefined} Decimal.
 */
var readDecimalString = function (string) {
    // FIXME check spec
    const m = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(string);
    if (m) {
        return parseFloat(m[1]);
    } else {
        return undefined;
    }
}

/**
 * @private
 * @description 读取指定节点中所有的非负整数字符
 * @param {Node} node Node.
 * @return {number|undefined} Non negative integer.
 */
var readNonNegativeInteger = function (node) {
    const s = getAllTextContent(node, false);
    return readNonNegativeIntegerString(s);
}

/**
 * @private
 * @description 读取非负整数字符
 * @param {string} string String.
 * @return {number|undefined} Non negative integer.
 */
var readNonNegativeIntegerString = function (string) {
    const m = /^\s*(\d+)\s*$/.exec(string);
    if (m) {
        return parseInt(m[1], 10);
    } else {
        return undefined;
    }
}

/**
 * @private
 * @description 读取指定节点中所有的string字符
 * @param {Node} node Node.
 * @return {string|undefined} String.
 */
var readString = function (node) {
    return getAllTextContent(node, false).trim();
}

/**
 * @private
 * @description 向指定节点中写入Boolean字符
 * @param {Node} node Node to append a TextNode with the boolean to.
 * @param {boolean} bool Boolean.
 */
var writeBooleanTextNode = function (node, bool) {
    writeStringTextNode(node, (bool) ? '1' : '0');
}

/**
 * @private
 * @description 向指定节点中写入CDATA部分
 * @param {Node} node Node to append a CDATA Section with the string to.
 * @param {string} string String.
 */
var writeCDATASection = function (node, string) {
    node.appendChild(DOCUMENT.createCDATASection(string));
}

/**
 * @private
 * @description 向指定节点中写入时间字符
 * @param {Node} node Node to append a TextNode with the dateTime to.
 * @param {number} dateTime DateTime in seconds.
 */
var writeDateTimeTextNode = function (node, dateTime) {
    const date = new Date(dateTime * 1000);
    const string = date.getUTCFullYear() + '-' +
        padNumber(date.getUTCMonth() + 1, 2) + '-' +
        padNumber(date.getUTCDate(), 2) + 'T' +
        padNumber(date.getUTCHours(), 2) + ':' +
        padNumber(date.getUTCMinutes(), 2) + ':' +
        padNumber(date.getUTCSeconds(), 2) + 'Z';
    node.appendChild(DOCUMENT.createTextNode(string));
}

/**
 * @private
 * @description 向指定节点中写入十进制字符
 * @param {Node} node Node to append a TextNode with the decimal to.
 * @param {number} decimal Decimal.
 */
var writeDecimalTextNode = function (node, decimal) {
    const string = decimal.toPrecision();
    node.appendChild(DOCUMENT.createTextNode(string));
}

/**
 * @private
 * @description 向指定节点中写入非负整数字符
 * @param {Node} node Node to append a TextNode with the decimal to.
 * @param {number} nonNegativeInteger Non negative integer.
 */
var writeNonNegativeIntegerTextNode = function (node, nonNegativeInteger) {
    const string = nonNegativeInteger.toString();
    node.appendChild(DOCUMENT.createTextNode(string));
}

/**
 * @private
 * @description 向指定节点中写入string字符
 * @param {Node} node Node to append a TextNode with the string to.
 * @param {string} string String.
 */
var writeStringTextNode = function (node, string) {
    node.appendChild(DOCUMENT.createTextNode(string));
}

export {
    readBoolean,
    readBooleanString,
    readDateTime,
    readDecimal,
    readDecimalString,
    readNonNegativeInteger,
    readNonNegativeIntegerString,
    readString,
    writeBooleanTextNode,
    writeCDATASection,
    writeDateTimeTextNode,
    writeDecimalTextNode,
    writeNonNegativeIntegerTextNode,
    writeStringTextNode
};

Zondy.xsd.readBoolean = readBoolean;
Zondy.xsd.readBooleanString = readBooleanString;
Zondy.xsd.readDateTime = readDateTime;
Zondy.xsd.readDecimal = readDecimal;
Zondy.xsd.readDecimalString = readDecimalString;
Zondy.xsd.readNonNegativeInteger = readNonNegativeInteger;
Zondy.xsd.readNonNegativeIntegerString = readNonNegativeIntegerString;
Zondy.xsd.readString = readString;
Zondy.xsd.writeBooleanTextNode = writeBooleanTextNode;
Zondy.xsd.writeCDATASection = writeCDATASection;
Zondy.xsd.writeDateTimeTextNode = writeDateTimeTextNode;
Zondy.xsd.writeDecimalTextNode = writeDecimalTextNode;
Zondy.xsd.writeNonNegativeIntegerTextNode = writeNonNegativeIntegerTextNode;
Zondy.xsd.writeStringTextNode = writeStringTextNode;

