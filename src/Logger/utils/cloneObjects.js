import {parse, stringify} from './parsers';
import {isArray, isObject, isDOM, isUndefined} from './valid.types';
export const cloneStringify = obj => parse(stringify(obj));

export const cloneDeep = (item) => {
    if (!item) {
        return item;
    }

    var types = [Number, String, Boolean],
        result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach((type) => {
        if (item instanceof type) {
            result = type(item);
        }
    });

    if (isUndefined(result)) {
        if (isArray(item)) {
            result = [];
            item.forEach((child, index) => {
                result[index] = cloneDeep( child );
            });
        } else if (isObject(item)) {
            // testing that this is DOM
            if (isDOM(item)) {
                result = item.cloneNode( true );
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    Object.keys(item).forEach(key => {
                        result[key] = cloneDeep(item[key]);
                    });
                }
            } else {
                // depending what you would like here,
                // just keep the reference, or create new object
                if (false && item.constructor) {
                    // would not advice to do that, reason? Read below
                    result = new item.constructor();
                } else {
                    result = item;
                }
            }
        } else {
            result = item;
        }
    }

    return result;
};
