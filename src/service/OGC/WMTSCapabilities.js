import {
  Zondy
} from '../common/Base';
import {
  boundingExtent
} from './util/extent';
import OWS from './util/OWS';
import {
  readHref
} from './util/XLink';
import XML from './util/XML';
import {
  readString,
  readNonNegativeInteger,
  readDecimal
} from './util/xsd';
import {
  pushParseAndPop,
  makeStructureNS,
  makeObjectPropertySetter,
  makeObjectPropertyPusher,
  makeArrayPusher
} from './util/base/xml';

/**
 * @private
 * @const NAMESPACE_URIS 命名空间标识符
 * @type {Array<null|string>}
 */
const NAMESPACE_URIS = [
  null,
  'http://www.opengis.net/wmts/1.0'
];

/**
 * @private
 * @const OWS_NAMESPACE_URIS OWS命名空间标识符
 * @type {Array<null|string>}
 */
const OWS_NAMESPACE_URIS = [
  null,
  'http://www.opengis.net/ows/1.1'
];

/**
 * @private
 * @const PARSERS
 * @type {Object<string, Object<string>>}
 */
const PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'Contents': makeObjectPropertySetter(readContents)
  });

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Format.WMTSCapabilities
 * @classdesc  用于读取WMTS capabilities数据的类
 * @extends  Zondy.Format.XML
 * @example
 * var parser = new Zondy.Format.WMTSCapabilities();
 * var result = parser.read(doc);
 */
class WMTSCapabilities extends XML {
  constructor() {
    super();

      /**
       * @private
       * @member Zondy.Format.WMTSCapabilities.prototype.owsParser_
       * @type {OWS}
       */
    this.owsParser_ = new OWS();
  }

    /**
     * @private
     * @function Zondy.Format.WMTSCapabilities.prototype.readFromDocument
     * @description 从文档中读取信息，继承于父类XML
     * @return {WMTSCapabilityObject|null}
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
     * @function Zondy.Format.WMTSCapabilities.prototype.readFromNode
     * @description 从文档节点中读取信息，继承于父类XML
     * @return {WMTSCapabilityObject|null}
     */
  readFromNode(node) {
    const version = node.getAttribute('version').trim();
    let WMTSCapabilityObject = this.owsParser_.readFromNode(node);
    if (!WMTSCapabilityObject) {
      return null;
    }
    WMTSCapabilityObject['version'] = version;
    WMTSCapabilityObject = pushParseAndPop(WMTSCapabilityObject, PARSERS, node, []);
    return WMTSCapabilityObject ? WMTSCapabilityObject : null;
  }
}

/**
 * @private
 * @const CONTENTS_PARSERS
 * @type {Object<string, Object<string>>}
 */
const CONTENTS_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'Layer': makeObjectPropertyPusher(readLayer),
    'TileMatrixSet': makeObjectPropertyPusher(readTileMatrixSet)
  });

/**
 * @private
 * @const LAYER_PARSERS
 * @type {Object<string, Object<string>>}
 */
const LAYER_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'Style': makeObjectPropertyPusher(readStyle),
    'Format': makeObjectPropertyPusher(readString),
    'TileMatrixSetLink': makeObjectPropertyPusher(readTileMatrixSetLink),
    'Dimension': makeObjectPropertyPusher(readDimensions),
    'ResourceURL': makeObjectPropertyPusher(readResourceUrl)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'Title': makeObjectPropertySetter(readString),
    'Abstract': makeObjectPropertySetter(readString),
    'BoundingBox': makeObjectPropertySetter(readBoundingBox),
    'WGS84BoundingBox': makeObjectPropertySetter(readBoundingBox),
    'Identifier': makeObjectPropertySetter(readString)
  }));

/**
 * @private
 * @const STYLE_PARSERS
 * @type {Object<string, Object<string>>}
 */
const STYLE_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'LegendURL': makeObjectPropertyPusher(readLegendUrl)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'Title': makeObjectPropertySetter(readString),
    'Identifier': makeObjectPropertySetter(readString)
  }));

/**
 * @private
 * @const TMS_LINKS_PARSERS
 * @type {Object<string, Object<string>>}
 */
const TMS_LINKS_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'TileMatrixSet': makeObjectPropertySetter(readString),
    'TileMatrixSetLimits': makeObjectPropertySetter(readTileMatrixLimitsList)
  });

/**
 * @private
 * @const TMS_LIMITS_LIST_PARSERS
 * @type {Object<string, Object<string>>}
 */
const TMS_LIMITS_LIST_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'TileMatrixLimits': makeArrayPusher(readTileMatrixLimits)
  });

/**
 * @private
 * @const TMS_LIMITS_PARSERS
 * @type {Object<string, Object<string>>}
 */
const TMS_LIMITS_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'TileMatrix': makeObjectPropertySetter(readString),
    'MinTileRow': makeObjectPropertySetter(readNonNegativeInteger),
    'MaxTileRow': makeObjectPropertySetter(readNonNegativeInteger),
    'MinTileCol': makeObjectPropertySetter(readNonNegativeInteger),
    'MaxTileCol': makeObjectPropertySetter(readNonNegativeInteger)
  });

/**
 * @private
 * @const DIMENSION_PARSERS
 * @type {Object<string, Object<string>>}
 */
const DIMENSION_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'Default': makeObjectPropertySetter(readString),
    'Value': makeObjectPropertyPusher(readString)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'Identifier': makeObjectPropertySetter(readString)
  }));

