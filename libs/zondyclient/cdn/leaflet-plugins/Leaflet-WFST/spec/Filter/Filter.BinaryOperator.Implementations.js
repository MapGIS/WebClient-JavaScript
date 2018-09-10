describe('Filter.Add', function () {
  describe('#toGml', function () {
    it('must return element with tagName Add', function () {
      var filter = new L.Filter.Add();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('Add');
    });
  });
});

describe('Filter.Sub', function () {
  describe('#toGml', function () {
    it('must return element with tagName Sub', function () {
      var filter = new L.Filter.Sub();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('Sub');
    });
  });
});


describe('Filter.Mul', function () {
  describe('#toGml', function () {
    it('must return element with tagNameMulAdd', function () {
      var filter = new L.Filter.Mul();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('Mul');
    });
  });
});


describe('Filter.Div', function () {
  describe('#toGml', function () {
    it('must return element with tagName Div', function () {
      var filter = new L.Filter.Div();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('Div');
    });
  });
});
