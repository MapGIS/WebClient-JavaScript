/**
 * Created by PRadostev on 08.06.2015.
 */

describe("L.GML.Coordinates", function () {
  var parser;

  before(function () {
    parser = new L.GML.Coordinates();
  });

  it('should parse gml:coordinates element', function () {
    expect(parser.elementTag).to.equal('gml:coordinates');
  });

  it('should return array', function () {
    var coordXml = '<gml:coordinates>0,0</gml:coordinates>';
    var coordElement = parseXml(coordXml);
    var coords = parser.parse(coordElement);
    expect(coords).to.be.instanceOf(Array);
  });

  it('should parse 2 dimensional point', function () {
    var coordXml = '<gml:coordinates>5,10</gml:coordinates>';
    var coordElement = parseXml(coordXml);
    var coords = parser.parse(coordElement, {dimension: 2});
    expect(coords.length).to.equal(2);
    expect(coords[0]).to.equal(5);
    expect(coords[1]).to.equal(10);
  });

  it('should parse 3 dimensional point', function () {
    var coordXml = '<gml:coordinates>5,10,15</gml:coordinates>';
    var coordElement = parseXml(coordXml);
    var coords = parser.parse(coordElement);
    expect(coords.length).to.equal(3);
    expect(coords[0]).to.equal(5);
    expect(coords[1]).to.equal(10);
    expect(coords[2]).to.equal(15);
  });

  it('should parse point with non default separators', function () {
    var coordXml = '<gml:coordinates decimal="," cs=" " ts=".">5,1 10,5 15,8</gml:coordinates>';
    var coordElement = parseXml(coordXml);
    var coords = parser.parse(coordElement);
    expect(coords.length).to.equal(3);
    expect(coords[0]).to.equal(5.1);
    expect(coords[1]).to.equal(10.5);
    expect(coords[2]).to.equal(15.8);
  });

  it('should return array of arrays', function () {
    var coordXml = '<gml:coordinates>0,0 1,1 2,2</gml:coordinates>';
    var coordElement = parseXml(coordXml);
    var coords = parser.parse(coordElement);
    expect(coords).to.be.instanceOf(Array);
    for (var i = 0; i < coords.length; i++) {
      expect(coords[i]).to.be.instanceOf(Array);
    }
  });

  it('should parse 2 dimensional line', function () {
    var coordXml = '<gml:coordinates>0,0 1,1 2,2</gml:coordinates>';
    var coordElement = parseXml(coordXml);
    var coords = parser.parse(coordElement);
    expect(coords.length).to.equal(3);
    expect(coords[0]).to.deep.equal([0, 0]);
    expect(coords[1]).to.deep.equal([1, 1]);
    expect(coords[2]).to.deep.equal([2, 2]);
  });

  it('should parse 3 dimensional line', function () {
    var coordXml = '<gml:coordinates>0,0,1 1,2,2</gml:coordinates>';
    var coordElement = parseXml(coordXml);
    var coords = parser.parse(coordElement);
    expect(coords.length).to.equal(2);
    expect(coords[0]).to.deep.equal([0, 0, 1]);
    expect(coords[1]).to.deep.equal([1, 2, 2]);
  });
});
