// import i18next from "i18next";
/*global require*/
/* var Cartesian2 = require("terriajs-cesium/Source/Core/Cartesian2").default;
var defined = require("terriajs-cesium/Source/Core/defined").default;
var DeveloperError = require("terriajs-cesium/Source/Core/DeveloperError")
  .default;
var EasingFunction = require("terriajs-cesium/Source/Core/EasingFunction")
  .default;
var knockout = require("terriajs-cesium/Source/ThirdParty/knockout").default;
var SceneTransforms = require("terriajs-cesium/Source/Scene/SceneTransforms")
  .default;
const selectionIndicatorUrl = require("../../wwwroot/images/NM-LocationTarget.svg");
 */
import {CesiumZondy} from '../../core/Base'; 
import Cesium from '../../../../node_modules/cesium/Source/Cesium';
var Cartesian2 = Cesium.Cartesian2;
var DeveloperError = Cesium.DeveloperError;
import defined from '../../../../node_modules/cesium/Source/Core/defined';
import EasingFunction from '../../../../node_modules/cesium/Source/Core/EasingFunction';
import knockout from '../../../../node_modules/cesium/Source/ThirdParty/knockout';
import SceneTransforms from '../../../../node_modules/cesium/Source/Scene/SceneTransforms';
import selectionIndicatorUrl from '../../assets/svg/NM-LocationTarget.svg';

import getTimestamp from '../../../../node_modules/cesium/Source/Core/getTimestamp';
import Matrix4 from '../../../../node_modules/cesium/Source/Core/Matrix4';
import JulianDate from "../../../../node_modules/cesium/Source/Core/JulianDate";
import { select } from 'd3';

/* import Store from '@mapgis/webclient-store';
const { ViewState } = Store.Map;
const { IgsDocLayer, IgsLayerType } = Store.Layer; */

var screenSpacePos = new Cartesian2();
var offScreen = "-1000px";

const SelectionIndicatorMode = {
  Map : 'Map',
  Query: 'Query'
}

export class CesiumSelectionIndicator {
  constructor(webGlobe) {
      //>>includeStart('debug', pragmas.debug);
      /* if (!defined(webGlobe)) {
        throw new DeveloperError(i18next.t("map.cesium.devError"));
      } */
      //>>includeEnd('debug')
      this.mode = SelectionIndicatorMode.Map;  
      this.layers = [];
      this.selectFeature = undefined;
    
      this._cesium = webGlobe;
      this._screenPositionX = offScreen;
      this._screenPositionY = offScreen;
      this.handler = new Cesium.ScreenSpaceEventHandler(webGlobe.viewer.scene.canvas);
    
      this._tweens = webGlobe.viewer.scene.tweens;
      /* CesiumZondy.UI.GlobelTweens = CesiumZondy.UI.GlobelTweens || new GlobelTweens();
      this._tweens = CesiumZondy.UI.GlobelTweens.tweens; */
      this._container = webGlobe.viewer.container;
    
      this._viewer = webGlobe.viewer;
      this._scene = webGlobe.viewer.scene;
      this._lastClockTime = new JulianDate(0, 0.0);
      this._lastCameraViewMatrix = new Matrix4();
      this._lastCameraMoveTime = 0;
      /**
       * Gets or sets whether the viewer has stopped rendering since startup or last set to false.
       * @type {Boolean}
       */
      this.stoppedRendering = false;
    
      /**
       * Gets or sets the world position of the object for which to display the selection indicator.
       * @type {Cartesian3}
       */
      this.position = undefined;
    
      /**
       * Gets or sets the visibility of the selection indicator.
       * @type {Boolean}
       */
      this.showSelection = true;
    
      this.transform = "";
    
      this.opacity = 1.0;
    
      knockout.track(this, [
        "position",
        "_screenPositionX",
        "_screenPositionY",
        "_scale",
        "rotate",
        "showSelection",
        "transform",
        "opacity"
      ]);
    
      /**
       * Gets the visibility of the position indicator.  This can be false even if an
       * object is selected, when the selected object has no position.
       * @type {Boolean}
       */
      this.isVisible = undefined;
      knockout.defineProperty(this, "isVisible", {
        get: function() {
          return this.showSelection && defined(this.position);
        }
      });
    
      /**
       * Gets or sets the function for converting the world position of the object to the screen space position.
       *
       * @member
       * @type {SelectionIndicatorViewModel~ComputeScreenSpacePosition}
       * @default SceneTransforms.wgs84ToWindowCoordinates
       *
       * @example
       * selectionIndicatorViewModel.computeScreenSpacePosition = function(position, result) {
       *     return Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position, result);
       * };
       */
      this.computeScreenSpacePosition = function(position, result) {
        return Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          this._cesium.viewer.scene,
          position,
          result
        );
      };
    
