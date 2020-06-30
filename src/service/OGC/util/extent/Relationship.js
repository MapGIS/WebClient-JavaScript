import {
    Zondy
} from '../../../common/Base';

/**
 * @private
 * @description Relationship to an extent.
 * @enum {number}
 */
var Relationship = {
    UNKNOWN: 0,
    INTERSECTING: 1,
    ABOVE: 2,
    RIGHT: 4,
    BELOW: 8,
    LEFT: 16
};
export {
    Relationship
}

Zondy.Enum.Relationship = Relationship;