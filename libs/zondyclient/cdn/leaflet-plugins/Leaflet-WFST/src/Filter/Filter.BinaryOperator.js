L.Filter.BinaryOperator = L.Filter.Abstract.extend({
  initialize: function (firstValue, secondValue) {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
  },

  buildFilterContent: function (filterElement) {
    filterElement.appendChild(L.Filter.propertyElement(this.firstValue));
    filterElement.appendChild(L.Filter.literalElement(this.secondValue));
  }
});
