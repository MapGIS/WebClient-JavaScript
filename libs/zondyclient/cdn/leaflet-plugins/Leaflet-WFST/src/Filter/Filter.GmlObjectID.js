L.Filter.GmlObjectID = L.Filter.Abstract.extend({
  tagName: 'ogc:GmlObjectId',

  initialize: function (id) {
    this.attributes =  { 'gml:id': id };
  },

  buildFilterContent: function() {
  }
});

L.Filter.gmlobjectid = function(id) {
  return new L.Filter.GmlObjectID(id);
};
