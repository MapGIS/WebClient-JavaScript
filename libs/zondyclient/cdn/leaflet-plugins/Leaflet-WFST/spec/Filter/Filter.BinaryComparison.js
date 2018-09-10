describe('Filter.BinaryComparison', function () {
  describe('#toGml', function () {
    it('must return element having matchCase attribute with value equal true', function () {
      var filter = new L.Filter.BinaryComparison('a', 'b', true);
      filter.tagName = 'testBC';
      var filterElement = filter.toGml();
      expect(filterElement.attributes.matchCase.value).to.be.equal('true');
    });
  });
});
