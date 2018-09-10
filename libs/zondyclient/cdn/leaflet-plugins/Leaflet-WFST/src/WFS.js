/**
 * Created by PRadostev on 28.01.2015.
 */
L.WFS = L.FeatureGroup.extend({

  _capabilities: null,

  _boundingBox: null,

  options: {
    crs: L.CRS.EPSG3857,
    showExisting: true,
    geometryField: 'Shape',
    url: '',
    version: '1.1.0',
    typeNS: '',
    typeName: '',
    typeNSName: '',
    maxFeatures: null,
    filter: null,
    opacity: 1,
    fillOpacity: 1,
    style: {
      color: 'black',
      weight: 1,
      opacity: 1,
      fillOpacity: 1
    },
    namespaceUri: ''
  },

  state: {},

  initialize: function (options, readFormat) {
    L.setOptions(this, options);

    this.state = {
      exist: 'exist'
    };

    this._layers = {};

    this.readFormat = readFormat || new L.Format.GML({
      crs: this.options.crs,
      geometryField: this.options.geometryField
    });

    this.options.typeNSName = this.namespaceName(this.options.typeName);
    this.options.srsName = this.options.crs.code;

    this._updateOpacity();

    var that = this;
    this.describeFeatureType(function () {
      if (that.options.showExisting) {
        that.loadFeatures(that.options.filter);
      }
    }, function (errorMessage) {
      that.fire('error', {
        error: new Error(errorMessage)
      });
    });
  },

  namespaceName: function (name) {
    return this.options.typeNS + ':' + name;
  },

  describeFeatureType: function (successCallback, errorCallback) {
    var requestData = L.XmlUtil.createElementNS('wfs:DescribeFeatureType', {
      service: 'WFS',
      version: this.options.version
    });
    requestData.appendChild(L.XmlUtil.createElementNS('TypeName', {}, {
      value: this.options.typeNSName
    }));

    var that = this;
    L.Util.request({
      url: this.options.url,
      data: L.XmlUtil.serializeXmlDocumentString(requestData),
      headers: this.options.headers || {},
      success: function (data) {
        // If some exception occur, WFS-service can response successfully, but with ExceptionReport,
        // and such situation must be handled.
        var exceptionReport = L.XmlUtil.parseOwsExceptionReport(data);
        if (exceptionReport) {
          if (typeof (errorCallback) === 'function') {
            errorCallback(exceptionReport.message);
          }

          return;
        }

        var xmldoc = L.XmlUtil.parseXml(data);
        var featureInfo = xmldoc.documentElement;
        that.readFormat.setFeatureDescription(featureInfo);
        that.options.namespaceUri = featureInfo.attributes.targetNamespace.value;
        if (typeof (successCallback) === 'function') {
          successCallback();
        }
      },
      error: function (errorMessage) {
        if (typeof (errorCallback) === 'function') {
          errorCallback(errorMessage);
        }
      }
    });
  },

  getFeature: function (filter) {
    var request = L.XmlUtil.createElementNS('wfs:GetFeature', {
      service: 'WFS',
      version: this.options.version,
      maxFeatures: this.options.maxFeatures,
      outputFormat: this.readFormat.outputFormat
    });

    var query = request.appendChild(L.XmlUtil.createElementNS('wfs:Query', {
      typeName: this.options.typeNSName,
      srsName: this.options.srsName
    }));

    if (filter) {
      query.appendChild(L.filter(filter));
    }

    return request;
  },

  loadFeatures: function (filter) {
    var that = this;
    L.Util.request({
      url: this.options.url,
      data: L.XmlUtil.serializeXmlDocumentString(that.getFeature(filter)),
      headers: this.options.headers || {},
      success: function (responseText) {
        // If some exception occur, WFS-service can response successfully, but with ExceptionReport,
        // and such situation must be handled.
        var exceptionReport = L.XmlUtil.parseOwsExceptionReport(responseText);
        if (exceptionReport) {
          that.fire('error', {
            error: new Error(exceptionReport.message)
          });

          return that;
        }

        // Request was truly successful (without exception report),
        // so convert response to layers.
        var layers = that.readFormat.responseToLayers(responseText, {
          coordsToLatLng: that.options.coordsToLatLng,
          pointToLayer: that.options.pointToLayer
        });

        if (typeof that.options.style === "function") {
          layers.forEach(function (element) {
            element.state = that.state.exist;
            if (element.setStyle) {
              element.setStyle(that.options.style(element));
            }
            that.addLayer(element);
          });
        } else {
          layers.forEach(function (element) {
            element.state = that.state.exist;
            that.addLayer(element);
          });
          that.setStyle(that.options.style);
        }

        that.fire('load', {
          responseText: responseText
        });

        return that;
      },
      error: function (errorMessage) {
        that.fire('error', {
          error: new Error(errorMessage)
        });

        return that;
      }
    });
  },

  getCapabilities: function (successCallback, errorCallback) {
    var capabilities = this._capabilities;

    // Check if capabilities were already received & cached.
    if (capabilities) {
      if (typeof (successCallback) === 'function') {
        successCallback(capabilities);

        return;
      }
    }

    var requestData = L.XmlUtil.createElementNS('wfs:GetCapabilities', {
      service: 'WFS',
      version: this.options.version
    });

    var that = this;
    L.Util.request({
      url: this.options.url,
      data: L.XmlUtil.serializeXmlDocumentString(requestData),
      headers: this.options.headers || {},
      success: function (data) {
        // If some exception occur, WFS-service can response successfully, but with ExceptionReport,
        // and such situation must be handled.
        var exceptionReport = L.XmlUtil.parseOwsExceptionReport(data);
        if (exceptionReport) {
          if (typeof (errorCallback) === 'function') {
            errorCallback(new Error(exceptionReport.message));
          }

          return;
        }

        try {
          // Request was truly successful (without exception report), parse WFS_Capabilities.
          capabilities = L.XmlUtil.parseXml(data).documentElement;
        } catch (error) {
          // If parsing failed.
          if (typeof (errorCallback) === 'function') {
            errorCallback(error);
          }

          return;
        }

        // Cache received capabilities.
        that._capabilities = capabilities;

        if (typeof (successCallback) === 'function') {
          successCallback(capabilities);
        }
      },
      error: function (errorMessage) {
        if (typeof (errorCallback) === 'function') {
          errorCallback(new Error(errorMessage));
        }
      }
    });
  },

  getBoundingBox: function (successCallback, errorCallback) {
    var boundingBox = this._boundingBox;

    // Check if bounding box was already received & cached.
    if (boundingBox) {
      if (typeof (successCallback) === 'function') {
        successCallback(boundingBox);

        return;
      }
    }

    var that = this;
    this.getCapabilities(function (capabilities) {
      var featureTypeListElement = capabilities.getElementsByTagName('FeatureTypeList')[0];

      // Extract all 'FeatureType' nodes to list.
      var featureTypeList = featureTypeListElement.getElementsByTagName('FeatureType');

      for (var i = 0, len = featureTypeList.length; i < len; i++) {
        var featureType = featureTypeList[i];

        // Extract current FeatureType's name.
        var featureTypeNSName = L.XmlUtil.getNodeText(featureType.getElementsByTagName('Name')[0]);

        // Find node with current layer instance's name and namespace.
        if (featureTypeNSName === that.options.typeNSName) {
          // The <WGS84BoundingBox> element is used to indicate the edges of an
          // enclosing rectangle in decimal degrees of latitude and longitude in WGS84.
          var wgs84BoundingBox = featureType.getElementsByTagNameNS(L.XmlUtil.namespaces.ows, 'WGS84BoundingBox')[0];
          var lowerCornerElement = wgs84BoundingBox.getElementsByTagNameNS(L.XmlUtil.namespaces.ows, 'LowerCorner')[0];
          var upperCornerElement = wgs84BoundingBox.getElementsByTagNameNS(L.XmlUtil.namespaces.ows, 'UpperCorner')[0];

          // Corner node's inner text format is like '-74.047185 40.679648', Lng and Lat with a space between.
          var lowerCorner = L.XmlUtil.getNodeText(lowerCornerElement);
          var upperCorner = L.XmlUtil.getNodeText(upperCornerElement);

          // Extract LngLats and reverse it to LatLngs.
          var sw = lowerCorner.split(' ').reverse();
          var ne = upperCorner.split(' ').reverse();

          // Wrap it into LatLngBounds.
          boundingBox = L.latLngBounds([sw, ne]);

          break;
        }
      }

      // Cache received and calculated bounding box.
      that._boundingBox = boundingBox;

      if (typeof (successCallback) === 'function') {
        successCallback(boundingBox);
      }
    }, function (errorMessage) {
      if (typeof (errorCallback) === 'function') {
        errorCallback(new Error(errorMessage));
      }
    });
  },

  setOpacity: function (opacity, fillOpacity) {
    this.options.opacity = opacity;
    this.options.fillOpacity = fillOpacity || opacity;

    this._updateOpacity();

    return this;
  },

  _updateOpacity: function () {
    var style = L.extend(this.options.style || {}, {
      opacity: this.options.opacity,
      fillOpacity: this.options.fillOpacity
    });

    this.setStyle(style);
  }
});

L.wfs = function (options, readFormat) {
  return new L.WFS(options, readFormat);
};
