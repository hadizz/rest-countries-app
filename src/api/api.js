import {baseUrl} from "./config";

export const api = (url, options) => {
    const Url = new URL(baseUrl + url);
    if (options?.queryParam) {
        Url.search = new URLSearchParams(options?.queryParam).toString();
        delete options.queryParam;
    }
    return fetch(Url, options).then(res => {
        // here we ca n handle toast options, any handlers for fulfilled
        return res.json()
    })
}