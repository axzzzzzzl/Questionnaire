import axios from 'axios';
import { authHeaderConfig } from './interceptors/request';
import { tokenJudgeConfig } from './interceptors/response';
import { message } from 'antd';

const instance = axios.create({
    baseURL: 'http://39.107.97.113:3000/api',
    timeout: 30000,
})

// 加载请求拦截器
authHeaderConfig(instance);
// 加载响应拦截器
tokenJudgeConfig(instance);

export const request = (url, params = {}, method) => {
    let realData = {
        data: params
    }
    if (method === "get") {
      realData = {
        params
      }
    }
    return new Promise((resolve, reject) => {
      instance({
        method,
        url,
        ...realData,
        validateStatus: () => true,
      })
        .then((res) => {
          if ([res?.data?.code].includes(200))
            resolve(res);
          else{
            console.log("res: ", res)
            message.error(
              res?.data?.msg ?? res?.data?.code ?? '系统错误，请联系管理员。'
            )
          }     
        })
        .catch((err) => {
          message.error('网络错误请求异常，请稍后再试')
          console.log("err: ", err)
          reject(err)
        })
      })
}

export const get = (url, params) => request(url, params, "get")
export const post = (url, params) => request(url, params, "post")
export const patch = (url, params) => request(url, params, "patch")
export const deleted = (url, params) => request(url, params, "delete")
export const put = (url, params) => request(url, params, "put")