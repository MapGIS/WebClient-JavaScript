import {
    Zondy
} from '../../common/Base';
import {readHref} from './XLink';
import XML from './XML';
import {readString} from './xsd';
import {
    makeObjectPropertyPusher,
    makeObjectPropertySetter,
    makeStructureNS,
    pushParseAndPop
}from './base/xml';

/**
 * @private
 * @const NAMESPACE_URIS 命名空间标识
 * @type {Array<null|string>}
 */
const NAMESPACE_URIS = [null, 'http://www.opengis.net/ows/1.1'];

/**
 * @private
 * @const PARSERS
 * @type {Object<string, Object<string>>}
 */
const PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'ServiceIdentification': makeObjectPropertySetter(readServiceIdentification),
        'ServiceProvider': makeObjectPropertySetter(readServiceProvider),
        'OperationsMetadata': makeObjectPropertySetter(readOperationsMetadata)
    });

/**
 * @private
 * @classdesc 用于读取OWS数据的类
 */
class OWS extends XML {
    constructor() {
        super();
    }

    /**
     * @private
     * @function Zondy.Format.OWS.prototype.readFromDocument
     * @description 从文档中读取信息，继承于父类XML
     * @return {owsObject|null}
     */
    readFromDocument(doc) {
        for (let n = doc.firstChild; n; n = n.nextSibling) {
            if (n.nodeType == Node.ELEMENT_NODE) {
                return this.readFromNode(n);
            }
        }
        return null;
    }

    /**
     * @private
     * @function Zondy.Format.OWS.prototype.readFromNode
     * @description 从文档节点中读取信息，继承于父类XML
     * @return {owsObject|null}
     */
    readFromNode(node) {
        const owsObject = pushParseAndPop({},
            PARSERS, node, []);
        return owsObject ? owsObject : null;
    }
}

/**
 * @private
 * @const ADDRESS_PARSERS
 * @type {Object<string, Object<string>>}
 */
const ADDRESS_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'DeliveryPoint': makeObjectPropertySetter(readString),
        'City': makeObjectPropertySetter(readString),
        'AdministrativeArea': makeObjectPropertySetter(readString),
        'PostalCode': makeObjectPropertySetter(readString),
        'Country': makeObjectPropertySetter(readString),
        'ElectronicMailAddress': makeObjectPropertySetter(readString)
    });

/**
 * @private
 * @const ALLOWED_VALUES_PARSERS
 * @type {Object<string, Object<string>>}
 */
const ALLOWED_VALUES_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Value': makeObjectPropertyPusher(readValue)
    });

/**
 * @private
 * @const CONSTRAINT_PARSERS
 * @type {Object<string, Object<string>>}
 */
const CONSTRAINT_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'AllowedValues': makeObjectPropertySetter(readAllowedValues)
    });

/**
 * @private
 * @const CONTACT_INFO_PARSERS
 * @type {Object<string, Object<string>>}
 */
const CONTACT_INFO_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Phone': makeObjectPropertySetter(readPhone),
        'Address': makeObjectPropertySetter(readAddress)
    });

/**
 * @private
 * @const DCP_PARSERS
 * @type {Object<string, Object<string>>}
 */
const DCP_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'HTTP': makeObjectPropertySetter(readHttp)
    });

/**
 * @private
 * @const HTTP_PARSERS
 * @type {Object<string, Object<string>>}
 */
const HTTP_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Get': makeObjectPropertyPusher(readGet),
        'Post': undefined // TODO
    });

/**
 * @private
 * @const OPERATION_PARSERS
 * @type {Object<string, Object<string>>}
 */
const OPERATION_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'DCP': makeObjectPropertySetter(readDcp)
    });

/**
 * @private
 * @const OPERATIONS_METADATA_PARSERS
 * @type {Object<string, Object<string>>}
 */
const OPERATIONS_METADATA_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Operation': readOperation
    });

/**
 * @private
 * @const PHONE_PARSERS
 * @type {Object<string, Object<string>>}
 */
const PHONE_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Voice': makeObjectPropertySetter(readString),
        'Facsimile': makeObjectPropertySetter(readString)
    });

/**
 * @private
 * @const REQUEST_METHOD_PARSERS
 * @type {Object<string, Object<string>>}
 */
const REQUEST_METHOD_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Constraint': makeObjectPropertyPusher(readConstraint)
    });

/**
 * @private
 * @const SERVICE_CONTACT_PARSERS
 * @type {Object<string, Object<string>>}
 */
