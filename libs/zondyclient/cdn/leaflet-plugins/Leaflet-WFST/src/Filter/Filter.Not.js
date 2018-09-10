L.Filter.Not = L.Filter.Abstract.extend({
  tagName: 'Not',

  initialize: function(filter) {
    this.filter = filter;
  },

  buildFilterContent: function(filterElement) {
    filterElement.appendChild(L.Filter.element(this.filter));
  }
});

L.Filter.not = function(filter) {
  return new L.Filter.Not(filter);
};
