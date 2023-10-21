import axios, { AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders, RawAxiosRequestHeaders } from 'axios';
import { login } from './login';

// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
    interface AxiosResponse<T = any> {
        errorinfo: null;
        // 这里追加你的参数
        (config: AxiosRequestConfig): Promise<any>
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const instance = axios.create({
    timeout: 10 * 1000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': localStorage.getItem('token')
    }
});

export interface AxiosConfig extends AxiosRequestConfig {
    headers?: RawAxiosRequestHeaders; // AxiosRequestHeaders | Record<string, string | number | boolean>;
}

export {
    instance
};

export interface Response {
    code: number;
    message: string;
}

const errorHandler = (error: Error) => {
    throw error;
};

// 是否正在刷新的标记
let isRefreshing = false
//重试队列
let requests: any[] = []

const responseHandler = (response: AxiosResponse<Response>) => {
    return new Promise((resolve, reject) => {
        const body = response.data;
        if(body.code !== 200) {
            // 未登录
            if(body.code === 401) {
                if(!isRefreshing) {
                    isRefreshing = true;
                    // 调试刷新 token 的接口
                    return login({username: 'admin', password: 'macro123'}).then(res => {
                        console.log(res);
                        const { token, tokenHead } = res.data;
                        const value = tokenHead + ' ' + token;
                        localStorage.setItem('token', value);
                        // token 刷新后将数组的方法重新执行
                        requests.forEach((cb) => cb(value))
                        requests = [];
                        return axios(response.config)
                    }).catch(err => {
                        return Promise.reject(err)
                    }).finally(() => {
                        isRefreshing = false
                    })
                } else {
                    // 返回未执行 resolve 的 Promise
                    return new Promise(resolve => {
                        // 用函数形式将 resolve 存入，等待刷新后再执行
                        requests.push(() => {
                            resolve(axios(response.config))
                        })
                    })
                }
            }
            reject(body);
        } else {
            resolve(body);
        }
    }).then(null, errorHandler)
};

instance.interceptors.response.use(responseHandler as any, (error: any) => {
    if(error.response.data?.code === '401') {
        // window.location.href = ``;
    }
});

export const get = <T, P=Record<string, unknown>>(url: string, params?: P, config?: AxiosConfig) => {
    for(let key in params) {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
            delete params[key]
        }
    }
    return instance.get<T>(url, { params, ...config });
}

export const post = <T, P=FormData | Record<string, unknown>>(url: string, params?: P, config?: AxiosConfig) => {
    return instance.post<T>(url, params, config);
};

export const put = <T, P=Record<string, unknown>>(url: string, params?: P, config?: AxiosConfig) => {
    return instance.put<T>(url, params, config);
};

export const del = <T, P=Record<string, unknown>>(url: string, params?: P, config?: AxiosConfig) => {
    return instance.delete<T>(url, { params, ...config  });
};
