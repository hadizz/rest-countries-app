import urls from './urls'
import {GET_COUNTRIES, GET_COUNTRIES_BY_CODE, GET_COUNTRIES_BY_NAME} from "./types";
import {api} from "./api";
import formatStringByKey from "../shared/utilities/formatStringByKey";

export const getCountries = (queryParam) => {
    //?fields=name,capital,currencies
    const {url, method} = urls[GET_COUNTRIES];
    return api(url, {method, queryParam})
}

export const getCountryByName = (name = '', queryParam) => {
    const {url, method} = urls[GET_COUNTRIES_BY_NAME];
    return api(formatStringByKey(url, {name}), {method, queryParam})
}

export const getCountryByCode = (code = '', queryParam) => {
    const {url, method} = urls[GET_COUNTRIES_BY_CODE];
    return api(formatStringByKey(url, {code}), {method, queryParam})
}
