/**
 * ElasticSearch数据库类型
 * @author 基础平台-潘卓然
 * @description ElasticSearch数据库类型
 * @readonly
 * @enum {String}
 */
let EsCatlogType = {
    /**时空库 */
    SpaceTime: 'spacetime_db',
    /**地址库 */
    Addredd: 'address_db'
};

/**
 * ElasticSearch数据库名称
 * @author 基础平台-潘卓然
 * @description ElasticSearch数据库名称
 * @readonly
 * @enum {String}
 */
let EsCatlogName = {
    /**时空库 */
    SpaceTime: '时空库',
    /**地址库 */
    Addredd: '地址库'
};

export { EsCatlogType, EsCatlogName };
Zondy.Enum.EsCatlogType = EsCatlogType;
Zondy.Enum.EsCatlogName = EsCatlogName;
