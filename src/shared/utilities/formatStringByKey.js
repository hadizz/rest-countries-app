const formatStringByKey = (str, ...rest) => {
    if (rest.length) {
        const t = typeof rest[0];
        let key;
        const args = 'string' === t || 'number' === t ? Array.prototype.slice.call(rest) : rest[0];

        for (key in args) {
            str = str.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'gi'), args[key]);
        }
    }
    return str;
}

export default formatStringByKey;