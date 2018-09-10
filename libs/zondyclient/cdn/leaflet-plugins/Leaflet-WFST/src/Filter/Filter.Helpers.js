L.Filter.propertyName = function (value) {
  return L.XmlUtil.createElementNS('ogc:PropertyName', {}, { value: value });
};

L.Filter.literal = function (value) {
  return L.XmlUtil.createElementNS('ogc:Literal', {}, { value: value });
};

L.Filter.element = function(value) {
  if(value instanceof Element) {
    return value;
  }

  return value.toGml();
};

L.Filter.propertyElement = function (value) {
  if (value instanceof Element) {
    return value;
  }

  if (value && typeof (value.toGml) === "function") {
    return value.toGml();
  }

  return L.Filter.propertyName(value);
};

L.Filter.literalElement = function (value) {
  if (value instanceof Element) {
    return value;
  }

  if (value && typeof (value.toGml) === "function") {
    return value.toGml();
  }

  return L.Filter.literal(value);
};
