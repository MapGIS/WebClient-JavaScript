/**
 * Created by PRadostev on 10.06.2015.
 */

L.GML.FeatureType = L.Class.extend({
  options: {
    geometryField: 'Shape',
  },

  primitives: [
    {
      types: ['byte', 'decimal', 'int', 'integer', 'long', 'short'],
      parse: function (input) {
        return Number(input);
      }
    },
    {
      types: ['string'],
      parse: function (input) {
        return input;
      }
    },
    {
      types: ['boolean'],
      parse: function (input) {
        return input !== 'false';
      }
    },
    {
      types: ['date', 'time', 'datetime'],
      parse: function (input) {
        return new Date(input);
      }
    }
  ],

  initialize: function (options) {
    L.setOptions(this, options);

    this.fields = {};
  },

  appendField: function (name, type) {
    var that = this;
    this.primitives.forEach(function (primitive) {
      if (primitive.types.indexOf(type) !== -1) {
        that.fields[name] = primitive.parse;
      }
    });
  },

  parse: function (feature) {
    var properties = {};
    for (var i = 0; i < feature.childNodes.length; i++) {
      var node = feature.childNodes[i];
      if (node.nodeType !== document.ELEMENT_NODE) {
        continue;
      }

      var propertyName = node.tagName.split(':').pop();
      if (propertyName === this.options.geometryField) {
        continue;
      }

      var parseField = this.fields[propertyName];
      if (!parseField) {
        this.appendField(propertyName, "string");
        parseField = this.fields[propertyName];
      }

      properties[propertyName] = parseField(node.textContent);
    }

    return {
      type: 'Feature',
      properties: properties,
      id: feature.attributes['gml:id'].value
    };
  }
});
