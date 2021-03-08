import axios from 'axios';
import {
    Toast
} from 'vant'
const service = axios.create({
    timeout: 5000,
    baseURL: '/api',
    withCredentials: true, // send cookies when cross-domain requests
})
// request拦截器 request interceptor
service.interceptors.request.use(
    config => {
        // 不传递默认开启loading
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        return config
    },
    error => {
        // do something with request error
        Toast.clear()
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
// respone拦截器
service.interceptors.response.use(
    response => {
        Toast.clear()
        return response
    },
    error => {
        Toast.clear()
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)
export default service