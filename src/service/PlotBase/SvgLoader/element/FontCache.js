/*
 * @Author: your name
 * @Date: 2021-09-13 17:40:00
 * @LastEditTime: 2022-02-18 09:32:27
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\FontCache.js
 */

import { LogTool } from "../../../PlotUtilBase/Log/LogTool";
import { Font } from "../../../PlotUtilBase/Path2D/Font";

class FontCache {
  constructor() {
    if (!FontCache.instance) {
      FontCache.instance = this;
      this._cache = {};
    }

    return FontCache.instance;
  }

  getFont(strFontName) {
    let font = this._cache[strFontName];
    if (!font) font = this._getFont(strFontName);

    this._cache[strFontName] = font;
    return font;
  }

  _getFont(strFontName) {
    let font = null;
    const strPath = "assets/fonts/" + strFontName + ".json";

    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const json = JSON.parse(request.responseText);
          font = new Font(json);
        }
      }
    };

    request.open("GET", strPath, false);

    request.send(null);

    if (!font) console.error(request.statusText);

    return font;
  }
}

export { FontCache };