const SERVICE_CONTACT_PARSERS =
    makeStructureNS(
        NAMESPACE_URIS, {
            'IndividualName': makeObjectPropertySetter(readString),
            'PositionName': makeObjectPropertySetter(readString),
            'ContactInfo': makeObjectPropertySetter(readContactInfo)
        });

/**
 * @private
 * @const SERVICE_IDENTIFICATION_PARSERS
 * @type {Object<string, Object<string>>}
 */
const SERVICE_IDENTIFICATION_PARSERS =
    makeStructureNS(
        NAMESPACE_URIS, {
            'Abstract': makeObjectPropertySetter(readString),
            'AccessConstraints': makeObjectPropertySetter(readString),
            'Fees': makeObjectPropertySetter(readString),
            'Title': makeObjectPropertySetter(readString),
            'ServiceTypeVersion': makeObjectPropertySetter(readString),
            'ServiceType': makeObjectPropertySetter(readString)
        });

/**
 * @private
 * @const SERVICE_PROVIDER_PARSERS
 * @type {Object<string, Object<string>>}
 */
const SERVICE_PROVIDER_PARSERS =
    makeStructureNS(
        NAMESPACE_URIS, {
            'ProviderName': makeObjectPropertySetter(readString),
            'ProviderSite': makeObjectPropertySetter(readHref),
            'ServiceContact': makeObjectPropertySetter(readServiceContact)
        });

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readAddress
 * @description 读取Address
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The address.
 */
function readAddress(node, objectStack) {
    return pushParseAndPop({},
        ADDRESS_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readAllowedValues
 * @description 读取AllowedValues
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The values.
 */
function readAllowedValues(node, objectStack) {
    return pushParseAndPop({},
        ALLOWED_VALUES_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readConstraint
 * @description 读取Constraint
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The constraint.
 */
function readConstraint(node, objectStack) {
    const name = node.getAttribute('name');
    if (!name) {
        return undefined;
    }
    return pushParseAndPop({
            'name': name
        },
        CONSTRAINT_PARSERS, node,
        objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readContactInfo
 * @description 读取ContactInfo
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The contact info.
 */
function readContactInfo(node, objectStack) {
    return pushParseAndPop({},
        CONTACT_INFO_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readDcp
 * @description 读取Dcp
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The DCP.
 */
function readDcp(node, objectStack) {
    return pushParseAndPop({},
        DCP_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readGet
 * @description 读取Get
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The GET object.
 */
function readGet(node, objectStack) {
    const href = readHref(node);
    if (!href) {
        return undefined;
    }
    return pushParseAndPop({
            'href': href
        },
        REQUEST_METHOD_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readHttp
 * @description 读取Http
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The HTTP object.
 */
function readHttp(node, objectStack) {
    return pushParseAndPop({}, HTTP_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readOperation
 * @description 读取Operation
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The operation.
 */
function readOperation(node, objectStack) {
    const name = node.getAttribute('name');
    const value = pushParseAndPop({},
        OPERATION_PARSERS, node, objectStack);
    if (!value) {
        return undefined;
    }
    const object = /** @type {Object} */
        (objectStack[objectStack.length - 1]);
    object[name] = value;
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readOperationsMetadata
 * @description 读取OperationsMetadata
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The operations metadata.
 */
function readOperationsMetadata(node, objectStack) {
    return pushParseAndPop({},
        OPERATIONS_METADATA_PARSERS, node,
        objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readPhone
 * @description 读取Phone
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The phone.
 */
function readPhone(node, objectStack) {
    return pushParseAndPop({},
        PHONE_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readServiceIdentification
 * @description 读取ServiceIdentification
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The service identification.
 */
function readServiceIdentification(node, objectStack) {
    return pushParseAndPop({}, SERVICE_IDENTIFICATION_PARSERS, node,
        objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readServiceContact
 * @description 读取ServiceContact
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The service contact.
 */
function readServiceContact(node, objectStack) {
    return pushParseAndPop({}, SERVICE_CONTACT_PARSERS, node,
        objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readServiceProvider
 * @description 读取ServiceProvider
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} The service provider.
 */
function readServiceProvider(node, objectStack) {
    return pushParseAndPop({}, SERVICE_PROVIDER_PARSERS, node,
        objectStack);
}

/**
 * @private
 * @function Zondy.Format.OWS.prototype.readValue
 * @description 读取Value
 * @param {Node} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {string|undefined} The value.
 */
function readValue(node, objectStack) {
    return readString(node);
}

export default OWS;
Zondy.Format.OWS = OWS;