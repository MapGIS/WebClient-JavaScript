L.Filter.BinarySpatial = L.Filter.Abstract.extend({
  initialize: function (propertyName, value, crs) {
    this.propertyName = propertyName;
    this.value = value;
    this.crs = crs;
  },

  buildFilterContent: function (filterElement) {
    filterElement.appendChild(L.Filter.propertyName(this.propertyName));
    if (typeof(this.value) === "string") {
      filterElement.appendChild(L.Filter.propertyName(this.value));
    } else {
      filterElement.appendChild(this.value.toGml(this.crs));
    }
    return filterElement;
  }
});
