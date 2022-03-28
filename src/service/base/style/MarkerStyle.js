import { extend } from '../../common/Util';
import { mapgis } from '../common/base';
import { VectorStyle } from './VectorStyle';
import { Symbol } from './Symbol';

const DefaultMarkerImagePlotting =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAuCAYAAABEbmvDAAAAAXNSR0IB2cksfwAAAAlwSFlzAAASdAAAEnQB3mYfeAAABjNJREFUeJztWF1MFFcUnsSY8NjEmJj0xRfTJk19sEkfffGpsWn9Q5HFYX9nd9lZVkgb2/ovC11cRRRYQLYIrAK2WrUNVK3SqtFapU1t0xrTRK1UrEbEv/fT75thXWphf2DAh/YmX2Zn5t5zv3vOd86du4ryf5um9uTJkwWPHj3SHj58uHl4eLg5Cd7z+ePHj99++vTpnGkhw4k46YMHD768OXBb4ke/kffrD0tReL8s/iBuXEtqDsru7pNy5ervMjQ01E+iXMSUkSIhTvTpyQuyqLxZZi6pFmVprSjL6kRZ1STKymZcgZUxPNstyrvbZb6vXiIdPXL33j0hQUs9SGMM0ZnLv8jCtY2iLNlhEihoFcXWIUpRAtdRMO7x3NaGfi0G+bnqTsO79LQl3qMRGosdOiV5y6pNz3BCTl7cOYKuMTDyjv2K2kVZDYLvRKW4KiGDd/4S6m9SniKp8rrPjLAYxlV4ovhAipC9e3zwvaMrRbDgEyPEb5bsket/DEycHMMXSfQiFAidDUbtMO7oNCdzdo/gYBqM9GF/jlPpPXg7v04WlsUM3eUcVgr1SN9FmbEkIkrhKE/9g1QOMDx3wFycCnJLd4nj44ShuaxJcRXUwVw7PQVNqdCIYz8m6DLh7s4dybEuksMi18SRRBH54ttLwmzP2ltMcWVFDUjtA6mEadCFcLi6JoFOE1wkvVYQk/neWqPWZSwj7MDYzy5EBhahJNhhwAVD7k4LQUnQa9AtamFHz9nMXmOH/b1nRVmOLFQx0NFuGiI8ndYgScyOaBTWy1vrmjJrjZlYHMGgAlRuJwa68NsDQ95O60B7bsqjzYhKXn6lkaFpw0nmbwRBytaQIqYxlFYDxDyIhh1JsDwifd//NHZdI1uCQpxlQ4lQkY1ObDkaiSVMclbCzUi0mcRWRiV+7PTYOhshJvfv35eZS7eh5kD4rlZzsDdhPbhgFyJiR41cFZWart60xAyP5eVvxQBs1k6sRiOxDuuhIYweLNyxFx6rlr1HT6XPTGpsfgCFVcWnjKvFHOwluXaLAZseZL2bn0qVcvx8f/q9k1mp10IDRTsxEKvRMNgPI/52CwF7GmWChTtj8tKacOaspDt7zl3CKsIYiATQEE4fjPihB59FMGxhwR54a02NrKhoyVzHyBoJMDjXWQWdoWxo8JqfXgO5kn2TB+0QGmUCHReE5XDfhez2S4ZzW/sR1DKUDW9jilyg1Rr4Wsxo2GvlVV81K8FgVp/cFOHNgT9lVnEFsgZe88KID+QCIKe3ThwcT3gRQi/OBYWV0nD4hHEWyEhqtNc+iuPL1YaQerEL+GHMj5UG4hMHx/uxQB9LUY28pm/P/WORXrs9eEde1irhdpyESppMcjqM6/EJgIvaa9rRUIpWb5VDfedz89ZorzV8fhyZg5CW1ANYqQ5ypZgkFM8e7K9TClwcQuiMyqINddlr6/lGF3Pw6yEkgQd1LQCjOowHMUmoJXsER5HSamVm4Sa5eOXX7L9cx2p09bEz38kMdQu0hpDqSXLN2YP9Oc63BztKWEINB3L71h+rJfdPdTtC4oDecPQyJglhslIg1Dw+jPfsBwkEkUDaDplXUinU7qTOlclGl9+4NSBz3FsM40oQetMxUajRnDgtGs3+vhqZYdsoX124PDHBj9eYCG29p5EIm+C1XfACJgvFzInLmv4Ng3TM7BeABBwV4q9rz+7gkUtLJsLirUh1e9ic7Bk5oKwxheQzvtcRencEIaywLoTPN4b02vUbMtu9GYmAU1QpJg2RHMK6NpYC7/mc7/1RyVPXy7kff7Y2hM83hrT7a5yi1A3GpEoptqwykFjbkALv+dzH77qNUnuoZ/JZmKk9y9Id3IhReAOob6E9JpnyEVK853NXhSyvajAK6ZT+cZds1MnA7UGZF8AnuIa9VMeJvRSaC+02r7zHc75nNk+qkObaqJezP1yRvOIPkaXYGUpBJrjLvOKez/l+SnU1Vkv+dxY9eAwnqvUIHU7uwah5xT2f8/20/Tk8ulE31NuyKujKhfrmrTSuqyIxo15Ni67Ga9TbLejtFR0lRF0nC8rDcufu3ampV7k2eqb/t2syz/WeXL1+M/1p50W0oeHh/hfN4b/d/gYnm2n24iputAAAAABJRU5ErkJggg==';

