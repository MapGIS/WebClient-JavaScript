import { CesiumZondy } from "../core/Base";

import defaultValue from '../../../node_modules/cesium/Source/Core/defaultValue';
import defined from '../../../node_modules/cesium/Source/Core/defined';
// import defineProperties from '../../../node_modules/cesium/Source/Core/defineProperties';
import DeveloperError from '../../../node_modules/cesium/Source/Core/DeveloperError';
import GeographicTilingScheme from '../../../node_modules/cesium/Source/Core/GeographicTilingScheme';
import Resource from '../../../node_modules/cesium/Source/Core/Resource';
import WebMercatorProjection from '../../../node_modules/cesium/Source/Core/WebMercatorProjection';
import GetFeatureInfoFormat from '../../../node_modules/cesium/Source/Scene/GetFeatureInfoFormat';
import UrlTemplateImageryProvider from '../../../node_modules/cesium/Source/Scene/UrlTemplateImageryProvider';

let freezeObject = Object.freeze;

/**
 * Provides tiled imagery hosted by a Web Map Service (WMS) server.
 *
 * @alias WebReverseMapServiceImageryProvider
 * @constructor
 *
 * @param {Object} options Object with the following properties:
 * @param {Resource|String} options.url The URL of the WMS service. The URL supports the same keywords as the {@link UrlTemplateImageryProvider}.
 * @param {String} options.layers The layers to include, separated by commas.
 * @param {Object} [options.parameters=WebReverseMapServiceImageryProvider.DefaultParameters] Additional parameters to pass to the WMS server in the GetMap URL.
 * @param {Object} [options.getFeatureInfoParameters=WebReverseMapServiceImageryProvider.GetFeatureInfoDefaultParameters] Additional parameters to pass to the WMS server in the GetFeatureInfo URL.
 * @param {Boolean} [options.enablePickFeatures=true] If true, {@link WebReverseMapServiceImageryProvider#pickFeatures} will invoke
 *        the GetFeatureInfo operation on the WMS server and return the features included in the response.  If false,
 *        {@link WebReverseMapServiceImageryProvider#pickFeatures} will immediately return undefined (indicating no pickable features)
 *        without communicating with the server.  Set this property to false if you know your WMS server does not support
 *        GetFeatureInfo or if you don't want this provider's features to be pickable. Note that this can be dynamically
 *        overridden by modifying the WebReverseMapServiceImageryProvider#enablePickFeatures property.
 * @param {GetFeatureInfoFormat[]} [options.getFeatureInfoFormats=WebReverseMapServiceImageryProvider.DefaultGetFeatureInfoFormats] The formats
 *        in which to try WMS GetFeatureInfo requests.
 * @param {Rectangle} [options.rectangle=Rectangle.MAX_VALUE] The rectangle of the layer.
 * @param {TilingScheme} [options.tilingScheme=new GeographicTilingScheme()] The tiling scheme to use to divide the world into tiles.
 * @param {Ellipsoid} [options.ellipsoid] The ellipsoid.  If the tilingScheme is specified,
 *        this parameter is ignored and the tiling scheme's ellipsoid is used instead. If neither
 *        parameter is specified, the WGS84 ellipsoid is used.
 * @param {Number} [options.tileWidth=256] The width of each tile in pixels.
 * @param {Number} [options.tileHeight=256] The height of each tile in pixels.
 * @param {Number} [options.minimumLevel=0] The minimum level-of-detail supported by the imagery provider.  Take care when
 *        specifying this that the number of tiles at the minimum level is small, such as four or less.  A larger number is
 *        likely to result in rendering problems.
 * @param {Number} [options.maximumLevel] The maximum level-of-detail supported by the imagery provider, or undefined if there is no limit.
 *        If not specified, there is no limit.
 * @param {String} [options.crs] CRS specification, for use with WMS specification >= 1.3.0.
 * @param {String} [options.srs] SRS specification, for use with WMS specification 1.1.0 or 1.1.1
 * @param {Credit|String} [options.credit] A credit for the data source, which is displayed on the canvas.
 * @param {String|String[]} [options.subdomains='abc'] The subdomains to use for the <code>{s}</code> placeholder in the URL template.
 *                          If this parameter is a single string, each character in the string is a subdomain.  If it is
 *                          an array, each element in the array is a subdomain.
 *
 * @see ArcGisMapServerImageryProvider
 * @see BingMapsImageryProvider
 * @see GoogleEarthEnterpriseMapsProvider
 * @see createOpenStreetMapImageryProvider
 * @see SingleTileImageryProvider
 * @see createTileMapServiceImageryProvider
 * @see WebMapTileServiceImageryProvider
 * @see UrlTemplateImageryProvider
 *
 * @see {@link http://resources.esri.com/help/9.3/arcgisserver/apis/rest/|ArcGIS Server REST API}
 * @see {@link http://www.w3.org/TR/cors/|Cross-Origin Resource Sharing}
 *
 * @example
 * var provider = new Cesium.WebReverseMapServiceImageryProvider({
 *     url : 'https://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer',
 *     layers : '0',
 *     proxy: new Cesium.DefaultProxy('/proxy/')
 * });
 *
 * viewer.imageryLayers.addImageryProvider(provider);
 */
