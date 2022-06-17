/*
 * @class:
 * @Description:
 * @Author: zk
 * @Date: 2022-06-14 14:29:52
 * @LastEditors: zk
 * @LastEditTime: 2022-06-14 14:36:43
 */

// slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js
const attributeRegex = /(\[[^\]]+\])/g;
const idRegex = /(#[^\s+>~.[:]+)/g;
const classRegex = /(\.[^\s+>~.[:]+)/g;
const pseudoElementRegex = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi;
const pseudoClassWithBracketsRegex = /(:[\w-]+\([^)]*\))/gi;
const pseudoClassRegex = /(:[^\s+>~.[:]+)/g;
const elementRegex = /([^\s+>~.[:]+)/g;

function findSelectorMatch(selector, regex) {
    const matches = regex.exec(selector);

    if (!matches) {
        return [selector, 0];
    }

    return [selector.replace(regex, ' '), matches.length];
}

 class StyleUtil {

    static getSelectorSpecificity(selector) {
        const specificity = [0, 0, 0];
        let currentSelector = selector.replace(/:not\(([^)]*)\)/g, '     $1 ').replace(/{[\s\S]*/gm, ' ');
        let delta = 0;

        [currentSelector, delta] = findSelectorMatch(currentSelector, attributeRegex);
        specificity[1] += delta;

        [currentSelector, delta] = findSelectorMatch(currentSelector, idRegex);
        specificity[0] += delta;

        [currentSelector, delta] = findSelectorMatch(currentSelector, classRegex);
        specificity[1] += delta;

        [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoElementRegex);
        specificity[2] += delta;

        [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassWithBracketsRegex);
        specificity[1] += delta;

        [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassRegex);
        specificity[1] += delta;

        currentSelector = currentSelector.replace(/[*\s+>~]/g, ' ').replace(/[#.]/g, ' ');

        [currentSelector, delta] = findSelectorMatch(currentSelector, elementRegex); // lgtm [js/useless-assignment-to-local]
        specificity[2] += delta;

        return specificity.join('');
    }
}
export default StyleUtil