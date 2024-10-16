import axios from 'axios';
// 导入axios实例
import request from './request';

// 定义常量记录服务器地址
const host_url = `http://localhost:4000`;

// 暴露（导出）
// 接口一：
// export const categoryList = (data={})=> {
//     return request.get(`${host_url}/api/exam/category_list`,{params: data})
// }


// 封装GET请求：
export const getFn = (url: string, data={})=> {
    return request.get(`${host_url}${url}`,{params: data})
}

// 封装POST请求：
export const postFn = (url: string, data={})=> {
    return request.get(`${host_url}${url}`,data)
}