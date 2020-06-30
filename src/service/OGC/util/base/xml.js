import {
    Zondy
} from '../../../common/Base';
import {
    extend
} from './array';

/**
 * @private
 * @description This document should be used when creating nodes for XML serializations. This
 * document is also used by {@link module:ol/xml~createElementNS}
 * 适用于创建XML序列节点
 * @const DOCUMENT
 * @type {Document}
 */
const DOCUMENT = document.implementation.createDocument('', '', null);


/**
 * @private
 * @const XML_SCHEMA_INSTANCE_URI
 * @type {string}
 */
const XML_SCHEMA_INSTANCE_URI = 'http://www.w3.org/2001/XMLSchema-instance';


/**
 * @private
 * @description 创建节点元素
 * @param {string} namespaceURI Namespace URI.
 * @param {string} qualifiedName Qualified name.
 * @return {Element} Node.
 */
var createElementNS = function (namespaceURI, qualifiedName) {
    return DOCUMENT.createElementNS(namespaceURI, qualifiedName);
}


/**
 * @private
 * @description Recursively grab all text content of child nodes into a single string.
 * 递归通过单个字符获取子节点的所有文本内容
 * @param {Node} node Node.
 * @param {boolean} normalizeWhitespace Normalize whitespace: remove all line
 * breaks.
 * @return {string} All text content.
 */
var getAllTextContent = function (node, normalizeWhitespace) {
    return getAllTextContent_(node, normalizeWhitespace, []).join('');
}


/**
 * @private
 * @description Recursively grab all text content of child nodes into a single string.
 * 递归通过单个字符获取子节点的所有文本内容
 * @param {Node} node Node.
 * @param {boolean} normalizeWhitespace Normalize whitespace: remove all line
 * breaks.
 * @param {Array<string>} accumulator Accumulator.
 * @private
 * @return {Array<string>} Accumulator.
 */
var getAllTextContent_ = function (node, normalizeWhitespace, accumulator) {
    if (node.nodeType == Node.CDATA_SECTION_NODE ||
        node.nodeType == Node.TEXT_NODE) {
        if (normalizeWhitespace) {
            accumulator.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, ''));
        } else {
            accumulator.push(node.nodeValue);
        }
    } else {
        let n;
        for (n = node.firstChild; n; n = n.nextSibling) {
            getAllTextContent_(n, normalizeWhitespace, accumulator);
        }
    }
    return accumulator;
}


/**
 * @private
 * @description 判断给定的值是否为文档
 * @param {?} value Value.
 * @return {boolean} Is document.
 */
var isDocument = function (value) {
    return value instanceof Document;
}


/**
 * @private
 * @description 判断给定的值是否为节点
 * @param {?} value Value.
 * @return {boolean} Is node.
 */
var isNode = function (value) {
    return value instanceof Node;
}


/**
 * @private
 * @description 获取属性信息
 * @param {Element} node Node.
 * @param {?string} namespaceURI Namespace URI.
 * @param {string} name Attribute name.
 * @return {string} Value
 */
var getAttributeNS = function (node, namespaceURI, name) {
    return node.getAttributeNS(namespaceURI, name) || '';
}


/**
 * @private
 * @description Parse an XML string to an XML Document.
 * 将XML字符串解析为XML文档
 * @param {string} xml XML.
 * @return {Document} Document.
 * @api
 */
var parse = function (xml) {
    return new DOMParser().parseFromString(xml, 'application/xml');
}


/**
 * @private
 * @description Make an array extender function for extending the array at the top of the
 * object stack.
 * 创建一个数组扩展器函数，用于扩展对象堆栈顶部的数组。
 * @param {function(this: T, Node, Array<*>): (Array<*>|undefined)} valueReader Value reader.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
var makeArrayExtender = function (valueReader, opt_this) {
    return (
        /**
         * @private
         * @param {Node} node Node.
         * @param {Array<*>} objectStack Object stack.
         */
            function (node, objectStack) {
            const value = valueReader.call(opt_this !== undefined ? opt_this : this, node, objectStack);
            if (value !== undefined) {
                const array = /** @type {Array<*>} */ (objectStack[objectStack.length - 1]);
                extend(array, value);
            }
        }
    );
}


