

const _ = require("lodash");

export default class FabricLineUtil {
  constructor(plotCanvas) {
    this._plotCanvas= plotCanvas

  }
  applyFabricObjectControls(target) {
    if (target.innerInitControls) {
      target.innerInitControls();
    } 
  }
  enable(){
    const plotCanvas =this._plotCanvas
    if(!plotCanvas) return;
    // 处理action poly
    const v =(event) => {
      if (event.selected) {
        event.selected.forEach((s) => {
          this.applyFabricObjectControls(s);
        });
      }
    }
    plotCanvas.on("selection:created", plotCanvas._createHandler(v));
    plotCanvas.on("selection:updated", plotCanvas._createHandler(v));
  }
  disable(){
    const plotCanvas =this._plotCanvas
    if(!plotCanvas) return;
    plotCanvas.off("selection:created");
    plotCanvas.off("selection:updated");
  }
}
