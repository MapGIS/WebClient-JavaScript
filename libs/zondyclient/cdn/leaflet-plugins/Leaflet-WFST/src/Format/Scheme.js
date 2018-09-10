/**
 * Created by PRadostev on 10.06.2015.
 */

L.Format.Scheme = L.Class.extend({
  options: {
    geometryField: 'Shape',
  },

  initialize: function (options) {
    L.setOptions(this, options);
  },

  parse: function (element) {
    var featureType = new L.GML.FeatureType({
      geometryField: this.options.geometryField
    });
    var complexTypeDefinition = element.getElementsByTagNameNS(L.XmlUtil.namespaces.xsd, 'complexType')[0];
    var properties = complexTypeDefinition.getElementsByTagNameNS(L.XmlUtil.namespaces.xsd, 'sequence')[0];
    for (var i = 0; i < properties.childNodes.length; i++) {
      var node = properties.childNodes[i];
      if (node.nodeType !== document.ELEMENT_NODE) {
        continue;
      }

      var propertyAttr = node.attributes.name;
      if (!propertyAttr) {
        continue;
      }

      var propertyName = node.attributes.name.value;
      if (propertyName === this.options.geometryField) {
        continue;
      }

      var typeAttr = node.attributes.type;
      if (!typeAttr) {
        var restriction = node.getElementsByTagNameNS(L.XmlUtil.namespaces.xsd, 'restriction');
        typeAttr = restriction.attributes.base;
      }

      if (!typeAttr) {
        continue;
      }

      var typeName = typeAttr.value.split(':').pop();

      featureType.appendField(propertyName, typeName);
    }

    return featureType;
  }
});
