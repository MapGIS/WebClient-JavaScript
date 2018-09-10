# Leaflet-WFST
[![Build Status](https://travis-ci.org/Flexberry/Leaflet-WFST.svg?branch=master)](https://travis-ci.org/Flexberry/Leaflet-WFST)

OGC WFS-T client layer for leaflet.

# Install plugin
Via [npm](https://www.npmjs.com/):
```
  npm i leaflet-wfst --save
```
Via [Bower](https://bower.io/):
```
  bower i leaflet-wfst --save
```
From [GitHub](https://github.com/):
```
  npm i -S git://github.com/Flexberry/Leaflet-WFST.git#v1.1.1
```
where #v1.1.1 is version of specific [release](https://github.com/Flexberry/Leaflet-WFST/releases).

# Initialization options

```javascript
   options: {
        crs: L.CRS.EPSG3857,
        showExisting: true,
        geometryField: 'Shape',
        url: '',
        typeNS: '',
        typeName: '',
        opacity: 1,
        style: {
            color: 'black',
            weight: 1
        }
    }

```

## Example
```javascript
const wfstPointOptions = {
  crs: L.CRS.EPSG4326,
  showExisting: true,
  geometryField: 'geom',
  url: `http://localhost:8080/geoserver/wfs`,
  typeNS: 'test',
  typeName: 'test',
  maxFeatures: 90,
  opacity: 1,
  style: function(layer) {
    // you can use if statemt etc
    return {
      color: 'black',
      weight: 1
    }
  },
};
const wfstPoint = new L.WFST(wfstPointOptions, new L.Format.GeoJSON({
  crs: L.CRS.EPSG4326,
  pointToLayer(geoJsonPoint, latlng) {
    const layer = new L.CircleMarker(latlng, {
      radius: 10,
    });
    return layer;
  },
}));
wfstPoint.addTo(map);
```

|option name|default|comment|
|-----------|-------|-------|
|crs|L.CRS.EPSG3857|spatial reference system for layer, should implement [ICRS](http://leafletjs.com/reference.html#icrs), for example [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) |
|showExisting|true|load existing features on create layer|
|geometryField|'Shape'|field for storing geometries, for non transaction services may be ommited|
|url|-|WFS url, for example http://demo.opengeo.org/geoserver/osm/ows
|typeNS|-|type namespace|
|typeName|-|type name|
|typeNSName|-|type namespace name|
|namespaceUri|-|namespace URI|
|opacity|1|layer's opacity|
|style|-|leaflet vector style. function or object|
|filter|-|any filter. see [filter](#filter)|
|maxFeatures|-|limit the amount of features returned|

# Basic WFS example - [view](http://flexberry.github.io/Leaflet-WFST/examples/tasmania.html)
```javascript
var map = L.map('map').setView([0, 0], 2);

var boundaries = new L.WFS({
    url: 'http://demo.opengeo.org/geoserver/ows',
    typeNS: 'topp',
    typeName: 'tasmania_state_boundaries',
    crs: L.CRS.EPSG4326,
    style: {
        color: 'blue',
        weight: 2
    }
}).addTo(map)
  .on('load', function () {
      map.fitBounds(boundaries);
  })
```

# Methods
Extends leaflet classes with toGml(crs) function:
* L.Marker
* L.Polygon
* L.Polyline
* L.MultiPolygon
* L.MultiPolyline
* L.LatLngBounds

# Events
Triggers two type of events:
* load - triggers when both 'DescribeFeatureType' & 'GetFeature' requests succeed, and features have been successfully parsed into leaflet layers
* error - triggers when any 'DescribeFeatureType' or 'GetFeature' request fails, and features haven't been parsed into leaflet layers

Markers geometry writes as posNode, for all other layers geometry writes as posList

# Filter

Realization of OGC Filter Encoding v1.1.0

Filter implementations return only inner content of filter element.

Some considerations for all filter constructors:
* "expression" - propertyName, literal, operator filter or function
* "propertyExpression" - if argument on this position is not Element and is not "expression" method it suspect to be a propertyName
* "literalExpression" - if argument on this position is not Element and is not "expression" it suspect to be a literal

|Name|Constructor|
|----|-----|
|**ID**|
|[GmlObjectId](#featureid)|L.Filter.GmlObjectId(value id)|
|**Comparisons**|
|[PropertyIsEqualTo](#propertyisequalto)|L.Filter.EQ(propertyExpression firstArgument, literalExpression secondArgument, bool matchCase)|
|PropertyIsNotEqualTo|L.Filter.NotEQ(propertyExpression firstArgument, literalExpression secondArgument, bool matchCase)|
|PropertyIsLessThan|L.Filter.LT(propertyExpression firstArgument, literalExpression secondArgument, bool matchCase)|
|PropertyIsGreaterThan|L.Filter.GT(propertyExpression firstArgument, literalExpression secondArgument, bool matchCase)|
|PropertyIsLessThanOrEqualTo|L.Filter.LEQ(propertyExpression firstArgument, literalExpression secondArgument, bool matchCase)|
|PropertyIsGreaterThanOrEqualTo|L.Filter.GEQ(propertyExpression firstArgument, literalExpression secondArgument, bool matchCase)|
|[PropertyIsLike](#propertyislike)|L.Filter.Like(string propertyName,string likeExpression,object attributes)|
|PropertyIsNull|L.Filter.IsNull(string propertyName)|
|PropertyIsBetween|L.Filter.IsBetween(propertyExpression firstArgument, literalExpression lowerBoundary, literalExpression upperBoundary)|
|**Operators**|
|Add|L.Filter.Add(expression, expression)|
|Sub|L.Filter.Sub(expression, expression)|
|Mul|L.Filter.Mul(expression, expression)|
|Div|L.Filter.Div(expression, expression)|
|**Logic**|
|And|L.Filter.And(expression[, expression]*)|
|Or|L.Filter.Or(expression[, expression]*)|
|Not|L.Filter.Not(expression)|
|**Spatial**|
|[BBox](#bbox)|L.Filter.BBox(string propertyName, latLngBounds bounds, ICRS crs)|
|Equals|L.Filter.Equals(string propertyName, Layer geometry, ICRS crs)|
|Disjoint|L.Filter.Disjoint(string propertyName, Layer geometry, ICRS crs)|
|Touches|L.Filter.Touches(string propertyName, Layer geometry, ICRS crs)|
|Within|L.Filter.Within(string propertyName, Layer geometry, ICRS crs)|
|Overlaps|L.Filter.Overlaps(string propertyName, Layer geometry, ICRS crs)|
|Crosses|L.Filter.Crosses(string propertyName, Layer geometry, ICRS crs)|
|[Intersects](#intersects)|L.Filter.Intersects(string propertyName, Layer geometry, ICRS crs)|
|Contains|L.Filter.Contains(string propertyName, Layer geometry, ICRS crs)|
|**Spatial distance buffer**|
|DWithin|L.Filter.DWithin(string propertyName, Layer geometry, ICRS crs, value distance, string units)|
|Beyond|L.Filter.Beyond(string propertyName, Layer geometry, ICRS crs, value distance, string units)|
|**Other**|
|Function|L.Filter.Function(string functionName[, expression]*)|
|PropertyName|L.Filter.propertyName(string name)|
|Literal|L.Filter.literal(value)|

*PropertyName and Literal is functions and returns Gml directly.*

## Examples

### FeatureID 

In standard there are two filters - GmlObjectID and FeatureID, but latest is marked as deprecated and so is not implemented.   

Example:
```javascript
  var filter = new L.Filter.GmlObjectID(1);  
```
result xml:
```xml
  <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
    <ogc:GmlObjectId xmlns:gml="http://www.opengis.net/gml" gml:id="1" />
  </ogc:Filter>
```

### PropertyIsEqualTo

```javascript
  var filter = new L.Filter.EQ('city', 'Perm');
  filter.toGml()
```

result xml:
```xml
  <ogc:PropertyIsEqualTo>
    <ogc:PropertyName>city</ogc:PropertyName>
    <ogc:Literal>Perm</ogc:Literal>
  </ogc:PropertyIsEqualTo>
```

### PropertyIsLike

This filter accept optional attributes object:
```javascript
 attributes: {
    wildCard: '*',
    singleChar: '#',
    escapeChar: '!',
    matchCase: true
  }
```

```javascript
  var filter = new L.Filter.Like('city', '*perm*', { matchCase: false });
  filter.toGml()
```

result xml:
```xml
  <ogc:ogc:PropertyIsLike wildCard="*" singleChar="#" escapeChar="!" matchCase="false">
    <ogc:PropertyName>city</ogc:PropertyName>
    <ogc:Literal>*perm*</ogc:Literal>
  </ogc:ogc:PropertyIsLike>
```

### BBox 

Example:
```javascript
    var filter = new L.Filter.BBox('ogr_geometry', L.latLngBounds(L.latLng(40.712, -74.227), L.latLng(40.774, -74.125)), L.CRS.EPSG4326);
    filter.toGml()
```

result xml:
```xml
  <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
    <ogc:BBOX>
      <ogc:PropertyName>ogr_geometry</ogc:PropertyName>
      <gml:Envelope xmlns:gml="http://www.opengis.net/gml" srsName="EPSG:4326">
        <gml:lowerCorner>-74.227 40.712</gml:lowerCorner>
        <gml:upperCorner>-74.125 40.774</gml:upperCorner>
      </gml:Envelope>
    </ogc:BBOX>
  </ogc:Filter>
```

### Intersects

Example:
```javascript
  var filter = new L.Filter.Intersects('ogr_geometry', L.polygon([L.latLng(40.712, -74.227), L.latLng(40.774, -74.125), L.latLng(40.734, -74.175)]), L.CRS.EPSG4326);
  filter.toGml();
```
result xml:
```xml
  <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
    <ogc:Intersects>
      <ogc:PropertyName>ogr_geometry</ogc:PropertyName>
      <gml:Polygon xmlns:gml="http://www.opengis.net/gml" srsName="EPSG:4326" srsDimension="2">
        <gml:exterior>
          <gml:LinearRing srsDimension="2">
            <gml:posList>-74.227 40.712 -74.125 40.774 -74.175 40.734 -74.227 40.712</gml:posList>
          </gml:LinearRing>
        </gml:exterior>
      </gml:Polygon>
    </ogc:Intersects>
  </ogc:Filter>
```

# WFST Example
Editing plugin - [Leaflet.Editable](https://github.com/yohanboniface/Leaflet.Editable)
```javascript
L.WFST.include(MultiEditableMixin);

var wfst = new L.WFST({
    url: 'http://myserver/geoserver/ows',
    typeNS: 'myns',
    typeName: 'POIPOINT',
    style: {
        color: 'blue',
        weight: 2
    }
}).addTo(map).once('load', function () {
            map.fitBounds(wfst);
            wfst.enableEdit();
        });

map.on('editable:created', function (e) {
    wfst.addLayer(e.layer);
});

map.on('editable:editing', function (e) {
    wfst.editLayer(e.layer);
});
```

to make "wfs:Transaction" POST request call save() method, example with [Leaflet.EasyButton](https://github.com/CliffCloud/Leaflet.EasyButton)
```javascript
 L.easyButton('fa-save', function () {
     wfst.save();
 }, 'Save changes');
```

# Layer properties
```javascript
//simple layer
layer = new L.Marker([0, 0]);
layer.feature = {
  id: 1,
  properties: {
    a: 'a',
    b: 'b'
  }
};

//get value by key 'a'
var a = layer.getProperty('a');

//change values
layer.setProperties({
  a: 'b',
  b:'a'
});

//add new property
layer.setProperties({
  c:'c'
});

//delete properties
layer.deleteProperties(['a','b','c']);
```

# Demo
demos for GML read format
* [Markers](http://flexberry.github.io/Leaflet-WFST/examples/markers.html)
* [Polygons](http://flexberry.github.io/Leaflet-WFST/examples/polygon.html)
* [Polylines](http://flexberry.github.io/Leaflet-WFST/examples/polyline.html)

demo for GeoJSON read format
* [Polygons](http://flexberry.github.io/Leaflet-WFST/examples/polygonGeoJSON.html)

demo filter bbox
* [BBox](http://flexberry.github.io/Leaflet-WFST/examples/filterBBox.html)

# License
[MIT License](https://github.com/Flexberry/Leaflet-WFST/blob/master/LICENSE.md)
