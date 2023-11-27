import axios, { AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders, RawAxiosRequestHeaders } from 'axios';
import { login } from './login';
import { getCookie, removeCookie } from '@/common/utils';

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
        // 'Authorization': getCookie('loginToken') // document.cookie.split('=')[1] // sessionStorage.getItem('loginToken'),
        // "pa-gateway-token": "6c37163d-3473-4795-86ea-427ec49d1199"
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
                /**
                 * 删除token 跳到登录页面
                */
                removeCookie("loginToken");
                return;
                /**
                 * 无感刷新接口
                 */
                if(!isRefreshing) {
                    isRefreshing = true;
                    // 调试刷新 token 的接口
                    return login({username: 'admin', password: 'macro123'}).then(res => {
                        const { token, tokenHead } = res.data;
                        const value = tokenHead + ' ' + token;
                        // sessionStorage.setItem('loginToken', value);
                        document.cookie = `loginToken=${value}`;
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

instance.interceptors.request.use(config => {
    const token = getCookie('loginToken');
    token && (config.headers.Authorization = token);
    return config
})

instance.interceptors.response.use(responseHandler as any, (error: any) => {
    // if(error.response.data?.code === '401') {
    //     // window.location.href = ``;
    // }
});

export const get = <T, P=Record<string, unknown>>(url: string, params?: P, config?: AxiosConfig) => {
    for(let key in params) {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
            delete params[key]
        }
    }
    return instance.get<T>(url, { params, ...config });
}

export const post = <T, P=FormData | Record<string, unknown> | unknown>(url: string, params?: P, config?: AxiosConfig) => {
    return instance.post<T>(url, params, config);
};

export const put = <T, P=Record<string, unknown>>(url: string, params?: P, config?: AxiosConfig) => {
    return instance.put<T>(url, params, config);
};

export const del = <T, P=Record<string, unknown>>(url: string, params?: P, config?: AxiosConfig) => {
    return instance.delete<T>(url, { params, ...config  });
};
