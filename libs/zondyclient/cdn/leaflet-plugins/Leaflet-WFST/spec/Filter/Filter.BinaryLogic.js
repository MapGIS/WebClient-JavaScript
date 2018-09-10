describe('Filter.BinaryLogic', function () {
  var tagName;
  var filterElement;
  var filter1;
  var filter2;

  before(function () {
    tagName = 'testTag';
    filter1 = document.createElement('filter1');
    filter2 = document.createElement('filter2');
    var filter = new L.Filter.BinaryLogic({ toGml: function () { return filter1; } }, { toGml: function () { return filter2; } });
    filter.tagName = tagName;
    filterElement = filter.toGml();
  });

  describe('#toGml', function () {
    it('should return element with specified tagName', function () {
      expect(filterElement.tagName).to.be.equal(tagName);
    });

    it('should contains passed filters as child elements', function () {
      var firstFilter = filterElement.childNodes[0];
      expect(firstFilter).to.be.equal(filter1);

      var secondFilter = filterElement.childNodes[1];
      expect(secondFilter).to.be.equal(filter2);
    });
  });
});
