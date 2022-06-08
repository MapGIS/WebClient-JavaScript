/*
 * @class:
 * @Description: 描述动画各类参数
 * @Author: zk
 * @Date: 2022-06-06 21:00:52
 * @LastEditors: zk
 * @LastEditTime: 2022-06-08 11:32:50
 */

/**
 * 所有和时间有关的数值，单位默认是毫秒
 */

export const v = {
    PlotBaseAnimation: {
        desc: '基础动画',
        limit: '*',
        // 基础参数
        options: {
            duration: {
                type: 'number',
                range: [0, Infinity],
                default: 3000
            },
            animationName: {
                type: 'string',
                default: ''
            },
            easing: {
                desc: '描述时间的不均匀变化',
                type: 'string',
                muti: [
                    {
                        value: 'Linear',
                        label: '平滑'
                    },
                    {
                        value: 'Sine',
                        label: '正弦'
                    },
                    {
                        value: 'Circ',
                        label: '圆'
                    },
                    {
                        value: 'Bounce',
                        label: '反弹'
                    }
                ],
                default: 'Linear'
            },
            // tips: delay值 endDelay值 delay+endDelay<duration
            delay: {
                type: 'number',
                range: [0, Infinity],
                default: 0
            },
            endDelay: {
                type: 'number',
                range: [0, Infinity],
                default: 0
            },
            loop: {
                desc: '描述循环播放次数',
                type: 'number',
                range: [0, Infinity],
                default: 1
            },
            timelineOffset: {
                desc: '描述动画在时间轴上的偏移',
                type: 'number',
                range: [0, Infinity],
                default: 0
            }
        }
    },
    PlotScaleAnimation: {
        desc: '比例动画',
        limit: '*',
        options: {
            scaleRateArr: {
                type: 'array-number',
                default: [1, 2, 1]
            }
        }
    },
    PlotAttributeAnimation: {
        desc: '属性动画',
        limit: '*',
        limitColorItems: ['compareLineColor', 'wallColor', 'wallGradColor', 'strokeStyle', 'fillGradColor', 'fillStyle'],
        limitNumberItems: ['compareLineWidth', 'dimModHeight', 'lineWidth'],
        options: {
            attrsItem: {
                type: 'object',
                default: null
            }
            /**
             * eg
             * 当属性名为lineWidth时
             * 
             *  "attrsItem": {
                    "attrName":"lineWidth",
                    "ids":"path2578",
                    "value":[8,20,15,8]
                }

               当属性名为lineWidth时

               "attrsItem":{
                    "attrName":"strokeStyle",
                    "ids":"path2578",
                    "value":["#ff0000","#cccccc"]
               }

             */
        }
    },
    PlotVisibleAnimation: {
        desc: '显隐动画',
        limit: '*',
        options: {
            endStatus: {
                desc: '动画最终状态',
                type: 'boolean',
                default: false
            }
        }
    },
    PlotBlinkAnimation: {
        desc: '闪烁动画',
        limit: '*',
        options: {
            blinkColors: {
                type: 'array-string',
                default: []
            },
            isBlinkGrad: {
                type: 'boolean',
                default: true
            },
            endStatus: {
                type: 'boolean',
                default: true
            }
        }
    },
    PlotGrowAnimation: {
        desc: '生长动画',
        limit: '*',
        options: {
            startRate: {
                type: 'number',
                range: [0, 1],
                default: 0
            },
            endRate: {
                type: 'number',
                range: [0, 1],
                default: 1
            },
            growMode: {
                type: 'string',
                muti: [
                    {
                        label: '线型生长',
                        value: 'spline'
                    },
                    {
                        label: '中心生长',
                        value: 'center'
                    }
                ],
                default: 'spline'
            }
        }
    },
    PlotPathAnimation: {
        desc: '路径动画',
        limit: '仅允许点类型添加',
        options: {
            symbolBindId: {
                type: 'string',
                default: null
            },
            animationCoords: {
                type: 'array-number',
                default: []
            },
            // eg [[114.25,36.74],[114.27,36.98]]
            showPath: {
                type: 'boolean',
                default: true
            },
            pathStyle: {
                type: 'object',
                default: { fill: 'none', strokeStyle: '#00ff00', lineWidth: 5 }
            },
            // 参考属性面板
            pathType: {
                type: 'string',
                muti: [
                    {
                        label: '贝塞尔曲线',
                        value: 'spline'
                    }
                ],
                default: 'spline'
            },
            startPathRate: {
                type: 'number',
                range: [0, 1],
                default: 0
            },
            endPathRate: {
                type: 'number',
                range: [0, 1],
                default: 1
            },
            alongTangent: {
                type: 'boolean',
                default: false
            }
        }
    }
};
