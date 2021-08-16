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

export { Common, BaseServer, Extend, G3D, MRCS, MRFS, MRFWS, MRGS, MRMS, Info, OGC, ElasticSearch, PostGIS, CloudDisk, ArcGis };

const All = {
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
    ArcGis
};

export default All;
