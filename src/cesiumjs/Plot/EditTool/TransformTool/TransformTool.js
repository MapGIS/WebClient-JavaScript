import CesiumUtil from "../../Utils/CesiumUtil";
import TranslateTool from "./TranslateTool";

function onSelected(event) {
    if (!Cesium.defined(this._curTool))
        return;

    this._curTool.onSelected(event);
}

function onLeftDown(event) {
    this._dragging = true;
    if (!Cesium.defined(this._curTool))
        return;

    this._curTool.onLeftDown(event);
}

function onMouseMove(event) {
    if (!this._dragging)
        return;

    if (!Cesium.defined(this._curTool))
        return;

    this._curTool.onMouseMove(event);
}

function onLeftUp(event) {
    this._dragging = false;
    if (!Cesium.defined(this._curTool))
        return;

    this._curTool.onLeftUp(event);
    this._dragging = false;
}

export default class TransformTool {
    constructor(plotViewer) {
        if (!Cesium.defined(plotViewer)) {
            throw new Error("plotViewer 未初始化");
        }

        this._onLeftDown = onLeftDown.bind(this);
        this._onSelected = onSelected.bind(this);
        this._onMouseMove = onMouseMove.bind(this);
        this._onLeftUp = onLeftUp.bind(this);

        this._plotViewer = plotViewer;
        this._curTool = null;
        this._curMode = null;
        this._dragging = false;
    }

    setMode(mode) {
        if (mode === this._curMode)
            return;

        if(Cesium.defined(this._curTool))
        {
            this._curTool.destroy();
            this._curTool=null;
        }

        this._curMode=mode;
        if(mode==="translation")
        {
            this._curTool=new TranslateTool(this._plotViewer);
        }
        else if(mode==="rotation")
        {
            // this._curTool=new RotateTool(this._plotViewer);
        }
        else if(mode==="scale")
        {
            // this._curTool=new ScaleTool();
        }
    }

    enable() {
        this._plotViewer.on("selected", this._onSelected);
        const viewer = this._plotViewer.getViewer();
        const { scene } = viewer;
        this._leftDownHandler = CesiumUtil.createEventHandler(Cesium.ScreenSpaceEventType.LEFT_DOWN, this._onLeftDown, scene);
        this._mouseMoveHandler = CesiumUtil.createEventHandler(Cesium.ScreenSpaceEventType.MOUSE_MOVE, this._onMouseMove, scene);
        this._leftUpHandler = CesiumUtil.createEventHandler(Cesium.ScreenSpaceEventType.LEFT_UP, this._onLeftUp, scene);
    }

    disable() {
        if (Cesium.defined(this._curTool)) {
            this.setMode(null);
        }
        this._leftDownHandler = CesiumUtil.destroyEventHandler(this._leftDownHandler);
        this._mouseMoveHandler = CesiumUtil.destroyEventHandler(this._mouseMoveHandler);
        this._leftUpHandler = CesiumUtil.destroyEventHandler(this._leftUpHandler);
        this._plotViewer.off("selected", this._onSelected);
    }
}

TransformTool.translationMode = 'translation';
TransformTool.rotationMode = 'rotation';
TransformTool.scaleMode = 'scale';