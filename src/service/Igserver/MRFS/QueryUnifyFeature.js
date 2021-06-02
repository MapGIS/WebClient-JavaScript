import { Zondy } from '../../common/Base';

/**
 * @author 基础平台-龚跃健
 * @modify 基础平台-潘卓然 
 * @class module:要素服务.QueryUnifyFeature
 * @classdesc  统一要素查询-适配igs,datastore,拓展服务多种数据源
 * @description Zondy.Service.QueryUnifyFeature
 * @param {Object} [option = null]  属性键值对。
 */
export class QueryUnifyFeature {
  /**
   * 获取IGSServer地图的地图信息，包括地图的地理范围，地图的坐标系名和地图类型
   * @param queryParam
   */
  getIgsLayerInfo(queryParam) {
    let { domain } = queryParam
    if (!domain) {
      const protocol = queryParam.protocol || this.defaultServer.protocol
      const ip = queryParam.ip || this.defaultServer.ip
      const port = queryParam.port || this.defaultServer.port
      domain = `${protocol}://${ip}:${port}`
    }

    const { layerType } = queryParam
    let promise
    if (layerType === 'layer') {
      const vectorLayer = new Zondy.Catalog.VectorLayer({ domain })
      const { gdbp } = queryParam
      promise = new Promise(resolve => {
        vectorLayer.getLayerInfo(gdbp, (res) => {
          if (!res || !res.Range) {
            resolve(null)
          } else {
            const obj = {
              layerType,
              proName: res.SrName,
              extent: res.Range
            }
            resolve(obj)
          }
        })
      })
    } else if (layerType === 'vector') {
      const { serverName } = queryParam
      const mapdoc = new Zondy.Catalog.MapDoc({
        domain,
        docName: serverName
      })
      promise = new Promise(resolve => {
        mapdoc.getMapInfo((res) => {
          if (!res || !res.range) {
            resolve(null)
          } else {
            const r = res.range.split(',')
            const extent = {
              xmin: Number(r[0]),
              ymin: Number(r[1]),
              xmax: Number(r[2]),
              ymax: Number(r[3])
            }
            const obj = {
              layerType,
              proName: res.projtransName,
              extent
            }
            resolve(obj)
          }
        })
      })
    } else if (layerType === 'tile') {
      const { serverName } = queryParam
      const mapInfo = new Zondy.Catalog.TileLayer({
        domain,
        tileName: serverName
      })
      promise = new Promise(resolve => {
        mapInfo.getTileInfo((res) => {
          if (!res || !res.TileInfo2) {
            resolve(null)
          } else {
            const { fullExtent } = res.TileInfo2
            if (fullExtent) {
              const extent = {
                xmin: fullExtent.xmin,
                ymin: fullExtent.ymin,
                xmax: fullExtent.xmax,
                ymax: fullExtent.ymax
              }
              const proName =
                res.TileInfo2.tileInfo.spatialReference.tileSRefInfo.Name
              const tileSize =
                res.TileInfo2.tileInfo.cols || res.TileInfo2.tileInfo.rows
              const { origin } = res.TileInfo2.tileInfo
              const obj = {
                layerType,
                proName,
                extent,
                tileSize,
                origin
              }
              resolve(obj)
            }
          }
        })
      })
    }
    if (promise) {
      return promise.then(Range => {
        return Range
      })
    }
    return null
  }
}

export default QueryUnifyFeature;

Zondy.Service.QueryUnifyFeature = QueryUnifyFeature;
