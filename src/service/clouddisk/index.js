/**
 * @module CloudDisk
 */

import { UserService } from './user';
import { GeoDatasetService } from './giscore';
import { CalculateModelService } from './model';

export { UserService, GeoDatasetService, CalculateModelService };

const CloudDisk = {
    UserService,
    GeoDatasetService,
    CalculateModelService
};

export default CloudDisk;
