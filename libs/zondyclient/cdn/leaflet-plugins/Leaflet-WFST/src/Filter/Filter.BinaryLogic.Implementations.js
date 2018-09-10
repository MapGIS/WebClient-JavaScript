L.Filter.And = L.Filter.BinaryLogic.extend({
  tagName: 'And'
});

L.Filter.and = function() {
  return new (Function.prototype.bind.apply(L.Filter.And, arguments))();
};

L.Filter.Or = L.Filter.BinaryLogic.extend({
  tagName: 'Or'
});

L.Filter.or = function() {
  return new (Function.prototype.bind.apply(L.Filter.Or, arguments))();
};
