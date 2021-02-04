export const Headers = [
    {
        title: '首页',
        icon: 'iconhome',
        menus: [
            {
                title: '概述',
                links: [['核心服务', '详细服务', '调用方式', '四大引擎选择', '下载']],
                hightlights: [[false, false, false, false, false]],
                routes: [['/total/core', '/total/detail', '/total/use', '/total/select', '/total/download']]
            },
            {
                title: '插件',
                links: [['插件列表', '详细图表', '插件标签', '提交bug', '其他']],
                hightlights: [[false, false, false, false, false]],
                routes: [['/total/plugins', '/total/detailChart', '/total/pluginTags', '/total/bugCommit', '/total/other']]
            },
            {
                title: '协议',
                links: [['epsg', 'ogc', 'geojson']],
                hightlights: [[false, false, false]],
                routes: [['/standard/epsg', '/standard/ogc', '/standard/geojson']]
            }
        ]
    },
    {
        title: '组件',
        icon: 'iconapp_mw_cluster',
        menus: [
            {
                title: '故事',
                links: [['StoryBook-MapboxGL']],
                hightlights: [[true]],
                routes: [['/storybook/index.html']]
            }
        ]
    },
    {
        title: 'Cesium',
        icon: 'iconsatellite',
        menus: [
            {
                title: '常见问题',
                hightlights: [[false, true, true, true]],
                links: [['OGC-WMTS', 'Vue-基本引入', 'Vue-内存溢出', 'Vue-路由切换']],
                routes: [['/helper/cesium/ogc/wmts/WMTS', '/helper/cesium/vue/import/index', '/helper/cesium/vue/memery/index', '/helper/cesium/vue/route/index']]
            },
            {
                title: '开发示例',
                hightlights: [
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [true, true, true, true]
                ],
                links: [
                    [
                        '图层M3D',
                        '互联网地图',
                        'OGC服务',
                        'MapGIS地图服务',
                        '场景',
                        '三维空间分析',
                        '轨迹模拟',
                        '图形绘制',
                        '工具',
                        '查询',
                        '客户端可视化',
                        '客户端-Echarts',
                        '客户端-MapV',
                        '客户端空间分析'
                    ],
                    ['Vue-栅格', 'Vue-矢量瓦片', 'Vue-交互', 'Vue-模型']
                ],
                routes: [
                    [
                        '/gallery/cesium#m3d',
                        '/gallery/cesium#third',
                        '/gallery/cesium#ogc',
                        '/gallery/cesium#mapgis',
                        '/gallery/cesium#scene',
                        '/gallery/cesium#analysis',
                        '/gallery/cesium#track',
                        '/gallery/cesium#drawGraphic',
                        '/gallery/cesium#measure',
                        '/gallery/cesium#query',
                        '/gallery/cesium#clientView-heatmap',
                        '/gallery/cesium#clientView_Echarts',
                        '/gallery/cesium#clientView_MapV',
                        '/gallery/cesium#clientAnalysis'
                    ],
                    ['/gallery/vue-cesium#raster', '/gallery/vue-cesium#vvectortile', '/gallery/vue-cesium#control', '/gallery/vue-cesium#model']
                ]
            },
            {
                title: '开发API',
                links: [
                    ['客户端数据服务', '客户端可视化', '客户端渲染', '客户端事件管理', '客户端公共方法', '客户端视图管理', '客户端可视化分析'],
                    ['Cesium', 'TurfJs']
                ],
                hightlights: [
                    [false, false, false, false, false, false, false],
                    [false, false]
                ],
                routes: [
                    [
                        '/docs/cesium/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E6%2595%25B0%25E6%258D%25AE%25E6%259C%258D%25E5%258A%25A1.html',
                        '/docs/cesium/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E5%258F%25AF%25E8%25A7%2586%25E5%258C%2596.html',
                        '/docs/cesium/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E6%25B8%25B2%25E6%259F%2593.html',
                        '/docs/cesium/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E4%25BA%258B%25E4%25BB%25B6%25E7%25AE%25A1%25E7%2590%2586.html',
                        '/docs/cesium/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E5%2585%25AC%25E5%2585%25B1%25E6%2596%25B9%25E6%25B3%2595.html',
                        '/docs/cesium/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E8%25A7%2586%25E5%259B%25BE%25E7%25AE%25A1%25E7%2590%2586.html',
                        '/docs/cesium/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E5%258F%25AF%25E8%25A7%2586%25E5%258C%2596%25E5%2588%2586%25E6%259E%2590.html'
                    ],
                    ['/docs/other/mapgis-cesium/index.html', 'http://turfjs.org/']
                ]
            }
        ]
    },
    {
        title: 'MapboxGL',
        icon: 'iconmapbox',
        menus: [
            {
                title: '常见问题',
                hightlights: [[true, true, true, true, true, true, true]],
                links: [['OGC-WMTS', 'ArcServer-WMS', 'ArcServer-要素图层', '矢量瓦片-介绍', '矢量瓦片-离线部署', '矢量瓦片-几何&符号', 'Vue-基本引入']],
                routes: [
                    [
                        '/helper/mapboxgl/ogc/wmts/WMTS',
                        '/helper/mapboxgl/arcserver/wms/index',
                        '/helper/mapboxgl/arcserver/featurelayer/index',
                        '/helper/mapboxgl/vectortile/index',
                        '/helper/mapboxgl/vectortile/deploy',
                        '/helper/mapboxgl/vectortile/style',
                        '/helper/mapboxgl/vue/import'
                    ]
                ]
            },
            {
                title: '开发示例',
                hightlights: [
                    [false, false, true, false, false, false, false, false, false, false, true, true],
                    [true, false, false, true]
                ],
                links: [
                    [
                        '互联网地图',
                        'OGC服务',
                        'ArcGIS服务',
                        '地图',
                        '要素',
                        '量算',
                        '专题图',
                        '空间分析',
                        '客户端可视化',
                        '客户端空间分析',
                        'DataStore',
                        '行业特色'
                    ],
                    ['Vue-图层', 'Vue-栅格', 'Vue-OGC', 'Vue-交互']
                ],
                routes: [
                    [
                        '/gallery/mapboxgl#internet',
                        '/gallery/mapboxgl#ogc',
                        '/gallery/mapboxgl#arcgis-mapserver#arcgismapserver',
                        '/gallery/mapboxgl#mapgis-igserver#map',
                        '/gallery/mapboxgl#mapgis-igserver#feature',
                        '/gallery/mapboxgl#mapgis-igserver#calc',
                        '/gallery/mapboxgl#mapgis-igserver#theme',
                        '/gallery/mapboxgl#mapgis-igserver#analysis',
                        '/gallery/mapboxgl#client-view#vectortile',
                        '/gallery/mapboxgl#client-analysis',
                        '/gallery/mapboxgl#datastore#elasticsearch',
                        '/gallery/mapboxgl#industry#search'
                    ],
                    [
                        '/gallery/vue-mapboxgl#vue-layer',
                        '/gallery/vue-mapboxgl#vue-raster',
                        '/gallery/vue-mapboxgl#vue-ogc',
                        '/gallery/vue-mapboxgl#vue-control'
                    ]
                ]
            },
            {
                title: '开发API',
                hightlights: [[false, false, false, false, false, false, false, false], [false]],
                links: [['地图服务', 'OGC服务', '目录服务', '要素服务', '量算服务', '专题图服务', '分析服务', '客户端可视化'], ['Mapbox-GL']],
                routes: [
                    [
                        './docs/mapboxgl/module-%25E5%259C%25B0%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/mapboxgl/module-OGC%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/mapboxgl/module-%25E7%259B%25AE%25E5%25BD%2595%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/mapboxgl/module-%25E8%25A6%2581%25E7%25B4%25A0%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/mapboxgl/module-%25E9%2587%258F%25E7%25AE%2597%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/mapboxgl/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/mapboxgl/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/mapboxgl/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E5%258F%25AF%25E8%25A7%2586%25E5%258C%2596.html'
                    ],
                    ['https://docs.mapbox.com/mapbox-gl-js/api/']
                ]
            }
        ]
    },
    {
        title: 'Leaflet',
        icon: 'iconLeaf',
        menus: [
            {
                title: '开发示例',
                links: [['互联网地图', 'OGC服务', '地图', '要素', '量算', '专题图', '空间分析', '客户端可视化', '客户端空间分析', 'ElasticSearch']],
                hightlights: [[false, false, false, false, false, false, false, false, false, false]],
                routes: [
                    [
                        '/gallery/leaflet#internet',
                        '/gallery/leaflet#ogc',
                        '/gallery/leaflet#mapgis-igserver#map',
                        '/gallery/leaflet#mapgis-igserver#feature',
                        '/gallery/leaflet#mapgis-igserver#calc',
                        '/gallery/leaflet#mapgis-igserver#theme',
                        '/gallery/leaflet#mapgis-igserver#analysis',
                        '/gallery/leaflet#client-view#vectortile',
                        '/gallery/leaflet#client-analysis',
                        '/gallery/leaflet#elasticsearch'
                    ]
                ]
            },
            {
                title: '开发API',
                links: [['地图服务', 'OGC服务', '目录服务', '要素服务', '量算服务', '专题图服务', '分析服务', '客户端可视化'],['Leaflet']],
                hightlights: [[false, false, false, false, false, false, false, false], [false]],
                routes: [
                    [
                        './docs/leaflet/module-%25E5%259C%25B0%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/leaflet/module-OGC%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/leaflet/module-%25E7%259B%25AE%25E5%25BD%2595%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/leaflet/module-%25E8%25A6%2581%25E7%25B4%25A0%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/leaflet/module-%25E9%2587%258F%25E7%25AE%2597%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/leaflet/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/leaflet/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/leaflet/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E5%258F%25AF%25E8%25A7%2586%25E5%258C%2596.html'
                    ],
                    ['https://leafletjs.com/reference-1.7.1.html']
                ]
            }
        ]
    },
    {
        title: 'Openlayers',
        icon: 'iconlayers',
        menus: [
            {
                title: '开发示例',
                links: [['互联网地图', 'OGC服务', '地图', '要素', '量算', '专题图', '空间分析', '客户端可视化', '客户端空间分析']],
                hightlights: [[false, false, false, false, false, false, false, false, false]],
                routes: [
                    [
                        '/gallery/openlayers#internet',
                        '/gallery/openlayers#ogc',
                        '/gallery/openlayers#mapgis-igserver#map',
                        '/gallery/openlayers#mapgis-igserver#feature',
                        '/gallery/openlayers#mapgis-igserver#calc',
                        '/gallery/openlayers#mapgis-igserver#theme',
                        '/gallery/openlayers#mapgis-igserver#analysis',
                        '/gallery/openlayers#client-view#theme',
                        '/gallery/openlayers#client-analysis',
                        '/gallery/openlayers#elasticsearch'
                    ]
                ]
            },
            {
                title: '开发API',
                links: [['地图服务', 'OGC服务', '目录服务', '要素服务', '量算服务', '专题图服务', '分析服务', '客户端可视化'], ['OpenLayers']],
                hightlights: [[false, false, false, false, false, false, false, false],[false]],
                routes: [
                    [
                        './docs/openlayers/module-%25E5%259C%25B0%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/openlayers/module-OGC%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/openlayers/module-%25E7%259B%25AE%25E5%25BD%2595%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/openlayers/module-%25E8%25A6%2581%25E7%25B4%25A0%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/openlayers/module-%25E9%2587%258F%25E7%25AE%2597%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/openlayers/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.html',
                        './docs/openlayers/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E5%258F%25AF%25E8%25A7%2586%25E5%258C%2596.html'
                    ],
                    [
                        'https://openlayers.org/en/latest/apidoc/'
                    ]
                ]
            }
        ]
    }
];

