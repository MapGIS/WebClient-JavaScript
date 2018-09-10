/**
 * Created by PRadostev on 08.06.2015.
 */

describe("L.GML.PointNode", function () {
  var parser;

  beforeEach(function () {
    parser = new L.GML.PointNode();
  });

  it('should know how to parse gml:pos', function () {
    var child = parser.parsers['gml:pos'];
    expect(child).to.be.instanceOf(L.GML.Pos);
  });

  it('should know how to parse gml:coordinates', function () {
    var child = parser.parsers['gml:coordinates'];
    expect(child).to.be.instanceOf(L.GML.Coordinates);
  });

  it('should return array', function () {
    var pointXml = '<gml:Point><gml:pos>0 0</gml:pos></gml:Point>';
    var pointElement = parseXml(pointXml);
    var result = parser.parse(pointElement);
    expect(result).to.be.instanceOf(Array);
  });

  it('should parse 2 dimensional point', function () {
    var posXml = '<gml:Point><gml:pos>5 10</gml:pos></gml:Point>';
    var posElement = parseXml(posXml);
    var pos = parser.parse(posElement);
    expect(pos.length).to.equal(2);
    expect(pos[0]).to.equal(5);
    expect(pos[1]).to.equal(10);
  });

  it('should parse 3 dimensional point', function () {
    var posXml = '<gml:Point><gml:pos>5 10 15</gml:pos></gml:Point>';
    var posElement = parseXml(posXml);
    var pos = parser.parse(posElement);
    expect(pos.length).to.equal(3);
    expect(pos[0]).to.equal(5);
    expect(pos[1]).to.equal(10);
    expect(pos[2]).to.equal(15);
  });

  it('should call gml:pos parse', function () {
    var posParser = parser.parsers['gml:pos'];
    var spy = sinon.spy(posParser, 'parse');
    var pointElement = parseXml('<gml:Point><gml:pos>0 0</gml:pos></gml:Point>');
    parser.parse(pointElement);
    expect(spy).have.been.called;
    posParser.parse.restore();
  });

  it('should call gml:coordinates parse', function () {
    var coordinatesParser = parser.parsers['gml:coordinates'];
    var spy = sinon.spy(coordinatesParser, 'parse');
    var pointElement = parseXml('<gml:Point><gml:coordinates>0,0</gml:coordinates></gml:Point>');
    parser.parse(pointElement);
    expect(spy).have.been.called;
    coordinatesParser.parse.restore();
  });
});