/**
 * @private
 * @description Make an array pusher function for pushing to the array at the top of the
 * object stack.
 * 创建一个数组推送器功能，用于推送到对象堆栈顶部的数组。
 * @param {function(this: T, Element, Array<*>): *} valueReader Value reader.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
var makeArrayPusher = function (valueReader, opt_this) {
    return (
        /**
         * @private
         * @param {Element} node Node.
         * @param {Array<*>} objectStack Object stack.
         */
            function (node, objectStack) {
            const value = valueReader.call(opt_this !== undefined ? opt_this : this, node, objectStack);
            if (value !== undefined) {
                const array = /** @type {Array<*>} */ (objectStack[objectStack.length - 1]);
                array.push(value);
            }
        });
}


/**
 * @private
 * @description Make an object stack replacer function for replacing the object at the
 * top of the stack.
 * 创建一个对象堆栈替换器函数，用于替换堆栈顶部的对象。
 * @param {function(this: T, Node, Array<*>): *} valueReader Value reader.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
var makeReplacer = function (valueReader, opt_this) {
    return (
        /**
         * @private
         * @param {Node} node Node.
         * @param {Array<*>} objectStack Object stack.
         */
            function (node, objectStack) {
            const value = valueReader.call(opt_this !== undefined ? opt_this : this, node, objectStack);
            if (value !== undefined) {
                objectStack[objectStack.length - 1] = value;
            }
        });
}


/**
 * @private
 * @description Make an object property pusher function for adding a property to the
 * object at the top of the stack.
 * 创建一个对象属性推送器函数，用于向堆栈顶部的对象添加属性。
 * @param {function(this: T, Element, Array<*>): *} valueReader Value reader.
 * @param {string=} opt_property Property.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
var makeObjectPropertyPusher = function (valueReader, opt_property, opt_this) {
    return (
        /**
         * @private
         * @param {Element} node Node.
         * @param {Array<*>} objectStack Object stack.
         */
            function (node, objectStack) {
            const value = valueReader.call(opt_this !== undefined ? opt_this : this, node, objectStack);
            if (value !== undefined) {
                const object = /** @type {!Object} */ (objectStack[objectStack.length - 1]);
                const property = opt_property !== undefined ? opt_property : node.localName;
                let array;
                if (property in object) {
                    array = object[property];
                } else {
                    array = object[property] = [];
                }
                array.push(value);
            }
        });
}


/**
 * @private
 * @description Make an object property setter function.
 * 创建一个对象属性设置函数。
 * @param {function(this: T, Element, Array<*>): *} valueReader Value reader.
 * @param {string=} opt_property Property.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
var makeObjectPropertySetter = function (valueReader, opt_property, opt_this) {
    return (
        /**
         * @private
         * @param {Element} node Node.
         * @param {Array<*>} objectStack Object stack.
         */
            function (node, objectStack) {
            const value = valueReader.call(opt_this !== undefined ? opt_this : this, node, objectStack);
            if (value !== undefined) {
                const object = /** @type {!Object} */ (objectStack[objectStack.length - 1]);
                const property = opt_property !== undefined ? opt_property : node.localName;
                object[property] = value;
            }
        });
}


/**
 * @private
 * @description Create a serializer that appends nodes written by its `nodeWriter` to its
 * designated parent. 创建一个序列化程序，将其`nodeWriter`写入的节点附加到其指定的父节点
 * The parent is the `node` of the
 * {@link module:ol/xml~NodeStackItem} at the top of the `objectStack`.
 * @param {function(this: T, Node, V, Array<*>)} nodeWriter Node writer.
 * @param {T=} opt_this The object to use as `this` in `nodeWriter`.
 * @return {Serializer} Serializer.
 * @template T, V
 */