export const SubHeader = [
    {
        title: '开发指南',
        active: 'Cesium',
        menus: [
            {
                title: 'Cesium',
                menus: [
                    {
                        title: '开发文档',
                        links: [['产品简介', '环境配置', '服务配置', '快速入门']],
                        hightlights: [[false, false, false, false]],
                        routes: [['sdkinfo', 'skdeve', 'sdkservice', 'sdkquiker']]
                    },
                    {
                        title: '开发示例',
                        links: [
                            ['图层M3D', '互联网地图', 'OGC服务', 'MapGIS地图服务', '场景' /* "IGServer-X", "IGServer-S" */],
                            ['三维控件分析', '轨迹模拟', '图形绘制', '工具', '查询'],
                            ['客户端可视化', '客户端-Echarts', '客户端-MapV', '客户端空间分析', '国际化']
                        ],
                        hightlights: [
                            [false, false, false, false, false],
                            [false, false, false, false, false],
                            [false, false, false, false, false]
                        ],
                        routes: [
                            [
                                '/gallery/cesium#m3d/m3d-assise',
                                '/gallery/cesium#internet#baidu',
                                '/gallery/cesium#ogc#wms',
                                '/gallery/cesium#dem#raster250',
                                '/gallery/cesium#scene#scene-sceneOut'
                            ],
                            [
                                '/gallery/cesium#analysis#analysis-cube',
                                '/gallery/cesium#m3d#track#track-flow',
                                '/gallery/cesium#m3d#drawGraphic-picture',
                                '/gallery/cesium#m3d#measure#measure-length',
                                '/gallery/cesium#m3d#query#query-m3dquery'
                            ],
                            [
                                '/gallery/cesium#clientView#clientView-heatmap',
                                '/gallery/cesium#clientView_Echarts#echarts-weibo',
                                '/gallery/cesium#clientView_MapV#mapv-path_converge',
                                '/gallery/cesium#clientAnalysis#clientAnalysis-buffer',
                                '/gallery/cesium#globe#chicago'
                            ]
                        ]
                    },
                    {
                        title: '开发API',
                        links: [['IGServer', 'IGServer-X', 'IGServer-S'], ['客户端可视化', '客户端空间分析', 'ElasticSearch'], ['开源Cesium-API']],
                        hightlights: [[false, false, false], [false, false, false], [false]],
                        routes: [
                            ['./docs/cesium/index.html', 'igserverx', 'igservers'],
                            ['clientview', 'http://turfjs.org/', 'elasticsearch'],
                            ['/docs/other/mapgis-cesium/index.html']
                        ]
                    }
                ]
            },
            {
                title: 'MapboxGL',
                menus: [
                    {
                        title: '开发文档',
                        links: [['产品简介', '环境配置', '服务配置', '快速入门']],
                        hightlights: [[false, false, false, false]],
                        routes: [['sdkinfo', 'skdeve', 'sdkservice', 'sdkquiker']]
                    },
                    {
                        title: '开发示例',
                        links: [
                            ['互联网地图', 'OGC服务'],
                            ['地图', '要素', '量算', '专题图', '空间分析'],
                            ['客户端可视化', '客户端空间分析', 'ElasticSearch']
                        ],
                        hightlights: [
                            [false, false],
                            [false, false, false, false, false],
                            [false, false, false]
                        ],
                        routes: [
                            ['/gallery/mapboxgl#internet', '/gallery/mapboxgl#ogc'],
                            [
                                '/gallery/mapboxgl#map',
                                '/gallery/mapboxgl#feature',
                                '/gallery/mapboxgl#calc',
                                '/gallery/mapboxgl#theme',
                                '/gallery/mapboxgl#analysis'
                            ],
                            ['/gallery/mapboxgl#vectortile', '/gallery/mapboxgl#client-analysis', '/gallery/mapboxgl#elasticsearch']
                        ]
                    },
                    {
                        title: '开发API',
                        links: [['地图服务', 'OGC服务'], ['目录服务', '要素服务', '量算服务', '专题图服务', '分析服务'], ['客户端可视化']],
                        hightlights: [[false, false], [false, false, false, false, false], [false]],
                        routes: [
                            [
                                './docs/mapboxgl/module-%25E5%259C%25B0%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/mapboxgl/module-OGC%25E6%259C%258D%25E5%258A%25A1.html'
                            ],
                            [
                                './docs/mapboxgl/module-%25E7%259B%25AE%25E5%25BD%2595%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/mapboxgl/module-%25E8%25A6%2581%25E7%25B4%25A0%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/mapboxgl/module-%25E9%2587%258F%25E7%25AE%2597%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/mapboxgl/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/mapboxgl/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.html'
                            ],
                            ['./docs/mapboxgl/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E5%258F%25AF%25E8%25A7%2586%25E5%258C%2596.html']
                        ]
                    }
                ]
            },
            {
                title: 'Leaflet',
                menus: [
                    {
                        title: '开发文档',
                        links: [['产品简介', '环境配置', '服务配置', '快速入门']],
                        hightlights: [[false, false, false, false]],
                        routes: [['sdkinfo', 'skdeve', 'sdkservice', 'sdkquiker']]
                    },
                    {
                        title: '开发示例',
                        links: [
                            ['互联网地图', 'OGC服务'],
                            ['地图', '要素', '量算', '专题图', '空间分析'],
                            ['客户端可视化', '客户端空间分析', 'ElasticSearch']
                        ],
                        hightlights: [
                            [false, false],
                            [false, false, false, false, false],
                            [false, false, false]
                        ],
                        routes: [
                            ['/gallery/leaflet#internet', '/gallery/leaflet#ogc'],
                            [
                                '/gallery/leaflet#map',
                                '/gallery/leaflet#feature',
                                '/gallery/leaflet#calc',
                                '/gallery/leaflet#theme',
                                '/gallery/leaflet#analysis'
                            ],
                            ['/gallery/leaflet#client-view#common', '/gallery/leaflet#client-analysis', '/gallery/leaflet#elasticsearch']
                        ]
                    },
                    {
                        title: '开发API',
                        links: [['地图服务', 'OGC服务'], ['目录服务', '要素服务', '量算服务', '专题图服务', '分析服务'], ['客户端可视化']],
                        hightlights: [
                            [false, false],
                            [false, false, false, false, false],
                            [false, false]
                        ],
                        routes: [
                            [
                                './docs/leaflet/module-%25E5%259C%25B0%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/leaflet/module-OGC%25E6%259C%258D%25E5%258A%25A1.html'
                            ],
                            [
                                './docs/leaflet/module-%25E7%259B%25AE%25E5%25BD%2595%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/leaflet/module-%25E8%25A6%2581%25E7%25B4%25A0%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/leaflet/module-%25E9%2587%258F%25E7%25AE%2597%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/leaflet/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/leaflet/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.html'
                            ],
                            ['./docs/leaflet/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E5%258F%25AF%25E8%25A7%2586%25E5%258C%2596.html']
                        ]
                    }
                ]
            },
            {
                title: 'Openlayers',
                menus: [
                    {
                        title: '开发文档',
                        links: [['产品简介', '环境配置', '服务配置', '快速入门']],
                        hightlights: [[false, false, false, false]],
                        routes: [['sdkinfo', 'skdeve', 'sdkservice', 'sdkquiker']]
                    },
                    {
                        title: '开发示例',
                        links: [
                            ['互联网地图', 'OGC服务'],
                            ['地图', '要素', '量算', '专题图', '空间分析'],
                            ['客户端可视化', '客户端空间分析']
                        ],
                        hightlights: [
                            [false, false],
                            [false, false, false, false, false],
                            [false, false]
                        ],
                        routes: [
                            ['/gallery/openlayers#internet', '/gallery/openlayers#ogc'],
                            [
                                '/gallery/openlayers#map',
                                '/gallery/openlayers#feature',
                                '/gallery/openlayers#calc',
                                '/gallery/openlayers#theme',
                                '/gallery/openlayers#analysis'
                            ],
                            ['/gallery/openlayers#client-view#theme', '/gallery/openlayers#client-analysis', '/gallery/openlayers#elasticsearch']
                        ]
                    },
                    {
                        title: '开发API',
                        links: [['地图服务', 'OGC服务'], ['目录服务', '要素服务', '量算服务', '专题图服务', '分析服务'], ['客户端可视化']],
                        hightlights: [
                            [false, false],
                            [false, false, false, false, false],
                            [false, false]
                        ],
                        routes: [
                            [
                                './docs/openlayers/module-%25E5%259C%25B0%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/openlayers/module-OGC%25E6%259C%258D%25E5%258A%25A1.html'
                            ],
                            [
                                './docs/openlayers/module-%25E7%259B%25AE%25E5%25BD%2595%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/openlayers/module-%25E8%25A6%2581%25E7%25B4%25A0%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/openlayers/module-%25E9%2587%258F%25E7%25AE%2597%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/openlayers/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.html',
                                './docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.html'
                            ],
                            [
                                './docs/openlayers/module-%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E5%258F%25AF%25E8%25A7%2586%25E5%258C%2596.html'
                            ]
                        ]
                    }
                ]
            }
        ]
    }
];