export class WebReverseMapServiceImageryProvider {
    constructor(options) {
        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

        //>>includeStart('debug', pragmas.debug);
        if (!defined(options.url)) {
            throw new DeveloperError('options.url is required.');
        }
        if (!defined(options.layers)) {
            throw new DeveloperError('options.layers is required.');
        }
        //>>includeEnd('debug');

        var resource = Resource.createIfNeeded(options.url);
        var pickFeatureResource = resource.clone();

        resource.setQueryParameters(WebReverseMapServiceImageryProvider.DefaultParameters, true);
        pickFeatureResource.setQueryParameters(WebReverseMapServiceImageryProvider.GetFeatureInfoDefaultParameters, true);

        if (defined(options.parameters)) {
            resource.setQueryParameters(objectToLowercase(options.parameters));
        }

        if (defined(options.getFeatureInfoParameters)) {
            pickFeatureResource.setQueryParameters(objectToLowercase(options.getFeatureInfoParameters));
        }

        let { reversebbox = false} = options;

        var parameters = {};
        parameters.layers = options.layers;
        if (reversebbox) {
            parameters.bbox = '{southProjected},{westProjected},{northProjected},{eastProjected}';
        } else {
            parameters.bbox = '{westProjected},{southProjected},{eastProjected},{northProjected}';
        }
        
        parameters.width = '{width}';
        parameters.height = '{height}';

        // Use SRS or CRS based on the WMS version.
        if (parseFloat(resource.queryParameters.version) >= 1.3) {
            // Use CRS with 1.3.0 and going forward.
            // For GeographicTilingScheme, use CRS:84 vice EPSG:4326 to specify lon, lat (x, y) ordering for
            // bbox requests.
            parameters.crs = defaultValue(
                options.crs,
                options.tilingScheme && options.tilingScheme.projection instanceof WebMercatorProjection ? 'EPSG:3857' : 'CRS:84'
            );
        } else {
            // SRS for WMS 1.1.0 or 1.1.1.
            parameters.srs = defaultValue(
                options.srs,
                options.tilingScheme && options.tilingScheme.projection instanceof WebMercatorProjection ? 'EPSG:3857' : 'EPSG:4326'
            );
        }

        resource.setQueryParameters(parameters, true);
        pickFeatureResource.setQueryParameters(parameters, true);

        var pickFeatureParams = {
            query_layers: options.layers,
            x: '{i}',
            y: '{j}',
            info_format: '{format}'
        };
        pickFeatureResource.setQueryParameters(pickFeatureParams, true);

        this._resource = resource;
        this._pickFeaturesResource = pickFeatureResource;
        this._layers = options.layers;

        // Let UrlTemplateImageryProvider do the actual URL building.
        this._tileProvider = new UrlTemplateImageryProvider({
            url: resource,
            pickFeaturesUrl: pickFeatureResource,
            tilingScheme: defaultValue(options.tilingScheme, new GeographicTilingScheme({ ellipsoid: options.ellipsoid })),
            rectangle: options.rectangle,
            tileWidth: options.tileWidth,
            tileHeight: options.tileHeight,
            minimumLevel: options.minimumLevel,
            maximumLevel: options.maximumLevel,
            subdomains: options.subdomains,
            tileDiscardPolicy: options.tileDiscardPolicy,
            credit: options.credit,
            getFeatureInfoFormats: defaultValue(options.getFeatureInfoFormats, WebReverseMapServiceImageryProvider.DefaultGetFeatureInfoFormats),
            enablePickFeatures: options.enablePickFeatures
        });

        /**
         * The default parameters to include in the WMS URL to obtain images.  The values are as follows:
         *    service=WMS
         *    version=1.1.1
         *    request=GetMap
         *    styles=
         *    format=image/jpeg
         *
         * @constant
         * @type {Object}
         */
        this.DefaultParameters = freezeObject({
            service: 'WMS',
            version: '1.1.1',
            request: 'GetMap',
            styles: '',
            format: 'image/jpeg'
        });

        /**
         * The default parameters to include in the WMS URL to get feature information.  The values are as follows:
         *     service=WMS
         *     version=1.1.1
         *     request=GetFeatureInfo
         *
         * @constant
         * @type {Object}
         */
        this.GetFeatureInfoDefaultParameters = freezeObject({
            service: 'WMS',
            version: '1.1.1',
            request: 'GetFeatureInfo'
        });

        this.DefaultGetFeatureInfoFormats = freezeObject([
            freezeObject(new GetFeatureInfoFormat('json', 'application/json')),
            freezeObject(new GetFeatureInfoFormat('xml', 'text/xml')),
            freezeObject(new GetFeatureInfoFormat('text', 'text/html'))
        ]);
    }

