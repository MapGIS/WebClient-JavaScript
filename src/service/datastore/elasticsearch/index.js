/**
 * @module 弹性搜索服务
 */
import { EsCatlogType, EsCatlogName, EsGeoHashType } from './Enum';
import EsCatlogService from './EsCatlogService';
import ESGeoCode from './ESGeoCode';
import ESGeoDecode from './ESGeoDecode';
import ESQueryStats from './ESQueryStats';
import EsTableService from './EsTableService';
import EsSpaceTimeQueryByAgg from './EsSpaceTimeQueryByAgg';

export { EsCatlogType, EsCatlogName, EsGeoHashType, EsCatlogService, ESGeoCode, ESGeoDecode, ESQueryStats, EsTableService, EsSpaceTimeQueryByAgg };

const ElasticSearch = {
    EsCatlogType,
    EsCatlogName,
    EsGeoHashType,
    EsCatlogService,
    ESGeoCode,
    ESGeoDecode,
    ESQueryStats,
    EsTableService,
    EsSpaceTimeQueryByAgg
};

export default ElasticSearch;
