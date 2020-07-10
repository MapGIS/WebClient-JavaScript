export function getLevelOption() {
    return [
        {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    gapWidth: 5
                }
            }
        },
        {
            itemStyle: {
                normal: {
                    gapWidth: 1
                }
            }
        },
        {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
                normal: {
                    gapWidth: 1,
                    borderColorSaturation: 0.6
                }
            }
        }
    ];
}

export function initCube(config, name) {
    let options = {
        title: {
            text: 'Leaflet统计',
            left: "center"
        },
    
        tooltip: {
            //   formatter: function (info) {
            //     var value = info.value;
            //     var treePathInfo = info.treePathInfo;
            //     var treePath = [];
    
            //     for (var i = 1; i < treePathInfo.length; i++) {
            //       treePath.push(treePathInfo[i].name);
            //     }
    
            //     return [
            //       '<div class="tooltip-title">' +
            //       formatUtil.encodeHTML(treePath.join("/")) +
            //       "</div>",
            //       "难度等级: " + formatUtil.addCommas(value) + " 星"
            //     ].join("");
            //   }
        },
        series: [
            {
                name: name,
                type: "treemap",
                visibleMin: 300,
                label: {
                    show: true,
                    formatter: "{b}"
                },
                upperLabel: {
                    normal: {
                        show: true,
                        height: 30,
                        color: "#000"
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "#fff"
                    }
                },
                levels: getLevelOption(),
                data: []
            }
        ]
    }
    options.title.text = name;
    var first;
    var data = config.childs.map(item => {
        if (item.leaffolder) {
            var diff = 0;
            first = item.childs.map(e => {
                diff += parseInt(e.diffcult);
                return {
                    name: e.name,
                    value: e.diffcult,
                    path: item.name + "/" + e.name,
                    url: item.folder + "-" + e.file
                };
            });
            return { children: first, name: item.name, value: diff, path: item.name };
        } else {
            first = item.childs.map(child => {
                var diff = 0;
                var second = child.childs.map(e => {
                    diff += parseInt(e.diffcult);
                    return {
                        name: e.name,
                        value: e.diffcult,
                        path: item.name + "/" + child.name + "/" + e.name,
                        url: item.folder + "-" + child.folder + "-" + e.file
                    };
                });
                return {
                    children: second,
                    name: child.name,
                    value: diff,
                    path: item.name + "/" + child.name
                };
            });
            return { children: first, name: item.name, path: item.name };
        }
    });
    options.series[0].data = data;
    return options;
}

export function initTree(config, name) {
    let options = {
        title: {
            text: 'Leaflet统计',
            left: "center"
        },
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
          },
        series: [
            {
              type: "tree",
              name: name,
              data: [treedata],
              top: "5%",
              left: "30%",
              bottom: "5%",
              right: "30%",
              symbolSize: 7,
              label: {
                normal: {
                  position: "left",
                  verticalAlign: "middle",
                  align: "right"
                }
              },
              leaves: {
                label: {
                  normal: {
                    position: "right",
                    verticalAlign: "middle",
                    align: "left"
                  }
                }
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
    }
    options.title.text = name;
    var first;
    var treedata = { name: name, children: data };
    var data = config.childs.map(item => {
      if (item.leaffolder) {
        var diff = 0;
        first = item.childs.map(e => {
          diff += parseInt(e.diffcult);
          return {
            name: e.name,
            value: e.diffcult,
            path: item.name + "/" + e.name
          };
        });
        return { children: first, name: item.name, value: diff, path: item.name };
      } else {
        first = item.childs.map(child => {
          var diff = 0;
          var second = child.childs.map(e => {
            diff += parseInt(e.diffcult);
            return {
              name: e.name,
              value: e.diffcult,
              path: item.name + "/" + child.name + "/" + e.name
            };
          });
          return {
            children: second,
            name: child.name,
            value: diff,
            path: item.name + "/" + child.name
          };
        });
        return { children: first, name: item.name, path: item.name };
      }
    });
    
    options.series[0].data = [{ name: name, children: data }];
    window.console.log('data',data)
    return options;
  }