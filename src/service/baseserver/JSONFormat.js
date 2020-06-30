import {
    extend
} from "../common/Util";

var JSONFormat = function (options) {

    /*
     * @description 当 <keepData> 属性设置为true，这是传递给<read>操作的要被解析的字符串。
     */
    this.data = null;

    /*
     * APIProperty: keepData
     * @description 保持最近读到的数据的引用（通过 <data> 属性）。默认值是false。
     */
    this.keepData = false;
    this.indent = "    ";

    /*
     * @description 用于格式化输出，space字符串会在名值对的":"后边添加。
     */
    this.space = " ";

    /*
     * @description 用于格式化输出, newline字符串会用在每一个名值对或数组项末尾。
     */
    this.newline = "\n";

    /*
     * @description 用于格式化输出, 表示的是缩进级别。
     */
    this.level = 0;

    /*
     * @description 是否在序列化的时候使用额外的空格控制结构。在write方法中使用，默认值为false。
     */
    this.pretty = false;

    /*
     * @description 判断浏览器是否原生支持JSON格式数据。
     */
    this.nativeJSON = (function () {
        return !!(window.JSON && typeof JSON.parse === "function" && typeof JSON.stringify === "function");
    })();
    extend(this, options);
    this.options = options;


    this.serialize = {
        /*
         * @description 把对象转换为JSON字符串。
         * @param object - {Object} 可序列化的对象。
         * @return {string} JSON字符串。
         */
        'object': function (object) {
            // three special objects that we want to treat differently
            if (object == null) {
                return "null";
            }
            if (object.constructor === Date) {
                return this.serialize.date.apply(this, [object]);
            }
            if (object.constructor === Array) {
                return this.serialize.array.apply(this, [object]);
            }
            var pieces = ['{'];
            this.level += 1;
            var key, keyJSON, valueJSON;

            var addComma = false;
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    // recursive calls need to allow for sub-classing
                    keyJSON = this.write.apply(this, [key, this.pretty]);
                    valueJSON = this.write.apply(this, [object[key], this.pretty]);
                    if (keyJSON != null && valueJSON != null) {
                        if (addComma) {
                            pieces.push(',');
                        }
                        pieces.push(this.writeNewline(), this.writeIndent(),
                            keyJSON, ':', this.writeSpace(), valueJSON);
                        addComma = true;
                    }
                }
            }

            this.level -= 1;
            pieces.push(this.writeNewline(), this.writeIndent(), '}');
            return pieces.join('');
        },

        /*
         * @description 把数组转换成JSON字符串。
         * @param array - {Array} 可序列化的数组。
         * @return {string} JSON字符串。
         */
        'array': function (array) {
            var json;
            var pieces = ['['];
            this.level += 1;

            for (var i = 0, len = array.length; i < len; ++i) {
                // recursive calls need to allow for sub-classing
                json = this.write.apply(this, [array[i], this.pretty]);
                if (json != null) {
                    if (i > 0) {
                        pieces.push(',');
                    }
                    pieces.push(this.writeNewline(), this.writeIndent(), json);
                }
            }

            this.level -= 1;
            pieces.push(this.writeNewline(), this.writeIndent(), ']');
            return pieces.join('');
        },

        /*
         * @description 把字符串转换成JSON字符串。
         * @param string - {string} 可序列化的字符串。
         * @return {string} JSON字符串。
         */
        'string': function (string) {
            // If the string contains no control characters, no quote characters, and no
            // backslash characters, then we can simply slap some quotes around it.
            // Otherwise we must also replace the offending characters with safe
            // sequences.
            var m = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };
            /*eslint-disable no-control-regex*/
            if (/["\\\x00-\x1f]/.test(string)) {
                return '"' + string.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                    var c = m[b];
                    if (c) {
                        return c;
                    }
                    c = b.charCodeAt();
                    return '\\u00' +
                        Math.floor(c / 16).toString(16) +
                        (c % 16).toString(16);
                }) + '"';
            }
            return '"' + string + '"';
        },

        /*
         * @description 把数字转换成JSON字符串。
         * @param number - {number} 可序列化的数字。
         * @return {string} JSON字符串。
         */
        'number': function (number) {
            return isFinite(number) ? String(number) : "null";
        },

        /*
         * @description Transform a boolean into a JSON string.
         * @param bool - {boolean} The boolean to be serialized.
         * @return {string} A JSON string representing the boolean.
         */
        'boolean': function (bool) {
            return String(bool);
        },

        /*
         * @description 将日期对象转换成JSON字符串。
         * @param date - {Date} 可序列化的日期对象。
         * @return {string} JSON字符串。
         */
        'date': function (date) {
            function format(number) {
                // Format integers to have at least two digits.
                return (number < 10) ? '0' + number : number;
            }

            return '"' + date.getFullYear() + '-' +
                format(date.getMonth() + 1) + '-' +
                format(date.getDate()) + 'T' +
                format(date.getHours()) + ':' +
                format(date.getMinutes()) + ':' +
                format(date.getSeconds()) + '"';
        }
    };
};

/*
 * @description 将一个符合json结构的字符串进行解析。
 * @param json - {string} 符合json结构的字符串。
 * @param filter - {function} 过滤方法，最终结果的每一个键值对都会调用该过滤方法，并在对应的值的位置替换成该方法返回的值。
 * @return {Object} 对象，数组，字符串或数字。
 */
JSONFormat.prototype.read = function (json, filter) {
    var object;
    if (this.nativeJSON) {
        try {
            object = JSON.parse(json, filter);
        } catch (e) {
            // Fall through if the regexp test fails.
        }
    }

    if (this.keepData) {
        this.data = object;
    }
    return object;
};

/*
 * @description 序列化一个对象到一个符合JSON格式的字符串。
 * @param value - {object}|{string}|<Array>|{number}|{boolean} 需要被序列化的对象，数组，字符串，数字，布尔值。
 * @param pretty - {boolean}
 * @return {string} 符合JSON格式的字符串。
 *
 */
JSONFormat.prototype.write = function (value, pretty) {
    this.pretty = !!pretty;
    var json = null;
    var type = typeof value;
    if (this.serialize[type]) {
        try {
            json = (!this.pretty && this.nativeJSON) ?
                JSON.stringify(value) :
                this.serialize[type].apply(this, [value]);
        } catch (err) {
            Console.error("Trouble serializing: " + err);
        }
    }
    return json;
};

/*
 * @description 根据缩进级别输出一个缩进字符串。
 * @return {string} 一个适当的缩进字符串。
 */
JSONFormat.prototype.writeIndent = function () {
    var pieces = [];
    if (this.pretty) {
        for (var i = 0; i < this.level; ++i) {
            pieces.push(this.indent);
        }
    }
    return pieces.join('');
};

/*
 * @description 在格式化输出模式情况下输出代表新一行的字符串。
 * @return {string} 代表新的一行的字符串。
 */
JSONFormat.prototype.writeNewline = function () {
    return (this.pretty) ? this.newline : '';
};

/*
 * @description 在格式化输出模式情况下输出一个代表空格的字符串。
 * @return {string} A space.
 */
JSONFormat.prototype.writeSpace = function () {
    return (this.pretty) ? this.space : '';
};

export {
    JSONFormat
};
Zondy.Service.JSONFormat = JSONFormat;