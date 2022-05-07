import LogTool from "../Log/LogTool";
import { ShapePath } from "./ShapePath";

function createPaths(text, size, data) {
  const chars = Array.from(text);
  const scale = size / data.resolution;
  const line_height =
    (data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness) *
    scale;

  const paths = [];

  let offsetX = 0,
    offsetY = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (char === "\n") {
      offsetX = 0;
      offsetY -= line_height;
    } else {
      const ret = createPath(char, scale, offsetX, offsetY, data);
      offsetX += ret.offsetX;
      paths.push(ret.path);
    }
  }

  return paths;
}

function createPath(char, scale, offsetX, offsetY, data) {
  const glyph = data.glyphs[char] || data.glyphs["?"];

  if (!glyph) {
    LogTool.error(data.familyName + "中不存在" + char);
    return;
  }

  const path = new ShapePath();

  let x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;

  if (glyph.o) {
    const outline =
      glyph._cachedOutline || (glyph._cachedOutline = glyph.o.split(" "));

    for (let i = 0, l = outline.length; i < l; ) {
      const action = outline[i++];

      switch (action) {
        case "m": // moveTo
          x = outline[i++] * scale + offsetX;
          y = outline[i++] * scale + offsetY;

          path.moveTo(x, y);

          break;

        case "l": // lineTo
          x = outline[i++] * scale + offsetX;
          y = outline[i++] * scale + offsetY;

          path.lineTo(x, y);

          break;

        case "q": // quadraticCurveTo
          cpx = outline[i++] * scale + offsetX;
          cpy = outline[i++] * scale + offsetY;
          cpx1 = outline[i++] * scale + offsetX;
          cpy1 = outline[i++] * scale + offsetY;

          path.quadraticCurveTo(cpx1, cpy1, cpx, cpy);

          break;

        case "b": // bezierCurveTo
          cpx = outline[i++] * scale + offsetX;
          cpy = outline[i++] * scale + offsetY;
          cpx1 = outline[i++] * scale + offsetX;
          cpy1 = outline[i++] * scale + offsetY;
          cpx2 = outline[i++] * scale + offsetX;
          cpy2 = outline[i++] * scale + offsetY;

          path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, cpx, cpy);

          break;
      }
    }
  }

  return { offsetX: glyph.ha * scale, path: path };
}

/**
 * Font类，用于根据truetype字体生成文字几何
 */
export default class Font {
  /**
   *
   * @param {*} data json文件 可以使用https://gero3.github.io/facetype.js/将windows字体转换为json格式数据
   */
  constructor(data) {
    this.data = data;
  }

  /**
   *
   * @param {*} text 要生成几何的文字内容
   * @param {*} size 文字大小
   * @returns
   */
  generateShapes(text, size = 100) {
    const shapes = [];
    const paths = createPaths(text, size, this.data);

    for (let p = 0, pl = paths.length; p < pl; p++) {
      Array.prototype.push.apply(shapes, paths[p].toShapes());
    }

    return shapes;
  }
}
