/**
 * Created by PRadostev on 20.02.2015.
 */

describe('WFST.Requests', function () {
  var wfst, layer, xhr;

  before(function () {
    xhr = sinon.useFakeXMLHttpRequest();
  });

  beforeEach(function () {
    wfst = new L.WFST({
      typeNS: 'typeNS',
      typeName: 'typeName',
      namespaceUri: 'testuri'
    });
    layer = {
      feature: {
        id: 1,
        properties: {
          a: 'a',
          b: 'b'
        }
      },
      toGml: function () {
        return L.XmlUtil.createElementNS('gml:Point');
      }
    };
  });

  describe('#insert', function () {
    it('should return Element object with tagName wfs:Insert', function () {
      sinon.stub(wfst, 'gmlFeature').callsFake(function () {
        return document.createElement('dummy');
      });
      var result = wfst.insert(layer);
      expect(result).to.be.instanceOf(Element);
      expect(result.tagName).to.be.equal('wfs:Insert');
    });
  });

  describe('#update', function () {
    it('should return Element object with tagName wfs:Update', function () {
      sinon.stub(wfst, 'wfsProperty').callsFake(function () {
        return document.createElement('dummy');
      });
      var result = wfst.update(layer);
      expect(result).to.be.instanceOf(Element);
      expect(result.tagName).to.be.equal('wfs:Update');
    });
  });

  describe('#remove', function () {
    it('should return Element object with tagName "wfs:Delete" and attribute "typeName"', function () {
      var result = wfst.remove(layer);
      expect(result).to.be.instanceOf(Element);
      expect(result.tagName).to.be.equal('wfs:Delete');
      expect(result.attributes.typeName).to.not.be.undefined;
    });
  });

  after(function () {
    xhr.restore();
  });
});
