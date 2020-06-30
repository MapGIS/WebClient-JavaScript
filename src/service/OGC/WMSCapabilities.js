import {
    Zondy
} from '../common/Base';
import {
    readHref
} from './util/XLink';
import XML from './util/XML';
import {
    readDecimalString,
    readString,
    readNonNegativeInteger,
    readDecimal,
    readBooleanString,
    readNonNegativeIntegerString
} from './util/xsd';
import {
    makeArrayPusher,
    makeObjectPropertyPusher,
    makeObjectPropertySetter,
    makeStructureNS,
    pushParseAndPop
} from './util/base/xml';

/**
 * @private
 * @const NAMESPACE_URIS 命名空间标识符
 * @type {Array<null|string>}
 */
const NAMESPACE_URIS = [
    null,
    'http://www.opengis.net/wms'
];

/**
 * @private
 * @const PARSERS
 * @type {Object<string, Object<string>>}
 */
const PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Service': makeObjectPropertySetter(readService),
        'Capability': makeObjectPropertySetter(readCapability)
    });

/**
 * @private
 * @const CAPABILITY_PARSERS
 * @type {Object<string, Object<string>>}
 */
const CAPABILITY_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Request': makeObjectPropertySetter(readRequest),
        'Exception': makeObjectPropertySetter(readException),
        'Layer': makeObjectPropertySetter(readCapabilityLayer)
    });

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Format.WMSCapabilities
 * @classdesc  用于读取WMS capabilities数据的类
 * @extends  Zondy.Format.XML
 * @example
 * var parser = new Zondy.Format.WMSCapabilities();
 * var result = parser.read(doc);
 */
class WMSCapabilities extends XML {
    constructor() {
        super();

        /**
         * @private
         * @member Zondy.Format.WMSCapabilities.prototype.version
         * @type {string|undefined}
         * @description 版本号
         * @default undefined
         */
        this.version = undefined;
    }

    /**
     * @private
     * @function Zondy.Format.WMSCapabilities.prototype.readFromDocument
     * @description 从文档中读取信息，继承于父类XML
     * @return {wmsCapabilityObject|null}
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
     * @function Zondy.Format.WMSCapabilities.prototype.readFromNode
     * @description 从文档节点中读取信息，继承于父类XML
     * @return {wmsCapabilityObject|null}
     */
    readFromNode(node) {
        this.version = node.getAttribute('version').trim();
        const wmsCapabilityObject = pushParseAndPop({
            'version': this.version
        }, PARSERS, node, []);
        return wmsCapabilityObject ? wmsCapabilityObject : null;
    }
}

/**
 * @private
 * @const SERVICE_PARSERS
 * @type {Object<string, Object<string>>}
 */
const SERVICE_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Name': makeObjectPropertySetter(readString),
        'Title': makeObjectPropertySetter(readString),
        'Abstract': makeObjectPropertySetter(readString),
        'KeywordList': makeObjectPropertySetter(readKeywordList),
        'OnlineResource': makeObjectPropertySetter(readHref),
        'ContactInformation': makeObjectPropertySetter(readContactInformation),
        'Fees': makeObjectPropertySetter(readString),
        'AccessConstraints': makeObjectPropertySetter(readString),
        'LayerLimit': makeObjectPropertySetter(readNonNegativeInteger),
        'MaxWidth': makeObjectPropertySetter(readNonNegativeInteger),
        'MaxHeight': makeObjectPropertySetter(readNonNegativeInteger)
    });

/**
 * @private
 * @const CONTACT_INFORMATION_PARSERS
 * @type {Object<string, Object<string>>}
 */
const CONTACT_INFORMATION_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'ContactPersonPrimary': makeObjectPropertySetter(readContactPersonPrimary),
        'ContactPosition': makeObjectPropertySetter(readString),
        'ContactAddress': makeObjectPropertySetter(readContactAddress),
        'ContactVoiceTelephone': makeObjectPropertySetter(readString),
        'ContactFacsimileTelephone': makeObjectPropertySetter(readString),
        'ContactElectronicMailAddress': makeObjectPropertySetter(readString)
    });

/**
 * @private
 * @const CONTACT_PERSON_PARSERS
 * @type {Object<string, Object<string>>}
 */
const CONTACT_PERSON_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'ContactPerson': makeObjectPropertySetter(readString),
        'ContactOrganization': makeObjectPropertySetter(readString)
    });

/**
 * @private
 * @const CONTACT_ADDRESS_PARSERS
 * @type {Object<string, Object<string>>}
 */
