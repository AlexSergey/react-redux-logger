import {isObject} from './valid.types';

export const obj2querystring = (obj) => {
    if (isObject(obj)) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    }
    return '';
};

export const querystring2obj = (_str) => {
    var str = _str.indexOf('?') === 0 ? _str.slice(1) : _str;
    return str.split('&').reduce((prev, curr) => {
        var p = curr.split('=');
        prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
        return prev;
    }, {});
};

export const parse = (data) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        return '';
    }
};

export const stringify = (data) => {
    try {
        return JSON.stringify(data);
    } catch (e) {
        return '';
    }
};