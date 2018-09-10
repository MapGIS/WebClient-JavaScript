/**
 * Created by PRadostev on 08.06.2015.
 */

var parseXml = function (xmlString) {
  var fullXml = '<?xml version="1.0" encoding="UTF-8"?><root xmlns:gml="http://www.opengis.net/gml">' + xmlString + '</root>';
  return L.XmlUtil.parseXml(fullXml).documentElement.firstChild;
};
