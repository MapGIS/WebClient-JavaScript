//! moment.js locale configuration
//! locale : Chinese (China) [zh-cn]
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var zhCn = moment.defineLocale('zh-cn', {
    months : '涓€鏈坃浜屾湀_涓夋湀_鍥涙湀_浜旀湀_鍏湀_涓冩湀_鍏湀_涔濇湀_鍗佹湀_鍗佷竴鏈坃鍗佷簩鏈�'.split('_'),
    monthsShort : '1鏈坃2鏈坃3鏈坃4鏈坃5鏈坃6鏈坃7鏈坃8鏈坃9鏈坃10鏈坃11鏈坃12鏈�'.split('_'),
    weekdays : '鏄熸湡鏃鏄熸湡涓€_鏄熸湡浜宊鏄熸湡涓塤鏄熸湡鍥沖鏄熸湡浜擾鏄熸湡鍏�'.split('_'),
    weekdaysShort : '鍛ㄦ棩_鍛ㄤ竴_鍛ㄤ簩_鍛ㄤ笁_鍛ㄥ洓_鍛ㄤ簲_鍛ㄥ叚'.split('_'),
    weekdaysMin : '鏃涓€_浜宊涓塤鍥沖浜擾鍏�'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY骞碝MMD鏃�',
        LL : 'YYYY骞碝MMD鏃�',
        LLL : 'YYYY骞碝MMD鏃h鐐筸m鍒�',
        LLLL : 'YYYY骞碝MMD鏃dddAh鐐筸m鍒�',
        l : 'YYYY骞碝MMD鏃�',
        ll : 'YYYY骞碝MMD鏃�',
        lll : 'YYYY骞碝MMD鏃� HH:mm',
        llll : 'YYYY骞碝MMD鏃ddd HH:mm'
    },
    meridiemParse: /鍑屾櫒|鏃╀笂|涓婂崍|涓崍|涓嬪崍|鏅氫笂/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '鍑屾櫒' || meridiem === '鏃╀笂' ||
                meridiem === '涓婂崍') {
            return hour;
        } else if (meridiem === '涓嬪崍' || meridiem === '鏅氫笂') {
            return hour + 12;
        } else {
            // '涓崍'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return '鍑屾櫒';
        } else if (hm < 900) {
            return '鏃╀笂';
        } else if (hm < 1130) {
            return '涓婂崍';
        } else if (hm < 1230) {
            return '涓崍';
        } else if (hm < 1800) {
            return '涓嬪崍';
        } else {
            return '鏅氫笂';
        }
    },
    calendar : {
        sameDay : '[浠婂ぉ]LT',
        nextDay : '[鏄庡ぉ]LT',
        nextWeek : '[涓媇ddddLT',
        lastDay : '[鏄ㄥぉ]LT',
        lastWeek : '[涓奭ddddLT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(鏃鏈坾鍛�)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '鏃�';
            case 'M':
                return number + '鏈�';
            case 'w':
            case 'W':
                return number + '鍛�';
            default:
                return number;
        }
    },
    relativeTime : {
        future : '%s鍐�',
        past : '%s鍓�',
        s : '鍑犵',
        m : '1 鍒嗛挓',
        mm : '%d 鍒嗛挓',
        h : '1 灏忔椂',
        hh : '%d 灏忔椂',
        d : '1 澶�',
        dd : '%d 澶�',
        M : '1 涓湀',
        MM : '%d 涓湀',
        y : '1 骞�',
        yy : '%d 骞�'
    },
    week : {
        // GB/T 7408-1994銆婃暟鎹厓鍜屼氦鎹㈡牸寮徛蜂俊鎭氦鎹⒙锋棩鏈熷拰鏃堕棿琛ㄧず娉曘€嬩笌ISO 8601:1988绛夋晥
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return zhCn;

})));
