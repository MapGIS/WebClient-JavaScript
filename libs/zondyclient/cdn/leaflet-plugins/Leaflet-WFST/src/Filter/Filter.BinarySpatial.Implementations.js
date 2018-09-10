L.Filter.Equals = L.Filter.BinarySpatial.extend({
  tagName: 'ogc:Equals'
});

L.Filter.equals = function(options) {
  return new L.Filter.Equals(options);
};

L.Filter.Disjoint = L.Filter.BinarySpatial.extend({
  tagName: 'ogc:Disjoint'
});

L.Filter.disjoint = function(options) {
  return new L.Filter.Disjoint(options);
};

L.Filter.Touches = L.Filter.BinarySpatial.extend({
  tagName: 'ogc:Touches'
});

L.Filter.touches = function(options) {
  return new L.Filter.Touches(options);
};

L.Filter.Within = L.Filter.BinarySpatial.extend({
  tagName: 'ogc:Within'
});

L.Filter.within = function(options) {
  return new L.Filter.Within(options);
};

L.Filter.Overlaps = L.Filter.BinarySpatial.extend({
  tagName: 'ogc:Overlaps'
});

L.Filter.overlaps = function(options) {
  return new L.Filter.Overlaps(options);
};

L.Filter.Crosses = L.Filter.BinarySpatial.extend({
  tagName: 'ogc:Crosses'
});

L.Filter.crosses = function(options) {
  return new L.Filter.Crosses(options);
};

L.Filter.Intersects = L.Filter.BinarySpatial.extend({
  tagName: 'ogc:Intersects'
});

L.Filter.intersects = function(options) {
  return new L.Filter.Intersects(options);
};

L.Filter.Contains = L.Filter.BinarySpatial.extend({
  tagName: 'ogc:Contains'
});

L.Filter.contains = function(options) {
  return new L.Filter.Contains(options);
};