/**
 * @private
 * @const BBOX_READERS
 * @type {Object<string, Object<string>>}
 */
const BBOX_READERS = makeStructureNS(
  OWS_NAMESPACE_URIS, {
    'LowerCorner': makeArrayPusher(readCoordinates),
    'UpperCorner': makeArrayPusher(readCoordinates)
  });

/**
 * @private
 * @const TMS_PARSERS
 * @type {Object<string, Object<string>>}
 */
const TMS_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'WellKnownScaleSet': makeObjectPropertySetter(readString),
    'TileMatrix': makeObjectPropertyPusher(readTileMatrix)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'SupportedCRS': makeObjectPropertySetter(readString),
    'Identifier': makeObjectPropertySetter(readString)
  }));

/**
 * @private
 * @const TM_PARSERS
 * @type {Object<string, Object<string>>}
 */
const TM_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'TopLeftCorner': makeObjectPropertySetter(readCoordinates),
    'ScaleDenominator': makeObjectPropertySetter(readDecimal),
    'TileWidth': makeObjectPropertySetter(readNonNegativeInteger),
    'TileHeight': makeObjectPropertySetter(readNonNegativeInteger),
    'MatrixWidth': makeObjectPropertySetter(readNonNegativeInteger),
    'MatrixHeight': makeObjectPropertySetter(readNonNegativeInteger)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'Identifier': makeObjectPropertySetter(readString)
  }));

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readContents
 * @description 读取Contents
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Attribution对象.
 */
function readContents(node, objectStack) {
  return pushParseAndPop({}, CONTENTS_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readLayer
 * @description 读取Layer
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Layer对象.
 */
function readLayer(node, objectStack) {
  return pushParseAndPop({}, LAYER_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readTileMatrixSet
 * @description 读取TileMatrixSet
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Tile Matrix Set 对象.
 */
function readTileMatrixSet(node, objectStack) {
  return pushParseAndPop({}, TMS_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readStyle
 * @description 读取Style
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Style 对象.
 */
function readStyle(node, objectStack) {
  const style = pushParseAndPop({}, STYLE_PARSERS, node, objectStack);
  if (!style) {
    return undefined;
  }
  const isDefault = node.getAttribute('isDefault') === 'true';
  style['isDefault'] = isDefault;
  return style;

}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readTileMatrixSetLink
 * @description 读取TileMatrixSetLink
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Tile Matrix Set Link 对象.
 */
function readTileMatrixSetLink(node, objectStack) {
  return pushParseAndPop({}, TMS_LINKS_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readDimensions
 * @description 读取Dimensions
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Dimension 对象.
 */
function readDimensions(node, objectStack) {
  return pushParseAndPop({}, DIMENSION_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readResourceUrl
 * @description 读取ResourceUrl
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Resource URL 对象.
 */
function readResourceUrl(node, objectStack) {
  const format = node.getAttribute('format');
  const template = node.getAttribute('template');
  const resourceType = node.getAttribute('resourceType');
  const resource = {};
  if (format) {
    resource['format'] = format;
  }
  if (template) {
    resource['template'] = template;
  }
  if (resourceType) {
    resource['resourceType'] = resourceType;
  }
  return resource;
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readBoundingBox
 * @description 读取BoundingBox和Wgs84BoundingBox
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} BBox对象.
 */
function readBoundingBox(node, objectStack) {
  const coordinates = pushParseAndPop([], BBOX_READERS, node, objectStack);
  if (coordinates.length != 2) {
    return undefined;
  }
  return boundingExtent(coordinates);
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readLegendUrl
 * @description 读取LegendUrl
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Legend对象.
 */
function readLegendUrl(node, objectStack) {
  const legend = {};
  legend['format'] = node.getAttribute('format');
  legend['href'] = readHref(node);
  return legend;
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readCoordinates
 * @description 读取Coordinates
 * @param {Node} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} Coordinates对象.
 */
function readCoordinates(node, objectStack) {
  const coordinates = readString(node).split(/\s+/);
  if (!coordinates || coordinates.length != 2) {
    return undefined;
  }
  const x = +coordinates[0];
  const y = +coordinates[1];
  if (isNaN(x) || isNaN(y)) {
    return undefined;
  }
  return [x, y];
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readTileMatrix
 * @description 读取TileMatrix
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} TileMatrix对象.
 */
function readTileMatrix(node, objectStack) {
  return pushParseAndPop({}, TM_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readTileMatrixLimitsList
 * @description 读取TileMatrixLimitsList
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} TileMatrixSetLimits对象.
 */
function readTileMatrixLimitsList(node, objectStack) {
  return pushParseAndPop([], TMS_LIMITS_LIST_PARSERS, node, objectStack);
}

/**
 * @private
 * @function Zondy.Format.WMTSCapabilities.prototype.readTileMatrixLimits
 * @description 读取TileMatrixLimits
 * @param {Element} node 节点.
 * @param {Array<*>} objectStack 对象堆栈.
 * @return {Object|undefined} TileMatrixLimits Array.
 */
function readTileMatrixLimits(node, objectStack) {
  return pushParseAndPop({}, TMS_LIMITS_PARSERS, node, objectStack);
}

export {
  WMTSCapabilities
};
Zondy.Format.WMTSCapabilities = WMTSCapabilities;
