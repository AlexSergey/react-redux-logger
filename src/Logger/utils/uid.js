class UIDGenerator {
    getUID(prefix) {
        var postfix = `${Math.random()
            .toString(36)
            .substr(3, 9)}`;
        var _prefix = prefix || '';
        return `${_prefix}${postfix}`;
    }
}

export default UIDGenerator;
