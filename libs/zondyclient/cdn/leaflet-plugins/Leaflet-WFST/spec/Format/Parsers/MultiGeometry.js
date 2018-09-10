/**
 * Created by PRadostev on 09.06.2015.
 */

describe('L.GML.MultiGeometry', function () {
  var parser;
  var singleParser;
  var multiElement;
  var transformStub;
  var singleParserParseStub;

  before(function () {
    singleParser = {
      elementTag: 'gml:Single', parse: function () {
      }
    };

    singleParserParseStub = sinon.stub(singleParser, 'parse').returns({});

    parser = new L.GML.MultiGeometry();
    parser.appendParser(singleParser);
    transformStub = sinon.stub(parser, 'transform').callsFake(function (coordinates) {
      return coordinates;
    });

    multiElement = parseXml('<multi>' +
    '<gml:singleMember><gml:Single/></gml:singleMember>' +
    '<gml:singleMembers>' +
    '<gml:Single/>' +
    '<gml:Single/>' +
    '</gml:singleMembers>' +
    '</multi>');
  });

  it('should call singleParser.parse for each single member', function () {
    parser.parse(multiElement);
    expect(singleParserParseStub).to.have.been.calledThrice;
  });

  describe('#parse', function () {
    it('should return array of objects', function () {
      var result = parser.parse(multiElement);
      expect(result).to.be.instanceOf(Array);
    });
  });

});
