L.Filter.IsNull = L.Filter.Abstract.extend({
  tagName: 'ogc:PropertyIsNull',

  initialize: function (propertyName) {
    this.propertyName = propertyName;
  },

  buildFilterContent: function (filterElement) {
    filterElement.appendChild(L.Filter.propertyName(this.propertyName));
  }
});

L.Filter.isnull = function(propertyName) {
  return new L.Filter.IsNull(propertyName);
};
