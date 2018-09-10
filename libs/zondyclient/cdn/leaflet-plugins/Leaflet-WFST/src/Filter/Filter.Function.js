L.Filter.Function = L.Filter.Abstract.extend({
  tagName: 'Function',

  initialize: function () {
    var functionName = arguments[0];
    this.attributes = { name: functionName };
    var expressions = [];
    for (var i = 1; i < arguments.length; i++) {
      expressions.push(arguments[i]);
    }

    this.expressions = expressions;
  },

  buildFilterContent: function (filterElement) {
    var firstArgument = this.expressions[0];
    filterElement.appendChild(L.Filter.propertyElement(firstArgument));

    for (var i = 1; i < this.expressions.length; i++) {
      var functionArgument = this.expressions[i];
      filterElement.appendChild(L.Filter.literalElement(functionArgument));
    }
  }
});

L.Filter.function = function() {
  return new (Function.prototype.bind.apply(L.Filter.Function, arguments))();
};
