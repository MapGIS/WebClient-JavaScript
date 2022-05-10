/*
 * @Description: 
 * @Author: zk
 * @Date: 2022-05-10 12:45:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-10 14:46:02
 */
//-------命名空间 mapgis 开始-----
import * as Util from './utils';
import * as Symbol from './base/symbols';
import * as Style from './base/style';
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
import SymbolManager from "./PlotBase/index"
import { PlotCanvas } from './2DPlot/index';
import {PlotCanvas3D} from "./3DPlot/index"


export {
    Util,
    Symbol,
    Style,
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
    PlotCanvas,
    PlotCanvas3D
};
//-------命名空间 Zondy 结束-----

const All = {
    //-------命名空间 mapgis 开始-----
    Symbol,
    Style,
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
    PlotCanvas3D
    //-------命名空间 Zondy 结束-----
};

export default All;
