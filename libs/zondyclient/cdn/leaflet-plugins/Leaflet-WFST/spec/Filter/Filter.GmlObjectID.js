describe('Filter.GMLObjectID', function () {
  var filter;
  var id;

  before(function () {
    id = 1;
    filter = new L.Filter.GmlObjectID(id);
  });

  describe('#toGml', function () {
    var gmlObjectIdElement;

    before(function () {
      gmlObjectIdElement = filter.toGml();
    });

    it('must have child element with tagName = ogc:GmlObjectId & attribute gml:id = 1', function () {
      expect(gmlObjectIdElement.tagName).to.be.equal('ogc:GmlObjectId');
      expect(gmlObjectIdElement.attributes['gml:id'].value).to.be.equal('' + id);
    });
  });
});
