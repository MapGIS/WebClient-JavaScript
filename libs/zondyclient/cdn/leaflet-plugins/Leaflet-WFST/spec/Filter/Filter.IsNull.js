describe('Filter.IsNull', function () {
  var propertyName;
  var filter;

  before(function () {
    propertyName = 'foobar';
    filter = new L.Filter.IsNull(propertyName);
  });

  describe('#toGml', function () {
    var filterElement;

    before(function () {
      filterElement = filter.toGml();
    });

    it('should return element with tagName ogc:PropertyIsNull', function () {
      expect(filterElement.tagName).to.be.equal('ogc:PropertyIsNull');
    });

    it('should have child element with tagName ogc:PropertyName and specified value', function () {
      var propertyNameElement = filterElement.firstChild;
      expect(propertyNameElement.tagName).to.be.equal('ogc:PropertyName');
      expect(propertyNameElement.textContent).to.be.equal(propertyName);
    });
  });
});
