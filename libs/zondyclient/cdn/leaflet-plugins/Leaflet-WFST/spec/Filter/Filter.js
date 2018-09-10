describe('Filter', function () {
  it('should return Element object with tagName ogc:Filter', function () {
    var gml = L.filter();
    expect(gml).to.be.instanceOf(Element);
    expect(gml.tagName).to.be.equal('ogc:Filter');
  });

  it('should have childNode for single passed filter', function() {
    var resultA = document.createElement('a');
    var filter = L.filter({ toGml: function () { return resultA; } });
    expect(filter.childNodes.length).to.be.equal(1);
    expect(filter.childNodes[0]).to.be.equal(resultA);
  });

  it('should have childNode for single passed gmlFilter', function() {
    var resultA = document.createElement('a');
    var filter = L.filter(resultA);
    expect(filter.childNodes.length).to.be.equal(1);
    expect(filter.childNodes[0]).to.be.equal(resultA);
  });

  it('should have childNodes for array filters argument', function () {
    var resultA = document.createElement('a');
    var resultB = document.createElement('b');
    var resultC = document.createElement('c');
    var filter = L.filter([
      { toGml: function () { return resultA; } },
      { toGml: function () { return resultB; } },
      { toGml: function () { return resultC; } },
    ]);
    expect(filter.childNodes.length).to.be.equal(3);
    expect(filter.childNodes[0]).to.be.equal(resultA);
    expect(filter.childNodes[1]).to.be.equal(resultB);
    expect(filter.childNodes[2]).to.be.equal(resultC);
  });

  it('should have childNodes for array gmlFilters/filters argument', function () {
    var resultA = document.createElement('a');
    var resultB = document.createElement('b');
    var resultC = document.createElement('c');
    var filter = L.filter([
      resultA,
      resultB,
      { toGml: function () { return resultC; } },
    ]);
    expect(filter.childNodes.length).to.be.equal(3);
    expect(filter.childNodes[0]).to.be.equal(resultA);
    expect(filter.childNodes[1]).to.be.equal(resultB);
    expect(filter.childNodes[2]).to.be.equal(resultC);
  });
});
