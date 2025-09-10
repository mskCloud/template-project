import { Axios } from 'axios'

export const baseURL = './'

const headers = {
    'Content-Type': 'application/json',
}

const axios = new Axios({
    baseURL: baseURL,
    timeout: 1000 * 60 * 3,
    withCredentials: true,
    headers: headers,
    transformResponse: [
        function (data) {
            return JSON.parse(data)
        },
    ],
})

axios.interceptors.request.use((request) => {
    return request
})

axios.interceptors.response.use((response) => {
    return response
})

const request = ({ url = '', method = 'get', params = {}, signal, ...args }) => {
    const _method = method.toLocaleLowerCase()
    const _data = _method === 'post' ? params : {}
    const _params = _method === 'get' ? params : {}
    return axios.request({
        url,
        method: _method,
        data: JSON.stringify(_data),
        params: _params,
        signal,
        ...args,
    })
}

export default request
