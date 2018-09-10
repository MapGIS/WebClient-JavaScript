L.Filter.EQ = L.Filter.BinaryComparison.extend({
  tagName: 'ogc:PropertyIsEqualTo'
});

L.Filter.eq = function(firstValue, secondValue) {
  return new L.Filter.EQ(firstValue, secondValue);
};

L.Filter.NotEQ = L.Filter.BinaryComparison.extend({
  tagName: 'ogc:PropertyIsNotEqualTo'
});

L.Filter.neq = function(firstValue, secondValue) {
  return new L.Filter.NotEQ(firstValue, secondValue);
};

L.Filter.LT = L.Filter.BinaryComparison.extend({
  tagName: 'ogc:PropertyIsLessThan'
});

L.Filter.lt = function(firstValue, secondValue) {
  return new L.Filter.LT(firstValue, secondValue);
};

L.Filter.GT = L.Filter.BinaryComparison.extend({
  tagName: 'ogc:PropertyIsGreaterThan'
});

L.Filter.gt = function(firstValue, secondValue) {
  return new L.Filter.GT(firstValue, secondValue);
};

L.Filter.LEQ = L.Filter.BinaryComparison.extend({
  tagName: 'ogc:PropertyIsLessThanOrEqualTo'
});

L.Filter.leq = function(firstValue, secondValue) {
  return new L.Filter.LEQ(firstValue, secondValue);
};

L.Filter.GEQ = L.Filter.BinaryComparison.extend({
  tagName: 'ogc:PropertyIsGreaterThanOrEqualTo'
});

L.Filter.geq = function(firstValue, secondValue) {
  return new L.Filter.GEQ(firstValue, secondValue);
};
