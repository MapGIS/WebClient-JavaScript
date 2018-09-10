describe('Filter.DistanceBuffer', function () {
  var tagName;
  var geometryField;
  var crs;
  var distance;
  var units;
  var filter;
  var toGmlResult;
  var toGmlStub;


  before(function () {
    geometryField = 'geom';
    tagName = 'binarySpatialFilterTest';
    distance = 100500;
    units = 'somestrangeunit';

    var layer = { toGml: function () { } };
    toGmlResult = document.createElement('testElement');
    toGmlStub = sinon.stub(layer, 'toGml').returns(toGmlResult);

    filter = new L.Filter.DistanceBuffer(geometryField, layer, crs, distance, units);
    filter.tagName = tagName;
  });

  describe('#toGml', function () {
    var filterElement;

    before(function () {
      filterElement = filter.toGml();
    });

    it('must return element with specified tagName', function () {
      expect(filterElement.tagName).to.be.equal(tagName);
    });

    it('must have first child element with tagName = ogc:PropertyName & content = geom', function () {
      var propertyNameElement = filterElement.childNodes[0];
      expect(propertyNameElement.tagName).to.be.equal('ogc:PropertyName');
      expect(propertyNameElement.textContent).to.be.equal(geometryField);
    });

    it('must have second element describing layer geometry', function () {
      var envelopeElement = filterElement.childNodes[1];
      expect(envelopeElement).to.be.equal(toGmlResult);
    });

    it('must have third element with tagName ogc:Distance & value & attribute unit with value', function () {
      var distanceElement = filterElement.childNodes[2];
      expect(distanceElement.tagName).to.be.equal('ogc:Distance');
      expect(distanceElement.textContent).to.be.equal(distance.toString());
      expect(distanceElement.attributes.units.value).to.be.equal(units);
    });
  });
});
