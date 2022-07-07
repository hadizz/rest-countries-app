function debounce(cb, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb.apply(this, args)
        }, delay)
    }
}

export default debounce;