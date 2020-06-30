const  geojson={
    data:[
        {
            "img":"static/data/picture/geojson/Point.png",
            "type":"点",
            "format":"{\n&nbsp;&nbsp;&nbsp;\"type\":&nbsp;\"Ponit\" ,\n &nbsp;&nbsp;&nbsp;\"coordinate\":&nbsp; [30,10] \n}"
        },{
            "img":"static/data/picture/geojson/LineString.png",
            "type":"线",
            "format":"{ \n&nbsp;&nbsp;&nbsp;\"type\":&nbsp;\"LineString\" , \n&nbsp;&nbsp;&nbsp;\"coordinate\":&nbsp; [\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [30,10] , [10,30] , [40,10] \n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]\n}"
        },
        {
            "img":"static/data/picture/geojson/Polygon.png",
            "type":"区",
            "format":"{ \n&nbsp;&nbsp;&nbsp;\"type\":&nbsp;\"Polygon\" , \n&nbsp;&nbsp;&nbsp;\"coordinate\":&nbsp; [ \n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;[30,10] , [40,40] , [20,40] , [10,20] , [30,10]&nbsp;] \n&nbsp;&nbsp;&nbsp;]\n}"
        },
        {
            "img":"static/data/picture/geojson/Polygon_with_hole.png",
            "type":"区-带洞",
            "format":"{ \n&nbsp;&nbsp;&nbsp;\"type\": &nbsp;\"Polygon\" , \n&nbsp;&nbsp;&nbsp;\"coordinate\":&nbsp; [\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ &nbsp;[35,10] , [45,45] , [15,40] , [10,20] , [35,10]&nbsp; ],\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [&nbsp; [20,30], [35,35] ,[30,20], [20,30]&nbsp;] \n&nbsp;&nbsp;&nbsp;] \n}"
        },
        {
            "img":"static/data/picture/geojson/MultiPoint.png",
            "type":"多点",
            "format":"{ \n&nbsp;&nbsp;&nbsp;\"type\":&nbsp;\"MultiPoint\" ,\n&nbsp;&nbsp;&nbsp; \"coordinate\":&nbsp; [\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [10,40] , [40,30] , [20,20] , [30,10]\n&nbsp;&nbsp;&nbsp; ] \n}"
        },
        {
            "img":"static/data/picture/geojson/MultiLineString.png",
            "type":"多线",
            "format":"{\n&nbsp;&nbsp;&nbsp;\"type\":&nbsp;\"MultiLineString\" , \n&nbsp;&nbsp;&nbsp;\"coordinate\":&nbsp; [\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ [10,10] , [20,20] , [10,40] ], \n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  [ [40,40], [30,30], [40,20], [30,10] ]\n&nbsp;&nbsp;&nbsp;]\n}"
        },
        {
            "img":"static/data/picture/geojson/MultiPolygon.png",
            "type":"多区",
            "format":"{ \n&nbsp;&nbsp;&nbsp;\"type\":&nbsp;\"MultiPolygon\" ,\n&nbsp;&nbsp;&nbsp; \"coordinate\": &nbsp;[\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  [ \n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ [30,20], [45,40], [10,40], [30,20] ] \n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;] ,\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ [15,5] , [40,10] , [10,20] , [5,10] , [15,5] ]\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] \n&nbsp;&nbsp;&nbsp;] \n}"
        },
        {
            "img":"static/data/picture/geojson/MultiPolygon_with_hole.png",
            "type":"多区带洞",
            "format":"{\n&nbsp;&nbsp;&nbsp;\"type\":&nbsp;\"MultiPolygon\" ,\n&nbsp;&nbsp;&nbsp; \"coordinate\": &nbsp;[\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ [40,40] , [20,45] , [45,30] , [40,40] ]\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ \n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ [20,35],[10,30],[10,10],[30,5],[45,10],[20,35] ] ,\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ [30,20] , [20,15] , [20,25] , [30,20] ]\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;] \n &nbsp;&nbsp;&nbsp;] \n}"
        }
    ]
}

export  default  geojson;