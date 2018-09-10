L.Filter.BinaryLogic = L.Filter.Abstract.extend({
  filters: null,

  initialize: function () {
    var filters = [];
    for (var i = 0; i < arguments.length; i++) {
      filters.push(arguments[i]);
    }

    this.filters = filters;
  },

  buildFilterContent: function (filterElement) {
    this.filters.forEach(function(filter) {
      filterElement.appendChild(L.Filter.element(filter));
    });
  }
});
