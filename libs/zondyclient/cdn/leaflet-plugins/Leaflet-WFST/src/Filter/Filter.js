/**
 * Created by PRadostev on 06.02.2015.
 * Class L.Filter
 * This class represents an OGC Filter
 */

L.Filter = {};

L.filter = function (filters) {
  var result = L.XmlUtil.createElementNS('ogc:Filter');

  if (Array.isArray(filters)) {
    filters.forEach(function (element) {
      result.appendChild(element instanceof Element ? element : element.toGml());
    });
  } else if (filters) {
    result.appendChild(filters instanceof Element ? filters : filters.toGml());
  }

  return result;
};
