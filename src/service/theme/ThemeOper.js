import {
    Zondy
} from '../common/Base';
import {
    ServiceBase
} from "../ServiceBase";
import {
    newGuid,
    extendDeep
} from "../common/Util";
import {
    IgsServiceBase
} from "../baseserver/IServiceBase";
import {
    CMultiClassTheme
} from "./CMultiClassTheme";
import {
    CSimpleTheme
} from "./CSimpleTheme";
import {
    CChartTheme
} from "./CChartTheme";
import {
    CGraduatedSymbolTheme
} from "./CGraduatedSymbolTheme";
import {
    CDotDensityTheme
} from "./CDotDensityTheme";
import {
    CRandomTheme
} from "./CRandomTheme";
import {
    CFourColorTheme
} from "./CFourColorTheme";
import {
    CUniqueTheme
} from "./CUniqueTheme";
import {
    CRangeTheme
} from "./CRangeTheme";
import {
    FolderInfoAttribute
} from "./FolderInfoAttribute";
import {
    FolderInfo
} from "./FolderInfo";
import {
    ThemesInfo
} from "./ThemesInfo";


/**
 * 专题图服务
 * @class module:专题图服务.ThemeOper
 * @classdesc 专题图服务
 * @description Zondy.Service.ThemeOper
 * @extends ServiceBase
 * @param {String} [opt_guid=newGuid()] 客户端标识，用以服务器缓存地图
 * @param {Object} options 属性键值对
 * @param {Function} [options.p_onSuccess=null] 获取成功回调方法 onSuccess(Array<Zondy.Object.Theme.CThemeInfo>)
 */
class ThemeOper extends ServiceBase {
    constructor(opt_guid, options) {
        var options = options || {};
        options.baseUrl = "igs/rest/theme";
        super(options);
        /**
         * @private
         * @member Zondy.Object.Theme.ThemesInfo.prototype.guid
         * @type {String}
         * @description 客户端标识，用以服务器缓存地图
         * @default ""
         */
        if (opt_guid !== null) {
            this.guid = opt_guid;
        } else {
            this.guid = newGuid();
        }

        /**
         * @private
         * @member Zondy.Object.Theme.ThemesInfo.prototype.p_onSuccess
         * @type {Function}
         * @description 获取成功回调方法 onSuccess(Array<Zondy.Object.Theme.CThemeInfo>)
         * @default null
         */
        this.p_onSuccess = options.p_onSuccess !== undefined ? options.p_onSuccess : null;
    }

    /***
     * @description 解析专题图信息
     * @param {Object} jsonObj 专题图信息Json对象
     * json还需解析（2018/01/31）
     */
    onGetThemesInfoSuccess(jsonObj) {
        var folderInfo = new FolderInfo();
        extendDeep(folderInfo, jsonObj.result || jsonObj);
        if (folderInfo !== null && folderInfo.attribute !== null && folderInfo.attribute.length > 0) {
            var themesInfoArr = []; //new ThemesInfo[folderInfo.attribute.Length];
            var attArr = null;
            for (var i = 0; i < folderInfo.attribute.length; i++) {
                themesInfoArr[i] = new ThemesInfo();
                if (folderInfo.attribute[i] !== null) {
                    themesInfoArr[i].LayerName = folderInfo.attribute[i].name;
                    attArr = JSON.parse(folderInfo.attribute[i].value); //[];
                    if (attArr !== null && attArr.length > 0) {
                        themesInfoArr[i].ThemeArr = []; //new ThemeBase[attArr.Length];
                        for (var j = 0; j < attArr.length; j++) {
                            switch (attArr[j].name) {
                                case "CMultiClassTheme": //多表达式（多分段）专题图
                                    themesInfoArr[i].ThemeArr[j] = new CMultiClassTheme();
                                    break;
                                case "CSimpleTheme": //简单专题图
                                    themesInfoArr[i].ThemeArr[j] = new CSimpleTheme();
                                    break;
                                case "CChartTheme": //统计专题图
                                    themesInfoArr[i].ThemeArr[j] = new CChartTheme();
                                    break;
                                case "CGraduatedSymbolTheme": //等级符号专题图
                                    themesInfoArr[i].ThemeArr[j] = new CGraduatedSymbolTheme();
                                    break;
                                case "CDotDensityTheme": ////点密度专题图
                                    themesInfoArr[i].ThemeArr[j] = new CDotDensityTheme();
                                    break;
                                case "CRandomTheme": //随机专题图
                                    themesInfoArr[i].ThemeArr[j] = new CRandomTheme();
                                    break;
                                case "CFourColorTheme": //四色专题图
                                    themesInfoArr[i].ThemeArr[j] = new CFourColorTheme();
                                    break;
                                case "CUniqueTheme": //唯一值专题图
                                    themesInfoArr[i].ThemeArr[j] = new CUniqueTheme();
                                    break;
                                case "CRangeTheme": //范围专题图（分段专题图）
                                    themesInfoArr[i].ThemeArr[j] = new CRangeTheme();
                                    break;
                            }
                            extendDeep(themesInfoArr[i].ThemeArr[j], JSON.parse(attArr[j].value));
                        }
                    }
                }
            }

            if (this.p_onSuccess !== null && typeof this.p_onSuccess === 'function') {
                this.p_onSuccess(themesInfoArr);
            }
        }
    }

