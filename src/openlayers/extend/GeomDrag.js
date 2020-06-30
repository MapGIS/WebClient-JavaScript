import {Zondy} from '../../service/common/Base';
import {inherits} from 'ol/util.js';
import PointerInteraction from 'ol/interaction/Pointer.js';
/**
* @constructor
* @extends {ol_interaction_Pointer}
*/
var Drag = function (map) {
    PointerInteraction.call(this, {
        handleDownEvent: Drag.prototype.handleDownEvent,
        handleDragEvent: Drag.prototype.handleDragEvent,
        handleMoveEvent: Drag.prototype.handleMoveEvent,
        handleUpEvent: Drag.prototype.handleUpEvent
    });

    /**
    * @type {ol.Pixel}
    * @private
    */
    this.coordinate_ = null;

    /**
    * @type {string|undefined}
    * @private
    */
    this.cursor_ = 'pointer';

    /**
    * @type {ol.Feature}
    * @private
    */
    this.feature_ = null;

    /**
    * @type {string|undefined}
    * @private
    */
    this.previousCursor_ = undefined;

};
inherits(Drag, PointerInteraction);


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
* @return {boolean} `true` to start the drag sequence.
*/
Drag.prototype.handleDownEvent = function (evt) {
    var map = evt.map;

    var feature = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
          return feature;
      });

    if (feature) {
        this.coordinate_ = evt.coordinate;
        this.feature_ = feature;
    }

    return !!feature;
};


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
*/
Drag.prototype.handleDragEvent = function (evt) {
    var map = evt.map;

    var feature = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
          return feature;
      });

    var deltaX = evt.coordinate[0] - this.coordinate_[0];
    var deltaY = evt.coordinate[1] - this.coordinate_[1];

    var geometry = /** @type {ol.geom.SimpleGeometry} */
      (this.feature_.getGeometry());
    geometry.translate(deltaX, deltaY);

    this.coordinate_[0] = evt.coordinate[0];
    this.coordinate_[1] = evt.coordinate[1];
};


/**
* @param {ol.MapBrowserEvent} evt Event.
*/
Drag.prototype.handleMoveEvent = function (evt) {
    if (this.cursor_) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });
        var element = evt.map.getTargetElement();
        if (feature) {
            if (element.style.cursor != this.cursor_) {
                this.previousCursor_ = element.style.cursor;
                element.style.cursor = this.cursor_;
            }
        } else if (this.previousCursor_ !== undefined) {
            element.style.cursor = this.previousCursor_;
            this.previousCursor_ = undefined;
        }
    }
};


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
* @return {boolean} `false` to stop the drag sequence.
*/
Drag.prototype.handleUpEvent = function (evt) {
    this.coordinate_ = null;
    this.feature_ = null;
    return false;
};

export { Drag };
Zondy.GeomInteraction.Drag = Drag;