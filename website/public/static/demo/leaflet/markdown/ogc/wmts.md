# WMTS
![WMTS](./static/demo/mapboxgl/markdown/ogc/wmts.png)
![UML](./static/demo/mapboxgl/markdown/ogc/wmts-uml.png)

# 英文原址
[OpenGIS Web Map Tile Service Implementation Standard](https://www.ogc.org/docs/is/)

## params

| Name and example 1  | Optionality and use | Definition and format                          |
| :------------------ | :------------------ | :--------------------------------------------- |
| Service=WMTS        | Mandatory           | Service type identifier                        |
| Request=GetTile     | Mandatory           | Operation name                                 |
| Version=1.0.0       | Mandatory           | Standard and schema version for this operation |
| Layer               | Mandatory           | Layer identifier                               |
| Style               | Mandatory           | Style identifier                               |
| Format              | Mandatory           | Output format of tile                          |
| Sample dimensions 2 | Optional            | Value allowed for this dimension               |
| TileMatrixSet       | Mandatory           | TileMatrixSet identifier                       |
| TileMatrix          | Mandatory           | TileMatrix identifier                          |
| TileRow             | Mandatory           | Row index of tile matrix                       |
| TileCol             | Mandatory           | Column index of tile matrix                    |

1. All parameter names are here listed using mostly lower case letters. However, any parameter name capitalization SHALL
be allowed in KVP encoding, see subclause 11.5.2 of OWS Common [OGC 06-121r3].
1. Names for these parameters SHALL be the names indicated in the ServiceMetadata document. Typical examples are
Time, Elevation and Band.
