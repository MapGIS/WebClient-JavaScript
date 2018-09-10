/**
 * Created by PRadostev on 10.03.2015.
 */

L.DeletePopup = L.ToolbarAction.extend({
  options: {
    toolbarIcon: {className: 'fa fa-lg fa-trash'}
  },

  initialize: function (map, shape, options) {
    this._map = map;
    this._layer = shape;

    L.ToolbarAction.prototype.initialize.call(this, map, options);
  },

  addHooks: function () {
    this._map.removeLayer(this._layer);
    this._map.removeLayer(this.toolbar);
    this._map.fire('editable:delete', {layer: this._layer});
  }
});

L.EditPopup = L.ToolbarAction.extend({
  options: {
    toolbarIcon: {className: 'fa fa-lg fa-edit'}
  },

  initialize: function (map, shape, options) {
    this._map = map;
    this._layer = shape;

    L.ToolbarAction.prototype.initialize.call(this, map, options);
  },

  enable: function () {
    var map = this._map,
      layer = this._layer;

    layer.enableEdit();
    map.removeLayer(this.toolbar);

    map.once('click', function () {
      layer.disableEdit();
    });
  }
});

L.EditPopupToolbar = L.Toolbar.Popup.extend({
  options: {
    actions: [
      L.EditPopup,
      L.DeletePopup
    ]
  },

  onAdd: function (map) {
    var shape = this._arguments[1];

    if (shape instanceof L.Marker) {
      /* Adjust the toolbar position so that it doesn't cover the marker. */
      this.options.anchor = L.point(shape.options.icon.options.popupAnchor);
    }
    var that = this;
    map.once('click', function () {
      map.removeLayer(that);
    });

    L.Toolbar.Popup.prototype.onAdd.call(this, map);
  }
});
