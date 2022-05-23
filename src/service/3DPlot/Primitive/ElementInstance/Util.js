function setOffsetHeight(instance, height) {
  let {values} = instance.geometry.attributes.position;
  for (let i = 0; i < values.length; i += 3) {
    let cartographic = Cesium.Cartographic.fromCartesian(new Cesium.Cartesian3(values[i], values[i + 1], values[i + 2]));
    cartographic.height += height;
    let car = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude), cartographic.height);
    values[i] = car.x;
    values[i + 1] = car.y;
    values[i + 2] = car.z;
  }
  return instance;
}

export {setOffsetHeight};