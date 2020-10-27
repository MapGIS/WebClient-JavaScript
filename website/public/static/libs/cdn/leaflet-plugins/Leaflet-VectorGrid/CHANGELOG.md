## 1.3.0 (2017-08-28)

* Build using Rollup (#29 by @IvanSanchez)
* Remember overridden styles between draw calls (#38 by @perliedman)
* Fix quirks in `setFeatureStyle` (#42 by @lediur)
* Allow points to be styled as icons (#44 by @perliedman)
* Support TMS URLs for protobuf tiles (#47 by @minus34)
* Documentation for styling points as icons (#48 by @frodrigo
* Fix race condition when a tile layer is removed before its tiles have loaded (#57 by @micahcatlin)
* Fix handling of coordinates from GeoJSON points (#32, #62 by @vmeurisse)
* Use standard `for` loops in preference over `for...in` (#27, #70 by @perliedman)
* Clean up map's interactive targets when tiles are removed (#73 by @jkuebart)
* Make features, not tiles, accept pointer events for SVG renderer (#75 by @jkuebart)
* Simplification of style updates (#72 by @jkuebart)
* Port canvas mouse handling fixes from Leaflet `master` to canvas renderer (#78 by @jkuebart)
* Split `FeatureLayer` into `Symbolizers` (by @IvanSanchez)
* Add Leafdoc documentation (by @IvanSanchez)
* Add ability to specify options for `fetch`, adds cookie capability for example (#100 by @tlaitinen)
* Add `setUrl` method to `L.VectorGrid.Protobuf` (#105 by @frodrigo)


## 1.2.0

* Refactored the code modules into ES6 modules
* Switched the build system and dependencies to use RollupJS
* Store styles set through `setFeatureStyle` so the changes persist after zooming/panning

## 1.1.0

* Support for mouse/pointer events on geometries (by @perliedman)
* Support for point symbolizers as basic `CircleMarker`s (by @perliedman)

## 1.0.1

* Updated dependencies, notably Leaflet 1.0.1.
* Updated build script so Windows users don't hit a 20-year-old legacy filesystem bug (by @LuSilf)

## 1.0.0

* Switch to web workers for most of the heavy lifting (geojson-vt, topojson).

## 0.1.2

* Do not throw errors when trying (and failing) to render points

## 0.1.0

* TopoJSON support

## 0.0.0

* Initial, supprt-buggy release
