 //高斯3带投影
var crs = new L.Proj.CRS('EPSG:2362',
        '+proj=tmerc +a=6378137 +b=6356752.31414036 +lat_0=0 +lon_0=114 +x_0=38500000+y_0=0 +ellps=GRS80 +units=m +no_defs', {
            resolutions: [
                35.07833000659791, 17.539165003298955, 8.769582501649477,
                4.384791250824739, 2.1923956254123693, 1.0961978127061847
            ],
            origin: [38570106.6565339, 4107440.9868805557],
            bounds: L.bounds([
                [38570106.6565339, 4100174.3296849937],
                [38576679.186042026, 4107440.9868805557]
            ])
}),
map = L.map('map', {
    crs: crs,
    center: [37.09, 114.80], //注意这里要使用经纬度坐标
    zoom: 1,
    continuousWorld: true,
    worldCopyJump: false,
});
L.tileLayer('http://localhost:6163/igs/rest/mrms/tile/高斯坐标/{z}/{y}/{x}', {
    attribution: '<a href="#">MapGIS高斯坐标</a>',
    maxZoom: 5,
    minZoom: 0
}).addTo(map);
L.circle([37.09, 114.80], {
    radius: 100,
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 1
}).addTo(map);