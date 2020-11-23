import { QueryByLayerParameter } from './QueryByLayerParameter';
import { QueryParameter } from './QueryParameter';
import { QueryDocFeature } from './QueryDocFeature';
import { mix } from '../common/Mixin';

export class QueryUnifyParameter 
    extends mix(QueryByLayerParameter, QueryParameter, QueryDocFeature) {
    constructor() {
        super();
    }
}

export default QueryUnifyParameter;
