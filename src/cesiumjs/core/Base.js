/**
 *MapGIS WebClient Leaflet基类
 * 定义命名空间
 * 提供公共模块
 */
import './analysis';
import './common';
import './event';
import './scene';
import './view';

window.CesiumZondy = window.CesiumZondy || {};

var CesiumZondy = window.CesiumZondy || {};

CesiumZondy.Manager = CesiumZondy.Manager || {};

CesiumZondy.UI = CesiumZondy.UI || {};

CesiumZondy.GeoSpark = CesiumZondy.GeoSpark || {};
CesiumZondy.ElasticSearch = CesiumZondy.ElasticSearch || {};
CesiumZondy.Overlayer = CesiumZondy.Overlayer || {};
CesiumZondy.Layer = CesiumZondy.Layer || {};
CesiumZondy.Provider = CesiumZondy.Provider || {};

export { CesiumZondy };
