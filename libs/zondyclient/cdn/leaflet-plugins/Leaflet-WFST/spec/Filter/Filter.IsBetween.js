describe('Filter.IsBetween', function () {
  describe('#toGml with simple values', function () {
    var filterElement;
    var propertyName;
    var lowerBoundary;
    var upperBoundary;

    before(function () {
      propertyName = 'foo';
      lowerBoundary = 'bar';
      upperBoundary = 'buzz';
      var filter = new L.Filter.IsBetween(propertyName, lowerBoundary, upperBoundary);
      filterElement = filter.toGml();
    });

    it('should return element with tagName ogc:PropertyIsBetween', function () {
      expect(filterElement.tagName).to.be.equal('ogc:PropertyIsBetween');
    });

    it('should have child element with tagName ogc:PropertyName and specified value', function () {
      var propertyNameElement = filterElement.firstChild;
      expect(propertyNameElement.tagName).to.be.equal('ogc:PropertyName');
      expect(propertyNameElement.textContent).to.be.equal(propertyName);
    });

    it('should have second element with tagName ogc:LowerBoundary and literal child with specified value', function() {
      var lowerBoundaryElement = filterElement.childNodes[1];
      expect(lowerBoundaryElement.tagName).to.be.equal('ogc:LowerBoundary');

      var valueElement = lowerBoundaryElement.firstChild;
      expect(valueElement.tagName).to.be.equal('ogc:Literal');
      expect(valueElement.textContent).to.be.equal(lowerBoundary);
    });

    it('should have third element with tagName ogc:UpperBoundary and literal child with specified value', function() {
      var upperBoundaryElement = filterElement.childNodes[2];
      expect(upperBoundaryElement.tagName).to.be.equal('ogc:UpperBoundary');

      var valueElement = upperBoundaryElement.firstChild;
      expect(valueElement.tagName).to.be.equal('ogc:Literal');
      expect(valueElement.textContent).to.be.equal(upperBoundary);
    });
  });

  describe('#toGml with element values', function() {
    var filterElement;
    var propertyExp;
    var lowerBoundaryExp;
    var upperBoundaryExp;

    before(function () {
      propertyExp = document.createElement('foo');
      lowerBoundaryExp = document.createElement('foo');
      upperBoundaryExp = document.createElement('foo');
      var filter = new L.Filter.IsBetween(propertyExp, lowerBoundaryExp, upperBoundaryExp);
      filterElement = filter.toGml();
    });

    it('should have first child element equal to property expression', function() {
      expect(filterElement.childNodes[0]).to.be.equal(propertyExp);
    });

    it('should have second child element tagName ogc:LowerBoundary and child element equal to lowerBoundary expression', function() {
      var lowerBoundaryElement = filterElement.childNodes[1];
      expect(lowerBoundaryElement.tagName).to.be.equal('ogc:LowerBoundary');
      expect(lowerBoundaryElement.firstChild).to.be.equal(lowerBoundaryExp);
    });

    it('should have third element with tagName ogc:UpperBoundary and child element equal to upperBoundary expression', function() {
      var upperBoundaryElement = filterElement.childNodes[2];
      expect(upperBoundaryElement.tagName).to.be.equal('ogc:UpperBoundary');
      expect(upperBoundaryElement.firstChild).to.be.equal(upperBoundaryExp);
    });
  });
});
