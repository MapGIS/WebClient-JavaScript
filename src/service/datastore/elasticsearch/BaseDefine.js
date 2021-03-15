/**
 * ElasticSearch的默认查询租佃参数
 * @type {String}
 * @default queryField=
 * @readonly
 */

let PARAM_SUB = ":";
/**
 * ElasticSearch的默认查询租佃参数
 * @type {String}
 * @default queryField=
 * @readonly
 */
let PARAM_COMMA = ",";

/**
 * 参数空格
 * @type {string}
 */
let PARAM_SPACE = " ";

/**
 * 参数括号左边
 * @type {string}
 */
let PARAM_BRACKET_LEFT = "(";

/**
 * 参数括号右边
 * @type {string}
 */
let PARAM_BRACKET_RIGHT = ")";

/**
 * ElasticSearch的默认分号
 * @type {String}
 * @default ;
 * @readonly
 */
let PARAM_SPLIT = ";";

/**
 * ElasticSearch的空间-区类型
 * @type {String}
 * @default polygon
 * @readonly
 */
let SPACE_ENUM_POLYGON = "polygon";

export { PARAM_SUB, SPACE_ENUM_POLYGON, PARAM_COMMA, PARAM_SPLIT, PARAM_BRACKET_LEFT, PARAM_SPACE, PARAM_BRACKET_RIGHT };

Zondy.BaseDefine.PARAM_SUB = PARAM_SUB
Zondy.BaseDefine.SPACE_ENUM_POLYGON = SPACE_ENUM_POLYGON
Zondy.BaseDefine.PARAM_COMMA = PARAM_COMMA
Zondy.BaseDefine.PARAM_SPLIT = PARAM_SPLIT
Zondy.BaseDefine.PARAM_BRACKET_LEFT = PARAM_BRACKET_LEFT
Zondy.BaseDefine.PARAM_SPACE = PARAM_SPACE
Zondy.BaseDefine.PARAM_BRACKET_RIGHT = PARAM_BRACKET_RIGHT
