/**
 * @class module:3DPlot.PlotLayerMap
 * @description 行业标绘图层组
 * @author 基础平台-杨琨
 */
class PlotLayerMap {
  constructor(viewer) {
    //图层列表
    this._plotLayerMap = [];
    //viewer对象
    this._viewer = viewer;

    if (!PlotLayerMap.instance) {
      PlotLayerMap.instance = this;
    }

    return PlotLayerMap.instance;
  }

  /**
   * @function module:3DPlot.addLayer
   * @description 添加图层至图层组
   * @param layer - {PlotLayer} 必选项，要添加图层。
   */
  addLayer(layer) {
    this._plotLayerMap.push(layer);
  }

  /**
   * @function module:3DPlot.removeLayer
   * @description 从图层组删除图层
   * @param layer - {PlotLayer} 必选项，要删除的图层。
   */
  removeLayer(layer) {
    if (!layer) return;
    const {id} = layer;

    if (id) {
      this.removeLayerById(id);
    }
  }

  /**
   * @function module:3DPlot.removeLayerById
   * @description 根据图层ID从图层组删除图层
   * @param id - {String} 必选项，要删除的图层ID。
   */
  removeLayerById(id) {
    for (let i = 0; i < this._plotLayerMap.length; i++) {
      if (id === this._plotLayerMap[i].id) {
        this._plotLayerMap.splice(i, 1);
        break;
      }
    }
  }

  /**
   * @function module:3DPlot.raise
   * @description 图层上移，请确保图层加载完毕，再改变图层顺序
   * @param layer - {Object} 必选项，要上移的图层
   */
  raise(layer) {
    this._move(layer, "raise");
  }

  /**
   * @function module:3DPlot.raise
   * @description 图层下移，请确保图层加载完毕，再改变图层顺序
   * @param layer - {Object} 必选项，要下移的图层
   */
  lower(layer) {
    this._move(layer, "lower");
  }

  _move(layer, type) {
    let index, isFind = false;
    for (let i = 0; i < this._plotLayerMap.length; i++) {
      if (layer._id === this._plotLayerMap[i]._id) {
        index = i;
        isFind = true;
        break;
      }
    }

    switch (type) {
      case "raise":
        //如果已经在最上面则不移动
        if (index === this._plotLayerMap.length) {
          isFind = false;
        }
        //开始上移一层
        if (isFind) {
          let deleteLayer = this._plotLayerMap.splice(index, 1)[0];
          if (this._plotLayerMap.length > 0) {
            this._plotLayerMap.splice(index + 1, 0, deleteLayer);
            this._movePlots(this._plotLayerMap[index + 1], this._plotLayerMap[index], "after");
          }
        }
        break;
      case "lower":
        //如果已经在最下面则不移动
        if (index === 0) {
          isFind = false;
        }
        //开始下移一层
        if (isFind) {
          let deleteLayer = this._plotLayerMap.splice(index, 1)[0];
          if (this._plotLayerMap.length > 0) {
            this._plotLayerMap.splice(index - 1, 0, deleteLayer);
            this._movePlots(this._plotLayerMap[index - 1], this._plotLayerMap[index]);
          }
        }
        break;
    }
  }

  /**
   * @description 移动标绘图元组，根据方向将当前图层组移动到目标图层组之上或之下
   * @param currentLayer - {Object} 必选项，当前图层组
   * @param targetLayer - {Object} 必选项，目标图层组
   * @param {String} [direction = 'before']  必选项，移动方向before或者after
   */
  _movePlots(currentLayer, targetLayer, direction) {
    let scene = this._getScene();
    direction = direction || "before";

    //正确性检查
    if (!currentLayer) return;
    if (!targetLayer) return;

    const currentLayerId = currentLayer._id;
    const targetLayerId = targetLayer._id;
    //不考虑id为0的情况
    if (!currentLayerId || !targetLayerId) return;

    //获取当前图元组的索引数
    let currentIndex = this._getPrimitiveIndexById(currentLayerId);
    let targetIndex = this._getPrimitiveIndexById(targetLayerId);

    //计算移动步数
    let step = Math.abs(targetIndex - currentIndex);
    //开始移动
    if (step > 0) {
      //根据方向设置上移或下移
      switch (direction) {
        case "before":
          //移动图层组
          for (let i = 0; i < step; i++) {
            scene.primitives.lower(currentLayer._primitiveCollection);
          }
          break;
        case "after":
          //移动图层组
          for (let i = 0; i < step; i++) {
            scene.primitives.raise(currentLayer._primitiveCollection);
          }
          break;
      }
    }
  }

  _getScene() {
    let {scene} = this._viewer;
    if (!scene) throw new Error("三维场景scene 未初始化");

    return scene;
  }

  _getPrimitiveIndexById(id) {
    let scene = this._getScene(), index = undefined;

    const {_primitives} = scene.primitives;
    for (let i = 0; i < _primitives.length; i++) {
      if (_primitives[i]._id && _primitives[i]._id === id) {
        index = i;
        break;
      }
    }

    if (index !== undefined) {
      return index;
    }
  }
}

PlotLayerMap.instance = null;

export default PlotLayerMap