L.Filter.BBox = L.Filter.Abstract.extend({
  tagName: 'ogc:BBOX',

  geometryField: null,

  bbox: null,

  crs: null,

  initialize: function (geometryField, bbox, crs) {
    this.bbox = bbox;
    this.geometryField = geometryField;
    this.crs = crs;
  },

  buildFilterContent: function (filterElement) {
    if (this.geometryField) {
      filterElement.appendChild(L.Filter.propertyName(this.geometryField));
    }

    filterElement.appendChild(this.bbox.toGml(this.crs));
  }
});

L.Filter.bbox = function (geometryField, bbox, crs) {
  return new L.Filter.BBox(geometryField, bbox, crs);
};
