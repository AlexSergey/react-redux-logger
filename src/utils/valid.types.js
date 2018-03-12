export const isType = obj => {
    var type = typeof obj;

    if (typeof obj === 'object') {
        // is Null
        if (obj === null) {
            type = 'null';
        }
        // is DOM
        else if (obj instanceof HTMLElement || obj.toString() === '[object HTMLDocument]') {
            if (obj.toString() === '[object HTMLDocument]') {
                type = 'document';
            } else {
                type = 'dom';
            }
        }
        // is Array
        else if (Array.isArray(obj)) {
            type = 'array';
        }
        // is Date
        else if (obj instanceof Date) {
            type = 'date';
        }
        // is Arguments
        else if (typeof obj.length === 'number' && typeof obj === 'object' && Array.isArray(obj) === false) {
            type = 'arguments';
        }
    }
    else if (typeof obj === 'number') {
        // is NaN
        if (isNaN(obj) && typeof obj === 'number') {
            type = 'NaN';
        }
    }

    else if (typeof obj === 'function') {
        if (obj.toString) {
            var fnString = obj.toString();
            var isClass = fnString.indexOf('class') >= 0;

            if (isClass) {
                type = 'class';
            }
        }
    }

    return type;
};

export const isArray = obj => isType(obj) === 'array';
export const isNan = obj => isType(obj) === 'NaN';
export const isString = obj => isType(obj) === 'string';
export const isNumber = obj => isType(obj) === 'number';
export const isBoolean = obj => isType(obj) === 'boolean';
export const isUndefined = obj => isType(obj) === 'undefined';
export const isDefined = obj =>  typeof obj !== 'undefined';
export const isEmpty    = obj => ( obj === '' || obj === 0 || obj === '0' || obj === null || obj === false || !obj);
export const isClass = obj => isType(obj) === 'class';
export const isFunction = obj => isType(obj) === 'function';
export const isObject = obj => isType(obj) === 'object';
export const isNull = obj => isType(obj) === 'null';
export const isDOM = obj => isType(obj) === 'dom';
export const isArguments = obj => isType(obj) === 'arguments';
export const isDate = obj => isType(obj) === 'date';

export const isEmptyObject = (obj) => {
    if (isObject(obj)) {
        return Object.keys(obj).length === 0;
    }
    return false;
};
export const isEmptyArray = (obj) => {
    if (isArray(obj)) {
        return obj.length === 0;
    }
    return false;
};