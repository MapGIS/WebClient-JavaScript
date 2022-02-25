/**
 * @class G3DLayerType
 * @author 基础平台-潘卓然
 * @description G3D-图层类型枚举
 * @example  
 *  let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
    let indexes = g3dLayer.getTerrainLayerIndexes();
    indexes.forEach(i => {
        let terrain = g3dLayer.getLayer(i);
        let info = g3dLayer.getLayerInfo(i);
        const { layerType } = info; // 此时的layerType是字符串类型，后续需要处理成数值型
        let type = parseInt(layerType);
    });
 */
export const G3DLayerType = {
    g3dNone: 0,
    /**
     * @description 三维矢量数据图层
     */
    g3dVectorLayer: 1,
    /**
     * @description 三维模型图层
     */
    g3dModelLayer: 2,
    /**
     * @description 三维地形图层
     */
    g3dTerrainLayer: 3,
    /**
     * @description 三维注记图层
     */
    g3dLabelLayer: 4,
    /**
     * @description 三维云图层
     */
    g3dCloudLayer: 5,
    /**
     * @description 三维街景图层
     */
    g3dPanoramaLayer: 6,
    /**
     * @description 二维Map引用图层
     */
    type2DMapRefLayer: 7,
    /**
     * @description 三维服务图层
     */
    g3dServerLayer: 8,
    /**
     * @description 三维组图层
     */
    g3dGroupLayer: 9,
    /**
     * @description 三维缓存图层
     */
    g3dCacheLayer: 10,
    /**
     * @description 三维点云图层
     */
    g3dPointCloudLayer: 11,
    /**
     * @description 三维的网格模型图层
     */
    g3dGridModelLayer: 12
};

/**
 * @class M3DTileDataInfo
 * @author 基础平台-潘卓然
 * @description M3D-图层类型枚举，该枚举是针对的G3DLayerType.g3dCacheLayer的二级分类
 * @link G3DLayerType.g3dCacheLayer
 * @example 
 * let tilset = scene.primitives.add(new Cesium.MapGISM3DSet({
     url : 'http://localhost:6163/M3D/layer/文件格式.mcj'
    }));
 * let type = tileset._content._dataType;
   // 如果是树形结构，并且只在后面的节点又对应的数据，则需要遍历节点才能获取对应的的类型
   export function loopM3ds(m3ds, callback) {
        const vm = this;
        let dataCallback = cbtype => {
            if (loop) {
            window.clearInterval(loop);
            loop = undefined;
            let types = [];
            m3ds.forEach(m3d => {
                let type = checkType(m3d);
                m3d.type = type || cbtype;
                types.push(m3d.type);
                if (callback) {
                callback(types);
                }
            });
            }
        };
        let loop = window.setInterval(() => {
            m3ds.forEach(m3d => {
            checkType(m3d, dataCallback);
            });
        }, 100);
    }

    export function checkType(tileset, callback) {
        const vm = this;
        let m3dType = M3dType.UnKnow;
        const { root } = tileset;
        if (!root) return m3dType;
        const version = root.tileset._version;
        let { children } = root;
        if (version == "0.0" || version == "1.0") {
            // m3d 0.x  1.x版本逻辑判断 type =0是模型 =1是示例化数据 =2是点云
            if (!children || children.length <= 0) return m3dType;
            children.forEach(child => {
            let tempType = checkTypeNode(child, version, callback);
            m3dType = tempType || m3dType;
            });
        } else if (version == "2.0") {
            if (!children || children.length <= 0) return m3dType;
            children.forEach(child => {
            let tempType = checkTypeNode(child, version, callback);
            m3dType = tempType ? tempType : m3dType;
            });
        }

        return m3dType;
    }
    export function checkTypeNode(tileset, version, callback) {
        let m3dType;
        const vm = this;
        if (!tileset) return m3dType;
        if (tileset._content) {
            m3dType = tileset._content._dataType;
        }
        if (callback) {
        callback(m3dType);
      }
      return m3dType;
    }
 */
export const M3DTileDataInfo = {
    UnKnow: 'UnKnow',
    /**
     * @description 矢量数据
     */
    Vector: 'Vector',
    /**
     * @description 倾斜摄影
     */
    TiltPhotography: 'TiltPhotography',
    /**
     * @description 模型
     */
    Model: 'Model',
    /**
     * @description 城市建筑模型
     */
    BIM: 'BIM',
    /**
     * @description 点云
     */
    PointCloud: 'PointCloud',
    /**
     * @description 管线
     */
    PipeLine: 'PipeLine',
    /**
     * @description 地质模型
     */
    GeoModel: 'GeoModel',
    /**
     * @description 地质网格
     */
    GeoGrid: 'GeoGrid',
    /**
     * @description 地质钻孔
     */
    GeoDrill: 'GeoDrill',
    /**
     * @description 地质切片
     */
    GeoSection: 'GeoSection'
};
