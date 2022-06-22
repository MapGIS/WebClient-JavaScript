/*
 * @Description: 
 * @Author: zk
 * @Date: 2022-05-10 12:45:10
 * @LastEditors: zk
 * @LastEditTime: 2022-06-22 10:14:41
 */
//-------命名空间 mapgis 开始-----
import * as Util from './utils';
import * as Symbol from './base/symbols';
import * as Style from './base/style';
import * as Renderer from './base/renderer';
import * as geoJSON from './base/format/geojson';
import * as Crs from './base/crs';
//-------命名空间 mapgis 结束-----

//-------命名空间 Zondy 开始-----
import * as Common from './common';
import BaseServer from './baseserver';
import { Extend, G3D, MRCS, MRFS, MRFWS, MRGS, MRMS, Info } from './Igserver';

import { WMSCapabilities, WMTSCapabilities, OGCWMTSInfo, OGCWMSInfo } from './OGC';
import { WMS, WFS } from './OpenGeospatialConsortium';

const OGC = {
    WMSCapabilities,
    WMTSCapabilities,
    OGCWMTSInfo,
    OGCWMSInfo,
    WMS,
    WFS
};

import ElasticSearch from './datastore/elasticsearch';
import PostGIS from './datastore/postgis';
import CloudDisk from './clouddisk';
import ArcGis from './ArcGis';
import {SymbolManager} from "./PlotBase/index"
import { PlotLayer2D } from './2DPlot/index';
import { PlotLayer2DGroup } from './2DPlot/PlotLayer2DGroup'
import {PlotLayer3D,PlotLayer3DGroup} from "./3DPlot/index"
import { TimeLine, DrawTool, LinkTool } from './PlotBase/index';

export {
    Util,
    Symbol,
    Style,
    Renderer,
    geoJSON,
    Crs,
    Common,
    BaseServer,
    Extend,
    G3D,
    MRCS,
    MRFS,
    MRFWS,
    MRGS,
    MRMS,
    Info,
    OGC,
    ElasticSearch,
    PostGIS,
    CloudDisk,
    ArcGis,
    SymbolManager,
    PlotLayer2D,
    PlotLayer2DGroup,
    PlotLayer3D,
    PlotLayer3DGroup,
    DrawTool,
    TimeLine,
    LinkTool
};
//-------命名空间 Zondy 结束-----

const All = {
    //-------命名空间 mapgis 开始-----
    Symbol,
    Style,
    Renderer,
    geoJSON,
    Util,
    Crs,
    //-------命名空间 mapgis 结束-----
    //-------命名空间 Zondy 开始-----
    Common,
    BaseServer,
    // igserver
    Extend,
    G3D,
    MRCS,
    MRFS,
    MRFWS,
    MRGS,
    MRMS,
    Info,
    OGC,
    // datastore
    ElasticSearch,
    PostGIS,
    CloudDisk,
    ArcGis,
    SymbolManager,
    PlotLayer3D,
    PlotLayer3DGroup: PlotLayer3DGroup,
    DrawTool,
    LinkTool
    //-------命名空间 Zondy 结束-----
};

export default All;
