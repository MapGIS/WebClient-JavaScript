L.Filter.DistanceBuffer = L.Filter.Abstract.extend({
  initialize: function (propertyName, geometry, crs, distance, units) {
    this.propertyName = propertyName;
    this.geomerty = geometry;
    this.crs = crs;
    this.distance = distance;
    this.units = units;
  },

  buildFilterContent: function (filterElement) {
    filterElement.appendChild(L.Filter.propertyName(this.propertyName));
    filterElement.appendChild(this.geomerty.toGml(this.crs));
    filterElement.appendChild(L.XmlUtil.createElementNS('ogc:Distance', { 'units': this.units }, { value: this.distance }));
  }
});
