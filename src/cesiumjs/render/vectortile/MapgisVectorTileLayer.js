import googleFonts from 'webfont-matcher/lib/fonts/google';

function getSourceIdByRef(layers, ref) {
    let sourceId;
    layers.some(function (layer) {
        if (layer.id == ref) {
            sourceId = layer.source;
            return true;
        }
    });
    return sourceId;
}

export function getVectorTileSource(glStyle){
  const glSources = glStyle.sources;
  let sourceIds = [];
  for (const key in glSources) {
    if (glSources.hasOwnProperty(key)) {
      const source = glSources[key];
      if(source.type && source.type == "vector" 
        && source.tiles && source.tiles.length > 0){
        sourceIds.push(source);
      }
    }
  }
  return sourceIds;
}

export function getSpritePng(glStyle){
  let glSpritePng = glStyle.sprite;
  if(glSpritePng.indexOf('png') > 0){
    return glSpritePng;
  }else{
    glSpritePng += ".png";
  }

  return glSpritePng;
}

export function getLayers(glStyle) {
    //console.log("glStyle", glStyle);
    const glLayers = glStyle.layers;
    let layerIds = [];

    let glLayer, glSource, glSourceId, id, layer, url;
    for (let i = 0, ii = glLayers.length; i < ii; ++i) {
        glLayer = glLayers[i];
        if (glLayer.type == 'background') {
            //setBackground(map, glLayer);
        } else {
            id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref);
            // this technique assumes gl layers will be in a particular order
            if (id != glSourceId) {
                if (layerIds.length) {
                    //promises.push(finalizeLayer(layer, layerIds, glStyle, path, map));
                    layerIds = [];
                }
                glSource = glStyle.sources[id];
                url = glSource.url;

                if (glSource.type == 'vector') {
                  
                  //layer = setupVectorLayer(glSource, accessToken, url);
                } else if (glSource.type == 'raster') {
                    /* layer = setupRasterLayer(glSource, url);
                    layer.setVisible(glLayer.layout ? glLayer.layout.visibility !== 'none' : true);
                    view.on('change:resolution', updateRasterLayerProperties.bind(this, glLayer, layer, view));
                    updateRasterLayerProperties(glLayer, layer, view); */
                } else if (glSource.type == 'geojson') {
                    /* layer = setupGeoJSONLayer(glSource, path); */
                }
                glSourceId = id;
                if (layer) {
                    layer.set('mapbox-source', glSourceId);
                }
            }
            layerIds.push(glLayer.id);
        }
    }
    return layerIds;
}

const fontFamilyRegEx = /font-family: ?([^;]*);/;
const stripQuotesRegEx = /("|')/g;
let loadedFontFamilies;
function hasFontFamily(family) {
  if (!loadedFontFamilies) {
    loadedFontFamilies = {};
    const styleSheets = document.styleSheets;
    for (let i = 0, ii = styleSheets.length; i < ii; ++i) {
      const styleSheet = styleSheets[i];
      try {
        const cssRules = styleSheet.rules || styleSheet.cssRules;
        if (cssRules) {
          for (let j = 0, jj = cssRules.length; j < jj; ++j) {
            const cssRule = cssRules[j];
            if (cssRule.type == 5) {
              const match = cssRule.cssText.match(fontFamilyRegEx);
              loadedFontFamilies[match[1].replace(stripQuotesRegEx, '')] = true;
            }
          }
        }
      } catch (e) {
        // empty catch block
      }
    }
  }
  return family in loadedFontFamilies;
}

const fontFamilies = {};
const googleFamilies = googleFonts.getNames();
export function getFonts(fonts) {
  if (fonts in fontFamilies) {
    return fontFamilies[fonts];
  }
  const families = fonts.map(function(font) {
    return mb2css(font, 1).split(' 1px ')[1].replace(/"/g, '');
  });
  const family = families[0];
  if (!hasFontFamily(family) && googleFamilies.indexOf(family) !== -1) {
    const fontUrl = 'https://fonts.googleapis.com/css?family=' + family.replace(/ /g, '+');
    if (!document.querySelector('link[href="' + fontUrl + '"]')) {
      const markup = document.createElement('link');
      markup.href = fontUrl;
      markup.rel = 'stylesheet';
      document.getElementsByTagName('head')[0].appendChild(markup);
    }
  }
  return fonts;
}

const spriteRegEx = /^(.*)(\?.*)$/;

function withPath(url, path) {
  if (path && url.indexOf('http') != 0) {
    url = path + url;
  }
  return url;
}

function toSpriteUrl(url, path, extension) {
  url = withPath(url, path);
  const parts = url.match(spriteRegEx);
  return parts ?
    parts[1] + extension + (parts.length > 2 ? parts[2] : '') :
    url + extension;
}