/**
 * 点样式
 * @class mapgis.style.PointStyle
 * @classdesc 点样式
 * @param {Number} [symbol] 符号样式
 * @param {Number} [size] 符号大小
 */
export default class MarkerStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        const { symbol, size = 1.0, show = true } = options;
        this.type = 'marker';
        this.show = show;
        this.size = size;
        this.symbol = symbol || new Symbol({ symbol: DefaultMarkerImagePlotting });
        extend(this, options);
    }

    /**
     * @param  {Boolean} [highlight = false] 是否激活高亮样式
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol
     * @returns MapboxGL点格式的样式
     */
    toMapboxStyle(options) {
        options = options || {};
        const { highlight = false } = options;
        const { symbol } = this;
        const { allowOverlap, color, pattern, opacity } = symbol;
        const { size, rotate, xoffset, yoffset } = symbol;

        let mapstyle = {
            paint: {
                'icon-color': color,
                'icon-opacity': opacity
            },
            layout: {
                'icon-allow-overlap': allowOverlap,
                'icon-offset': [xoffset, yoffset],
                'icon-size': size,
                'icon-rotate': rotate
            }
        };
        if (pattern) {
            mapstyle.layout['icon-image'] = pattern;
        }
        if (highlight) {
        }
        return mapstyle;
    }

    /**
     * @link https://sandcastle.cesium.com/index.html?src=Circles%20and%20Ellipses.html&label=Geometries
     * @returns Cesium点格式的样式
     */
    toCesiumStyle(options, feature, Cesium) {
        const {
            field = '',
            scale = 1,
            backgroundColor = '#FFFFFF',
            backgroundOpacity = 0,
            color = '#FFFFFF',
            opacity = 1,
            outlineColor = '#FFFFFF',
            outlineOpacity = 1,
            outlineWidth = 0,
            xOffset = 0,
            yOffset = 0,
            text,
            show = true
        } = options;
        const { url = '', rotation = 0, imageScale = 1, width, height } = options;
        let labelText;
        if (field && feature.properties && feature.properties[field]) {
            labelText = feature.properties[field];
        }
        if (text) {
            labelText = text;
        }
        let billboard = {
            show: show,
            image: url,
            rotation: rotation,
            scale: imageScale,
            pixelOffset: new Cesium.Cartesian2(xOffset, yOffset)
        };
        if (width) {
            billboard.width = width;
        }
        if (height) {
            billboard.height = height;
        }
        return {
            label: {
                show: show,
                text: String(labelText),
                scale: scale,
                showBackground: true,
                fillColor: Cesium.Color.fromCssColorString(color).withAlpha(opacity),
                outlineColor: Cesium.Color.fromCssColorString(outlineColor).withAlpha(outlineOpacity),
                outlineWidth: outlineWidth,
                backgroundColor: Cesium.Color.fromCssColorString(backgroundColor).withAlpha(backgroundOpacity),
                pixelOffset: new Cesium.Cartesian2(xOffset, yOffset * -1)
            },
            billboard: billboard
        };
    }
}

export { MarkerStyle };
mapgis.style.MarkerStyle = MarkerStyle;
