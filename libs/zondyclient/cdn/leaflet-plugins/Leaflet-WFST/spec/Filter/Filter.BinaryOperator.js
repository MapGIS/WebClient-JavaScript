describe('Filter.BinaryOperator', function () {
  var tagName;

  before(function () {
    tagName = 'testBinaryOperator';
  });

  describe('#toGml with simple values', function () {
    var filterElement;
    var propertyName;
    var propertyValue;

    before(function () {
      propertyName = 'foobar';
      propertyValue = 100500;
      var filter = new L.Filter.BinaryOperator(propertyName, propertyValue);
      filter.tagName = tagName;
      filterElement = filter.toGml();
    });

    it('must return element with specified tagName', function () {
      expect(filterElement.tagName).to.be.equal(tagName);
    });

    it('must have first child element with tagName = ogc:PropertyName & textContent = foobar', function () {
      var propertyNameElement = filterElement.childNodes[0];

      expect(propertyNameElement.tagName).to.be.equal('ogc:PropertyName');
      expect(propertyNameElement.textContent).to.be.equal(propertyName);
    });

    it('must have child element with tagName = ogc:Literal & textContent = 100500', function () {
      var propertyValueElement = filterElement.childNodes[1];

      expect(propertyValueElement.tagName).to.be.equal('ogc:Literal');
      expect(Number(propertyValueElement.textContent)).to.be.equal(propertyValue);
    });
  });


  describe('#toGml with element values', function () {
    var filterElement;
    var firstValue;
    var secondValue;

    before(function () {
      firstValue = document.createElement('firstValue');
      secondValue = document.createElement('secondValue');
      var filter = new L.Filter.BinaryOperator(firstValue, secondValue);
      filter.tagName = tagName;
      filterElement = filter.toGml();
    });

    it('must have first child element equal to firstvalue', function () {
      var firstValueElement = filterElement.childNodes[0];
      expect(firstValueElement).to.be.equal(firstValue);
    });

    it('must have second child element equal to secondvalue', function () {
      var secondValueElement = filterElement.childNodes[1];
      expect(secondValueElement).to.be.equal(secondValue);
    });
  });

  describe('#toGml with filter values', function () {
    var filterElement;
    var firstValue;
    var secondValue;

    before(function () {
      firstValue = document.createElement('firstValue');
      secondValue = document.createElement('secondValue');

      var firstFilter = { toGml: function () { return firstValue; } };
      var secondFilter = { toGml: function () { return secondValue; } };
      var filter = new L.Filter.BinaryOperator(firstFilter, secondFilter);
      filter.tagName = tagName;
      filterElement = filter.toGml();
    });

    it('must have first child element equal to firstvalue', function () {
      var firstValueElement = filterElement.childNodes[0];
      expect(firstValueElement).to.be.equal(firstValue);
    });

    it('must have second child element equal to secondvalue', function () {
      var secondValueElement = filterElement.childNodes[1];
      expect(secondValueElement).to.be.equal(secondValue);
    });
  });
});
