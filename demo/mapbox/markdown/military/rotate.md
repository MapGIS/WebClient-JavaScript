### 代码说明
``` js
{
  "id": "陆地交通_桥",
  "type": "symbol",
  "source": "DN10500432_5",
  "source-layer": "陆地交通_D_140000_DN10500432_PNT",
  "layout": {
    "icon-size": 4,
    "icon-rotate": {
      "property": "注记指针",
      "stops": [
        [
          0,
          0
        ],
        [
          360,
          360
        ]
      ]
    },
    "visibility": "visible",
    "icon-image": "120103_火炬",
    "icon-offset": [
      0,
      0
    ],
    "icon-allow-overlap": true,
    "icon-keep-upright": true,
    "icon-rotation-alignment": "map",
    "symbol-placement": "point",
    "icon-text-fit": "none",
    "icon-text-fit-padding": [
      0,
      0,
      0,
      0
    ],
    "icon-padding": 0
  },
  "paint": {
    "icon-color": "rgba(170, 33, 197, 1)",
    "icon-translate": [
      0,
      0
    ],
    "icon-translate-anchor": "map"
  }
}
```

### Function
> The value for any layout or paint property may be specified as a function. Functions allow you to make the appearance of a map feature change with the current zoom level and/or the feature's properties.

#### `stops`
>Required (except for identity functions) array.
>> Functions are defined in terms of input and output values. A set of one input value and one output value is known as a "stop." Stop output values must be literal values (i.e. not functions or expressions), and appropriate for the property. For example, stop output values for a function used in the fill-color property must be colors.

#### `property`
Optional string.
> If specified, the function will take the specified feature property as an input. See Zoom Functions and Property Functions for more information.

#### `base`
> Optional number. Default is 1.
>> The exponential base of the interpolation curve. It controls the rate at which the function output increases. Higher values make the output increase more towards the high end of the range. With values close to 1 the output increases linearly.

#### `type`
> Optional string. One of "identity", "exponential","interval", or "categorical".
+ "identity"
    A function that returns its input as the output.
+ "exponential"
    A function that generates an output by interpolating between stops just less than and just greater than the function input. The domain (input value) must be numeric, and the style property must support interpolation. Style properties that support interpolation are marked marked with, the "exponential" symbol, and exponential is the default function type for these properties.
+ "interval"
    A function that returns the output value of the stop just less than the function input. The domain (input value) must be numeric. Any style property may use interval functions. For properties marked with, the "interval" symbol, this is the default function type.
+ "categorical"
    A function that returns the output value of the stop equal to the function input.

#### `default`
> A value to serve as a fallback function result when a value isn't otherwise available. It is used in the following circumstances:
+ In categorical functions, when the feature value does not match any of the stop domain values.
+ In property and zoom-and-property functions, when a feature does not contain a value for the specified property.
+ In identity functions, when the feature value is not valid for the style property (for example, if the function is being used for a circle-color property but the feature property value is not a string or not a valid color).
+ In interval or exponential property and zoom-and-property functions, when the feature value is not numeric.
+ If no default is provided, the style property's default is used in these circumstances.

#### `colorSpace`
Optional string. One of"rgb", "lab", "hcl".
    The color space in which colors interpolated. Interpolating colors in perceptual color spaces like LAB and HCL tend to produce color ramps that look more consistent and produce colors that can be differentiated more easily than those interpolated in RGB space.
+ "rgb"
    Use the RGB color space to interpolate color values
+ "lab"
    Use the LAB color space to interpolate color values.
+ "hcl"
    Use the HCL color space to interpolate color values, interpolating the Hue, Chroma, and Luminance channels individually.