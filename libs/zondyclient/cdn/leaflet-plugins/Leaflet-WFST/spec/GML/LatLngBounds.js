describe('L.LatLngBounds extensions', function () {
  var bounds;
  var crs;

  before(function() {
  	bounds = L.latLngBounds([40.712, -74.227], [40.774, -74.125]);
  	crs = L.CRS.EPSG4326;
  });

  describe('#toGml', function() {
  	var gml;

  	before(function() {
  	  gml = bounds.toGml(crs);
  	});

  	it('must return Element with tagName gml:Envelope & attribute srsName = EPSG:4326', function () {
      var envelopeElement = gml;

      expect(envelopeElement).to.be.instanceOf(Element);
      expect(envelopeElement.tagName).to.be.equal('gml:Envelope');
      expect(envelopeElement.getAttribute('srsName')).to.be.equal(crs.code);
    });

    it('element gml:Envelope must have gml:lowerCorner element with projected lower corner coordinates', function () {
      var lowerCorner = crs.project(bounds.getSouthWest());

      var envelopeElement = gml;
      var lowerCornerElement = envelopeElement.firstChild;

      expect(lowerCornerElement.tagName).to.be.equal('gml:lowerCorner');
      expect(lowerCornerElement.textContent).to.be.equal(lowerCorner.x + ' ' + lowerCorner.y);
    });

    it('element gml:Envelope must have gml:upperCorner element with projected upper corner coordinates', function () {
      var upperCorner = crs.project(bounds.getNorthEast());

      var envelopeElement = gml;
      var upperCornerElement = envelopeElement.lastChild;

      expect(upperCornerElement.tagName).to.be.equal('gml:upperCorner');
      expect(upperCornerElement.textContent).to.be.equal(upperCorner.x + ' ' + upperCorner.y);
    });
  });
});
