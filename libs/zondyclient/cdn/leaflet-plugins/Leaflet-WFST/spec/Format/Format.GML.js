/**
 * Created by PRadostev on 09.06.2015.
 */

describe("L.Format.GML", function () {
  var format;

  before(function () {
    format = new L.Format.GML({crs: L.CRS.Simple});
  });

  var metas = [
    {
      tag: 'gml:Point',
      parser: L.GML.Point
    },
    {
      tag: 'gml:LineString',
      parser: L.GML.LineString
    },
    {
      tag: 'gml:Polygon',
      parser: L.GML.Polygon
    },
    {
      tag: 'gml:MultiLineString',
      parser: L.GML.MultiLineString
    },
    {
      tag: 'gml:MultiPolygon',
      parser: L.GML.MultiPolygon
    },
    {
      tag: 'gml:MultiCurve',
      parser: L.GML.MultiCurve
    },
    {
      tag: 'gml:MultiSurface',
      parser: L.GML.MultiSurface
    },
    {
      tag: 'gml:MultiPoint',
      parser: L.GML.MultiPoint
    }
  ];

  metas.forEach(function (meta) {
    it('should know how to parse ' + meta.tag, function () {
      var parser = format.parsers[meta.tag];
      expect(parser).to.be.instanceOf(meta.parser);
    });
  });
});
