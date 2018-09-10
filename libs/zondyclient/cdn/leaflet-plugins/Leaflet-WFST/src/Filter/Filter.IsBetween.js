L.Filter.IsBetween = L.Filter.Abstract.extend({
  tagName: 'ogc:PropertyIsBetween',

  initialize: function (property, lowerBoundary, upperBoundary) {
    this.property = property;
    this.lowerBoundary = lowerBoundary;
    this.upperBoundary = upperBoundary;
  },

  buildFilterContent: function (filterElement) {
    filterElement.appendChild(L.Filter.propertyElement(this.property));

    var lowerBoundaryElement = L.XmlUtil.createElementNS('ogc:LowerBoundary');
    lowerBoundaryElement.appendChild(L.Filter.literalElement(this.lowerBoundary));

    filterElement.appendChild(lowerBoundaryElement);

    var upperBoundaryElement = L.XmlUtil.createElementNS('ogc:UpperBoundary');
    upperBoundaryElement.appendChild(L.Filter.literalElement(this.upperBoundary));

    filterElement.appendChild(upperBoundaryElement);
  }
});

L.Filter.isbetween = function(property, lowerBoundary, upperBoundary) {
  return new L.Filter.IsBetween(property, lowerBoundary, upperBoundary);
};
