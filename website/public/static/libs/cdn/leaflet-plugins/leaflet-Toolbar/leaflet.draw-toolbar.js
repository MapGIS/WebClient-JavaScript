(function(window, document, undefined) {

"use strict";

L.Toolbar2.DrawAction = {
    fromHandler: function(Handler, defaultToolbarIcon, defaultSubToolbar) {
        return L.Toolbar2.Action.extend({
            options: {
                toolbarIcon: L.extend({}, L.Toolbar2.Action.prototype.options.toolbarIcon, defaultToolbarIcon),
                subToolbar: defaultSubToolbar ? defaultSubToolbar : L.Toolbar2.Action.prototype.options.subToolbar
            },

            initialize: function(map, options) {
                var action = this;

                this._handler = new Handler(map, options);
                this._handler.on('disabled', function() {
                    action.disable();
                });

                L.Toolbar2.Action.prototype.initialize.call(this, options);
            },

            enable: function(e) {
                this._handler.enable();
                L.Toolbar2.Action.prototype.enable.call(this, e);
            },

            disable: function() {
                this._handler.disable();
                L.Toolbar2.Action.prototype.disable.call(this);
            },

            setOptions: function(options) {
                this._handler.setOptions(options);
                L.Toolbar2.Action.prototype.setOptions.call(this, options);
            },
        });
    }
};

L.Toolbar2.DrawAction.Cancel = L.Toolbar2.Action.extend({
	options: {
		toolbarIcon: { html: 'Cancel' }
	},

	initialize: function (map, drawing) {
		this.drawing = drawing;
		L.Toolbar2.Action.prototype.initialize.call(this);
	},

	addHooks: function () {
		this.drawing.disable();
		this.disable();
	}
});

// NOTE: This subaction is only appropriate for actions which have a deleteLastVertex method.
L.Toolbar2.DrawAction.RemoveLastPoint = L.Toolbar2.Action.extend({
	options: {
		toolbarIcon: { html: L.drawLocal.draw.toolbar.undo.text }
	},

	initialize: function (map, drawing) {
		this.drawing = drawing;
		L.Toolbar2.Action.prototype.initialize.call(this);
	},

	addHooks: function () {
		this.drawing.deleteLastVertex();
		this.disable();
	}
});

L.Toolbar2.DrawAction.Circle = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Circle,
    {
        className: 'leaflet-draw-draw-circle',
        tooltip: L.drawLocal.draw.toolbar.buttons.circle
    },
    new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel] })
);

L.Toolbar2.DrawAction.Marker = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Marker,
    {
        className: 'leaflet-draw-draw-marker',
        tooltip: L.drawLocal.draw.toolbar.buttons.marker
    },
	new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel] })
);

L.Toolbar2.DrawAction.Polygon = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Polygon,
    {
        className: 'leaflet-draw-draw-polygon',
        tooltip: L.drawLocal.draw.toolbar.buttons.polygon
    },
	new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel, L.Toolbar2.DrawAction.RemoveLastPoint] })
);

// Support for DrawAction.RemoveLastPoint.
L.Toolbar2.DrawAction.Polygon.prototype.deleteLastVertex = function() {
    this._handler.deleteLastVertex();
}

L.Toolbar2.DrawAction.Polyline = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Polyline,
    {
        className: 'leaflet-draw-draw-polyline',
        tooltip: L.drawLocal.draw.toolbar.buttons.polyline
    },
	new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel, L.Toolbar2.DrawAction.RemoveLastPoint] })
);

// Support for DrawAction.RemoveLastPoint.
L.Toolbar2.DrawAction.Polyline.prototype.deleteLastVertex = function() {
    this._handler.deleteLastVertex();
}

L.Toolbar2.DrawAction.Rectangle = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Rectangle,
    {
        className: 'leaflet-draw-draw-rectangle',
        tooltip: L.drawLocal.draw.toolbar.buttons.rectangle
    },
	new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel] })
);

L.Toolbar2.DrawToolbar = L.Toolbar2.Control.extend({
	options: {
		actions: [
			L.Toolbar2.DrawAction.Polygon,
			L.Toolbar2.DrawAction.Polyline,
			L.Toolbar2.DrawAction.Marker,
			L.Toolbar2.DrawAction.Rectangle,
			L.Toolbar2.DrawAction.Circle
		],
		className: 'leaflet-draw-toolbar'
	}
});

L.Toolbar2.EditToolbar = {};

