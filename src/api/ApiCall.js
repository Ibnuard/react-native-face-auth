import axios from 'axios'
import { API_METHOD } from '../utils/Common'


//custom fetch / base
export const fetchAPI = async (url = '', method = API_METHOD.GET, body = {}, params = {}, customHeaders = {}, timeout = 3000) => {
    return await axios({
        method: method,
        url: `${url}`,
        data: body,
        params: params,
        timeout: timeout,
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8',
            ...customHeaders,
        },
    }).then(function (response) {
        if (response && response?.status == 200) {
            return response.data
        }
    }).catch(function (error) {
        if (error) {
            return error
        }
    }).finally(function () {
        console.log('Fetch Done!')
    })
}


//fetch data with get method
export const fetchDataGet = async (url = '', params = {}, customHeaders = {}, timeout = 3000) => {
    return await fetchAPI(url, API_METHOD.GET, null, params, customHeaders, timeout)
}


//fetch data with post method
export const fetchDataPost = async (url = '', body = {}, params = {}, customHeaders = {}, timeout = 3000) => {
    return await fetchAPI(url, API_METHOD.POST, body, params, customHeaders, timeout)
}


//fetch multiple api
export const fetchMultiApi = async (request = []) => {
    return await Promise.all(request).then(function (result) {
        if (result) {
            return result
        }
    }).catch((error) => {
        return error
    })
}