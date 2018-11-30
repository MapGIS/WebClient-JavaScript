var geojson_point = {
    "type": "Point", 
    "coordinates": [30, 10]
};

var geojson_linestring = {
    "type": "LineString", 
    "coordinates": [
        [30, 10], [10, 30], [40, 40]
    ]
};

var geojson_polygon = {
    "type": "Polygon", 
    "coordinates": [
        [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
    ]
};

var geojson_polygon_hole = {
    "type": "Polygon", 
    "coordinates": [
        [[35, 10], [45, 45], [15, 40], [10, 20], [35, 10]], 
        [[20, 30], [35, 35], [30, 20], [20, 30]]
    ]
};

var geojson_multipoint = {
    "type": "MultiPoint", 
    "coordinates": [
        [10, 40], [40, 30], [20, 20], [30, 10]
    ]
};

var geojson_multilinestring = {
    "type": "MultiLineString", 
    "coordinates": [
        [[10, 10], [20, 20], [10, 40]], 
        [[40, 40], [30, 30], [40, 20], [30, 10]]
    ]
};

var geojson_multipolygon = {
    "type": "MultiPolygon", 
    "coordinates": [
        [
            [[30, 20], [45, 40], [10, 40], [30, 20]]
        ], 
        [
            [[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]
        ]
    ]
};

var geojson_multipolygon_hole = {
    "type": "MultiPolygon", 
    "coordinates": [
        [
            [[40, 40], [20, 45], [45, 30], [40, 40]]
        ], 
        [
            [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]], 
            [[30, 20], [20, 15], [20, 25], [30, 20]]
        ]
    ]
};