var makeChildAppender = function (nodeWriter, opt_this) {
    return function (node, value, objectStack) {
        nodeWriter.call(opt_this !== undefined ? opt_this : this, node, value, objectStack);
        const parent = /** @type {NodeStackItem} */ (objectStack[objectStack.length - 1]);
        const parentNode = parent.node;
        parentNode.appendChild(node);
    };
}


/**
 * @private
 * @description Create a serializer that calls the provided `nodeWriter` from
 * {@link module:ol/xml~serialize}. This can be used by the parent writer to have the
 * 'nodeWriter' called with an array of values when the `nodeWriter` was
 * designed to serialize a single item. An example would be a LineString
 * geometry writer, which could be reused for writing MultiLineString
 * geometries.
 * @param {function(this: T, Element, V, Array<*>)} nodeWriter Node writer.
 * @param {T=} opt_this The object to use as `this` in `nodeWriter`.
 * @return {Serializer} Serializer.
 * @template T, V
 */
var makeArraySerializer = function (nodeWriter, opt_this) {
    let serializersNS,
        nodeFactory;
    return function (node, value, objectStack) {
        if (serializersNS === undefined) {
            serializersNS = {};
            const serializers = {};
            serializers[node.localName] = nodeWriter;
            serializersNS[node.namespaceURI] = serializers;
            nodeFactory = makeSimpleNodeFactory(node.localName);
        }
        serialize(serializersNS, nodeFactory, value, objectStack);
    };
}


/**
 * @private
 * @description Create a node factory which can use the `opt_keys` passed to
 * {@link module:ol/xml~serialize} or {@link module:ol/xml~pushSerializeAndPop} as node names,
 * or a fixed node name. The namespace of the created nodes can either be fixed,
 * or the parent namespace will be used.
 * @param {string=} opt_nodeName Fixed node name which will be used for all
 *     created nodes. If not provided, the 3rd argument to the resulting node
 *     factory needs to be provided and will be the nodeName.
 * @param {string=} opt_namespaceURI Fixed namespace URI which will be used for
 *     all created nodes. If not provided, the namespace of the parent node will
 *     be used.
 * @return {function(*, Array<*>, string=): (Node|undefined)} Node factory.
 */
var makeSimpleNodeFactory = function (opt_nodeName, opt_namespaceURI) {
    const fixedNodeName = opt_nodeName;
    return (
        /**
         * @private
         * @param {*} value Value.
         * @param {Array<*>} objectStack Object stack.
         * @param {string=} opt_nodeName Node name.
         * @return {Node} Node.
         */
            function (value, objectStack, opt_nodeName) {
            const context = /** @type {NodeStackItem} */ (objectStack[objectStack.length - 1]);
            const node = context.node;
            let nodeName = fixedNodeName;
            if (nodeName === undefined) {
                nodeName = opt_nodeName;
            }

            const namespaceURI = opt_namespaceURI !== undefined ? opt_namespaceURI : node.namespaceURI;
            return createElementNS(namespaceURI, /** @type {string} */ (nodeName));
        }
    );
}


/**
 * @private
 * @description A node factory that creates a node using the parent's `namespaceURI` and the
 * `nodeName` passed by {@link module:ol/xml~serialize} or
 * {@link module:ol/xml~pushSerializeAndPop} to the node factory.
 * @const
 * @type {function(*, Array<*>, string=): (Node|undefined)}
 */
const OBJECT_PROPERTY_NODE_FACTORY = makeSimpleNodeFactory();


/**
 * @private
 * @description Create an array of `values` to be used with {@link module:ol/xml~serialize} or
 * {@link module:ol/xml~pushSerializeAndPop}, where `orderedKeys` has to be provided as
 * `opt_key` argument.
 * @param {Object<string, V>} object Key-value pairs for the sequence. Keys can
 *     be a subset of the `orderedKeys`.
 * @param {Array<string>} orderedKeys Keys in the order of the sequence.
 * @return {Array<V>} Values in the order of the sequence. The resulting array
 *     has the same length as the `orderedKeys` array. Values that are not
 *     present in `object` will be `undefined` in the resulting array.
 * @template V
 */
