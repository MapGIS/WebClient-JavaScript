/**
 * @module PostGIS
 */
import { PostgisCatlogService } from './PostgisCatlogService';
import { PostgisCustomQueryService } from './PostgisCustomQueryService';
import { PostgisQueryService } from './PostgisQueryService';
import { PostgisTableService } from './PostgisTableService';
import { PostgisVectorTileService } from './PostgisVectorTileService';

export { PostgisCatlogService, PostgisCustomQueryService, PostgisQueryService, PostgisTableService, PostgisVectorTileService };
const PostGIS = { PostgisCatlogService, PostgisCustomQueryService, PostgisQueryService, PostgisTableService, PostgisVectorTileService };
export default PostGIS;