const CONTACT_ADDRESS_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'AddressType': makeObjectPropertySetter(readString),
        'Address': makeObjectPropertySetter(readString),
        'City': makeObjectPropertySetter(readString),
        'StateOrProvince': makeObjectPropertySetter(readString),
        'PostCode': makeObjectPropertySetter(readString),
        'Country': makeObjectPropertySetter(readString)
    });

/**
 * @private
 * @const EXCEPTION_PARSERS
 * @type {Object<string, Object<string>>}
 */
const EXCEPTION_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Format': makeArrayPusher(readString)
    });

/**
 * @private
 * @const LAYER_PARSERS
 * @type {Object<string, Object<string>>}
 */
const LAYER_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Name': makeObjectPropertySetter(readString),
        'Title': makeObjectPropertySetter(readString),
        'Abstract': makeObjectPropertySetter(readString),
        'KeywordList': makeObjectPropertySetter(readKeywordList),
        'SRS': makeObjectPropertyPusher(readString),
        'EX_GeographicBoundingBox': makeObjectPropertySetter(readEXGeographicBoundingBox),
        'BoundingBox': makeObjectPropertyPusher(readBoundingBox),
        'Dimension': makeObjectPropertyPusher(readDimension),
        'Attribution': makeObjectPropertySetter(readAttribution),
        'AuthorityURL': makeObjectPropertyPusher(readAuthorityURL),
        'Identifier': makeObjectPropertyPusher(readString),
        'MetadataURL': makeObjectPropertyPusher(readMetadataURL),
        'DataURL': makeObjectPropertyPusher(readFormatOnlineresource),
        'FeatureListURL': makeObjectPropertyPusher(readFormatOnlineresource),
        'Style': makeObjectPropertyPusher(readStyle),
        'MinScaleDenominator': makeObjectPropertySetter(readDecimal),
        'MaxScaleDenominator': makeObjectPropertySetter(readDecimal),
        'Layer': makeObjectPropertyPusher(readLayer)
    });

/**
 * @private
 * @const ATTRIBUTION_PARSERS
 * @type {Object<string, Object<string>>}
 */
const ATTRIBUTION_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Title': makeObjectPropertySetter(readString),
        'OnlineResource': makeObjectPropertySetter(readHref),
        'LogoURL': makeObjectPropertySetter(readSizedFormatOnlineresource)
    });

/**
 * @private
 * @const EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS
 * @type {Object<string, Object<string>>}
 */
const EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS =
    makeStructureNS(NAMESPACE_URIS, {
        'westBoundLongitude': makeObjectPropertySetter(readDecimal),
        'eastBoundLongitude': makeObjectPropertySetter(readDecimal),
        'southBoundLatitude': makeObjectPropertySetter(readDecimal),
        'northBoundLatitude': makeObjectPropertySetter(readDecimal)
    });

/**
 * @private
 * @const REQUEST_PARSERS
 * @type {Object<string, Object<string>>}
 */
const REQUEST_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'GetCapabilities': makeObjectPropertySetter(readOperationType),
        'GetMap': makeObjectPropertySetter(readOperationType),
        'GetFeatureInfo': makeObjectPropertySetter(readOperationType)
    });

/**
 * @private
 * @const OPERATIONTYPE_PARSERS
 * @type {Object<string, Object<string>>}
 */
const OPERATIONTYPE_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Format': makeObjectPropertyPusher(readString),
        'DCPType': makeObjectPropertyPusher(readDCPType)
    });

/**
 * @private
 * @const DCPTYPE_PARSERS
 * @type {Object<string, Object<string>>}
 */
const DCPTYPE_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'HTTP': makeObjectPropertySetter(readHTTP)
    });

/**
 * @private
 * @const HTTP_PARSERS
 * @type {Object<string, Object<string>>}
 */
const HTTP_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Get': makeObjectPropertySetter(readFormatOnlineresource),
        'Post': makeObjectPropertySetter(readFormatOnlineresource)
    });

/**
 * @private
 * @const STYLE_PARSERS
 * @type {Object<string, Object<string>>}
 */
const STYLE_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Name': makeObjectPropertySetter(readString),
        'Title': makeObjectPropertySetter(readString),
        'Abstract': makeObjectPropertySetter(readString),
        'LegendURL': makeObjectPropertyPusher(readSizedFormatOnlineresource),
        'StyleSheetURL': makeObjectPropertySetter(readFormatOnlineresource),
        'StyleURL': makeObjectPropertySetter(readFormatOnlineresource)
    });

/**
 * @private
 * @const FORMAT_ONLINERESOURCE_PARSERS
 * @type {Object<string, Object<string>>}
 */
