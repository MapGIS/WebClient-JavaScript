/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
/**
  @license
  when.js - https://github.com/cujojs/when

  MIT License (c) copyright B Cavalier & J Hann

 * A lightweight CommonJS Promises/A and when() implementation
 * when is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 1.7.1
 */

!function(){define("Core/defined",[],function(){"use strict";function n(n){return void 0!==n&&null!==n}return n}),function(n){"use strict";n("ThirdParty/when",[],function(){function n(n,r,t,o){return e(n).then(r,t,o)}function e(n){var e,r;return n instanceof t?e=n:f(n)?(r=i(),n.then(function(n){r.resolve(n)},function(n){r.reject(n)},function(n){r.progress(n)}),e=r.promise):e=o(n),e}function r(e){return n(e,u)}function t(n){this.then=n}function o(n){return new t(function(r){try{return e(r?r(n):n)}catch(n){return u(n)}})}function u(n){return new t(function(r,t){try{return t?e(t(n)):u(n)}catch(n){return u(n)}})}function i(){function n(n,e,r){return l(n,e,r)}function r(n){return d(n)}function o(n){return d(u(n))}function f(n){return p(n)}var c,s,a,h,l,p,d;return s=new t(n),c={then:n,resolve:r,reject:o,progress:f,promise:s,resolver:{resolve:r,reject:o,progress:f}},a=[],h=[],l=function(n,e,r){var t,o;return t=i(),o="function"==typeof r?function(n){try{t.progress(r(n))}catch(n){t.progress(n)}}:function(n){t.progress(n)},a.push(function(r){r.then(n,e).then(t.resolve,t.reject,o)}),h.push(o),t.promise},p=function(n){return v(h,n),n},d=function(n){return n=e(n),l=n.then,d=e,p=y,v(a,n),h=a=k,n},c}function f(n){return n&&"function"==typeof n.then}function c(e,r,t,o,u){return g(2,arguments),n(e,function(e){function f(n){v(n)}function c(n){d(n)}var s,a,h,l,p,d,v,g,m,w;if(m=e.length>>>0,s=Math.max(0,Math.min(r,m)),h=[],a=m-s+1,l=[],p=i(),s)for(g=p.progress,v=function(n){l.push(n),--a||(d=v=y,p.reject(l))},d=function(n){h.push(n),--s||(d=v=y,p.resolve(h))},w=0;w<m;++w)w in e&&n(e[w],c,f,g);else p.resolve(h);return p.then(t,o,u)})}function s(n,e,r,t){function o(n){return e?e(n[0]):n[0]}return c(n,1,o,r,t)}function a(n,e,r,t){return g(1,arguments),l(n,m).then(e,r,t)}function h(){return l(arguments,m)}function l(e,r){return n(e,function(e){var t,o,u,f,c,s;if(u=o=e.length>>>0,t=[],s=i(),u)for(f=function(e,o){n(e,r).then(function(n){t[o]=n,--u||s.resolve(t)},s.reject)},c=0;c<o;c++)c in e?f(e[c],c):--u;else s.resolve(t);return s.promise})}function p(e,r){var t=j.call(arguments,1);return n(e,function(e){var o;return o=e.length,t[0]=function(e,t,u){return n(e,function(e){return n(t,function(n){return r(e,n,u,o)})})},w.apply(e,t)})}function d(e,r,t){var o=arguments.length>2;return n(e,function(n){return n=o?t:n,r.resolve(n),n},function(n){return r.reject(n),u(n)},r.progress)}function v(n,e){for(var r,t=0;r=n[t++];)r(e)}function g(n,e){for(var r,t=e.length;t>n;)if(null!=(r=e[--t])&&"function"!=typeof r)throw new Error("arg "+t+" must be a function")}function y(){}function m(n){return n}var w,j,k;return n.defer=i,n.resolve=e,n.reject=r,n.join=h,n.all=a,n.map=l,n.reduce=p,n.any=s,n.some=c,n.chain=d,n.isPromise=f,t.prototype={always:function(n,e){return this.then(n,n,e)},otherwise:function(n){return this.then(k,n)},yield:function(n){return this.then(function(){return n})},spread:function(n){return this.then(function(e){return a(e,function(e){return n.apply(k,e)})})}},j=[].slice,w=[].reduce||function(n){var e,r,t,o,u;if(u=0,e=Object(this),o=e.length>>>0,r=arguments,r.length<=1)for(;;){if(u in e){t=e[u++];break}if(++u>=o)throw new TypeError}else t=r[1];for(;u<o;++u)u in e&&(t=n(t,e[u],u,e));return t},n})}("function"==typeof define&&define.amd?define:function(n){"object"==typeof exports?module.exports=n():this.when=n()}),define("Core/freezeObject",["./defined"],function(n){"use strict";var e=Object.freeze;return n(e)||(e=function(n){return n}),e}),define("Core/defaultValue",["./freezeObject"],function(n){"use strict";function e(n,e){return void 0!==n&&null!==n?n:e}return e.EMPTY_OBJECT=n({}),e}),define("Core/formatError",["./defined"],function(n){"use strict";function e(e){var r,t=e.name,o=e.message;r=n(t)&&n(o)?t+": "+o:e.toString();var u=e.stack;return n(u)&&(r+="\n"+u),r}return e}),define("Workers/createTaskProcessorWorker",["../ThirdParty/when","../Core/defaultValue","../Core/defined","../Core/formatError"],function(n,e,r,t){"use strict";function o(e,r,t){try{return e(r,t)}catch(e){return n.reject(e)}}function u(u){var i;return function(f){var c=f.data,s=[],a={id:c.id,result:void 0,error:void 0};return n(o(u,c.parameters,s)).then(function(n){a.result=n}).otherwise(function(n){n instanceof Error?a.error={name:n.name,message:n.message,stack:n.stack}:a.error=n}).always(function(){r(i)||(i=e(self.webkitPostMessage,self.postMessage)),c.canTransferArrayBuffer||(s.length=0);try{i(a,s)}catch(n){a.result=void 0,a.error="postMessage failed with error: "+t(n)+"\n  with responseMessage: "+JSON.stringify(a),i(a)}})}}return u}),define("Workers/computeVolume",["../Core/defined","./createTaskProcessorWorker"],function(n,e){"use strict";function r(n){n=new Float64Array(n)}function t(n,e){console.log("多线程里面");var t=(n.positions,n.packedBuffer,new Uint16Array(n.positions));r(n.packedBuffer);return e.push(t.buffer),{positions:t.buffer}}return e(t)})}();