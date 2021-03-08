import axios from 'axios';
import { message } from 'ant-design-vue';

const service = axios.create({
    timeout: 5000,
    baseURL: '/api',
    withCredentials: true, // send cookies when cross-domain requests
})
// request拦截器 request interceptor
service.interceptors.request.use(
    config => {
        // 不传递默认开启loading
        message.loading('加载中...',0)
        return config
    },
    error => {
        // do something with request error
        message.destroy()
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
// respone拦截器
service.interceptors.response.use(
    response => {
        message.destroy()
        return response
    },
    error => {
        message.destroy()
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)
export default service