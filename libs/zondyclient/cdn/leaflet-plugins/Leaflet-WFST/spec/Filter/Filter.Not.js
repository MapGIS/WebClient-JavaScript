describe('Filter.Not', function () {
  describe('#toGml', function () {
    it('should return element with tagName not and one childElement for passed filter', function () {
      var valueGml = document.createElement('test');
      var valueFilter = { toGml: function () { return valueGml; } };
      var filter = new L.Filter.Not(valueFilter);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('Not');
      expect(filterElement.childNodes.length).to.be.equal(1);
      expect(filterElement.childNodes[0]).to.be.equal(valueGml);
    });
  });
});
