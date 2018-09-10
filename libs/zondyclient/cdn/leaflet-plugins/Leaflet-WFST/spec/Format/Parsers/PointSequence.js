/**
 * Created by PRadostev on 09.06.2015.
 */

describe("L.GML.PointSequence", function () {
  var parser;

  before(function () {
    parser = new L.GML.PointSequence();
  });

  it('should know how to parse gml:pos', function () {
    var child = parser.parsers['gml:pos'];
    expect(child).to.be.instanceOf(L.GML.Pos);
  });

  it('should know how to parse gml:coordinates', function () {
    var child = parser.parsers['gml:coordinates'];
    expect(child).to.be.instanceOf(L.GML.Coordinates);
  });

  it('should know how to parse gml:posList', function () {
    var child = parser.parsers['gml:posList'];
    expect(child).to.be.instanceOf(L.GML.PosList);
  });

  it('should know how to parse gml:Point', function () {
    var child = parser.parsers['gml:Point'];
    expect(child).to.be.instanceOf(L.GML.PointNode);
  });

  describe('#parse', function () {
    var metas = [
      {
        name: 'gml:pos',
        xml: '<someelement><gml:pos>0 0</gml:pos><gml:pos>1 1</gml:pos></someelement>'
      },
      {
        name: 'gml:Point',
        xml: '<someelement><gml:Point><gml:pos>0 0</gml:pos></gml:Point><gml:Point><gml:pos>1 1</gml:pos></gml:Point></someelement>'
      },
      {
        name: 'gml:posList',
        xml: '<someelement srsDimension="2"><gml:posList>0 0 1 1</gml:posList></someelement>'
      },
      {
        name: 'gml:coordinates',
        xml: '<someelement><gml:coordinates>0,0 1,1</gml:coordinates></someelement>'
      }];

    metas.forEach(function (meta) {
      it('should parse sequence consists of ' + meta.name, function () {
        var element = parseXml(meta.xml);
        var result = parser.parse(element);
        expect(result).deep.equal([[0, 0], [1, 1]]);
      });
    });
  });
});
