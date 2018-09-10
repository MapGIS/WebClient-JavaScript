var PropertiesMixin = {
  setProperties: function (obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        this.feature.properties[i] = obj[i];
      }
    }
  },
  getProperty: function (field) {
    return this.feature.properties[field];
  },
  deleteProperties: function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (this.feature.properties.hasOwnProperty(arr[i])) {
        delete this.feature.properties[arr[i]];
      }
    }
  }
};
L.Marker.include(PropertiesMixin);
L.Path.include(PropertiesMixin);
