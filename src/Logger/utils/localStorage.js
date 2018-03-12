import {parse, stringify} from './parsers';

export const getItem = (key) => {
    var msg = localStorage.getItem(key);
    if (msg) {
        return parse(msg);
    }
    return undefined;
};

export const setItem = (key, value) => localStorage.setItem(key, stringify(value));

export const setItems = (params) => Object.keys(params).forEach((key) => localStorage.setItem(key, stringify(params[key])));

export const removeItem = (key) => localStorage.removeItem(key);

export const removeItems = (params) => params.forEach(key => localStorage.removeItem(key));

export const clear = () => localStorage.clear();

export const clearStorage = (keys) => {
    return (target, key, desc) => {
        var fn = desc.value;

        desc.value = function() {
            removeItems(keys);
            return fn.apply(this, arguments);
        };

        return desc;
    };
};

export const setStorage = (keys) => {
    return (target, key, desc) => {
        var fn = desc.value;

        desc.value = function(state, action) {
            var data = {};
            keys.forEach(key => data[key] = action.payload[key]);
            setItems(data);
            return fn.apply(this, arguments);
        };

        return desc;

    };
};
