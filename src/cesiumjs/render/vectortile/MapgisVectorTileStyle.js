/**
 * @author 基础平台-潘卓然
 * @class MapgisVectorTileStyle 中地数码矢量瓦片样式
 */
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';
import Point from 'ol/geom/Point';
import derefLayers from '@mapbox/mapbox-gl-style-spec/deref';
import spec from './MapgisVectorSpec';
import {
  expression, Color,
  function as fn,
  featureFilter as createFilter
} from '@mapbox/mapbox-gl-style-spec';
import mapboxToCssFont from './MapboxToCssFont'

var global_log = true;

export function deg2rad(degrees) {
  return degrees * Math.PI / 180;
}

export function getZoomForResolution(resolution, resolutions) {
  let i = 0;
  const ii = resolutions.length;
  for (; i < ii; ++i) {
    const candidate = resolutions[i];
    if (candidate < resolution && i + 1 < ii) {
      const zoomFactor = resolutions[i] / resolutions[i + 1];
      return i + Math.log(resolutions[i] / resolution) / Math.log(zoomFactor);
    }
  }
  return ii - 1;
}

const isFunction = fn.isFunction;
const convertFunction = fn.convertFunction;
const isExpression = expression.isExpression;
const createPropertyExpression = expression.createPropertyExpression;

const types = {
  'Point': 1,
  'MultiPoint': 1,
  'LineString': 2,
  'MultiLineString': 2,
  'Polygon': 3,
  'MultiPolygon': 3
};

const expressionData = function(rawExpression, propertySpec) {
  const compiledExpression = createPropertyExpression(rawExpression, propertySpec);
  if (compiledExpression.result === 'error') {
    throw new Error(compiledExpression.value.map(err => `${err.key}: ${err.message}`).join(', '));
  }
  return compiledExpression.value;
};

const emptyObj = {};
const zoomObj = {zoom: 0};
const functionCache = {};

/**
 * @private
 * @param {Object} layer Gl object layer.
 * @param {string} layoutOrPaint 'layout' or 'paint'.
 * @param {string} property Feature property.
 * @param {number} zoom Zoom.
 * @param {Object} feature Gl feature.
 * @return {?} Value.
 */
export function getValue(layer, layoutOrPaint, property, zoom, feature) {
  const layerId = layer.id;
  if (!functionCache[layerId]) {
    functionCache[layerId] = {};
  }
  const functions = functionCache[layerId];
  if (!functions[property]) {
    let value = (layer[layoutOrPaint] || emptyObj)[property];
    const propertySpec = spec[`${layoutOrPaint}_${layer.type}`][property];
    if (value === undefined) {
      value = propertySpec.default;
    }
    let isExpr = isExpression((value));
    if (!isExpr && isFunction(value)) {
      value = convertFunction(value, propertySpec);
      isExpr = true;
    }
    if (isExpr) {
      const compiledExpression = expressionData(value, propertySpec);
      functions[property] = compiledExpression.evaluate.bind(compiledExpression);
    } else {
      if (propertySpec.type == 'color') {
        value = Color.parse(value);
      }
      functions[property] = function() {
        return value;
      };
    }
  }
  zoomObj.zoom = zoom;
  return functions[property](zoomObj, feature);
}

const filterCache = {};
function evaluateFilter(layerId, filter, feature, zoom) {
  if (!(layerId in filterCache)) {
    filterCache[layerId] = createFilter(filter).filter;;
  }
  zoomObj.zoom = zoom;
  return filterCache[layerId](zoomObj, feature);
}

const colorCache = {};
function colorWithOpacity(color, opacity) {
  if (color && opacity !== undefined) {
    let colorData = colorCache[color];
    if (!colorData) {
      colorCache[color] = colorData = {
        color: color.toArray(),
        opacity: color.a
      };
    }
    color = colorData.color;
    color[3] = colorData.opacity * opacity;
    if (color[3] === 0) {
      color = undefined;
    }
  }
  return color;
}

