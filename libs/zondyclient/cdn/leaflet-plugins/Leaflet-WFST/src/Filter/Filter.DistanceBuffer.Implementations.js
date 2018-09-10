L.Filter.DWithin = L.Filter.DistanceBuffer.extend({
  tagName: 'ogc:DWithin'
});

L.Filter.dwithin = function(propertyName, geometry, crs, distance, units) {
  return new L.Filter.DWithin(propertyName, geometry, crs, distance, units);
};

L.Filter.Beyond = L.Filter.DistanceBuffer.extend({
  tagName: 'ogc:Beyond'
});

L.Filter.beyond = function(propertyName, geometry, crs, distance, units) {
  return new L.Filter.Beyond(propertyName, geometry, crs, distance, units);
};
