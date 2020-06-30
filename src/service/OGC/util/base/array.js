import {
    Zondy
} from '../../../common/Base';

/**
 * @private
 * @description Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * 在提供的排序列表上执行二进制搜索，并返回项目的索引（如果找到）。 如果找不到，它将返回-1。
 * https://github.com/darkskyapp/binary-search
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function=} opt_comparator Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */
var binarySearch = function (haystack, needle, opt_comparator) {
    let mid,
        cmp;
    const comparator = opt_comparator || numberSafeCompareFunction;
    let low = 0;
    let high = haystack.length;
    let found = false;

    while (low < high) {
        /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
         * to double (which gives the wrong results). */
        mid = low + (high - low >> 1);
        cmp = +comparator(haystack[mid], needle);

        if (cmp < 0.0) { /* Too low. */
            low = mid + 1;

        } else { /* Key found or too high */
            high = mid;
            found = !cmp;
        }
    }

    /* Key not found. */
    return found ? low : ~low;
}


/**
 * @private
 * @description Compare function for array sort that is safe for numbers.
 * 数字安全数组的排序对比函数
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */
var numberSafeCompareFunction = function (a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
}


/**
 * @private
 * @description Whether the array contains the given object.
 * 数组是否包含给定的对象
 * @param {Array<*>} arr The array to test for the presence of the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object is in the array.
 */
var includes = function (arr, obj) {
    return arr.indexOf(obj) >= 0;
}


/**
 * @private
 * @description 查找当前最近的数据
 * @param {Array<number>} arr Array.
 * @param {number} target Target.
 * @param {number} direction 0 means return the nearest, > 0
 *    means return the largest nearest, < 0 means return the
 *    smallest nearest.
 * @return {number} Index.
 */
var linearFindNearest = function (arr, target, direction) {
    const n = arr.length;
    if (arr[0] <= target) {
        return 0;
    } else if (target <= arr[n - 1]) {
        return n - 1;
    } else {
        let i;
        if (direction > 0) {
            for (i = 1; i < n; ++i) {
                if (arr[i] < target) {
                    return i - 1;
                }
            }
        } else if (direction < 0) {
            for (i = 1; i < n; ++i) {
                if (arr[i] <= target) {
                    return i;
                }
            }
        } else {
            for (i = 1; i < n; ++i) {
                if (arr[i] == target) {
                    return i;
                } else if (arr[i] < target) {
                    if (arr[i - 1] - target < target - arr[i]) {
                        return i - 1;
                    } else {
                        return i;
                    }
                }
            }
        }
        return n - 1;
    }
}


/**
 * @private
 * @description 逆向子数组
 * @param {Array<*>} arr Array.
 * @param {number} begin Begin index.
 * @param {number} end End index.
 */
var reverseSubArray = function (arr, begin, end) {
    while (begin < end) {
        const tmp = arr[begin];
        arr[begin] = arr[end];
        arr[end] = tmp;
        ++begin;
        --end;
    }
}


/**
 * @private
 * @description 扩展数组
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */
var extend = function (arr, data) {
    const extension = Array.isArray(data) ? data : [data];
    const length = extension.length;
    for (let i = 0; i < length; i++) {
        arr[arr.length] = extension[i];
    }
}


/**
 * @private
 * @description 从数组中移除对象
 * @param {Array<VALUE>} arr The array to modify.
 * @param {VALUE} obj The element to remove.
 * @template VALUE
 * @return {boolean} If the element was removed.
 */
var remove = function (arr, obj) {
    const i = arr.indexOf(obj);
    const found = i > -1;
    if (found) {
        arr.splice(i, 1);
    }
    return found;
}


/**
 * @private
 * @description 从数组中查找对象
 * @param {Array<VALUE>} arr The array to search in.
 * @param {function(VALUE, number, ?) : boolean} func The function to compare.
 * @template VALUE
 * @return {VALUE|null} The element found or null.
 */
var find = function (arr, func) {
    const length = arr.length >>> 0;
    let value;

    for (let i = 0; i < length; i++) {
        value = arr[i];
        if (func(value, i, arr)) {
            return value;
        }
    }
    return null;
}


/**
 * @private
 * @description 判断两个数组是否相等
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */
var equals = function (arr1, arr2) {
    const len1 = arr1.length;
    if (len1 !== arr2.length) {
        return false;
    }
    for (let i = 0; i < len1; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}


/**
 * @private
 * @description Sort the passed array such that the relative order of equal elements is preverved.
 * 对传递的数组进行排序，以便预先确定相等元素的相对顺序
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 * @api
 */
var stableSort = function (arr, compareFnc) {
    const length = arr.length;
    const tmp = Array(arr.length);
    let i;
    for (i = 0; i < length; i++) {
        tmp[i] = {
            index: i,
            value: arr[i]
        };
    }
    tmp.sort(function (a, b) {
        return compareFnc(a.value, b.value) || a.index - b.index;
    });
    for (i = 0; i < arr.length; i++) {
        arr[i] = tmp[i].value;
    }
}


/**
 * @private
 * @description 查找数组中对象的索引
 * @param {Array<*>} arr The array to search in.
 * @param {Function} func Comparison function.
 * @return {number} Return index.
 */
var findIndex = function (arr, func) {
    let index;
    const found = !arr.every(function (el, idx) {
        index = idx;
        return !func(el, idx, arr);
    });
    return found ? index : -1;
}


/**
 * @private
 * @description 判断数组是否已排序
 * @param {Array<*>} arr The array to test.
 * @param {Function=} opt_func Comparison function.
 * @param {boolean=} opt_strict Strictly sorted (default false).
 * @return {boolean} Return index.
 */
var isSorted = function (arr, opt_func, opt_strict) {
    const compare = opt_func || numberSafeCompareFunction;
    return arr.every(function (currentVal, index) {
        if (index === 0) {
            return true;
        }
        const res = compare(arr[index - 1], currentVal);
        return !(res > 0 || opt_strict && res === 0);
    });
}

export {
    binarySearch,
    numberSafeCompareFunction,
    includes,
    linearFindNearest,
    reverseSubArray,
    extend,
    remove,
    find,
    equals,
    stableSort,
    findIndex,
    isSorted
};

Zondy.array.binarySearch = binarySearch;
Zondy.array.numberSafeCompareFunction = numberSafeCompareFunction;
Zondy.array.includes = includes;
Zondy.array.linearFindNearest = linearFindNearest;
Zondy.array.reverseSubArray = reverseSubArray;
Zondy.array.extend = extend;
Zondy.array.remove = remove;
Zondy.array.find = find;
Zondy.array.equals = equals;
Zondy.array.stableSort = stableSort;
Zondy.array.findIndex = findIndex;
Zondy.array.isSorted = isSorted;
