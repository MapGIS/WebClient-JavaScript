/**
  Converts L.LatLngBounds into gml:Envelope. 
  (L.LatLngBounds doesn't extend L.Class so we need to extend it's prototype manually).
*/
L.LatLngBounds.prototype.toGml = function (crs) {
  var projectedSW = crs.project(this.getSouthWest());
  var projectedNE = crs.project(this.getNorthEast());

  var envelopeElement = L.XmlUtil.createElementNS('gml:Envelope', { srsName: crs.code });
  envelopeElement.appendChild(L.XmlUtil.createElementNS('gml:lowerCorner', {}, { value: projectedSW.x + ' ' + projectedSW.y }));
  envelopeElement.appendChild(L.XmlUtil.createElementNS('gml:upperCorner', {}, { value: projectedNE.x + ' ' + projectedNE.y }));

  return envelopeElement;
};