    /***
     * @description 获取专题图信息
     * @param {String} mapDocName 地图文档名称
     * @param {Array} idxArr 专题图索引数组(索引从0开始,例如："0,1,2") Array<Integer>
     * @param onSuccess - {Function} 添加成功回调函数。
     * @param onError - {Function} 添加失败回调函数。
     */
    getThemesInfo(mapDocName, idxArr, onSuccess, onError) {
        var me = this;
        me.p_onSuccess = onSuccess;

        var rand = Math.random();
        me.partUrl = mapDocName + "/get?idxArr=" + idxArr + "&r=" + rand + "&guid=" + me.guid;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: me.onGetThemesInfoSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /***
     * @description 删除专题图信息
     * @param {String} mapDocName 地图文档名称
     * @param {Array} idxArr 专题图索引数组(索引从0开始,例如："0,1,2/0,0,0"):图层索引/专题图索引 Array<Integer>
     * @param onSuccess - {Function} 添加成功回调函数。
     * @param onError - {Function} 添加失败回调函数。
     */
    removeThemesInfo(mapDocName, idxArr, onSuccess, onError) {
        var me = this;
        var rand = Math.random();
        me.partUrl = mapDocName + "/remove?idxArr=" + idxArr + "&r=" + rand + "&guid=" + me.guid;
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /***
     * @description 更新专题图信息
     * @param {String} mapDocName 地图文档名称
     * @param {Array} idxArr 专题图索引数组(索引从0开始,例如："0,1,2/0,0,0"):图层索引/专题图索引 Array<Integer>
     * @param {Array} themesInfoArr 更新的数据 Array<Zondy.Object.Theme.CThemeInfo>
     * @param onSuccess - {Function} 添加成功回调函数。
     * @param onError - {Function} 添加失败回调函数。
     */
    updateThemesInfo(mapDocName, idxArr, themesInfoArr, onSuccess, onError) {
        var me = this;
        var rand = Math.random();
        me.partUrl = mapDocName + "/update?idxArr=" + idxArr + "&guid=" + this.guid;
        var url = me.getFullUrl();
        var folderInfo = new FolderInfo();
        if (themesInfoArr !== null && themesInfoArr.length > 0) {
            folderInfo.name = "ThemeInfo";
            folderInfo.attribute = []; //new FolderInfoAttribute[themesInfoArr.Length];
            for (var i = 0; i < themesInfoArr.length; i++) {
                folderInfo.attribute[i] = new FolderInfoAttribute();
                folderInfo.attribute[i].name = themesInfoArr[i].LayerName;
                if (themesInfoArr[i].ThemeArr !== null && themesInfoArr[i].ThemeArr.length > 0) {
                    var res = []; //new FolderInfoAttribute[themesInfoArr[i].ThemeArr.Length];
                    for (var j = 0; j < themesInfoArr[i].ThemeArr.length; j++) {
                        if (themesInfoArr[i].ThemeArr[j] !== null)
                            res[j] = new FolderInfoAttribute(themesInfoArr[i].ThemeArr[j].Type, JSON.stringify(themesInfoArr[i].ThemeArr[j]));
                    }
                    folderInfo.attribute[i].value = JSON.stringify(res);
                }
            }
        }
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(folderInfo),
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        });
    }

    /***
     * @description 添加专题图信息
     * @param {String} mapDocName 地图文档名称
     * @param {Array} idxArr 专题图索引数组(索引从0开始,例如："0,1,2/0,0,0"):图层索引/专题图索引 Array<Integer>
     * @param {Array} themesInfoArr 更新的数据 Array<Zondy.Object.Theme.CThemeInfo>
     * @param onSuccess - {Function} 添加成功回调函数。
     * @param onError - {Function} 添加失败回调函数。
     */
    addThemesInfo(mapDocName, idxArr, themesInfoArr, onSuccess, onError) {
        var me = this;
        var rand = Math.random();
        me.partUrl = mapDocName + "/add?idxArr=" + idxArr + "&guid=" + this.guid;
        var url = me.getFullUrl();
        var folderInfo = new FolderInfo();
        if (themesInfoArr !== null && themesInfoArr.length > 0) {
            folderInfo.name = "ThemeInfo";
            folderInfo.attribute = []; //new FolderInfoAttribute[themesInfoArr.Length];
            for (var i = 0; i < themesInfoArr.length; i++) {
                folderInfo.attribute[i] = new FolderInfoAttribute();
                folderInfo.attribute[i].name = themesInfoArr[i].LayerName;
                if (themesInfoArr[i].ThemeArr !== null && themesInfoArr[i].ThemeArr.length > 0) {
                    var res = []; //new FolderInfoAttribute[themesInfoArr[i].ThemeArr.Length];
                    for (var j = 0; j < themesInfoArr[i].ThemeArr.length; j++) {
                        if (themesInfoArr[i].ThemeArr[j] !== null)
                            res[j] = new FolderInfoAttribute(themesInfoArr[i].ThemeArr[j].Type, JSON.stringify(themesInfoArr[i].ThemeArr[j]));
                    }
                    folderInfo.attribute[i].value = JSON.stringify(res);
                }
            }
        }
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(folderInfo),
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        });
    }
}

export {
    ThemeOper
};
Zondy.Service.ThemeOper = ThemeOper;