    /**
     * Gets the credits to be displayed when a given tile is displayed.
     *
     * @param {Number} x The tile X coordinate.
     * @param {Number} y The tile Y coordinate.
     * @param {Number} level The tile level;
     * @returns {Credit[]} The credits to be displayed when the tile is displayed.
     *
     * @exception {DeveloperError} <code>getTileCredits</code> must not be called before the imagery provider is ready.
     */
    getTileCredits(x, y, level) {
        return this._tileProvider.getTileCredits(x, y, level);
    }

    /**
     * Requests the image for a given tile.  This function should
     * not be called before {@link WebReverseMapServiceImageryProvider#ready} returns true.
     *
     * @param {Number} x The tile X coordinate.
     * @param {Number} y The tile Y coordinate.
     * @param {Number} level The tile level.
     * @param {Request} [request] The request object. Intended for internal use only.
     * @returns {Promise.<Image|Canvas>|undefined} A promise for the image that will resolve when the image is available, or
     *          undefined if there are too many active requests to the server, and the request
     *          should be retried later.  The resolved image may be either an
     *          Image or a Canvas DOM object.
     *
     * @exception {DeveloperError} <code>requestImage</code> must not be called before the imagery provider is ready.
     */
    requestImage(x, y, level, request) {
        return this._tileProvider.requestImage(x, y, level, request);
    }

    /**
     * Asynchronously determines what features, if any, are located at a given longitude and latitude within
     * a tile.  This function should not be called before {@link ImageryProvider#ready} returns true.
     *
     * @param {Number} x The tile X coordinate.
     * @param {Number} y The tile Y coordinate.
     * @param {Number} level The tile level.
     * @param {Number} longitude The longitude at which to pick features.
     * @param {Number} latitude  The latitude at which to pick features.
     * @return {Promise.<ImageryLayerFeatureInfo[]>|undefined} A promise for the picked features that will resolve when the asynchronous
     *                   picking completes.  The resolved value is an array of {@link ImageryLayerFeatureInfo}
     *                   instances.  The array may be empty if no features are found at the given location.
     *
     * @exception {DeveloperError} <code>pickFeatures</code> must not be called before the imagery provider is ready.
     */
    pickFeatures(x, y, level, longitude, latitude) {
        return this._tileProvider.pickFeatures(x, y, level, longitude, latitude);
    }

    /**
     * Gets the URL of the WMS server.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {String}
     * @readonly
     */
    get functionurl() {
        return this._resource._url;
    }

    /**
     * Gets the proxy used by this provider.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Proxy}
     * @readonly
     */

    get proxy() {
        return this._resource.proxy;
    }

    /**
     * Gets the names of the WMS layers, separated by commas.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {String}
     * @readonly
     */

    get layers() {
        return this._layers;
    }

    /**
     * Gets the width of each tile, in pixels. This function should
     * not be called before {@link WebReverseMapServiceImageryProvider#ready} returns true.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Number}
     * @readonly
     */

    get tileWidth() {
        return this._tileProvider.tileWidth;
    }

    /**
     * Gets the height of each tile, in pixels.  This function should
     * not be called before {@link WebReverseMapServiceImageryProvider#ready} returns true.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Number}
     * @readonly
     */

