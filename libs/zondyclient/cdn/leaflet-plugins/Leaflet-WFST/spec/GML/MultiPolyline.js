/**
 * Created by PRadostev on 03.06.2015.
 */

describe("L.MultiPolyline.toGml()", function () {
  var multi, multiGml, members;
  beforeEach(function () {
    multi = new L.Polyline([
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1]
      ],
      [
        [3, 3],
        [3, 4],
        [4, 4],
        [4, 3]
      ],
      [
        [-1, 0],
        [0, 0],
        [0, -1],
        [-1, -1]
      ]
    ]);

    multiGml = multi.toGml(L.CRS.Simple);
    members = multiGml.firstChild;
  });

  it('should return Element object with tagName gml:MultiLineString ', function () {
    expect(multiGml).to.be.instanceOf(Element);
    expect(multiGml.tagName).to.be.equal('gml:MultiLineString');
  });

  it('should have first child element gml:lineStringMembers', function () {
    expect(members.tagName).to.be.equal('gml:lineStringMembers');
  });

  it('should have 3 child nodes of members', function () {
    expect(members.childNodes.length).to.be.equal(3);
  });

  it('all child elements of members shoud be a gml:LineString', function () {
    var childs = members.childNodes;
    for (var i = 0; i < childs; i++) {
      expect(childs[i].tagName).to.be.equal('gml:LineString');
    }
  });

});