export const MobileHeaders = [];
export const MobileHeadersOrigin = [
    {
        title: '首页',
        menus: [
            {
                title: '概述',
                links: [['详细服务', '插件列表', '调用方式', '四大引擎选择', '下载']],
                hightlighs: [[false, false, false, false, true]],
                routes: [['/total/detail', '/total/plugins', '/total/use', '/total/select', '/total/download']]
            },
            {
                title: '协议',
                links: [['epsg', 'ogc', 'geojson', 'socket']],
                hightlighs: [[false, false, false, false]],
                routes: [['/standard/epsg', '/standard/ogc', '/standard/geojson', '/standard/socket']]
            }
        ]
    }
];

export const MobileSubHeader = [
    {
        title: '首页',
        active: '功能',
        menus: [
            {
                title: '功能',
                menus: [
                    {
                        title: '概述',
                        links: [['核心服务', '详细服务', '调用方式', '四大引擎选择', '下载']],
                        hightlights: [[false, false, false, false, true]],
                        routes: [['/total/core', '/total/detail', '/total/use', '/total/select', '/total/download']]
                    }
                ]
            },
            {
                title: '插件',
                menus: [
                    {
                        title: '插件详情',
                        links: [['插件列表', '详细图表', '插件标签', '提交bug', '其他']],
                        hightlights: [[false, false, false, false, false]],
                        routes: [['/total/plugins', '/total/detailChart', '/total/pluginTags', '/total/bugCommit', '/total/other']]
                    }
                ]
            }
        ]
    },
    {
        title: '开发指南',
        active: 'Cesium',
        menus: [
            {
                title: 'Cesium',
                menus: [
                    {
                        title: '常用链接',
                        links: [['演示示例', 'API文档']],
                        hightlights: [[true, false]],
                        routes: [['/gallery/cesium', './docs/cesium/index.html']]
                    }
                ]
            },
            {
                title: 'MapboxGL',
                menus: [
                    {
                        title: '常用链接',
                        links: [['演示示例', 'API文档']],
                        hightlights: [[true, false]],
                        routes: [['/gallery/mapboxgl', './docs/mapboxgl/index.html']]
                    }
                ]
            },
            {
                title: 'OpenLayers',
                menus: [
                    {
                        title: '常用链接',
                        links: [['演示示例', 'API文档']],
                        hightlights: [[false, false]],
                        routes: [['/gallery/openlayers', './docs/openlayers/index.html']]
                    }
                ]
            },
            {
                title: 'Leaflet',
                menus: [
                    {
                        title: '常用链接',
                        links: [['演示示例', 'API文档']],
                        hightlights: [[false, false]],
                        routes: [['/gallery/leaflet', './docs/leaflet/index.html']]
                    }
                ]
            }
        ]
    }
];

export default Headers;