const templateRegEx = /^([^]*)\{(.*)\}([^]*)$/;
function fromTemplate(text, properties) {
  let parts;
  do {
    parts = text.match(templateRegEx);
    if (parts) {
      const value = properties[parts[2]] || '';
      text = parts[1] + value + parts[3];
    }
  } while (parts);
  return text;
}

/**
 * ```js
 * import stylefunction from 'ol-mapbox-style/stylefunction';
 * ```
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"` or
 * `"type": "geojson"` source and applies it to the specified OpenLayers layer.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * @param {ol.layer.Vector|ol.layer.VectorTile} olLayer OpenLayers layer to
 * apply the style to. In addition to the style, the layer will get two
 * properties: `mapbox-source` will be the `id` of the `glStyle`'s source used
 * for the layer, and `mapbox-layers` will be an array of the `id`s of the
 * `glStyle`'s layers.
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>} source `source` key or an array of layer `id`s
 * from the Mapbox Style object. When a `source` key is provided, all layers for
 * the specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @param {Array<number>} [resolutions=[78271.51696402048, 39135.75848201024,
 * 19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564,
 * 1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525,
 * 76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032,
 * 4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395,
 * 0.29858214173896974, 0.14929107086948487, 0.07464553543474244]]
 * Resolutions for mapping resolution to zoom level.
 * @param {Object} [spriteData=undefined] Sprite data from the url specified in
 * the Mapbox Style object's `sprite` property. Only required if a `sprite`
 * property is specified in the Mapbox Style object.
 * @param {Object} [spriteImageUrl=undefined] Sprite image url for the sprite
 * specified in the Mapbox Style object's `sprite` property. Only required if a
 * `sprite` property is specified in the Mapbox Style object.
 * @param {function(Array<string>):string} [getFonts=undefined] Function that
 * receives a font stack as arguments, and returns a (modified) font stack that
 * is available. Font names are the names used in the Mapbox Style object. If
 * not provided, the font stack will be used as-is. This function can also be
 * used for loading web fonts.
 * @return {ol.style.StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
export default function(glStyle, source, resolutions, spriteData, spriteImageUrl, getFonts) {
  if (!resolutions) {
    resolutions = [];
    for (let res = 78271.51696402048; resolutions.length < 21; res /= 2) {
      resolutions.push(res);
    }
  }
  if (typeof glStyle == 'string') {
    glStyle = JSON.parse(glStyle);
  }
  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
  }

  let spriteImage, spriteImgSize;
  if (spriteImageUrl) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      spriteImage = img;
      spriteImgSize = [img.width, img.height];
      //olLayer.changed();
      img.onload = null;
    };
    img.src = spriteImageUrl;
  }

  const ctx = document.createElement('CANVAS').getContext('2d');
  const measureCache = {};
  function wrapText(text, font, em) {
    const key = em + ',' + font + ',' + text;
    let wrappedText = measureCache[key];
    if (!wrappedText) {
      ctx.font = font;
      const oneEm = ctx.measureText('M').width;
      const width = oneEm * em;
      const words = text.split(' ');
      let line = '';
      const lines = [];
      for (let i = 0, ii = words.length; i < ii; ++i) {
        const word = words[i];
        if ((ctx.measureText(line + word).width <= width)) {
          line += (line ? ' ' : '') + word;
        } else {
          if (line) {
            lines.push(line);
          }
          line = word;
        }
      }
      if (line) {
        lines.push(line);
      }
      measureCache[key] = wrappedText = lines.join('\n');
    }
    return wrappedText;
  }

  const allLayers = derefLayers(glStyle.layers);

  const layersBySourceLayer = {};
  const mapboxLayers = [];
  let mapboxSource;
  for (let i = 0, ii = allLayers.length; i < ii; ++i) {
    const layer = allLayers[i];
    const layerId = layer.id;
    if ((typeof source == 'string' && layer.source == source) ||
      (typeof source == 'object' && source.indexOf(layer.source) >= 0)) {      
      const sourceLayer = layer['source-layer'];  
      if (!mapboxSource) {
        mapboxSource = layer.source;
        const source = glStyle.sources[mapboxSource];
        if (!source) {
          throw new Error(`Source "${mapboxSource}" is not defined`);
        }
        const type = source.type;
        if (type !== 'vector' && type !== 'geojson') {
          throw new Error(`Source "${mapboxSource}" is not of type "vector" or "geojson", but "${type}"`);
        }
      }
      let layers = layersBySourceLayer[sourceLayer];
      if (!layers) {
        layers = layersBySourceLayer[sourceLayer] = [];
      }
      layers.push({
        layer: layer,
        index: i
      });
      mapboxLayers.push(layerId);
    }
    // TODO revisit when diffing gets added
    delete functionCache[layerId];
    delete filterCache[layerId];
  }

  const textHalo = new Stroke();
  const textColor = new Fill();

  const iconImageCache = {};
  const patternCache = {};
  const styles = [];

  const styleFunction = function(feature, resolution) {
    const properties = feature.getProperties();
    const layers = layersBySourceLayer[properties.layer];
    
    if (!layers) {
      return [];
    }
    let zoom = resolutions.indexOf(resolution);
    if (zoom == -1) {
      zoom = getZoomForResolution(resolution, resolutions);
    }
    const type = types[feature.getGeometry().getType()];
    const f = {
      properties: properties,
      type: type
    };
    let stylesLength = -1;
    
    for (let i = 0, ii = layers.length; i < ii; ++i) {
      const layerData = layers[i];
      const layer = layerData.layer;
      const layerId = layer.id;

      const layout = layer.layout || emptyObj;
      const paint = layer.paint || emptyObj;
      if (layout.visibility === 'none' || ('minzoom' in layer && zoom < layer.minzoom) ||
          ('maxzoom' in layer && zoom >= layer.maxzoom)) {
        continue;
      } else {
         const filter = layer.filter;
         if (!filter || evaluateFilter(layerId, filter, f, zoom)) {
         let color, opacity, fill, stroke, strokeColor, style;
         const index = layerData.index;
           if (type == 3 && layer.type == 'fill') {
            opacity = getValue(layer, 'paint', 'fill-opacity', zoom, f);
            if ('fill-pattern' in paint) {
               const fillIcon = getValue(layer, 'paint', 'fill-pattern', zoom, f);
              if (fillIcon) {
                const icon = fromTemplate(fillIcon, properties);
                if (spriteImage && spriteData && spriteData[icon]) {
                  ++stylesLength;
                  style = styles[stylesLength];
                  if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                    style = styles[stylesLength] = new Style({
                      fill: new Fill()
                    });
                  }
                  fill = style.getFill();
                  style.setZIndex(index);
                  const icon_cache_key = icon + '.' + opacity;
                  let pattern = patternCache[icon_cache_key];
                  if (!pattern) {
                    const spriteImageData = spriteData[icon];
                    const canvas = document.createElement('canvas');
                    canvas.width = spriteImageData.width;
                    canvas.height = spriteImageData.height;
                    const ctx = canvas.getContext('2d');
                    ctx.globalAlpha = opacity;
                    ctx.drawImage(
                      spriteImage,
                      spriteImageData.x,
                      spriteImageData.y,
                      spriteImageData.width,
                      spriteImageData.height,
                      0,
                      0,
                      spriteImageData.width,
                      spriteImageData.height
                    );
                    pattern = ctx.createPattern(canvas, 'repeat');
                    patternCache[icon_cache_key] = pattern;
                  }
                  fill.setColor(pattern);
                }
              } 
            } else {
              color = colorWithOpacity(getValue(layer, 'paint', 'fill-color', zoom, f), opacity);
              if (color) {
                ++stylesLength;
                style = styles[stylesLength];
                if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                  style = styles[stylesLength] = new Style({
                    fill: new Fill()
                  });
                }
                fill = style.getFill();
                fill.setColor(color);
                style.setZIndex(index);
              }
              if ('fill-outline-color' in paint) {
                strokeColor = colorWithOpacity(getValue(layer, 'paint', 'fill-outline-color', zoom, f), opacity);
              }
              if (strokeColor) {
                ++stylesLength;
                style = styles[stylesLength];
                if (!style || !style.getStroke() || style.getFill() || style.getText()) {
                  style = styles[stylesLength] = new Style({
                    stroke: new Stroke()
                  });
                }
                stroke = style.getStroke();
                stroke.setLineCap(spec['layout_line']['line-cap']);
                stroke.setLineJoin(spec['layout_line']['line-join']);
                stroke.setMiterLimit(spec['layout_line']['line-miter-limit']);
                stroke.setColor(strokeColor);
                stroke.setWidth(1);
                stroke.setLineDash(null);
                style.setZIndex(index);
              }
            }
          } 
           if (type != 1 && layer.type == 'line') {
            color = !('line-pattern' in paint) && 'line-color' in paint ?
              colorWithOpacity(getValue(layer, 'paint', 'line-color', zoom, f), getValue(layer, 'paint', 'line-opacity', zoom, f)) :
              undefined;
            const width = getValue(layer, 'paint', 'line-width', zoom, f);
            if (color && width > 0) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getStroke() || style.getFill() || style.getText()) {
                style = styles[stylesLength] = new Style({
                  stroke: new Stroke()
                });
              }
              stroke = style.getStroke();
              stroke.setLineCap(getValue(layer, 'layout', 'line-cap', zoom, f));
              stroke.setLineJoin(getValue(layer, 'layout', 'line-join', zoom, f));
              stroke.setMiterLimit(getValue(layer, 'layout', 'line-miter-limit', zoom, f));
              stroke.setColor(color);
              stroke.setWidth(width);
              stroke.setLineDash(paint['line-dasharray'] ?
                getValue(layer, 'paint', 'line-dasharray', zoom, f).map(function(x) {
                  return x * width;
                }) : null);
              style.setZIndex(index);
            }
          }
  
          let hasImage = false;
          let text = null;
          let placementAngle = 0;
          let icon, iconImg, skipLabel;
          if ((type == 1 || type == 2) && 'icon-image' in layout) {
            const iconImage = getValue(layer, 'layout', 'icon-image', zoom, f);
            if (iconImage) {
              icon = fromTemplate(iconImage, properties);
              let styleGeom = undefined;
              if (spriteImage && spriteData && spriteData[icon]) {
                const iconRotationAlignment = getValue(layer, 'layout', 'icon-rotation-alignment', zoom, f);
                if (type == 2) {
                  const geom = feature.getGeometry();
                  // ol package and ol-debug.js only
                  if (geom.getFlatMidpoint) {
                    const extent = geom.getExtent();
                    const size = Math.sqrt(Math.max(
                      Math.pow((extent[2] - extent[0]) / resolution, 2),
                      Math.pow((extent[3] - extent[1]) / resolution, 2))
                    );
                    if (size > 150) {
                      //FIXME Do not hard-code a size of 150
                      const midpoint = geom.getFlatMidpoint();
                      styleGeom = new Point(midpoint);
                      const placement = getValue(layer, 'layout', 'symbol-placement', zoom, f);
                      if (placement === 'line' && iconRotationAlignment === 'map') {
                        const stride = geom.getStride();
                        const coordinates = geom.getFlatCoordinates();
                        for (let i = 0, ii = coordinates.length - stride; i < ii; i += stride) {
                          const x1 = coordinates[i];
                          const y1 = coordinates[i + 1];
                          const x2 = coordinates[i + stride];
                          const y2 = coordinates[i + stride + 1];
                          const minX = Math.min(x1, x2);
                          const minY = Math.min(y1, y2);
                          const maxX = Math.max(x1, x2);
                          const maxY = Math.max(y1, y2);
                          if (midpoint[0] >= minX && midpoint[0] <= maxX &&
                              midpoint[1] >= minY && midpoint[1] <= maxY) {
                            placementAngle = Math.atan2(y1 - y2, x2 - x1);
                            break;
                          }
                        }
                      }
                    }
                  }
                }
                if (type !== 2 || styleGeom) {
                  ++stylesLength;
                  style = styles[stylesLength];
                  if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
                    style = styles[stylesLength] = new Style();
                  }
                  style.setGeometry(styleGeom);
                  const iconSize = getValue(layer, 'layout', 'icon-size', zoom, f);
                  const iconColor = paint['icon-color'] !== undefined ? getValue(layer, 'paint', 'icon-color', zoom, f) : null;
                  let icon_cache_key = icon + '.' + iconSize;
                  if (iconColor !== null) {
                    icon_cache_key += '.' + iconColor;
                  }
                  iconImg = iconImageCache[icon_cache_key];
                  if (!iconImg) {
                    const spriteImageData = spriteData[icon];
                    if (iconColor !== null) {
                      // cut out the sprite and color it
                      color = colorWithOpacity(iconColor, 1);
                      const canvas = document.createElement('canvas');
                      canvas.width = spriteImageData.width;
                      canvas.height = spriteImageData.height;
                      const ctx = canvas.getContext('2d');
                      ctx.drawImage(
                        spriteImage,
                        spriteImageData.x,
                        spriteImageData.y,
                        spriteImageData.width,
                        spriteImageData.height,
                        0,
                        0,
                        spriteImageData.width,
                        spriteImageData.height
                      );
                      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
                      for (let c = 0, cc = data.data.length; c < cc; c += 4) {
                        data.data[c] = color[0];
                        data.data[c + 1] = color[1];
                        data.data[c + 2] = color[2];
                      }
                      ctx.putImageData(data, 0, 0);
                      iconImg = iconImageCache[icon_cache_key] = new Icon({
                        img: canvas,
                        imgSize: [canvas.width, canvas.height],
                        scale: iconSize / spriteImageData.pixelRatio
                      });
                    } else {
                      iconImg = iconImageCache[icon_cache_key] = new Icon({
                        img: spriteImage,
                        imgSize: spriteImgSize,
                        size: [spriteImageData.width, spriteImageData.height],
                        offset: [spriteImageData.x, spriteImageData.y],
                        rotateWithView: iconRotationAlignment === 'map',
                        scale: iconSize / spriteImageData.pixelRatio
                      });
                    }
                  }
                  iconImg.setRotation(placementAngle + deg2rad(getValue(layer, 'layout', 'icon-rotate', zoom, f)));
                  iconImg.setOpacity(getValue(layer, 'paint', 'icon-opacity', zoom, f));
                  style.setImage(iconImg);
                  text = style.getText();
                  style.setText(undefined);
                  style.setZIndex(99999 - index);
                  hasImage = true;
                  skipLabel = false;
                } else {
                  skipLabel = true;
                }
              }
            }
          }
          if (type == 1 && 'circle-radius' in paint) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
              style = styles[stylesLength] = new Style();
            }
            const circleRadius = getValue(layer, 'paint', 'circle-radius', zoom, f);
            const circleStrokeColor = getValue(layer, 'paint', 'circle-stroke-color', zoom, f);
            const circleColor = getValue(layer, 'paint', 'circle-color', zoom, f);
            const circleOpacity = getValue(layer, 'paint', 'circle-opacity', zoom, f);
            const circleStrokeOpacity = getValue(layer, 'paint', 'circle-stroke-opacity', zoom, f);
            const circleStrokeWidth = getValue(layer, 'paint', 'circle-stroke-width', zoom, f);
            const cache_key = circleRadius + '.' + circleStrokeColor + '.' +
              circleColor + '.' + circleOpacity + '.' + circleStrokeWidth;
            iconImg = iconImageCache[cache_key];
            if (!iconImg) {
              iconImg = new Circle({
                radius: circleRadius,
                stroke: circleStrokeWidth === 0 ? undefined : new Stroke({
                  width: circleStrokeWidth,
                  color: colorWithOpacity(circleStrokeColor, circleStrokeOpacity)
                }),
                fill: new Fill({
                  color: colorWithOpacity(circleColor, circleOpacity)
                })
              });
            }
            style.setImage(iconImg);
            text = style.getText();
            style.setText(undefined);
            style.setGeometry(undefined);
            style.setZIndex(99999 - index);
            hasImage = true;
          }
  
          let label;
          if ('text-field' in layout) {
            const textField = getValue(layer, 'layout', 'text-field', zoom, f).toString();
            label = fromTemplate(textField, properties);
          }
          if (label && !skipLabel) {
            if (!hasImage) {
              ++stylesLength;            
              style = styles[stylesLength];
              if (!style || !style.getText() || style.getFill() || style.getStroke()) {
                style = styles[stylesLength] = new Style();
              }
              style.setImage(undefined);
              style.setGeometry(undefined);
            }
            if (!style.getText()) {
              style.setText(text || new Text());
            }          
            text = style.getText();
            const textSize = getValue(layer, 'layout', 'text-size', zoom, f);
            const fontArray = getValue(layer, 'layout', 'text-font', zoom, f);
  
            const font = mapboxToCssFont( /* getFonts ? getFonts(fontArray) :   */fontArray, textSize);
            
            const textTransform = layout['text-transform'];
            if (textTransform == 'uppercase') {
              label = label.toUpperCase();
            } else if (textTransform == 'lowercase') {
              label = label.toLowerCase();
            }
            const wrappedLabel = type == 2 ? label : wrapText(label, font, getValue(layer, 'layout', 'text-max-width', zoom, f));
            text.setText(wrappedLabel);
            text.setFont(font);
            text.setRotation(deg2rad(getValue(layer, 'layout', 'text-rotate', zoom, f)));
            const textAnchor = getValue(layer, 'layout', 'text-anchor', zoom, f);
            const placement = (hasImage || type == 1) ? 'point' : getValue(layer, 'layout', 'symbol-placement', zoom, f);
            text.setPlacement(placement);
            if (placement == 'point') {
              let textAlign = 'center';
              if (textAnchor.indexOf('left') !== -1) {
                textAlign = 'left';
              } else if (textAnchor.indexOf('right') !== -1) {
                textAlign = 'right';
              }
              text.setTextAlign(textAlign);
            } else {
              text.setTextAlign();
            }
            let textBaseline = 'middle';
            if (textAnchor.indexOf('bottom') == 0) {
              textBaseline = 'bottom';
            } else if (textAnchor.indexOf('top') == 0) {
              textBaseline = 'top';
            }
            text.setTextBaseline(textBaseline);
            const textOffset = getValue(layer, 'layout', 'text-offset', zoom, f);
            text.setOffsetX(textOffset[0] * textSize);
            text.setOffsetY(textOffset[1] * textSize);
            opacity = getValue(layer, 'paint', 'text-opacity', zoom, f);
            textColor.setColor(colorWithOpacity(getValue(layer, 'paint', 'text-color', zoom, f), opacity));
            text.setFill(textColor);
            const haloColor = colorWithOpacity(getValue(layer, 'paint', 'text-halo-color', zoom, f), opacity);
            if (haloColor) {
              textHalo.setColor(haloColor);
              textHalo.setWidth(getValue(layer, 'paint', 'text-halo-width', zoom, f));
              text.setStroke(textHalo);
            } else {
              text.setStroke(undefined);
            }
            style.setZIndex(99999 - index);
          }
        }
      }      
    }

    if (stylesLength > -1) {
      styles.length = stylesLength + 1;
      return styles;
    } else {
      return [];
    }
  };
  return styleFunction;

  /* olLayer.setStyle(styleFunction);
  olLayer.set('mapbox-source', mapboxSource);
  olLayer.set('mapbox-layers', mapboxLayers); */
}
