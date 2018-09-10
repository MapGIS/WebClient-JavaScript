/**
 * Created by PRadostev on 08.06.2015.
 */

describe("L.GML.PosList", function () {
  var parser;

  before(function () {
    parser = new L.GML.PosList();
  });

  it('should parse gml:posList element', function () {
    expect(parser.elementTag).to.equal('gml:posList');
  });

  it('should return array of arrays', function () {
    var posListXml = '<gml:posList>0 0 0 0 0 0</gml:posList>';
    var posListElement = parseXml(posListXml);
    var posList = parser.parse(posListElement, {dimensions: 2});
    expect(posList).to.be.instanceOf(Array);
    for (var i = 0; i < posList.length; i++) {
      expect(posList[i]).to.be.instanceOf(Array);
    }
  });

  describe('dimensions', function () {
    var posListElement;
    beforeEach(function () {
      var posListXml = '<gml:posList>0 0 1 1 2 2</gml:posList>';
      posListElement = parseXml(posListXml);
    });

    it('should parse 2 dimensional lines', function () {
      var posList = parser.parse(posListElement, {dimensions: 2});
      expect(posList.length).to.equal(3);
      expect(posList[0]).to.deep.equal([0, 0]);
      expect(posList[1]).to.deep.equal([1, 1]);
      expect(posList[2]).to.deep.equal([2, 2]);
    });

    it('should parse 3 dimensional lines', function () {
      var posList = parser.parse(posListElement, {dimensions: 3});
      expect(posList.length).to.equal(2);
      expect(posList[0]).to.deep.equal([0, 0, 1]);
      expect(posList[1]).to.deep.equal([1, 2, 2]);
    });

    //TODO: ogc standard contains info about count and srsDimensions attributes, need add this to implementation
  });
});
