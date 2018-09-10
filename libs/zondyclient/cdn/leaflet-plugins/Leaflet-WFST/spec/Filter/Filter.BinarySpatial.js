describe('Filter.BinarySpatial', function () {
  var geometryField;
  var tagName;

  before(function () {
    geometryField = 'geom';
    tagName = 'binarySpatialFilterTest';
  });

  describe('#toGml with non string value', function () {
    var filterElement;
    var layer;
    var crs;
    var toGmlResult;
    var toGmlStub;

    before(function () {
      layer = { toGml: function () { } };
      toGmlResult = document.createElement('testElement');
      toGmlStub = sinon.stub(layer, 'toGml').returns(toGmlResult);
      crs = L.CRS.EPSG4326;
      var filter = new L.Filter.BinarySpatial(geometryField, layer, crs);
      filter.tagName = tagName;
      filterElement = filter.toGml();
    });

    it('must return element with specified tagName', function () {
      expect(filterElement.tagName).to.be.equal(tagName);
    });

    it('must have first child element with tagName = ogc:PropertyName & content = geom', function () {
      var propertyNameElement = filterElement.firstChild;
      expect(propertyNameElement.tagName).to.be.equal('ogc:PropertyName');
      expect(propertyNameElement.textContent).to.be.equal(geometryField);
    });

    it('must have last child element describing layer geometry', function () {
      var envelopeElement = filterElement.lastChild;
      expect(envelopeElement).to.be.equal(toGmlResult);
    });

    it('must call value.toGml with passed crs parameter', function () {
      expect(toGmlStub).calledWith(crs);
    });
  });

  describe('#toGml with string property', function () {
    var filterElement;
    var secondProperty;

    before(function () {
      secondProperty = 'testSecondProperty';
      var filter = new L.Filter.BinarySpatial(geometryField, secondProperty);
      filter.tagName = tagName;
      filterElement = filter.toGml();
    });

    it('must have last child element with tagName = ogc:propertyName & content = testSecondProperty', function () {
      var propertyNameElement = filterElement.lastChild;
      expect(propertyNameElement.tagName).to.be.equal('ogc:PropertyName');
      expect(propertyNameElement.textContent).to.be.equal(secondProperty);
    });
  });
});
