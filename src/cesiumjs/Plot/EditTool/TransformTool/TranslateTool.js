import { CesiumUtil } from "../../Utils/CesiumUtil";
import { TransformAxis } from "../../Primitive/TransformAxisPrimitive";

export class TranslateTool {
  constructor(plotViewer) {
    this._plotViewer = plotViewer;
    this.onSelected = this._onSelected.bind(this);
    this.onLeftDown = this._onLeftDown.bind(this);
    this.onMouseMove = this._onMouseMove.bind(this);
    this.onLeftUp = this._onLeftUp.bind(this);

    this._addAxis();
  }

  getAxisTransform() {
    const transform = this._obj.modelMatrix.clone();
    const { modelMatrix } = this._obj;
    const origin = new Cesium.Cartesian3();
    Cesium.Matrix4.getTranslation(modelMatrix, origin);

    const fixedFrame = Cesium.Transforms.eastNorthUpToFixedFrame(origin);
    Cesium.Matrix4.multiplyByUniformScale(fixedFrame, 100000, transform);

    return transform;
  }

  attachObj(obj) {
    this._obj = obj;
    const transform = this.getAxisTransform();
    this._axisX.modelMatrix = transform;
    this._axisY.modelMatrix = transform;
    this._axisZ.modelMatrix = transform;

    this._axisX.show = true;
    this._axisY.show = true;
    this._axisZ.show = true;
  }

  detachObj() {
    this._obj = null;
    this._axisX.show = false;
    this._axisY.show = false;
    this._axisZ.show = false;
  }

  destroy() {
    this._removeAxis();
  }

  _addAxis() {
    const { scene } = this._plotViewer.getViewer();
    const primitiveX = TransformAxis.getAxisPrimitive(TransformAxis.X);
    this._axisX = scene.primitives.add(primitiveX);
    const primitiveY = TransformAxis.getAxisPrimitive(TransformAxis.Y);
    this._axisY = scene.primitives.add(primitiveY);
    const primitiveZ = TransformAxis.getAxisPrimitive(TransformAxis.Z);
    this._axisZ = scene.primitives.add(primitiveZ);
  }

  _removeAxis() {
    const { scene } = this._plotViewer.getViewer();
    scene.primitives.remove(this._axisX);
    scene.primitives.remove(this._axisY);
    scene.primitives.remove(this._axisZ);
  }

  _onSelected(event) {
    const obj = event.target;
    if (
      Cesium.defined(obj) &&
      Cesium.defined(obj.id) &&
      Cesium.defined(TransformAxis[obj.id])
    ) {
      return;
    }

    this.detachObj();

    if (Cesium.defined(obj) && Cesium.defined(obj.primitive)) {
      this.attachObj(obj.primitive);
    }
  }

  _onLeftDown(event) {
    if (!this._obj) return;

    const viewer = this._plotViewer.getViewer();
    const { scene } = viewer;
    const pickedObjects = scene.drillPick(event.position);

    let pickedObj = null;
    for (let i = 0; i < pickedObjects.length; i++) {
      const object = pickedObjects[i];
      if (this._obj === object.primitive) {
        pickedObj = object;
        break;
      }
    }

    if (!Cesium.defined(pickedObj)) {
      return;
    }

    this._dragging = true;
    this._oldModelMatrix = this._obj.modelMatrix.clone();
    scene.screenSpaceCameraController.enableInputs = false;
  }

  _onMouseMove(event) {
    if (!this._dragging) return;

    const viewer = this._plotViewer.getViewer();
    const pos = CesiumUtil.windowCoordToCartesian3(viewer, event.endPosition);
    const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(pos);

    this._obj.modelMatrix = modelMatrix;
    const axisTransform = this.getAxisTransform();

    this._axisX.modelMatrix = axisTransform;
    this._axisY.modelMatrix = axisTransform;
    this._axisZ.modelMatrix = axisTransform;
  }

  _onLeftUp(event) {
    if (!this._dragging) return;

    const viewer = this._plotViewer.getViewer();
    const { scene } = viewer;
    this._dragging = false;
    scene.screenSpaceCameraController.enableInputs = true;
  }
}