L.Toolbar2.EditAction = {
    fromHandler: function(Handler, defaultToolbarIcon, defaultSubToolbar) {
        return L.Toolbar2.Action.extend({
            options: {
                toolbarIcon: L.extend({}, L.Toolbar2.Action.prototype.options.toolbarIcon, defaultToolbarIcon),
                subToolbar: defaultSubToolbar ? defaultSubToolbar : L.Toolbar2.Action.prototype.options.subToolbar
            },

            initialize: function(map, featureGroup, options) {
                var action = this;

                options = options || {};
                options.featureGroup = featureGroup;

                this._handler = new Handler(map, options);
                this._handler.on('disabled', function() {
                    action.disable();
                });

                L.Toolbar2.Action.prototype.initialize.call(this, options);
            },

            enable: function(e) {
                this._handler.enable();
                L.Toolbar2.Action.prototype.enable.call(this, e);
            },

            disable: function() {
                this._handler.disable();
                L.Toolbar2.Action.prototype.disable.call(this);
            },

            setOptions: function(options) {
                this._handler.setOptions(options);
                L.Toolbar2.Action.prototype.setOptions.call(this, options);
            },

            // For the undo subaction.
            revertLayers: function() {
                this._handler.revertLayers();
            },

            // For the save subaction.
            save: function() {
                this._handler.save();
            }
        });
    }
};

L.Toolbar2.EditAction.Control = {};

L.Toolbar2.EditAction.Control.Save = L.Toolbar2.Action.extend({
    options: {
        toolbarIcon: { html: 'Save' }
    },
    initialize: function(map, featureGroup, editing) {
        this.editing = editing;
        L.Toolbar2.Action.prototype.initialize.call(this);
    },
    addHooks: function() {
        this.editing.save();
        this.editing.disable();
    }
});

L.Toolbar2.EditAction.Control.Undo = L.Toolbar2.Action.extend({
    options: {
        toolbarIcon: { html: 'Undo' }
    },
    initialize: function(map, featureGroup, editing) {
        this.editing = editing;
        L.Toolbar2.Action.prototype.initialize.call(this);
    },
    addHooks: function() {
        this.editing.revertLayers();
        this.editing.disable();
    }
});


L.Toolbar2.EditAction.Control.Edit = L.Toolbar2.EditAction.fromHandler(
    L.EditToolbar.Edit,
    {
        className: 'leaflet-draw-edit-edit',
        tooltip: 'Edit features'
    },
    new L.Toolbar2({
        actions: [
            L.Toolbar2.EditAction.Control.Save,
            L.Toolbar2.EditAction.Control.Undo
        ]
    })
);

L.Toolbar2.EditAction.Control.Delete = L.Toolbar2.EditAction.fromHandler(
    L.EditToolbar.Delete,
    {
        className: 'leaflet-draw-edit-remove',
        tooltip: 'Remove features'
    },
    new L.Toolbar2({
        actions: [
            L.Toolbar2.EditAction.Control.Save,
            L.Toolbar2.EditAction.Control.Undo
        ]
    })
);

L.Toolbar2.EditToolbar.Control = L.Toolbar2.Control.extend({
    options: {
        actions: [
            L.Toolbar2.EditAction.Control.Edit,
            L.Toolbar2.EditAction.Control.Delete
        ],
        className: 'leaflet-draw-toolbar',
    }
});

L.Toolbar2.EditAction.Popup = {};

L.Toolbar2.EditAction.Popup.Edit = L.Toolbar2.Action.extend({
	options: {
		toolbarIcon: { className: 'leaflet-draw-edit-edit' }
	},

	initialize: function (map, shape, options) {
		this._map = map;

		this._shape = shape;
		this._shape.options.editing = this._shape.options.editing || {};

		L.Toolbar2.Action.prototype.initialize.call(this, map, options);
	},

	enable: function () {
		var map = this._map,
			shape = this._shape;

		shape.editing.enable();
		map.removeLayer(this.toolbar);
		
		map.on('click', function () {
			this.save();
			shape.editing.disable();
		}, this);
	},

	save: function() {
		var map = this._map,
			shape = this._shape;

		if (shape.edited) {
			map.fire(L.Draw.Event.EDITED, { layers: L.layerGroup([shape]) });
		}
		shape.edited = false;
	}
});

L.Toolbar2.EditAction.Popup.Delete = L.Toolbar2.Action.extend({
	options: {
		toolbarIcon: { className: 'leaflet-draw-edit-remove' }
	},

	initialize: function (map, shape, options) {
		this._map = map;
		this._shape = shape;

		L.Toolbar2.Action.prototype.initialize.call(this, map, options);
	},

	addHooks: function () {
		var map = this._map;

		map.removeLayer(this._shape);
		map.removeLayer(this.toolbar);

		console.log('firing draw:deleted');
		map.fire(L.Draw.Event.DELETED, { layers: L.layerGroup([this._shape]) });
	}
});

L.Toolbar2.EditToolbar.Popup = L.Toolbar2.Popup.extend({
	options: {
		actions: [
			L.Toolbar2.EditAction.Popup.Edit,
			L.Toolbar2.EditAction.Popup.Delete
		],
        className: 'leaflet-draw-toolbar'
	},

	onAdd: function (map) {
		var shape = this._arguments[1];

		if (shape instanceof L.Marker) {
			/* Adjust the toolbar position so that it doesn't cover the marker. */
			this.options.anchor = L.point(shape.options.icon.options.popupAnchor);
		}

		L.Toolbar2.Popup.prototype.onAdd.call(this, map);
	}
});


})(window, document);