    get tileHeight() {
        return this._tileProvider.tileHeight;
    }

    /**
     * Gets the maximum level-of-detail that can be requested.  This function should
     * not be called before {@link WebReverseMapServiceImageryProvider#ready} returns true.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Number}
     * @readonly
     */

    get maximumLevel() {
        return this._tileProvider.maximumLevel;
    }

    /**
     * Gets the minimum level-of-detail that can be requested.  This function should
     * not be called before {@link WebReverseMapServiceImageryProvider#ready} returns true.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Number}
     * @readonly
     */

    get minimumLevel() {
        return this._tileProvider.minimumLevel;
    }

    /**
     * Gets the tiling scheme used by this provider.  This function should
     * not be called before {@link WebReverseMapServiceImageryProvider#ready} returns true.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {TilingScheme}
     * @readonly
     */

    get tilingScheme() {
        return this._tileProvider.tilingScheme;
    }

    /**
     * Gets the rectangle, in radians, of the imagery provided by this instance.  This function should
     * not be called before {@link WebReverseMapServiceImageryProvider#ready} returns true.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Rectangle}
     * @readonly
     */

    get rectangle() {
        return this._tileProvider.rectangle;
    }

    /**
     * Gets the tile discard policy.  If not undefined, the discard policy is responsible
     * for filtering out "missing" tiles via its shouldDiscardImage function.  If this function
     * returns undefined, no tiles are filtered.  This function should
     * not be called before {@link WebReverseMapServiceImageryProvider#ready} returns true.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {TileDiscardPolicy}
     * @readonly
     */
    get tileDiscardPolicy() {
        return this._tileProvider.tileDiscardPolicy;
    }

    /**
     * Gets an event that is raised when the imagery provider encounters an asynchronous error.  By subscribing
     * to the event, you will be notified of the error and can potentially recover from it.  Event listeners
     * are passed an instance of {@link TileProviderError}.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Event}
     * @readonly
     */

    get errorEvent() {
        return this._tileProvider.errorEvent;
    }

    /**
     * Gets a value indicating whether or not the provider is ready for use.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Boolean}
     * @readonly
     */

    get ready() {
        return this._tileProvider.ready;
    }

    /**
     * Gets a promise that resolves to true when the provider is ready for use.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Promise.<Boolean>}
     * @readonly
     */

    get readyPromise() {
        return this._tileProvider.readyPromise;
    }

    /**
     * Gets the credit to display when this imagery provider is active.  Typically this is used to credit
     * the source of the imagery.  This function should not be called before {@link WebReverseMapServiceImageryProvider#ready} returns true.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Credit}
     * @readonly
     */

    get credit() {
        return this._tileProvider.credit;
    }

    /**
     * Gets a value indicating whether or not the images provided by this imagery provider
     * include an alpha channel.  If this property is false, an alpha channel, if present, will
     * be ignored.  If this property is true, any images without an alpha channel will be treated
     * as if their alpha is 1.0 everywhere.  When this property is false, memory usage
     * and texture upload time are reduced.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Boolean}
     * @readonly
     */

    get hasAlphaChannel() {
        return this._tileProvider.hasAlphaChannel;
    }

    /**
     * Gets or sets a value indicating whether feature picking is enabled.  If true, {@link WebReverseMapServiceImageryProvider#pickFeatures} will
     * invoke the <code>GetFeatureInfo</code> service on the WMS server and attempt to interpret the features included in the response.  If false,
     * {@link WebReverseMapServiceImageryProvider#pickFeatures} will immediately return undefined (indicating no pickable
     * features) without communicating with the server.  Set this property to false if you know your data
     * source does not support picking features or if you don't want this provider's features to be pickable.
     * @memberof WebReverseMapServiceImageryProvider.prototype
     * @type {Boolean}
     * @default true
     */

    get enablePickFeatures() {
        return this._tileProvider.enablePickFeatures;
    }
    set enablePickFeatures(enablePickFeatures) {
        this._tileProvider.enablePickFeatures = enablePickFeatures;
    }
}

function objectToLowercase(obj) {
    var result = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key.toLowerCase()] = obj[key];
        }
    }
    return result;
}

export default WebReverseMapServiceImageryProvider;
CesiumZondy.Provider.WebReverseMapServiceImageryProvider = WebReverseMapServiceImageryProvider;
