import axios from "axios";

// 创建axios实例对象
const instance = axios.create({
    // baseURL: 'http://localhost:4000',// 服务器根地址
    // timeout: 5000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 暴漏这个axios实例对象
export default instance;