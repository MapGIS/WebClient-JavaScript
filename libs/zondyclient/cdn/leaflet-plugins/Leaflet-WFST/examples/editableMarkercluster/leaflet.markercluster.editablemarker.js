(function (window, document, undefined) {
  var editMarkerToolbarAction = L.ToolbarAction.extend({
    initialize: function (map, marker, options) {
      this._map = map;
      this._marker = marker;

      options = options || {
        toolbarIcon: {
          tooltip: 'Edit'
        }
      };

      if (this._marker.options.toolbarEditIconClass) {
        options.toolbarIcon.className = this._marker.options.toolbarEditIconClass
      } else {
        options.toolbarIcon.html = 'Edit';
      }

      L.Util.setOptions(this, options);

      L.ToolbarAction.prototype.initialize.call(this, map, options);
    },

    addHooks: function () {
      var that = this;

      that._marker._popupToolbar._onMarkerDrag = function (e) {
        that._marker._popupToolbar.setLatLng(that._marker.getLatLng());
        if (that._marker.label) {
          that._marker.updateLabelContent(that._marker.options.getLabelContent());
        }
        that._marker._dragged = true;
      };

      that._marker._popupToolbar._onMarkerDragEnd = function (e) {
        if (that._marker._popupToolbar._bringToFront) {
          that._marker._popupToolbar._bringToFront();
        }
      };

      if (!that._marker._enableEditMode) {
        that._marker._enableEditMode = function () {
          that._marker._editModeEnabled = true;

          that._marker.options.clusterGroup.removeLayer(that._marker);
          that._map.addLayer(that._marker);

          if (that._marker.options.editModeIcon) {
            that._marker.setIcon(that._marker.options.editModeIcon);
          }

          if (that._marker._popupToolbar._bringToFront) {
            that._marker._popupToolbar._bringToFront();
          }

          that._marker.options.draggable = true;
          that._marker.dragging.enable();

          if (that._marker.options.showLabelOnEdit && !that._marker.label) {
            that._marker.bindLabel(that._marker.options.getLabelContent(), {
              noHide: true,
              direction: 'auto',
              pane: that._map.getPanes.popupPane
            });
          }
          if (that._marker.label) {
            that._marker.showLabel();
          }

          that._marker.on('drag', that._marker._popupToolbar._onMarkerDrag);

          that._marker.on('dragend', that._marker._popupToolbar._onMarkerDragEnd);
        };
      }

      if (!that._marker._disableEditMode) {
        that._marker._disableEditMode = function () {
          that._marker._editModeEnabled = false;

          if (that._marker.options.normalModeIcon) {
            that._marker.setIcon(that._marker.options.normalModeIcon);
          } else {
            that._marker.setIcon(new L.Icon.Default);
          }

          that._marker.options.draggable = false;
          that._marker.dragging.disable();

          that._marker.off('drag', that._marker._popupToolbar._onMarkerDrag);
          that._marker.off('dragend', that._marker._popupToolbar._onMarkerDragEnd);

          that._map.removeLayer(that._marker);
          that._marker.options.clusterGroup.addLayer(that._marker);

          if (that._marker.label) {
            that._marker.hideLabel();
            that._marker.unbindLabel();
          }

          if (that._marker._popupToolbar._bringToFront) {
            that._marker._popupToolbar._bringToFront();
          }

          var visibleOne = that._marker.options.clusterGroup.getVisibleParent(that._marker);
          if (visibleOne && that._marker && !visibleOne.getLatLng().equals(that._marker.getLatLng()) && that._marker._popupToolbar) {
            that._marker._popupToolbar._removeToolbar();
          }

          if (that._marker.options.hideToolbarAfterEdit && that._marker._popupToolbar && that._marker._popupToolbar._removeToolbar) {
            that._marker._popupToolbar._removeToolbar();
          }
        };
      }

      if (that._marker._editModeEnabled) {
        that._marker._disableEditMode();

        if (that._marker._dragged) {
          that._marker._dragged = undefined;
          that._marker.fire('marker:edited');
        }
      } else {
        that._marker._enableEditMode();
      }
    }
  });

  var deleteMarkerToolbarAction = L.ToolbarAction.extend({
    initialize: function (map, marker, options) {
      this._map = map;
      this._marker = marker;

      options = options || {
        toolbarIcon: {
          tooltip: 'Delete'
        }
      };

      if (this._marker.options.toolbarDeleteIconClass) {
        options.toolbarIcon.className = this._marker.options.toolbarDeleteIconClass
      } else {
        options.toolbarIcon.html = 'Delete';
      }

      L.Util.setOptions(this, options);

      L.ToolbarAction.prototype.initialize.call(this, map, options);
    },

    addHooks: function () {
      if (this._marker._popupToolbar && this._marker._popupToolbar._removeToolbar) {
        this._marker._popupToolbar._removeToolbar();
      }

      var deleted = false;
      if (this._marker.options.clusterGroup.hasLayer(this._marker)) {
        this._marker.options.clusterGroup.removeLayer(this._marker);
        deleted = deleted || true;
      }

      if (this._map.hasLayer(this._marker)) {
        this._map.removeLayer(this._marker);
        deleted = deleted || true;
      }

      if (deleted) {
        this._marker.fire('marker:deleted');

        this._marker.off('marker:edited');
        this._marker.off('marker:deleted');
        this._marker.off('popuptoolbar:shown');
        this._marker.off('popuptoolbar:closed');
      }
    }
  });

  var closeMarkerToolbarAction = L.ToolbarAction.extend({
    initialize: function (map, marker, options) {
      this._map = map;
      this._marker = marker;

      options = options || {
        toolbarIcon: {
          tooltip: 'Close'
        }
      };

      if (this._marker.options.toolbarCloseIconClass) {
        options.toolbarIcon.className = this._marker.options.toolbarCloseIconClass
      } else {
        options.toolbarIcon.html = 'Close';
      }

      L.Util.setOptions(this, options);

      L.ToolbarAction.prototype.initialize.call(this, map, options);
    },

    addHooks: function () {
      if (this._marker._popupToolbar && this._marker._popupToolbar._removeToolbar) {
        this._marker._popupToolbar._removeToolbar();
      }
      if (this._marker._dragged) {
        this._marker._dragged = undefined;
        this._marker.fire('marker:edited');
      }
    }
  });

  var editableMarkerPopupToolbar = L.Toolbar.Popup.extend({
    options: {
      actions: [
        editMarkerToolbarAction,
        deleteMarkerToolbarAction,
        closeMarkerToolbarAction
      ]
    },

    onAdd: function (map) {
      var that = this;
      var marker = this._arguments[1];

      if (marker instanceof L.Marker) {
        // Adjust the toolbar position so that it doesn't cover the marker.
        var popupAnchor = marker.options.icon.options.popupAnchor;
        this.options.anchor = L.point([popupAnchor[0], popupAnchor[1] - 6]);
      }

      L.Toolbar.Popup.prototype.onAdd.call(this, map);

      if (marker.options.clusterGroup) {
        that._onClusterGroupAnimationEnd = function (e) {
          // Remove popup only if owner-marker clustered, otherwise don't remove.
          var visibleOne = marker.options.clusterGroup.getVisibleParent(marker);
          if (visibleOne && marker && !visibleOne.getLatLng().equals(marker.getLatLng()) && that._removeToolbar) {
            that._removeToolbar();
          }
        };

        marker.options.clusterGroup.on('animationend', that._onClusterGroupAnimationEnd);
      }

      that._removeToolbar = function () {
        if (that._onClusterGroupAnimationEnd) {
          marker.options.clusterGroup.off('animationend', that._onClusterGroupAnimationEnd);
          that._onClusterGroupAnimationEnd = undefined;
        }

        if (that._removeToolbar) {
          map.off('click', that._removeToolbar);
        }

        if (that._bringToFront) {
          that._bringToFront = undefined;
        }

        if (marker._editModeEnabled && marker._disableEditMode) {
          marker._disableEditMode();

          marker._editModeEnabled = undefined;
          marker._enableEditMode = undefined;
          marker._disableEditMode = undefined;
        }

        map.removeLayer(that);

        that._removeToolbar = undefined;
        marker._popupToolbar = undefined;

        marker.fire('popuptoolbar:closed');
      };

      // Bring to front imitation.
      that._bringToFront = function () {
        map.removeLayer(that);
        map.addLayer(that);
      };

      map.once('click', that._removeToolbar);
    }
  });

  // L.MarkerClusterGroup doesn't support draggable markers.
  // This extension fixes this problem.
  L.MarkerClusterGroup.EditableMarker = L.Marker.extend({
    options: {
      normalModeIcon: undefined,
      editModeIcon: undefined,
      toolbarEditIconClass: undefined,
      toolbarDeleteIconClass: undefined,
      toolbarCloseIconClass: undefined,
      clusterGroup: undefined,
      getLabelContent: function () {
        return 'This is editable marker for cluster group.'
      },
      showLabelOnEdit: true,
      hideToolbarAfterEdit: false,
      dontShowToolbarOnFirstClick: false
    },

    initialize: function (latlng, options) {
      L.Util.setOptions(this, options);

      if (!(this.options.clusterGroup instanceof L.MarkerClusterGroup)) {
        throw new TypeError('Wrong type for \'clustrGroup\' option.');
      }

      if (!(this.options.normalModeIcon instanceof L.Icon)) {
        this.options.normalModeIcon = new L.Icon.Default;
      }

      this.options.icon = this.options.normalModeIcon;

      if (!(this.options.editModeIcon instanceof L.Icon)) {
        this.options.editModeIcon = new L.Icon.Default;
      }

      L.Marker.prototype.initialize.call(this, latlng, options);

      var markerWasClicked = false;

      this.on('click', function (e) {
        if (!this._popupToolbar && (!this.options.dontShowToolbarOnFirstClick || this.options.dontShowToolbarOnFirstClick && markerWasClicked)) {
          var prevMarker = this.options.clusterGroup._prevEditedMarker = this.options.clusterGroup._currentEditedMarker || {};
          this.options.clusterGroup._currentEditedMarker = this;

          if (prevMarker._popupToolbar && prevMarker._popupToolbar._removeToolbar) {
            prevMarker._popupToolbar._removeToolbar();
          }

          this._popupToolbar = (new editableMarkerPopupToolbar(e.latlng)).addTo(map, this);

          this.fire('popuptoolbar:shown');
        }

        markerWasClicked = true;
      });
    }
  });
})(window, document);