const FORMAT_ONLINERESOURCE_PARSERS =
    makeStructureNS(NAMESPACE_URIS, {
        'Format': makeObjectPropertySetter(readString),
        'OnlineResource': makeObjectPropertySetter(readHref)
    });

/**
 * @private
 * @const KEYWORDLIST_PARSERS
 * @type {Object<string, Object<string>>}
 */
const KEYWORDLIST_PARSERS = makeStructureNS(
    NAMESPACE_URIS, {
        'Keyword': makeArrayPusher(readString)
    });

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readAttribution
 * @description 读取属性信息
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} 属性对象.
 */
function readAttribution(node, objectStack) {
    return pushParseAndPop({}, ATTRIBUTION_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readBoundingBox
 * @description 读取地图坐标系信息，包括地理坐标系名，范围，分辨率
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object} 地图范围对象.
 */
function readBoundingBox(node, objectStack) {
    const extent = [
        readDecimalString(node.getAttribute('minx')),
        readDecimalString(node.getAttribute('miny')),
        readDecimalString(node.getAttribute('maxx')),
        readDecimalString(node.getAttribute('maxy'))
    ];

    const resolutions = [
        readDecimalString(node.getAttribute('resx')),
        readDecimalString(node.getAttribute('resy'))
    ];

    return {
        'srs': node.getAttribute('SRS'),
        'extent': extent,
        'res': resolutions
    };
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readEXGeographicBoundingBox
 * @description 读取地理坐标范围
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object} 地理坐标范围对象.
 */
function readEXGeographicBoundingBox(node, objectStack) {
    const geographicBoundingBox = pushParseAndPop({},
        EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS,
        node, objectStack);
    if (!geographicBoundingBox) {
        return undefined;
    }
    const westBoundLongitude = geographicBoundingBox['westBoundLongitude'];
    const southBoundLatitude = geographicBoundingBox['southBoundLatitude'];
    const eastBoundLongitude = geographicBoundingBox['eastBoundLongitude'];
    const northBoundLatitude = geographicBoundingBox['northBoundLatitude'];
    if (westBoundLongitude === undefined || southBoundLatitude === undefined ||
        eastBoundLongitude === undefined || northBoundLatitude === undefined) {
        return undefined;
    }
    return [
        westBoundLongitude, southBoundLatitude,
        eastBoundLongitude, northBoundLatitude
    ];
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readCapability
 * @description 读取Capability
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Capability对象.
 */
function readCapability(node, objectStack) {
    return pushParseAndPop({}, CAPABILITY_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readService
 * @description 读取Service
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Service对象.
 */
function readService(node, objectStack) {
    return pushParseAndPop({}, SERVICE_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readContactInformation
 * @description 读取ContactInformation
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Contact information 对象.
 */
function readContactInformation(node, objectStack) {
    return pushParseAndPop({}, CONTACT_INFORMATION_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readContactPersonPrimary
 * @description 读取ContactPersonPrimary
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Contact person 对象.
 */
function readContactPersonPrimary(node, objectStack) {
    return pushParseAndPop({}, CONTACT_PERSON_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readContactAddress
 * @description 读取ContactAddress
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Contact address对象.
 */
function readContactAddress(node, objectStack) {
    return pushParseAndPop({}, CONTACT_ADDRESS_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readException
 * @description 读取Exception
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Array<string>|undefined} Format array.
 */
function readException(node, objectStack) {
    return pushParseAndPop([], EXCEPTION_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readCapabilityLayer
 * @description 读取CapabilityLayer
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Layer对象.
 */
function readCapabilityLayer(node, objectStack) {
    return pushParseAndPop({}, LAYER_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readLayer
 * @description 读取Layer
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Layer对象.
 */
function readLayer(node, objectStack) {
    const parentLayerObject = (objectStack[objectStack.length - 1]);

    const layerObject = pushParseAndPop({}, LAYER_PARSERS, node, objectStack);

    if (!layerObject) {
        return undefined;
    }
    let queryable = readBooleanString(node.getAttribute('queryable'));
    if (queryable === undefined) {
        queryable = parentLayerObject['queryable'];
    }
    layerObject['queryable'] = queryable !== undefined ? queryable : false;

    let cascaded = readNonNegativeIntegerString(
        node.getAttribute('cascaded'));
    if (cascaded === undefined) {
        cascaded = parentLayerObject['cascaded'];
    }
    layerObject['cascaded'] = cascaded;

    let opaque = readBooleanString(node.getAttribute('opaque'));
    if (opaque === undefined) {
        opaque = parentLayerObject['opaque'];
    }
    layerObject['opaque'] = opaque !== undefined ? opaque : false;

    let noSubsets = readBooleanString(node.getAttribute('noSubsets'));
    if (noSubsets === undefined) {
        noSubsets = parentLayerObject['noSubsets'];
    }
    layerObject['noSubsets'] = noSubsets !== undefined ? noSubsets : false;

    let fixedWidth = readDecimalString(node.getAttribute('fixedWidth'));
    if (!fixedWidth) {
        fixedWidth = parentLayerObject['fixedWidth'];
    }
    layerObject['fixedWidth'] = fixedWidth;

    let fixedHeight = readDecimalString(node.getAttribute('fixedHeight'));
    if (!fixedHeight) {
        fixedHeight = parentLayerObject['fixedHeight'];
    }
    layerObject['fixedHeight'] = fixedHeight;

    // See 7.2.4.8
    const addKeys = ['Style', 'SRS', 'AuthorityURL'];
    addKeys.forEach(function (key) {
        if (key in parentLayerObject) {
            const childValue = layerObject[key] || [];
            layerObject[key] = childValue.concat(parentLayerObject[key]);
        }
    });

    const replaceKeys = ['EX_GeographicBoundingBox', 'BoundingBox', 'Dimension',
        'Attribution', 'MinScaleDenominator', 'MaxScaleDenominator'
    ];
    replaceKeys.forEach(function (key) {
        if (!(key in layerObject)) {
            const parentValue = parentLayerObject[key];
            layerObject[key] = parentValue;
        }
    });

    return layerObject;
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readDimension
 * @description 读取Dimension
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object} Dimension对象.
 */
function readDimension(node, objectStack) {
    const dimensionObject = {
        'name': node.getAttribute('name'),
        'units': node.getAttribute('units'),
        'unitSymbol': node.getAttribute('unitSymbol'),
        'default': node.getAttribute('default'),
        'multipleValues': readBooleanString(node.getAttribute('multipleValues')),
        'nearestValue': readBooleanString(node.getAttribute('nearestValue')),
        'current': readBooleanString(node.getAttribute('current')),
        'values': readString(node)
    };
    return dimensionObject;
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readFormatOnlineresource
 * @description 读取FormatOnlineresource
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Online resource对象.
 */
function readFormatOnlineresource(node, objectStack) {
    return pushParseAndPop({}, FORMAT_ONLINERESOURCE_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readRequest
 * @description 读取Request
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Request对象.
 */
function readRequest(node, objectStack) {
    return pushParseAndPop({}, REQUEST_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readDCPType
 * @description 读取DCPType
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} DCP type对象.
 */
function readDCPType(node, objectStack) {
    return pushParseAndPop({}, DCPTYPE_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readHTTP
 * @description 读取HTTP
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} HTTP对象.
 */
function readHTTP(node, objectStack) {
    return pushParseAndPop({}, HTTP_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readOperationType
 * @description 读取OperationType
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Operation type对象.
 */
function readOperationType(node, objectStack) {
    return pushParseAndPop({}, OPERATIONTYPE_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readSizedFormatOnlineresource
 * @description 读取SizedFormatOnlineresource
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Online resource对象.
 */
function readSizedFormatOnlineresource(node, objectStack) {
    const formatOnlineresource = readFormatOnlineresource(node, objectStack);
    if (formatOnlineresource) {
        const size = [
            readNonNegativeIntegerString(node.getAttribute('width')),
            readNonNegativeIntegerString(node.getAttribute('height'))
        ];
        formatOnlineresource['size'] = size;
        return formatOnlineresource;
    }
    return undefined;
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readAuthorityURL
 * @description 读取AuthorityURL
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Authority URL对象.
 */
function readAuthorityURL(node, objectStack) {
    const authorityObject = readFormatOnlineresource(node, objectStack);
    if (authorityObject) {
        authorityObject['name'] = node.getAttribute('name');
        return authorityObject;
    }
    return undefined;
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readMetadataURL
 * @description 读取MetadataURL
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Metadata URL对象.
 */
function readMetadataURL(node, objectStack) {
    const metadataObject = readFormatOnlineresource(node, objectStack);
    if (metadataObject) {
        metadataObject['type'] = node.getAttribute('type');
        return metadataObject;
    }
    return undefined;
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readStyle
 * @description 读取Style
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Style对象.
 */
function readStyle(node, objectStack) {
    return pushParseAndPop({}, STYLE_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMSCapabilities.prototype.readKeywordList
 * @description 读取KeywordList
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Array<string>|undefined} Keyword list.
 */
function readKeywordList(node, objectStack) {
    return pushParseAndPop([], KEYWORDLIST_PARSERS, node, objectStack);
}

export {
    WMSCapabilities
};
Zondy.Format.WMSCapabilities = WMSCapabilities;