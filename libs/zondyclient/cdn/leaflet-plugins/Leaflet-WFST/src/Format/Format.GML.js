/**
 * Created by PRadostev on 30.01.2015.
 */


L.Format.GML = L.Format.Base.extend({

  includes: L.GML.ParserContainerMixin,

  initialize: function (options) {
    L.Format.Base.prototype.initialize.call(this, options);
    this.outputFormat = 'text/xml; subtype=gml/3.1.1';
    this.initializeParserContainer();
    this.appendParser(new L.GML.Point());
    this.appendParser(new L.GML.LineString());
    this.appendParser(new L.GML.Polygon());
    this.appendParser(new L.GML.MultiLineString());
    this.appendParser(new L.GML.MultiPolygon());
    this.appendParser(new L.GML.MultiCurve());
    this.appendParser(new L.GML.MultiSurface());
    this.appendParser(new L.GML.MultiPoint());
  },

  responseToLayers: function (rawData) {
    var layers = [];
    var xmlDoc = L.XmlUtil.parseXml(rawData);
    var featureCollection = xmlDoc.documentElement;
    var featureMemberNodes = featureCollection.getElementsByTagNameNS(L.XmlUtil.namespaces.gml, 'featureMember');
    for (var i = 0; i < featureMemberNodes.length; i++) {
      var feature = featureMemberNodes[i].firstChild;
      layers.push(this.processFeature(feature));
    }

    var featureMembersNode = featureCollection.getElementsByTagNameNS(L.XmlUtil.namespaces.gml, 'featureMembers');
    if (featureMembersNode.length > 0) {
      var features = featureMembersNode[0].childNodes;
      for (var j = 0; j < features.length; j++) {
        var node = features[j];
        if (node.nodeType === document.ELEMENT_NODE) {
          layers.push(this.processFeature(node));
        }
      }
    }

    return layers;
  },

  processFeature: function (feature) {
    var layer = this.generateLayer(feature);
    layer.feature = this.featureType.parse(feature);
    return layer;
  },

  generateLayer: function (feature) {
    var geometryField = feature.getElementsByTagNameNS(this.namespaceUri, this.options.geometryField)[0];
    if (!geometryField) {
      throw new Error(
        'Geometry field \'' +
        this.options.geometryField +
        '\' doesn\' exist inside received feature: \'' +
        feature.innerHTML +
        '\'');
    }

    return this.parseElement(geometryField.firstChild, this.options);
  }
});
