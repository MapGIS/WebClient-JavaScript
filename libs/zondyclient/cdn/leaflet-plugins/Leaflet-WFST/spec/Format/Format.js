/**
 * Created by PRadostev on 04.06.2015.
 */

/** Common format tests, such as count of processing objects, properties, etc. */
describe("L.Format", function () {
  var loadData = function (url, done, callback) {
    L.Util.request({
      url: url,
      success: callback,
      error: function () {
        assert.fail('not found test data');
      },
      complete: function () {
        done();
      }
    });
  };

  var formats = [
    {
      name: "GML",
      format: new L.Format.GML({geometryField: 'the_geom'}),
      collectionFile: 'featurecollection.xml',
      featureFile: 'feature.xml',
      prepareData: function (data) {
        return L.XmlUtil.parseXml(data).documentElement;
      }
    },
    {
      name: "GeoJSON",
      format: new L.Format.GeoJSON({geometryField: 'the_geom'}),
      collectionFile: 'featurecollection.json',
      featureFile: 'feature.json',
      prepareData: function (data) {
        return JSON.parse(data);
      }
    }
  ];

  formats.forEach(function (kind) {
    describe(kind.name, function () {
      var format = kind.format;

      describe("#setFeatureDescription", function () {
        it('should implement setFeatureDescription function', function () {
          expect(format).to.respondTo('setFeatureDescription');
        });
      });

      describe("#responseToLayers", function () {
        var testData;
        before(function (done) {
          loadData('/base/spec/Format/' + kind.collectionFile, done, function (data) {
            testData = data;
          });
        });

        it('should return array with 10 elements', function () {
          var stub = sinon.stub(format, 'processFeature').callsFake(function () {
            return 0;
          });

          var layers = format.responseToLayers(testData);
          expect(layers.length).to.equal(10);
          stub.restore();
        });
      });

      describe("#processFeature", function () {
        var layer;

        before(function (done) {
          loadData('/base/spec/Format/' + kind.featureFile, done, function (data) {
            var testData = kind.prepareData(data);
            var stub = sinon.stub(format, 'generateLayer').callsFake(function () {
              return {};
            });

            var featureType = new L.GML.FeatureType({
              geometryField: 'the_geom'
            });
            featureType.appendField('cat', 'int');
            featureType.appendField('label', 'string');
            format.featureType = featureType;

            layer = format.processFeature(testData);
            stub.restore();
          });
        });

        describe("feature", function () {
          var feature;
          before(function () {
            feature = layer.feature;
          });

          it('should have feature property', function () {
            expect(feature).to.not.be.undefined;
          });

          it('should have id field with value "roads.1"', function () {
            expect(feature.id).to.equal("roads.1");
          });

          it('feature must have "properties" field object', function () {
            expect(feature.properties).to.not.be.undefined;
          });

          it('should not have propetry "the_geom"', function () {
            expect(feature.properties.the_geom).to.be.undefined;
          });

          it('should have property cat with value 5, and property label with value "unimproved road"', function () {
            var cat = feature.properties.cat;
            expect(cat).to.equal(5);

            var label = feature.properties.label;
            expect(label).to.equal("unimproved road");
          });
        });
      });
    });
  });
});