var makeSequence = function (object, orderedKeys) {
    const length = orderedKeys.length;
    const sequence = new Array(length);
    for (let i = 0; i < length; ++i) {
        sequence[i] = object[orderedKeys[i]];
    }
    return sequence;
}


/**
 * @private
 * @description Create a namespaced structure, using the same values for each namespace.
 * This can be used as a starting point for versioned parsers, when only a few
 * values are version specific.
 * @param {Array<string>} namespaceURIs Namespace URIs.
 * @param {T} structure Structure.
 * @param {Object<string, T>=} opt_structureNS Namespaced structure to add to.
 * @return {Object<string, T>} Namespaced structure.
 * @template T
 */
var makeStructureNS = function (namespaceURIs, structure, opt_structureNS) {
    /**
     * @type {Object<string, T>}
     */
    const structureNS = opt_structureNS !== undefined ? opt_structureNS : {};
    let i,
        ii;
    for (i = 0, ii = namespaceURIs.length; i < ii; ++i) {
        structureNS[namespaceURIs[i]] = structure;
    }
    return structureNS;
}


/**
 * @private
 * @description Parse a node using the parsers and object stack.
 * @param {Object<string, Object<string, Parser>>} parsersNS
 *     Parsers by namespace.
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @param {*=} opt_this The object to use as `this`.
 */
var parseNode = function (parsersNS, node, objectStack, opt_this) {
    let n;
    for (n = node.firstElementChild; n; n = n.nextElementSibling) {
        const parsers = parsersNS[n.namespaceURI];
        if (parsers !== undefined) {
            const parser = parsers[n.localName];
            if (parser !== undefined) {
                parser.call(opt_this, n, objectStack);
            }
        }
    }
}


/**
 * @private
 * @description Push an object on top of the stack, parse and return the popped object.
 * @param {T} object Object.
 * @param {Object<string, Object<string, Parser>>} parsersNS
 *     Parsers by namespace.
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @param {*=} opt_this The object to use as `this`.
 * @return {T} Object.
 * @template T
 */
var pushParseAndPop = function (object, parsersNS, node, objectStack, opt_this) {
    objectStack.push(object);
    parseNode(parsersNS, node, objectStack, opt_this);
    return /** @type {T} */ (objectStack.pop());
}


/**
 * @private
 * @description Walk through an array of `values` and call a serializer for each value.
 * @param {Object<string, Object<string, Serializer>>} serializersNS
 *     Namespaced serializers.
 * @param {function(this: T, *, Array<*>, (string|undefined)): (Node|undefined)} nodeFactory
 *     Node factory. The `nodeFactory` creates the node whose namespace and name
 *     will be used to choose a node writer from `serializersNS`. This
 *     separation allows us to decide what kind of node to create, depending on
 *     the value we want to serialize. An example for this would be different
 *     geometry writers based on the geometry type.
 * @param {Array<*>} values Values to serialize. An example would be an array
 *     of {@link module:ol/Feature~Feature} instances.
 * @param {Array<*>} objectStack Node stack.
 * @param {Array<string>=} opt_keys Keys of the `values`. Will be passed to the
 *     `nodeFactory`. This is used for serializing object literals where the
 *     node name relates to the property key. The array length of `opt_keys` has
 *     to match the length of `values`. For serializing a sequence, `opt_keys`
 *     determines the order of the sequence.
 * @param {T=} opt_this The object to use as `this` for the node factory and
 *     serializers.
 * @template T
 */
var serialize = function (serializersNS, nodeFactory, values, objectStack, opt_keys, opt_this) {
    const length = (opt_keys !== undefined ? opt_keys : values).length;
    let value,
        node;
    for (let i = 0; i < length; ++i) {
        value = values[i];
        if (value !== undefined) {
            node = nodeFactory.call(opt_this !== undefined ? opt_this : this, value, objectStack,
                opt_keys !== undefined ? opt_keys[i] : undefined);
            if (node !== undefined) {
                serializersNS[node.namespaceURI][node.localName]
                    .call(opt_this, node, value, objectStack);
            }
        }
    }
}


