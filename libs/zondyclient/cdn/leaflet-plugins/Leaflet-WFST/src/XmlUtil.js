L.XmlUtil = {
  namespaces: {
    xlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    xsd: 'http://www.w3.org/2001/XMLSchema',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    wfs: 'http://www.opengis.net/wfs',
    gml: 'http://www.opengis.net/gml',
    ogc: 'http://www.opengis.net/ogc',
    ows: 'http://www.opengis.net/ows'
  },

  // TODO: find another way to create a new document with doctype text/xml?
  xmldoc: (new DOMParser()).parseFromString('<root />', 'text/xml'),

  setAttributes: function (node, attributes) {
    for (var name in attributes) {
      if (attributes[name] != null && attributes[name].toString) {
        var value = attributes[name].toString();
        var uri = this.namespaces[name.substring(0, name.indexOf(':'))] || null;
        node.setAttributeNS(uri, name, value);
      }
    }
  },

  evaluate: function (xpath, rawxml) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(rawxml, 'text/xml');
    var xpe = new XPathEvaluator();
    var nsResolver = xpe.createNSResolver(xmlDoc.documentElement);

    return xpe.evaluate(xpath, xmlDoc, nsResolver, XPathResult.ANY_TYPE, null);
  },

  createElementNS: function (name, attributes, options) {
    options = options || {};

    var uri = options.uri;

    if (!uri) {
      uri = this.namespaces[name.substring(0, name.indexOf(':'))];
    }

    if (!uri) {
      uri = this.namespaces[options.prefix];
    }

    var node = uri ? this.xmldoc.createElementNS(uri, name) : this.xmldoc.createElement(name);

    if (attributes) {
      this.setAttributes(node, attributes);
    }

    if (options.value != null) {
      node.appendChild(this.xmldoc.createTextNode(options.value));
    }

    return node;
  },

  createTextNode: function (value) {
    if (value ||
      value === 0) {

      return this.xmldoc.createTextNode(value);
    }

    return this.xmldoc.createTextNode('');
  },

  getNodeText: function (node) {
    if (!node) {
      return '';
    }

    return node.innerText || node.textContent || node.text;
  },

  serializeXmlDocumentString: function (node) {
    var doc = document.implementation.createDocument('', '', null);
    doc.appendChild(node);
    var serializer = new XMLSerializer();
    return serializer.serializeToString(doc);
  },

  serializeXmlToString: function (node) {
    var serializer = new XMLSerializer();
    return serializer.serializeToString(node);
  },

  parseXml: function (rawXml) {
    if (typeof window.DOMParser !== 'undefined') {
      return (new window.DOMParser()).parseFromString(rawXml, 'text/xml');
    } else if (typeof window.ActiveXObject !== 'undefined' && new window.ActiveXObject('Microsoft.XMLDOM')) {
      var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
      xmlDoc.async = 'false';
      xmlDoc.loadXML(rawXml);
      return xmlDoc;
    } else {
      throw new Error('No XML parser found');
    }
  },

  parseOwsExceptionReport: function (rawXml) {
    var exceptionReportElement = L.XmlUtil.parseXml(rawXml).documentElement;
    if (!exceptionReportElement || exceptionReportElement.tagName !== 'ows:ExceptionReport') {
      return null;
    }

    var exceptionReport = {
      exceptions: [],
      message: ''
    };

    var exceptionsNodes = exceptionReportElement.getElementsByTagNameNS(L.XmlUtil.namespaces.ows, 'Exception');
    for (var i = 0, exceptionsNodesCount = exceptionsNodes.length; i < exceptionsNodesCount; i++) {
      var exceptionNode = exceptionsNodes[i];
      var exceptionCode = exceptionNode.getAttribute('exceptionCode');
      var exceptionsTextNodes = exceptionNode.getElementsByTagNameNS(L.XmlUtil.namespaces.ows, 'ExceptionText');
      var exception = {
        code: exceptionCode,
        text: ''
      };

      for (var j = 0, textNodesCount = exceptionsTextNodes.length; j < textNodesCount; j++) {
        var exceptionTextNode = exceptionsTextNodes[j];
        var exceptionText = exceptionTextNode.innerText || exceptionTextNode.textContent || exceptionTextNode.text;

        exception.text += exceptionText;
        if (j < textNodesCount - 1) {
          exception.text += '. ';
        }
      }

      exceptionReport.message += exception.code + ' - ' + exception.text;
      if (i < exceptionsNodesCount - 1) {
        exceptionReport.message += ' ';
      }

      exceptionReport.exceptions.push(exception);
    }

    return exceptionReport;
  }
};
