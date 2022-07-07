export const STORAGE_LOCAL = 'STORAGE_LOCAL';
export const STORAGE_SESSION = 'STORAGE_SESSION';
export const STORAGE_COOkIE = 'STORAGE_COOKIE';

const canAccessLocalStorage = () => {
    try {
        return !!window.localStorage;
    } catch (e) {
        alert('there is a problem getting data from your local storage, please access to this website.')
        return false;
    }
}

export const addItemToStorage = (key, item, storage = STORAGE_LOCAL) => {
    if (!key) return null;
    if (storage !== STORAGE_COOkIE && canAccessLocalStorage()) {
        if (storage === STORAGE_LOCAL) {
            return localStorage.setItem(key, item);
        } else {
            return sessionStorage.setItem(key, item);
        }
    } else {
        // should handle but it's not needed!
    }
}

export const getItemFromStorage = (key, storage = STORAGE_LOCAL) => {
    if (!key) return null;
    if (canAccessLocalStorage()) {
        if (storage !== STORAGE_COOkIE) {
            if (storage === STORAGE_LOCAL) {
                return localStorage.getItem(key)
            } else {
                return sessionStorage.getItem(key)
            }
        }
    }
}
