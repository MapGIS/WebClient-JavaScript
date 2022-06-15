/*
 * @class: 
 * @Description: 
 * @Author: zk
 * @Date: 2022-06-14 13:54:55
 * @LastEditors: zk
 * @LastEditTime: 2022-06-14 14:47:59
 */

import Element from './Element';
import StringUtil from '../../../PlotUtilBase/Util/StringUtil'
import Property from './Property';
export default class StyleElement extends Element {

	type = 'style';
	constructor(
		node
	) {
		super(node);
        const that=this
        this._styles={}
		const css = StringUtil.compressSpaces(
			Array.from(node.childNodes)
				// NEED TEST
				.map(_ => _.textContent)
				.join('')
				.replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, '') // remove comments
				.replace(/@import.*;/g, '') // remove imports
		);
		const cssDefs = css.split('}');

		cssDefs.forEach((_) => {
			const def = _.trim();

			if (!def) {
				return;
			}

			const cssParts = def.split('{');
			const cssClasses = cssParts[0].split(',');
			const cssProps = cssParts[1].split(';');

			cssClasses.forEach((_) => {
				const cssClass = _.trim();

				if (!cssClass) {
					return;
				}

				const props = that._styles[cssClass] || {};

				cssProps.forEach((cssProp) => {
					const prop = cssProp.indexOf(':');
					const name = cssProp.substr(0, prop).trim();
					const value = cssProp.substr(prop + 1, cssProp.length - prop).trim();

					if (name && value) {
						props[name] = new Property(value);
					}
				});

			that._styles[cssClass] = props;
            })

            // 字体部分暂时不解析，外层二三维很难将字体部分兼容
			// 	// if (cssClass === '@font-face') { //  && !nodeEnv
			// 	// 	const fontFamily = props['font-family'].getString().replace(/"|'/g, '');
			// 	// 	const srcs = props.src.getString().split(',');

			// 	// 	srcs.forEach((src) => {
			// 	// 		if (src.indexOf('format("svg")') > 0) {
			// 	// 			const url = parseExternalUrl(src);

			// 	// 			if (url) {
			// 	// 				void new SVGFontLoader(document).load(fontFamily, url);
			// 	// 			}
			// 	// 		}
			// 	// 	});
			// 	// }
			// });
		});
	}

    getStyleByClassName(className){
        const style =this._styles
        const attribute= style[className]
        if(!attribute){
            return {}
        }
        return attribute
    }
}
