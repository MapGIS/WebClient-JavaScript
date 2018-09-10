describe('Filter.Function', function () {
  describe('#toGml', function() {
    it('must return element with tagName Function and atribute name for passed function Name', function() {
      var functionName = 'testFunctionName';
      var filter = new L.Filter.Function(functionName);
      var filterElement = filter.toGml();
       expect(filterElement.tagName).to.be.equal('Function');
      expect(filterElement.attributes.name.value).to.be.equal(functionName);
    });
  });

  describe('#toGml with simple value', function() {
    var filterElement;
    var propertyName;
    var propertyValue;

    before(function() {
      propertyName = 'foobar';
      propertyValue = 100500;
      var filter = new L.Filter.Function('functionName', propertyName, propertyValue);
      filterElement = filter.toGml();
    });

    it('must have two child elements', function() {
      expect(filterElement.childNodes.length).to.be.equal(2);
    });

    it('must have first child element with tagName ogc:propertyName and specified value', function() {
      var firstChild = filterElement.firstChild;
      expect(firstChild.tagName).to.be.equal('ogc:PropertyName');
      expect(firstChild.textContent).to.be.equal(propertyName);
    });

    it('must have second child element with tagName ogc:Literal and specified value', function() {
      var firstChild = filterElement.childNodes[1];
      expect(firstChild.tagName).to.be.equal('ogc:Literal');
      expect(Number(firstChild.textContent)).to.be.equal(propertyValue);
    });
  });

  describe('#toGml with expression filter', function () {
    var filterValue1;
    var filterValue2;
    var filterValue3;
    var filterElement;

    before(function () {
      filterValue1 = document.createElement('value1');
      filterValue2 = document.createElement('value2');
      filterValue3 = document.createElement('value3');
      var filter1 = { toGml: function () { return filterValue1; } };
      var filter2 = { toGml: function () { return filterValue2; } };
      var filter3 = { toGml: function () { return filterValue3; } };
      var filter = new L.Filter.Function('functionName', filter1, filter2, filter3);
      filterElement = filter.toGml();
    });

    it('should have child elements for all passed parameters', function() {
      expect(filterElement.childNodes.length).to.be.equal(3);
      expect(filterElement.childNodes[0]).to.be.equal(filterValue1);
      expect(filterElement.childNodes[1]).to.be.equal(filterValue2);
      expect(filterElement.childNodes[2]).to.be.equal(filterValue3);
    });
  });
});
