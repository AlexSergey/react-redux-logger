function mixParams(props = {}, skipHref) {
    if (skipHref) {
        return Object.assign({}, props);
    }
    let href = window && window.location && window.location.href ? window.location.href : '';
    return Object.assign({}, { url: href }, props);
}

function serializeError(stack, lineNumber) {
    let alt = {
        line: lineNumber
    };

    Object.getOwnPropertyNames(stack).forEach(key => {
        switch (key) {
            case 'stack':
                alt[key] = stack[key].split('\n');
                break;
            default:
                alt[key] = stack[key];
                break;
        }
    }, stack);

    return alt;
}

export { mixParams, serializeError };
