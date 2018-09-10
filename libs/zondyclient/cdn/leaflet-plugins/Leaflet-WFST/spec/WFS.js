describe('WFS', function () {
  var describeFeaturesReponseText = '<xsd:schema ' +
    'xmlns:gml="http://www.opengis.net/gml" ' +
    'xmlns:maps="http://boundlessgeo.com" ' +
    'xmlns:nasa="http://nasa.gov" ' +
    'xmlns:ne="http://naturalearthdata.com" ' +
    'xmlns:nurc="http://www.nurc.nato.int" ' +
    'xmlns:og="http://opengeo.org" ' +
    'xmlns:osm="http://openstreemap.org" ' +
    'xmlns:topp="http://www.openplans.org/topp" ' +
    'xmlns:usgs="http://www.usgs.gov/" ' +
    'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
    'elementFormDefault="qualified" ' +
    'targetNamespace="http://www.openplans.org/topp"> ' +
    '<xsd:import namespace="http://www.opengis.net/gml" schemaLocation="http://demo.opengeo.org:80/geoserver/schemas/gml/3.1.1/base/gml.xsd"/>' +
    '<xsd:complexType name="tasmania_citiesType">' +
    '<xsd:complexContent>' +
    '<xsd:extension base="gml:AbstractFeatureType">' +
    '<xsd:sequence>' +
    '<xsd:element maxOccurs="1" minOccurs="0" name="the_geom" nillable="true" type="gml:MultiPointPropertyType"/>' +
    '<xsd:element maxOccurs="1" minOccurs="0" name="CITY_NAME" nillable="true" type="xsd:string"/>' +
    '<xsd:element maxOccurs="1" minOccurs="0" name="ADMIN_NAME" nillable="true" type="xsd:string"/>' +
    '<xsd:element maxOccurs="1" minOccurs="0" name="CNTRY_NAME" nillable="true" type="xsd:string"/>' +
    '<xsd:element maxOccurs="1" minOccurs="0" name="STATUS" nillable="true" type="xsd:string"/>' +
    '<xsd:element maxOccurs="1" minOccurs="0" name="POP_CLASS" nillable="true" type="xsd:string"/>' +
    '</xsd:sequence>' +
    '</xsd:extension>' +
    '</xsd:complexContent>' +
    '</xsd:complexType>' +
    '<xsd:element name="tasmania_cities" substitutionGroup="gml:_Feature" type="topp:tasmania_citiesType"/>' +
    '</xsd:schema>';

  var getFeatureResponseText = '<wfs:FeatureCollection ' +
    'xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
    'xmlns:nasa="http://nasa.gov" ' +
    'xmlns:ogc="http://www.opengis.net/ogc" ' +
    'xmlns:maps="http://boundlessgeo.com" ' +
    'xmlns:topp="http://www.openplans.org/topp" ' +
    'xmlns:wfs="http://www.opengis.net/wfs" ' +
    'xmlns:ne="http://naturalearthdata.com" ' +
    'xmlns:ows="http://www.opengis.net/ows" ' +
    'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
    'xmlns:gml="http://www.opengis.net/gml" ' +
    'xmlns:osm="http://openstreemap.org" ' +
    'xmlns:nurc="http://www.nurc.nato.int" ' +
    'xmlns:og="http://opengeo.org" ' +
    'xmlns:usgs="http://www.usgs.gov/" ' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'numberOfFeatures="1">' +
    '<gml:boundedBy>' +
    '<gml:Envelope srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">' +
    '<gml:lowerCorner>147.2910004483 -42.851001816890005</gml:lowerCorner>' +
    '<gml:upperCorner>147.2910004483 -42.851001816890005</gml:upperCorner>' +
    '</gml:Envelope>' +
    '</gml:boundedBy>' +
    '<gml:featureMembers>' +
    '<topp:tasmania_cities gml:id="tasmania_cities.1">' +
    '<gml:boundedBy>' +
    '<gml:Envelope srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">' +
    '<gml:lowerCorner>147.2910004483 -42.851001816890005</gml:lowerCorner>' +
    '<gml:upperCorner>147.2910004483 -42.851001816890005</gml:upperCorner>' +
    '</gml:Envelope>' +
    '</gml:boundedBy>' +
    '<topp:the_geom>' +
    '<gml:MultiPoint srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">' +
    '<gml:pointMember>' +
    '<gml:Point srsDimension="2">' +
    '<gml:pos>147.2910004483 -42.851001816890005</gml:pos>' +
    '</gml:Point>' +
    '</gml:pointMember>' +
    '</gml:MultiPoint>' +
    '</topp:the_geom>' +
    '<topp:CITY_NAME>Hobart</topp:CITY_NAME>' +
    '<topp:ADMIN_NAME>Tasmania</topp:ADMIN_NAME>' +
    '<topp:CNTRY_NAME>Australia</topp:CNTRY_NAME>' +
    '<topp:STATUS>Provincial capital</topp:STATUS>' +
    '<topp:POP_CLASS>100,000 to 250,000</topp:POP_CLASS>' +
    '</topp:tasmania_cities>' +
    '</gml:featureMembers>' +
    '</wfs:FeatureCollection>';

  var getCapabilitiesResponseText =
    '<wfs:WFS_Capabilities ' +
    'xmlns="http://www.opengis.net/wfs" ' +
    'xmlns:ows="http://www.opengis.net/ows" ' +
    'xmlns:wfs="http://www.opengis.net/wfs" ' +
    'xmlns:ogc="http://www.opengis.net/ogc" ' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    '<FeatureTypeList>' +
    '<FeatureType xmlns:ics="http://geoserver.ics.perm.ru">' +
    '<Name>ics:water_polygon_all</Name>' +
    '<WGS84BoundingBox>' +
    '<LowerCorner>51.9373658 56.1549586</LowerCorner>' +
    '<UpperCorner>59.4000255784893 61.489845980256874</UpperCorner>' +
    '</WGS84BoundingBox>' +
    '</FeatureType>' +
    '<FeatureType xmlns:ics="http://geoserver.ics.perm.ru">' +
    '<Name>ics:zayavki</Name>' +
    '<ows:WGS84BoundingBox>' +
    '<ows:LowerCorner>39.0 42.0</ows:LowerCorner>' +
    '<ows:UpperCorner>41.0 45.0</ows:UpperCorner>' +
    '</ows:WGS84BoundingBox>' +
    '</FeatureType>' +
    '</FeatureTypeList>' +
    '<ows:ServiceIdentification></ows:ServiceIdentification>' +
    '<ows:ServiceProvider></ows:ServiceProvider>' +
    '<ows:OperationsMetadata></ows:OperationsMetadata>' +
    '<ogc:Filter_Capabilities></ogc:Filter_Capabilities>' +
    '</wfs:WFS_Capabilities>';

  var capabilitiesRequiredTags = ['FeatureTypeList', 'ows:ServiceIdentification', 'ows:ServiceProvider', 'ows:OperationsMetadata', 'ogc:Filter_Capabilities'];

  var exceptionReportResponseText = '<ows:ExceptionReport ' +
    'xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
    'xmlns:ows="http://www.opengis.net/ows" ' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    '<ows:Exception exceptionCode="404">' +
    '<ows:ExceptionText>Not Found</ows:ExceptionText>' +
    '</ows:Exception>' +
    '</ows:ExceptionReport>';

  describe('#getFeature', function () {
    var feature;

    before(function () {
      var TestFilter = L.Filter.Abstract.extend({
        tagName: 'testFilter',
        buildFilterContent: function () {}
      });

      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        geometryField: 'the_geom',
        namespaceUri: 'testUri',
        maxFeatures: 5000
      };

      sinon.stub(L.WFS, 'describeFeatureType');

      var wfs = new L.WFS(options);
      feature = wfs.getFeature(new TestFilter());
    });

    it('should return Element object with tagName=GetFeature and must have attiributes "service" and "version"', function () {
      expect(feature).to.be.instanceOf(Element);
      expect(feature.tagName).to.be.equal('wfs:GetFeature');
      expect(feature.getAttribute('service')).to.be.not.undefined;
      expect(feature.getAttribute('version')).to.be.not.undefined;
    });

    it('should return value of maxFeatures', function () {
      expect(feature.getAttribute('maxFeatures')).to.be.equal('5000');
    });

    it('should have child Element with tagName wfs:Query and attribute "typeName"', function () {
      var query = feature.firstChild;
      expect(query.tagName).to.be.equal('wfs:Query');
      expect(query.getAttribute('typeName')).to.be.equal('topp:tasmania_cities');
    });

    it('should have ogc:Filter element as child of query', function () {
      var filter = feature.firstChild.firstChild;
      expect(filter.tagName).to.be.equal('ogc:Filter');
    });
  });

  describe('#error event', function () {
    var server;

    beforeEach(function () {
      // Create fake XHR.
      server = sinon.fakeServer.create();
    });

    afterEach(function () {
      // Restore original XHR.
      server.restore();
    });

    it('should trigger \'error\' event if \'DescribeFeatureType\' request failed', function () {
      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        crs: L.CRS.EPSG4326,
        geometryField: 'the_geom'
      };

      // Prepare a handler for fake server possible requests.
      server.respondWith(function (xhr, id) {
        if (
          xhr.method === 'POST' &&
          xhr.requestBody.indexOf('<wfs:DescribeFeatureType') === 0 &&
          new RegExp(options.url + '.*', 'gi').test(xhr.url)) {

          xhr.respond(404, {
            'Content-Type': 'text/html'
          }, 'Not Found');
          return;
        }

        throw new Error('Unexpected request');
      });

      // Create layer & attach evens handlers.
      var onLoadEventHandler = sinon.spy();
      var onErrorEventHandler = sinon.spy();
      var wfs = new L.WFS(options)
        .on('load', onLoadEventHandler)
        .on('error', onErrorEventHandler);

      // Force fake server to respond on sended requests.
      server.respond();

      // Check events handlers.
      expect(onLoadEventHandler).to.be.not.notCalled;
      expect(onErrorEventHandler).to.be.calledOnce;

      var eventObject = onErrorEventHandler.getCall(0).args[0];
      var error = eventObject.error;
      expect(error).to.be.instanceOf(Error).and.have.property('message', 'Not Found');
    });

    it('should trigger \'error\' event if \'DescribeFeatureType\' request succeed but with ExceptionReport', function () {
      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        crs: L.CRS.EPSG4326,
        geometryField: 'the_geom'
      };

      // Prepare a handler for fake server possible requests.
      server.respondWith(function (xhr, id) {
        if (
          xhr.method === 'POST' &&
          xhr.requestBody.indexOf('<wfs:DescribeFeatureType') === 0 &&
          new RegExp(options.url + '.*', 'gi').test(xhr.url)) {

          xhr.respond(200, {
            'Content-Type': 'text/xml'
          }, exceptionReportResponseText);
          return;
        }

        throw new Error('Unexpected request');
      });

      // Create layer & attach evens handlers.
      var onLoadEventHandler = sinon.spy();
      var onErrorEventHandler = sinon.spy();
      var wfs = new L.WFS(options)
        .on('load', onLoadEventHandler)
        .on('error', onErrorEventHandler);

      // Force fake server to respond on sended requests.
      server.respond();

      // Check events handlers.
      expect(onLoadEventHandler).to.be.notCalled;
      expect(onErrorEventHandler).to.be.calledOnce;

      var eventObject = onErrorEventHandler.getCall(0).args[0];
      var error = eventObject.error;
      expect(error).to.be.instanceOf(Error).and.have.property('message', '404 - Not Found');
    });

    it('should trigger \'error\' event if \'DescribeFeatureType\' request succeed, but \'GetFeature\' request failed', function () {
      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        crs: L.CRS.EPSG4326,
        geometryField: 'the_geom',
        showExisting: true
      };

      // Prepare a handler for fake server possible requests.
      server.respondWith(function (xhr, id) {
        if (xhr.method === 'POST' && new RegExp(options.url + '.*', 'gi').test(xhr.url)) {
          if (xhr.requestBody.indexOf('<wfs:DescribeFeatureType') === 0) {
            xhr.respond(200, {
              'Content-Type': 'text/xml'
            }, describeFeaturesReponseText);
            return;
          } else if (xhr.requestBody.indexOf('<wfs:GetFeature') === 0) {
            xhr.respond(404, {
              'Content-Type': 'text/html'
            }, 'Not found');
            return;
          }
        }

        throw new Error('Unexpected request');
      });

      // Create layer & attach evens handlers.
      var onLoadEventHandler = sinon.spy();
      var onErrorEventHandler = sinon.spy();
      var wfs = new L.WFS(options)
        .on('load', onLoadEventHandler)
        .on('error', onErrorEventHandler);

      // Force fake server to respond on 'DescribeFeatures' request.
      server.respond();
      expect(onLoadEventHandler).to.be.notCalled;
      expect(onErrorEventHandler.notCalled).to.be.notCalled;

      // Force fake server to respond on 'GetFeature' request (which will be sended automatically when 'DescribeFeatures' request succeed).
      server.respond();

      // Check events handlers.
      expect(onLoadEventHandler).to.be.notCalled;
      expect(onErrorEventHandler).to.be.calledOnce;

      var eventObject = onErrorEventHandler.getCall(0).args[0];
      var error = eventObject.error;
      expect(error).to.be.instanceOf(Error).and.have.property('message', 'Not found');
    });

    it('should trigger \'error\' event if \'DescribeFeatureType\' request succeed, but \'GetFeature\' request succeed with ExceptionReport', function () {
      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        crs: L.CRS.EPSG4326,
        geometryField: 'the_geom',
        showExisting: true
      };

      // Prepare a handler for fake server possible requests.
      server.respondWith(function (xhr, id) {
        if (xhr.method === 'POST' && new RegExp(options.url + '.*', 'gi').test(xhr.url)) {
          if (xhr.requestBody.indexOf('<wfs:DescribeFeatureType') === 0) {
            xhr.respond(200, {
              'Content-Type': 'text/xml'
            }, describeFeaturesReponseText);
            return;
          } else if (xhr.requestBody.indexOf('<wfs:GetFeature') === 0) {
            xhr.respond(200, {
              'Content-Type': 'text/xml'
            }, exceptionReportResponseText);
            return;
          }
        }

        throw new Error('Unexpected request');
      });

      // Create layer & attach evens handlers.
      var onLoadEventHandler = sinon.spy();
      var onErrorEventHandler = sinon.spy();
      var wfs = new L.WFS(options)
        .on('load', onLoadEventHandler)
        .on('error', onErrorEventHandler);

      // Force fake server to respond on 'DescribeFeatures' request.
      server.respond();
      expect(onLoadEventHandler).to.be.notCalled;
      expect(onErrorEventHandler).to.be.notCalled;

      // Force fake server to respond on 'GetFeature' request (which will be sended automatically when 'DescribeFeatures' request succeed).
      server.respond();

      // Check events handlers.
      expect(onLoadEventHandler).to.be.notCalled;
      expect(onErrorEventHandler).to.be.calledOnce;

      var eventObject = onErrorEventHandler.getCall(0).args[0];
      var error = eventObject.error;
      expect(error).to.be.instanceOf(Error).and.have.property('message', '404 - Not Found');
    });

    it('should trigger \'load\' event if \'DescribeFeatureType\' request succeed, and \'GetFeature\' request succeed', function () {
      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        crs: L.CRS.EPSG4326,
        geometryField: 'the_geom',
        showExisting: true
      };

      // Prepare a handler for fake server possible requests.
      server.respondWith(function (xhr, id) {
        if (xhr.method === 'POST' && new RegExp(options.url + '.*', 'gi').test(xhr.url)) {
          if (xhr.requestBody.indexOf('<wfs:DescribeFeatureType') === 0) {
            xhr.respond(200, {
              'Content-Type': 'text/xml'
            }, describeFeaturesReponseText);
            return;
          } else if (xhr.requestBody.indexOf('<wfs:GetFeature') === 0) {
            xhr.respond(200, {
              'Content-Type': 'text/xml'
            }, getFeatureResponseText);
            return;
          } else if (xhr.requestBody.indexOf('<wfs:GetCapabilities') === 0) {
            xhr.respond(200, {
              'Content-Type': 'text/xml'
            }, getCapabilitiesResponseText);
            return;
          }
        }

        throw new Error('Unexpected request');
      });

      // Create layer & attach evens handlers.
      var onLoadEventHandler = sinon.spy();
      var onErrorEventHandler = sinon.spy();
      var wfs = new L.WFS(options)
        .on('load', onLoadEventHandler)
        .on('error', onErrorEventHandler);

      // Force fake server to respond on 'DescribeFeatures' request.
      server.respond();
      expect(onLoadEventHandler).to.be.notCalled;
      expect(onErrorEventHandler).to.be.notCalled;

      // Force fake server to respond on 'GetFeature' request (which will be sended automatically when 'DescribeFeatures' request succeed).
      server.respond();

      // Check events handlers.
      expect(onLoadEventHandler).to.be.calledWithMatch({
        responseText: getFeatureResponseText
      });
      expect(onErrorEventHandler).to.be.notCalled;
    });
  });

  describe('#setOpacity', function () {
    var options1;
    var options2;

    beforeEach(function () {
      options1 = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        geometryField: 'the_geom',
        namespaceUri: 'testUri',
        maxFeatures: 5000
      };

      options2 = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        geometryField: 'the_geom',
        namespaceUri: 'testUri',
        maxFeatures: 5000,
        opacity: 0.8,
        fillOpacity: 0.8
      };
    });

    it('layer should have opacity equals 1 if no initialization option provided', function () {
      var wfs = new L.WFS(options1);
      expect(wfs.options.opacity).to.be.equal(1);
      expect(wfs.options.style.opacity).to.be.equal(1);
      expect(wfs.options.style.fillOpacity).to.be.equal(1);
    });

    it('layer should have opacity equals initialization option provided', function () {
      var wfs = new L.WFS(options2);
      expect(wfs.options.opacity).to.be.equal(0.8);
      expect(wfs.options.style.opacity).to.be.equal(0.8);
      expect(wfs.options.style.fillOpacity).to.be.equal(0.8);
    });

    it('layer should have opacity equals setOpacity method\' argument provided', function () {
      var wfs = new L.WFS(options1);
      wfs.setOpacity(0.5);

      expect(wfs.options.opacity).to.be.equal(0.5);
      expect(wfs.options.style.opacity).to.be.equal(0.5);
      expect(wfs.options.style.fillOpacity).to.be.equal(0.5);

      wfs = new L.WFS(options2);
      wfs.setOpacity(1);

      expect(wfs.options.opacity).to.be.equal(1);
      expect(wfs.options.style.opacity).to.be.equal(1);
      expect(wfs.options.style.fillOpacity).to.be.equal(1);
    });
  });

  describe('#getCapabilities', function () {
    var server;
    var capabilityElement;
    var successCallback;
    var wfs;

    beforeEach(function () {
      // Create fake XHR.
      server = sinon.fakeServer.create();

      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        geometryField: 'the_geom',
        namespaceUri: 'testUri',
        maxFeatures: 5000
      };

      // Prepare a handler for fake server possible requests.
      server.respondWith(function (xhr, id) {
        if (xhr.requestBody.indexOf('<wfs:DescribeFeatureType') === 0) {
          xhr.respond(200, {
            'Content-Type': 'text/xml'
          }, describeFeaturesReponseText);
          return;
        } else if (xhr.requestBody.indexOf('<wfs:GetFeature') === 0) {
          xhr.respond(200, {
            'Content-Type': 'text/xml'
          }, getFeatureResponseText);
          return;
        } else if (xhr.requestBody.indexOf('<wfs:GetCapabilities') === 0) {
          xhr.respond(200, {
            'Content-Type': 'text/xml'
          }, getCapabilitiesResponseText);
          return;
        }

        throw new Error('Unexpected request');
      });

      // Prepare 'successCallback' callback.
      successCallback = sinon.spy();

      wfs = new L.WFS(options);

      wfs.getCapabilities(successCallback);

      // Force fake server to respond on sended requests.
      server.respond();

      capabilityElement = successCallback.getCall(0).args[0];
    });

    afterEach(function () {
      // Restore original XHR.
      server.restore();
    });

    it('should return Element object with tagName=wfs:WFS_Capabilities', function () {
      expect(capabilityElement).to.be.instanceOf(Element);
      expect(capabilityElement.tagName).to.be.equal('wfs:WFS_Capabilities');
    });

    it('should return node with ows:ServiceIdentification, ows:ServiceProvider, ows:OperationsMetadata, FeatureTypeList, ogc:Filter_Capabilities childnodes',
      function () {
        var childnodes = capabilityElement.childNodes;

        // Check retrieved elements.
        for (var i = 0, len = childnodes.length; i < len; i++) {
          expect(capabilitiesRequiredTags.indexOf(childnodes[i].tagName) >= 0).to.be.equal(true);
        }
      });

    it('caches received capabilities', function () {
      expect(successCallback.calledOnce).to.be.equal(true);
      expect(wfs._capabilities).to.be.deep.equal(capabilityElement);

      wfs.getCapabilities(successCallback);
      var capabilityElement2 = successCallback.getCall(1).args[0];

      expect(successCallback.calledTwice).to.be.equal(true);
      expect(capabilityElement).to.be.deep.equal(capabilityElement2);
    });
  });

  describe('#errorCallback', function () {
    var server;

    beforeEach(function () {
      // Create fake XHR.
      server = sinon.fakeServer.create();
    });

    afterEach(function () {
      // Restore original XHR.
      server.restore();
    });

    it('should trigger \'errorCallback\' if \'GetCapabilities\' request failed', function () {
      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        crs: L.CRS.EPSG4326,
        geometryField: 'the_geom'
      };

      // Prepare a handler for fake server possible requests.
      server.respondWith(function (xhr, id) {
        if (
          xhr.method === 'POST' &&
          xhr.requestBody.indexOf('<wfs:GetCapabilities') === 0 &&
          new RegExp(options.url + '.*', 'gi').test(xhr.url)) {

          xhr.respond(404, {
            'Content-Type': 'text/html'
          }, 'Not Found');
          return;
        }
      });

      // Create layer & attach evens handlers.
      var successCallback = sinon.spy();
      var errorCallback = sinon.spy();

      var wfs = new L.WFS(options);
      wfs.getCapabilities(successCallback, errorCallback);

      // Force fake server to respond on sended requests.
      server.respond();

      // Check events handlers.
      expect(successCallback.notCalled).to.be.equal(true);
      expect(errorCallback.calledOnce).to.be.equal(true);

      var error = errorCallback.getCall(0).args[0];
      expect(error).to.be.instanceOf(Error).and.have.property('message', 'Not Found');
    });

    it('should trigger \'errorCallback\' if \'GetCapabilities\' request succeed but with ExceptionReport', function () {
      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'topp',
        typeName: 'tasmania_cities',
        crs: L.CRS.EPSG4326,
        geometryField: 'the_geom'
      };

      // Prepare a handler for fake server possible requests.
      server.respondWith(function (xhr, id) {
        if (
          xhr.method === 'POST' &&
          xhr.requestBody.indexOf('<wfs:GetCapabilities') === 0 &&
          new RegExp(options.url + '.*', 'gi').test(xhr.url)) {

          xhr.respond(200, {
            'Content-Type': 'text/xml'
          }, exceptionReportResponseText);
          return;
        }
      });

      // Create layer & attach evens handlers.
      var successCallback = sinon.spy();
      var errorCallback = sinon.spy();

      var wfs = new L.WFS(options);
      wfs.getCapabilities(successCallback, errorCallback);

      // Force fake server to respond on sended requests.
      server.respond();

      // Check events handlers.
      expect(successCallback.notCalled).to.be.equal(true);
      expect(errorCallback.calledOnce).to.be.equal(true);

      var error = errorCallback.getCall(0).args[0];
      expect(error).to.be.instanceOf(Error).and.have.property('message', '404 - Not Found');
    });
  });

  describe('#getBoundingBox', function () {
    var server;
    var bounds;
    var successCallback;
    var wfs;

    beforeEach(function () {
      // Create fake XHR.
      server = sinon.fakeServer.create();

      var options = {
        url: 'http://demo.opengeo.org/geoserver/ows',
        typeNS: 'ics',
        typeName: 'zayavki',
        geometryField: 'the_geom',
        namespaceUri: 'testUri',
        maxFeatures: 5000
      };

      // Prepare a handler for fake server possible requests.
      server.respondWith(function (xhr, id) {
        if (xhr.requestBody.indexOf('<wfs:DescribeFeatureType') === 0) {
          xhr.respond(200, {
            'Content-Type': 'text/xml'
          }, describeFeaturesReponseText);
          return;
        } else if (xhr.requestBody.indexOf('<wfs:GetFeature') === 0) {
          xhr.respond(200, {
            'Content-Type': 'text/xml'
          }, getFeatureResponseText);
          return;
        } else if (xhr.requestBody.indexOf('<wfs:GetCapabilities') === 0) {
          xhr.respond(200, {
            'Content-Type': 'text/xml'
          }, getCapabilitiesResponseText);
          return;
        }

        throw new Error('Unexpected request');
      });

      // Prepare 'successCallback' callback.
      successCallback = sinon.spy();

      wfs = new L.WFS(options);

      wfs.getBoundingBox(successCallback);

      // Force fake server to respond on sended requests.
      server.respond();

      bounds = successCallback.getCall(0).args[0];
    });

    afterEach(function () {
      // Restore original XHR.
      server.restore();
    });

    it('returns valid LatLngBounds', function () {
      var latLngsBounds = L.latLngBounds([
        [42, 39],
        [45, 41]
      ]);

      expect(bounds.isValid()).to.be.equal(true);
      expect(bounds).to.be.deep.equal(latLngsBounds);
    });

    it('caches received bounding box', function () {
      expect(successCallback.calledOnce).to.be.equal(true);
      expect(wfs._boundingBox).to.be.deep.equal(bounds);

      wfs.getBoundingBox(successCallback);
      var bounds2 = successCallback.getCall(1).args[0];

      expect(successCallback.calledTwice).to.be.equal(true);
      expect(bounds).to.be.deep.equal(bounds2);
    });
  });
});
