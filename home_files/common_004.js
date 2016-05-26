/// <reference path="../../common/common.objects.ts" />
/// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
var lib;
(function (lib) {
    var emptyGuid = '00000000-0000-0000-0000-000000000000';
    var noCopyFlagPfx = "$$";
    function tryFunction(f, dflt, notifyErr) {
        if (dflt === void 0) { dflt = null; }
        if (notifyErr === void 0) { notifyErr = null; }
        try {
            return f();
        }
        catch (e) {
            // @todo:
            //      Use $log
            //      Server side logging
            console.error(e);
            if (notifyErr)
                notifyErr(e);
        }
        return dflt;
    }
    lib.tryFunction = tryFunction;
    function tryAction(f, notifyErr) {
        if (notifyErr === void 0) { notifyErr = null; }
        try {
            f();
        }
        catch (e) {
            // @todo:
            //      Use $log
            //      Server side logging
            //      How to generalize with tryFunction() ?
            console.error(e);
            if (notifyErr)
                notifyErr(e);
        }
    }
    lib.tryAction = tryAction;
    function getEmptyGuid() {
        return emptyGuid;
    }
    lib.getEmptyGuid = getEmptyGuid;
    ;
    function IdIsNullOrDefault(id) {
        return !id || id == emptyGuid;
    }
    lib.IdIsNullOrDefault = IdIsNullOrDefault;
    function assert(obj, error) {
        if (common.objects.isNullOrUndefined(obj))
            throw new Error(error);
    }
    lib.assert = assert;
    function isNotNullOrEmpty(array) {
        return array && array.length > 0;
    }
    lib.isNotNullOrEmpty = isNotNullOrEmpty;
    function safeAccess(obj, m) {
        if (!!obj) {
            return m(obj);
        }
        else {
            return null;
        }
    }
    lib.safeAccess = safeAccess;
    function getNumericValue(value, defaultVal) {
        if (defaultVal === void 0) { defaultVal = 0; }
        return isNaN(+value) ? defaultVal : +value;
    }
    lib.getNumericValue = getNumericValue;
    function getBindingNumericValue(value) {
        if (!angular.isDefined(value) || value == 0) {
            value = NaN;
        }
        return value;
    }
    lib.getBindingNumericValue = getBindingNumericValue;
    function reduceNumeric(func) {
        var numbers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            numbers[_i - 1] = arguments[_i];
        }
        if (numbers.length == 0) {
            return 0;
        }
        var rslt = getNumericValue(numbers[0]);
        for (var i = 1; i < numbers.length; i++) {
            rslt = func(rslt, getNumericValue(numbers[i]));
        }
        return rslt;
    }
    lib.reduceNumeric = reduceNumeric;
    // Does not work , would be nice to find some elegant solution here ...
    //export function reduceNumericAdd(...numbers): number {
    //    return reduceNumeric((x, y) => x + y, ...numbers);
    //}
    function copyState(source, target, respectNoCopyFlag) {
        if (respectNoCopyFlag === void 0) { respectNoCopyFlag = false; }
        for (var key in source) {
            // specialized behaviors
            if (respectNoCopyFlag) {
                //
                // check for prefix , > (as opposed to >=) is intentional to ensure actual identifier
                //
                var keyString = key.toString();
                if (!!keyString && keyString.length > noCopyFlagPfx.length && noCopyFlagPfx == keyString.substr(0, noCopyFlagPfx.length)) {
                    continue;
                }
            }
            // standard behaviors
            if (source.hasOwnProperty(key) && typeof source[key] != "function")
                target[key] = source[key];
        }
    }
    lib.copyState = copyState;
    function filterWithProjection(source, pred, accessor) {
        var items = [];
        if (source) {
            source.forEach(function (item) {
                if (pred(item))
                    items.push(accessor(item));
            });
        }
        return items;
    }
    lib.filterWithProjection = filterWithProjection;
    function filter(source, pred) {
        var items = [];
        if (source) {
            source.forEach(function (item) {
                if (pred(item))
                    items.push(item);
            });
        }
        return items;
    }
    lib.filter = filter;
    function projectAll(source, accessor) {
        return filterWithProjection(source, function (t) { return true; }, accessor);
    }
    lib.projectAll = projectAll;
    function diff(a, b, eq) {
        var retVal = [];
        if (!a) {
            return retVal;
        }
        if (!b) {
            return a;
        }
        retVal = filter(a, function (aItem) {
            return filter(b, function (bItem) {
                return eq(bItem, aItem);
            }).length == 0;
        });
        return retVal;
    }
    lib.diff = diff;
    function any(source, pred) {
        return findFirst(source, pred, null) != null;
    }
    lib.any = any;
    function findIndex(source, pred, defaultValue) {
        if (defaultValue === void 0) { defaultValue = -1; }
        if (source) {
            for (var i = 0; i < source.length; i++) {
                if (pred(source[i]))
                    return i;
            }
        }
        return defaultValue;
    }
    lib.findIndex = findIndex;
    function findFirst(source, pred, defaultValue) {
        if (source) {
            for (var i = 0; i < source.length; i++) {
                if (pred(source[i]))
                    return source[i];
            }
        }
        return defaultValue;
    }
    lib.findFirst = findFirst;
    /**
   * @desc Finds single item in collection for the specified predicate.
   * Throws exception if more matching elements are found.
   */
    function findSingle(source, pred, defaultValue) {
        if (source) {
            var results = new Array();
            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                if (pred(item)) {
                    results.push(item);
                }
                if (results.length > 1) {
                    throw new Error("More than one matching element found");
                }
            }
            if (results.length === 1) {
                return results[0];
            }
        }
        return defaultValue;
    }
    lib.findSingle = findSingle;
    function min(source, accessor, defaultReturn) {
        var min = defaultReturn ? defaultReturn : 0;
        if (source) {
            source.forEach(function (item) {
                var val = accessor(item);
                min = Math.min(min, val);
            });
        }
        return min;
    }
    lib.min = min;
    function max(source, accessor, defaultReturn) {
        var max = defaultReturn ? defaultReturn : 0;
        if (source) {
            source.forEach(function (item) {
                var val = accessor(item);
                max = Math.max(max, val);
            });
        }
        return max;
    }
    lib.max = max;
    function removeFirst(source, pred) {
        if (source) {
            for (var i = 0; i < source.length; i++) {
                if (pred(source[i])) {
                    source.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }
    lib.removeFirst = removeFirst;
    function removeAt(source, index) {
        if (source && index >= 0 && index < source.length) {
            source.splice(index, 1);
            return true;
        }
        return false;
    }
    lib.removeAt = removeAt;
    function replace(source, item, pred) {
        if (source) {
            for (var i = 0; i < source.length; i++) {
                if (pred(source[i])) {
                    source[i] = item;
                    return true;
                }
            }
        }
        return false;
    }
    lib.replace = replace;
    function update(source, item, pred) {
        if (source) {
            for (var i = 0; i < source.length; i++) {
                if (pred(source[i])) {
                    angular.extend(source[i], item);
                    return true;
                }
            }
        }
        return false;
    }
    lib.update = update;
    function move(source, dest, pred) {
        if (source && dest) {
            var item = lib.findFirst(source, pred);
            if (item) {
                lib.removeFirst(source, pred);
                dest.push(item);
                return true;
            }
        }
        return false;
    }
    lib.move = move;
    function forEach(source, action) {
        if (source) {
            source.forEach(function (item) { return action(item); });
        }
    }
    lib.forEach = forEach;
    function conditionalForEach(source, pred, action) {
        if (source) {
            source.forEach(function (item) {
                if (pred(item)) {
                    action(item);
                }
            });
        }
    }
    lib.conditionalForEach = conditionalForEach;
    function summate(source, pred, accessor) {
        var total = 0;
        if (source) {
            source.forEach(function (item) {
                if (pred(item)) {
                    total += accessor(item);
                }
            });
        }
        return total;
    }
    lib.summate = summate;
    function summateAll(source, accessor) {
        var total = 0;
        if (source) {
            source.forEach(function (item) {
                total += accessor(item);
            });
        }
        return total;
    }
    lib.summateAll = summateAll;
    function shallowCopy(items) {
        var list = [];
        if (items) {
            list = [].concat(items);
        }
        return list;
    }
    lib.shallowCopy = shallowCopy;
    function shollowCopyPrimitive(src, tgt) {
        for (var k in src) {
            var typk = typeof k;
            //if (k instanceof String) {
            if (typk === 'string') {
                var v = src[k];
                var typ = typeof v;
                if (typ === 'string' || typ === 'number' || typ === 'boolean') {
                    tgt[k] = v;
                }
            }
        }
    }
    lib.shollowCopyPrimitive = shollowCopyPrimitive;
    function contains(items, pred) {
        if (items) {
            for (var i = 0; i < items.length; i++) {
                if (pred(items[i])) {
                    return true;
                }
            }
        }
        return false;
    }
    lib.contains = contains;
    function distinct(items, eq) {
        var indicesToRemove = [];
        var distinctItems = [];
        if (items) {
            for (var index = 0; index < items.length; index++) {
                var item = items[index];
                var pred = function (currentItem) { return eq(currentItem, item); };
                for (var i = index + 1; i < items.length; i++) {
                    if (!indicesToRemove.some(function (idx) { return idx == i; }) && pred(items[i]))
                        indicesToRemove.push(i);
                }
            }
            if (indicesToRemove.length == 0)
                distinctItems = shallowCopy(items);
            else {
                // sort the indices from lowest to highest
                indicesToRemove = indicesToRemove.sort();
                // get the first index to skip
                var idxToSkip = indicesToRemove.shift();
                for (var i = 0; i < items.length; i++) {
                    if (i != idxToSkip)
                        distinctItems.push(items[i]);
                    else
                        idxToSkip = indicesToRemove.length > 0 ? indicesToRemove.shift() : -1; // set to -1 in order to copy the remaining items
                }
            }
        }
        return distinctItems;
    }
    lib.distinct = distinct;
    function updateAndReturnNonMatching(srcList, destList, equality, classFactory) {
        var nonMatching = [];
        if (srcList && destList) {
            srcList.forEach(function (srcItem) {
                var pred = function (destItem) { return equality(srcItem, destItem); };
                var index = findIndex(destList, pred, -1);
                if (index != -1)
                    destList[index] = classFactory(srcItem);
                else
                    nonMatching.push(classFactory(srcItem));
            });
        }
        return nonMatching;
    }
    lib.updateAndReturnNonMatching = updateAndReturnNonMatching;
    function startsWith(prefix, text) {
        if (prefix && text)
            return text.slice(0, prefix.length) == prefix;
        return false;
    }
    lib.startsWith = startsWith;
    /**
    * @desc Gets array of string values from lookup.
    */
    function getLookupStrings(lookup) {
        if (!lookup)
            throw new Error("Lookup not defined");
        var retVal = [];
        // Populate list.
        lib.forEach(lookup, function (item) { return retVal.push(item.text); });
        return retVal;
    }
    lib.getLookupStrings = getLookupStrings;
    /**
    * @desc Gets lookup string value by provided enum collection.
    */
    function getLookupStringsByEnum(lookup, enumTypes) {
        var _this = this;
        if (!lookup)
            throw new Error("Lookup not defined");
        if (!enumTypes)
            throw new Error("enumTypes not defined");
        var retVal = [];
        lib.forEach(enumTypes, function (enumType) { return retVal.push(_this.getLookupStringByEnum(lookup, enumType)); });
        return retVal;
    }
    lib.getLookupStringsByEnum = getLookupStringsByEnum;
    /**
    * @desc Gets lookup string value by enum.
    */
    function getLookupStringByEnum(lookup, enumType) {
        if (!lookup)
            throw new Error("Lookup not defined");
        if (angular.isUndefined(enumType))
            throw new Error("enumType not defined");
        var typ = lib.findFirst(lookup, function (o) { return o.value == String(enumType); });
        if (!!typ)
            return typ.text;
    }
    lib.getLookupStringByEnum = getLookupStringByEnum;
    /**
    * @desc Check if value is number
    */
    function isNumber(value) {
        return typeof (value) === "number";
    }
    lib.isNumber = isNumber;
    /**
    * @desc Check if value is numeric
    */
    function hasNumericValue(value) {
        var num = +value;
        //return num !== NaN;
        return !isNaN(num) && isFinite(num);
    }
    lib.hasNumericValue = hasNumericValue;
    /**
    * @desc Get years out of date
    */
    function getYearsOutOfDate(date) {
        var today = new Date();
        var providedDate = new Date(date);
        var age = today.getFullYear() - providedDate.getFullYear();
        var age_month = today.getMonth() - providedDate.getMonth();
        var age_day = today.getDate() - providedDate.getDate();
        if (age_month < 0 || (age_month == 0 && age_day < 0)) {
            age = age - 1;
        }
        return age;
    }
    lib.getYearsOutOfDate = getYearsOutOfDate;
    ;
    function stringifyForWebStorage(obj) {
        return tryFunction(function () {
            var str = JSON.stringify(obj);
            return str;
        });
    }
    lib.stringifyForWebStorage = stringifyForWebStorage;
    function parseForWebStorage(str) {
        return tryFunction(function () {
            var obj = JSON.parse(str);
            var objCast = obj;
            return objCast;
        });
    }
    lib.parseForWebStorage = parseForWebStorage;
    function sessionStorageGetItem(key) {
        return tryFunction(function () {
            return window.top.sessionStorage.getItem(key);
        });
    }
    lib.sessionStorageGetItem = sessionStorageGetItem;
    function sessionStorageSetItem(key, val) {
        tryAction(function () {
            window.top.sessionStorage.setItem(key, val);
        });
    }
    lib.sessionStorageSetItem = sessionStorageSetItem;
    function sessionStorageRemoveItem(key) {
        tryAction(function () {
            window.top.sessionStorage.removeItem(key);
        });
    }
    lib.sessionStorageRemoveItem = sessionStorageRemoveItem;
})(lib || (lib = {}));
//# sourceMappingURL=common.util.js.map