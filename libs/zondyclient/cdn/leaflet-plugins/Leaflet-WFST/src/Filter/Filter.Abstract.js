/** Abstract filter class, normally should not be used directly */

L.Filter.Abstract = L.Class.extend({
  attributes: {},

  options: {},

  tagName: null,

  buildFilterContent: function() {
    throw "Build filter content is abstract and should be implemented";
  },

  toGml: function() {
    var filterElement = L.XmlUtil.createElementNS(this.tagName, this.attributes, this.options);
    this.buildFilterContent(filterElement);
    return filterElement;
  }
});
