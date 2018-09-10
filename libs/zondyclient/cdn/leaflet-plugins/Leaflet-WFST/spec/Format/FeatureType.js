/**
 * Created by PRadostev on 10.06.2015.
 */

describe("L.GML.FeatureType", function () {
  var parser;

  beforeEach(function () {
    parser = new L.GML.FeatureType();
  });


  describe('#appendField', function () {
    it('should have bar field object parser', function () {
      parser.appendField('bar', 'int');
      expect(parser.fields.bar).to.not.be.undefined;
    });
  });

  describe('#parse', function () {
    it('should return feature object with properties and id fields', function () {
      var element = parseXml('<feature gml:id="1"></feature>');
      var result = parser.parse(element);
      expect(result).to.have.property('properties');
      expect(result).to.have.property('id');
    });
  });

});