/**
 * @private
 * @param {O} object Object.
 * @param {Object<string, Object<string, Serializer>>} serializersNS
 *     Namespaced serializers.
 * @param {function(this: T, *, Array<*>, (string|undefined)): (Node|undefined)} nodeFactory
 *     Node factory. The `nodeFactory` creates the node whose namespace and name
 *     will be used to choose a node writer from `serializersNS`. This
 *     separation allows us to decide what kind of node to create, depending on
 *     the value we want to serialize. An example for this would be different
 *     geometry writers based on the geometry type.
 * @param {Array<*>} values Values to serialize. An example would be an array
 *     of {@link module:ol/Feature~Feature} instances.
 * @param {Array<*>} objectStack Node stack.
 * @param {Array<string>=} opt_keys Keys of the `values`. Will be passed to the
 *     `nodeFactory`. This is used for serializing object literals where the
 *     node name relates to the property key. The array length of `opt_keys` has
 *     to match the length of `values`. For serializing a sequence, `opt_keys`
 *     determines the order of the sequence.
 * @param {T=} opt_this The object to use as `this` for the node factory and
 *     serializers.
 * @return {O|undefined} Object.
 * @template O, T
 */
var pushSerializeAndPop = function (object, serializersNS, nodeFactory, values, objectStack, opt_keys, opt_this) {
    objectStack.push(object);
    serialize(serializersNS, nodeFactory, values, objectStack, opt_keys, opt_this);
    return /** @type {O|undefined} */ (objectStack.pop());
}

export {
    DOCUMENT,
    XML_SCHEMA_INSTANCE_URI,
    createElementNS,
    getAllTextContent,
    getAllTextContent_,
    isDocument,
    isNode,
    getAttributeNS,
    parse,
    makeArrayExtender,
    makeArrayPusher,
    makeReplacer,
    makeObjectPropertyPusher,
    makeObjectPropertySetter,
    makeChildAppender,
    makeArraySerializer,
    makeSimpleNodeFactory,
    OBJECT_PROPERTY_NODE_FACTORY,
    makeSequence,
    makeStructureNS,
    parseNode,
    pushParseAndPop,
    serialize,
    pushSerializeAndPop
};

Zondy.xml.DOCUMENT = DOCUMENT;
Zondy.xml.XML_SCHEMA_INSTANCE_URI = XML_SCHEMA_INSTANCE_URI;
Zondy.xml.createElementNS = createElementNS;
Zondy.xml.getAllTextContent = getAllTextContent;
Zondy.xml.getAllTextContent_ = getAllTextContent_;
Zondy.xml.isDocument = isDocument;
Zondy.xml.isNode = isNode;
Zondy.xml.getAttributeNS = getAttributeNS;
Zondy.xml.parse = parse;
Zondy.xml.makeArrayExtender = makeArrayExtender;
Zondy.xml.makeArrayPusher = makeArrayPusher;
Zondy.xml.makeReplacer = makeReplacer;
Zondy.xml.makeObjectPropertyPusher = makeObjectPropertyPusher;
Zondy.xml.makeObjectPropertySetter = makeObjectPropertySetter;
Zondy.xml.makeChildAppender = makeChildAppender;
Zondy.xml.makeArraySerializer = makeArraySerializer;
Zondy.xml.makeSimpleNodeFactory = makeSimpleNodeFactory;
Zondy.xml.OBJECT_PROPERTY_NODE_FACTORY = OBJECT_PROPERTY_NODE_FACTORY;
Zondy.xml.makeSequence = makeSequence;
Zondy.xml.makeStructureNS = makeStructureNS;
Zondy.xml.parseNode = parseNode;
Zondy.xml.pushParseAndPop = pushParseAndPop;
Zondy.xml.serialize = serialize;
Zondy.xml.applyTransform = pushSerializeAndPop;