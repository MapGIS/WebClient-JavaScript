/**
 * Created by PRadostev on 09.06.2015.
 */

describe("L.GML.CoordsToLatLngMixin", function () {
  var mixin;
  var options;

  before(function () {
    options = {
      coordsToLatLng: function (coords) {
        return coords;
      }
    };
    mixin = L.GML.CoordsToLatLngMixin;
  });

  it('should return array of int', function () {
    var input = [0, 1, 2];
    var result = mixin.transform(input, options);
    expect(result).to.be.instanceOf(Array);
    expect(result).to.deep.equal(input);
  });

  it('should return array of arrays', function () {
    var input = [[0, 0], [1, 1], [2, 2]];
    var result = mixin.transform(input, options);
    expect(result).to.be.instanceOf(Array);
    expect(result).to.deep.equal(input);
  });
});
