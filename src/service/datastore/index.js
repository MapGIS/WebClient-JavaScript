/**
 * @module DataStore
 */
import { EsCatlogType, EsCatlogName, EsGeoHashType, EsCatlogService, EsTableService, EsSpaceTimeQueryByAgg } from './elasticsearch';

export { EsCatlogType, EsCatlogName, EsGeoHashType, EsCatlogService, EsTableService, EsSpaceTimeQueryByAgg };

import { PostgisCatlogService, PostgisCustomQueryService, PostgisQueryService, PostgisTableService, PostgisVectorTileService } from './postgis';

export { PostgisCatlogService, PostgisCustomQueryService, PostgisQueryService, PostgisTableService, PostgisVectorTileService };
