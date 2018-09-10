/**
 * Created by PRadostev on 09.06.2015.
 */

L.GML.CoordsToLatLngMixin = {
  transform: function (coordinates, options) {
    if (Array.isArray(coordinates[0])) {
      var latLngs = [];
      for (var i = 0; i < coordinates.length; i++) {
        latLngs.push(this.transform(coordinates[i], options));
      }

      return latLngs;
    }

    return options.coordsToLatLng(coordinates);
  }
};