      var el = document.createElement("div");
      el.className = "selection-indicator";
      el.style.pointerEvents = 'none';
      el.style.position = 'absolute';
      el.style.width = '50px';
      el.style.height = '50px';
      this._container.appendChild(el);
      this._selectionIndicatorElement = el;
    
      var img = document.createElement("img");
      img.setAttribute("src", selectionIndicatorUrl);
      img.setAttribute("alt", "");
      img.setAttribute("width", 50);
      img.setAttribute("height", 50);
      el.appendChild(img);
    
      var that = this;
      function updatePosition() {
        el.style.top = that._screenPositionY;
        el.style.left = that._screenPositionX;
        el.style.transform = that.transform;
        el.style.opacity = that.opacity;
      }
      this.updateStyle = updatePosition.bind(this);
    
      // update();      

      this._subscriptions = [];
    
      /* this._subscriptions.push(
        knockout.getObservable(this, "_screenPositionX").subscribe(updatePosition)
      );
      this._subscriptions.push(
        knockout.getObservable(this, "_screenPositionY").subscribe(updatePosition)
      );
      this._subscriptions.push(
        knockout.getObservable(this, "transform").subscribe(updatePosition)
      );
      this._subscriptions.push(
        knockout.getObservable(this, "opacity").subscribe(updatePosition)
      ); 
      this.animateAppear();
      */
      this.updateStyle();
      return this;
  };

   /**
   * Gets the HTML element containing the selection indicator.
   * @memberof CesiumSelectionIndicator.prototype
   *
   * @type {Element}
   */
  get container() {
      return this._container;
  }

  /**
   * Gets the HTML element that holds the selection indicator.
   * @memberof CesiumSelectionIndicator.prototype
   *
   * @type {Element}
   */
  get selectionIndicatorElement() {
    return this._selectionIndicatorElement;
  }

  /**
   * Gets the scene being used.
   * @memberof CesiumSelectionIndicator.prototype
   *
   * @type {Scene}
   */
  get scene() {
    return this._scene;
  }

  /**
   * Gets the scene being used.
   * @memberof CesiumSelectionIndicator.prototype
   *
   * @type {Scene}
   */
  get viewer() {
    return this._viewer;
  }
  
  destroy() {
    this._selectionIndicatorElement.parentNode.removeChild(
      this._selectionIndicatorElement
    );
    this._subscriptions.forEach(function(subscription) {
      subscription.dispose();
    });
  }

  /**
   * Updates the view of the selection indicator to match the position and content properties of the view model.
   * This function should be called as part of the render loop.
   */
  update() {
    if (this.showSelection && this.position) {
      // var screenPosition = this.computeScreenSpacePosition(this.position, screenPosition);
      var screenPosition = SceneTransforms.wgs84ToWindowCoordinates(this.scene, this.position);
      if (!screenPosition) {
        this._screenPositionX = offScreen;
        this._screenPositionY = offScreen;
      } else {
        var container = this._container;
        var containerWidth = container.clientWidth;
        var containerHeight = container.clientHeight;
        var indicatorSize = this._selectionIndicatorElement.clientWidth;
        var halfSize = indicatorSize * 0.5;
        screenPosition.x =
          Math.min(
            Math.max(screenPosition.x, -indicatorSize),
            containerWidth + indicatorSize
          ) - halfSize;
        screenPosition.y =
          Math.min(
            Math.max(screenPosition.y, -indicatorSize),
            containerHeight + indicatorSize
          ) - halfSize;
        this._screenPositionX = Math.floor(screenPosition.x + 0.25) + "px";
        this._screenPositionY = Math.floor(screenPosition.y + 0.25) + "px";
      }
    }
  }

  /**
   * Animate the indicator to draw attention to the selection.
   */
  animateAppear() {
    if (defined(this._selectionIndicatorTween)) {
      if (this._selectionIndicatorIsAppearing) {
        // Already appearing; don't restart the animation.
        return;
      }
      this._selectionIndicatorTween.cancelTween();
      this._selectionIndicatorTween = undefined;
    }

    this._selectionIndicatorIsAppearing = true;

    var that = this;
    this._selectionIndicatorTween = this._tweens.add({
      startObject: {
        scale: 2.0,
        opacity: 0.0,
        rotate: -180
      },
      stopObject: {
        scale: 1.0,
        opacity: 1.0,
        rotate: 0
      },
      duration: 0.8,
      easingFunction: EasingFunction.EXPONENTIAL_OUT,
      update: function(value) {
        that.opacity = value.opacity;
        that.transform =
          "scale(" + value.scale + ") rotate(" + value.rotate + "deg)";
        that.updateStyle();
      },
      complete: function() {
        that._selectionIndicatorTween = undefined;
      },
      cancel: function() {
        that._selectionIndicatorTween = undefined;
      }
    });
  }

  /**
   * Animate the indicator to release the selection.
   */
  animateDepart() {
    if (defined(this._selectionIndicatorTween)) {
      if (!this._selectionIndicatorIsAppearing) {
        // Already disappearing, don't restart the animation.
        return;
      }
      this._selectionIndicatorTween.cancelTween();
      this._selectionIndicatorTween = undefined;
    }
    this._selectionIndicatorIsAppearing = false;

    var that = this;
    this._selectionIndicatorTween = this._tweens.add({
      startObject: {
        scale: 1.0,
        opacity: 1.0
      },
      stopObject: {
        scale: 1.5,
        opacity: 0.0
      },
      duration: 1.6,
      easingFunction: EasingFunction.EXPONENTIAL_OUT,
      update: function(value) {
        that.opacity = value.opacity;
        that.transform = "scale(" + value.scale + ") rotate(0deg)";
        that.updateStyle();
      },
      complete: function() {
        that._selectionIndicatorTween = undefined;
      },
      cancel: function() {
        that._selectionIndicatorTween = undefined;
      }
    });
    console.log('selectionIndicatorTween', this._selectionIndicatorTween);
  }

  /**
   * @description 添加点击注记组件到地图上
   */
  addTo(webGlobe) {
    const vm = this;
    vm.handler.setInputAction(
      this.handleClick.bind(this),
      Cesium.ScreenSpaceEventType.LEFT_DOWN
    );
    /* vm.viewer.pickEvent.addEventListener(function(feature){
      console.log('pickEvent', feature);
    }); */
    /* this._removePostRenderListener = webGlobe.viewer.scene.postRender
    .addEventListener(
      vm.postRender.bind(undefined, this)
    ); */
  }

  postRender(vm, date) {
    // 下面情况可以安全的停止渲染:
    //  - 相机位置在一秒以内没有改变
    //  - 没有瓦片等待加载请求以及时间控制器没有在播放动画中
    //  - 没有补间动画在运行

    var now = getTimestamp();

    var scene = vm.scene;

    if (
      !Matrix4.equalsEpsilon(
        vm._lastCameraViewMatrix,
        scene.camera.viewMatrix,
        1e-5
      )
    ) {
      vm._lastCameraMoveTime = now;
    }

    var cameraMovedInLastSecond = now - vm._lastCameraMoveTime < 1000;

    var surface = scene.globe._surface;
    var tilesWaiting =
      !surface._tileProvider.ready ||
      surface._tileLoadQueueHigh.length > 0 ||
      surface._tileLoadQueueMedium.length > 0 ||
      surface._tileLoadQueueLow.length > 0 ||
      surface._debug.tilesWaitingForChildren > 0;

    if (
      !cameraMovedInLastSecond &&
      !tilesWaiting &&
      !vm.viewer.clock.shouldAnimate &&
      vm.scene.tweens.length === 0
    ) {
      if (vm.verboseRendering) {
        console.log("停止渲染 @ " + getTimestamp());
      }
      vm.viewer.useDefaultRenderLoop = false;
      vm.stoppedRendering = true;
    }

    Matrix4.clone(scene.camera.viewMatrix, vm._lastCameraViewMatrix);

    /* var feature = vm.selectedFeature;
    if (feature) {
      var position;

      if (defined(cesium.dataSourceDisplay)) {
        var originalEntity = defined(feature.cesiumEntity)
          ? feature.cesiumEntity
          : feature;
        var state = cesium.dataSourceDisplay.getBoundingSphere(
          originalEntity,
          true,
          boundingSphereScratch
        );

        if (state === BoundingSphereState.DONE) {
          position = Cartesian3.clone(boundingSphereScratch.center);
        }
      }

      if (!position && feature.position) {
        position = feature.position.getValue(vm.viewer.clock.currentTime);
      }

      if (position) {
        // cesium._selectionIndicator.position = position;
        vm.position = position;
      }
    } */

    // cesium._selectionIndicator.update();
    vm.update();
  }

  updateScreen(screenPosition) {
    var indicatorSize = this._selectionIndicatorElement.clientWidth;
    var halfSize = indicatorSize * 0.5;
    this._screenPositionX = screenPosition.position.x - halfSize + 'px';
    this._screenPositionY = screenPosition.position.y - halfSize + 'px';
  }

  handleClick(screenPosition) {
    //var position = this.scene.globe.pick(viewer.camera.getPickRay(pick1),viewer.scene);
    const viewer = this._cesium.viewer;
    const scene = this._cesium.viewer.scene;
    const { position } = screenPosition;
    if(!position) return;
    const { x, y} = position;
    if(x === undefined || y === undefined ) return;
    const picks = new Cesium.Cartesian2(x,y);
    var pickRay = viewer.camera.getPickRay(picks);
    var pickPosition = scene.globe.pick(pickRay, scene);
    var pickPositionCartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(
      pickPosition
    );

    const lat = Cesium.Math.toDegrees(pickPositionCartographic.latitude);
    const lng = Cesium.Math.toDegrees(pickPositionCartographic.longitude);
    
    // this.update();
    this.updateScreen(screenPosition);
    this.updateStyle();
    if (this.mode === SelectionIndicatorMode.Map) {
      this.animateDepart();
    } else if (this.mode === SelectionIndicatorMode.Query) {
      const event = {
        type: 'loadding',
        position: [lng, lat]
      }
      this.queryEvent(event);  
      this.animateAppear();
      this.queryByPoint(lng, lat, '');      
    }
    
    this._tweens.update();
  }

  bindQueryEvent(callback) {
    this.queryEvent = callback
  }

  /**
   * 调用webclient-store里面的IgsDocLayer图层进行遍历查询
   * @param {IgsDocLayer} layers 
   */
  enableQuery(layers) {
    this.layers = layers;
    this.mode = SelectionIndicatorMode.Query;
  }

  disableQuery() {
    this.mode = SelectionIndicatorMode.Map;
  }

  initQuaryParam(rect) {
    //创建查询结构对象
    var queryStruct = new Zondy.Service.QueryFeatureStruct();
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true;
    //是否包含属性信息
    queryStruct.IncludeAttribute = true;
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false;
    //创建一个用于查询的矩形
    var geomObj = new Zondy.Object.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    //制定查询规则
    var rule = new Zondy.Service.QueryFeatureRule({
        //是否将要素的可见性计算在内
        EnableDisplayCondition: false,
        //是否完全包含
        MustInside: false,
        //是否仅比较要素的外包矩形
        CompareRectOnly: false,
        //是否相交
        Intersect: true
    });
    //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryParameter({
        //几何对象
        geometry: geomObj,
        //结果格式
        resultFormat: "json",
        //查询结构
        struct: queryStruct,
        //查询规则
        rule: rule
    });
    //设置查询分页号
    //设置查询要素数目
    queryParam.recordNumber = 20;
    queryParam.pageIndex = 0;
    return queryParam;
  }

  queryByPoint(lng, lat, crs) {
    const radiu = 0.000000001;  
    const rect = [lng - radiu, lat - radiu, lng + radiu, lat - radiu];  
    const queryParam = this.initQuaryParam(rect);

    this.layers.forEach(l=>{
      const queryService = new Zondy.Service.QueryDocFeature(
        queryParam, 
        l.serverName, 
        0, 
        {
          //IP地址
          ip: l.ip,
          //端口号
          port: l.port
        }
      );
      //执行查询操作，querySuccess为成功回调，queryError为失败回调
      queryService.query(this.querySuccess.bind(this, l.serverName), this.queryError.bind(this));
    });
  }

  querySuccess(serverName, result) {       
    //获取查询到的结果数组,ploygonArr的个数即为查询到的结果数
    let features = result.SFEleArray;
    if(!features){
      this.layers = this.layers.map(l=> {
        if(l.serverName === serverName){
          l.feature = undefined;
          this.drawSelectFeature(serverName);        
        }
        return l;
      });
      const event = {
        type: 'loaded',
        layers: this.layers
      }
      this.queryEvent(event);  
      return;
    };
    let props = {}
    let geojson = {
      type: 'FeatureCollection',
      features: [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": []
        },
        "properties": props
      }]
    }
    if(features && features.length > 0){
      const feature = features[0];
      const type = feature.ftype;
      result.AttStruct.FldName.forEach((f, i)=>{ props[f] = features[0].AttValue[i] });
      geojson.features[0].properties = props;
      if(type === 3){
        geojson.features[0].geometry.type = 'Polygon';
        //获取要素几何数组
        var Rings = features[0].fGeom.RegGeom[0].Rings;
        //针对复合要素，要循环获取每一个几何
        for (var j = 0; j < Rings.length; j++) {
          //取出构成多边形的数组
          var dots = Rings[j].Arcs[0].Dots;
          var finaldots = [];
          for (var k = 0; k < dots.length; k++) {
            //组织面的坐标数组
            finaldots.push([dots[k].x, dots[k].y]);
          }
        }
        geojson.features[0].geometry.coordinates = [finaldots];
      } else if (type === 2){
        geojson.features[0].geometry.type = 'LineString';
        //获取要素几何数组
        // var Rings = features[0].fGeom.LinGeom[0].Rings;
        // geojson.features[0].geometry.coordinates = finaldots;
      } else if (type === 1){
        geojson.features[0].geometry.type = 'Point';
        //获取要素几何数组
        // var Rings = features[0].fGeom.PntGeom[0];
        // geojson.features[0].geometry.coordinates = [dots[k].x, dots[k].y];
      }
    }

    this.layers = this.layers.map(l=> {
      if(l.serverName === serverName){
        l.feature = geojson;
        this.drawSelectFeature(serverName);        
      }
      return l;
    });

    const event = {
      type: 'loaded',
      layers: this.layers
    }
    this.queryEvent(event);  
  }

  queryError(error){
    console.log('queryError', error);
  }

  drawSelectFeature(serverName) {
    const vm = this;
    const viewer = this.viewer;
    const selects = this.layers.filter(l=> {
      return l.serverName === serverName
    });
    if (selects.length < 0) return;
    const feature = selects[0].feature;
    if(!feature) {
      if(selects[0].dataSource) {
        viewer.dataSources.remove(selects[0].dataSource);
      } 
      return;
    }

    if(selects[0].dataSource) {
      viewer.dataSources.remove(selects[0].dataSource);
    } 

    console.log('drawSelectFeature', this.selectFeature, feature);
    var promise = Cesium.GeoJsonDataSource.load(feature);
    promise
      .then(function (dataSource) {
        vm.selectFeature = dataSource;  
        viewer.dataSources.add(dataSource);
        vm.layers = vm.layers.map(l=> {
          if(l.serverName === serverName) {
            l.dataSource = dataSource
          }
          return l;
        });
        //Get the array of entities
        // var entities = dataSource.entities.values;
      })
      .otherwise(function (error) {
        //Display any errrors encountered while loading.
      });
  }

  changePicks(layers) {
    this.layers = layers;
    this.layers.forEach(l=>{
      if (l.pickable === false) {
        l.dataSource && (l.dataSource.show = false);
      } else {
        l.dataSource && (l.dataSource.show = true);
      }
    });
  }

}

/**
 * A function that converts the world position of an object to a screen space position.
 * @callback CesiumSelectionIndicator~ComputeScreenSpacePosition
 * @param {Cartesian3} position The position in WGS84 (world) coordinates.
 * @param {Cartesian2} result An object to return the input position transformed to window coordinates.
 * @returns {Cartesian2} The modified result parameter.
 */

CesiumZondy.UI.CesiumSelectionIndicator = CesiumSelectionIndicator;