L.Filter.Add = L.Filter.BinaryOperator.extend({
  tagName: 'Add'
});

L.Filter.add = function(a, b) {
  return new L.Filter.Add(a, b);
};

L.Filter.Sub = L.Filter.BinaryOperator.extend({
  tagName: 'Sub'
});

L.Filter.sub = function(a, b) {
  return new L.Filter.Sub(a, b);
};

L.Filter.Mul = L.Filter.BinaryOperator.extend({
  tagName: 'Mul'
});

L.Filter.mul = function(a, b) {
  return new L.Filter.Mul(a, b);
};

L.Filter.Div = L.Filter.BinaryOperator.extend({
  tagName: 'Div'
});

L.Filter.div = function(a, b) {
  return new L.Filter.Div(a, b);
};
