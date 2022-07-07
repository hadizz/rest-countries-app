import {GET_COUNTRIES, GET_COUNTRIES_BY_CODE, GET_COUNTRIES_BY_NAME, GET_COUNTRY_DETAILS} from './types'
import {GET} from "./config";

export default {
    [GET_COUNTRIES]: {url: 'all/', method: GET},
    [GET_COUNTRIES_BY_NAME]: {url: 'name/{{name}}', method: GET},
    [GET_COUNTRIES_BY_CODE]: {url: 'alpha/{{code}}', method: GET},
}