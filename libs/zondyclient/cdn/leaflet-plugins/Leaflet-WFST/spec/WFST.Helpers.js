/**
 * Created by PRadostev on 20.02.2015.
 */

describe('WFST.Helpers', function () {
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

  describe('#namespaceName', function () {
    it('should prefix name with typeNS property from options', function () {
      expect(wfst.namespaceName('Name')).to.be.equal('typeNS:Name');
    });
  });

  describe('#gmlFeature', function () {
    it('should return Element object with tagName like "%namespace%:%typename%"', function () {
      var stub = sinon.stub(wfst, 'gmlProperty').callsFake(function () {
        return document.createElement('property');
      });

      var result = wfst.gmlFeature(layer);
      expect(result).to.be.instanceOf(Element);
      expect(result.tagName).to.be.equal('typeNS:typeName');
      stub.restore();
    });
  });

  describe('#gmlProperty', function () {
    it('should return Element object', function () {
      var stub = sinon.stub(wfst, 'namespaceName').callsFake(function (name) {
        return name;
      });
      var result = wfst.gmlProperty('propertyName', '');
      expect(result).to.be.instanceOf(Element);
      expect(result.tagName).to.be.equal('propertyName');
      stub.restore();
    });
  });

  describe('#wfsProperty', function () {
    it('should return Element object with tagName wfs:Property and 2 child elements', function () {
      var result = wfst.wfsProperty('propertyName', 'propertyValue');
      expect(result).to.be.instanceOf(Element);
      expect(result.tagName).to.be.equal('wfs:Property');
      expect(result.childNodes.length).to.be.equal(2);
    });

    it('should have first child element with tagName wfs:Name', function () {
      var result = wfst.wfsProperty('propertyName', 'propertyValue');
      expect(result.firstChild.tagName).to.be.equal('wfs:Name');
    });

    it('should have last child element with tagName wfs:Value', function () {
      var result = wfst.wfsProperty('propertyName', 'propertyValue');
      expect(result.lastChild.tagName).to.be.equal('wfs:Value');
    });
  });

  after(function () {
    xhr.restore();
  });
});
