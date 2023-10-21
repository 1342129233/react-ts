import { AxiosConfig } from './index';
/**
 * 扩展 axios 请求声明，返回期望的结果类型
 * https://github.com/axios/axios/issues/1510
 */
declare module 'axios' {
    export interface AxiosInstance {
        get<T extends unknown>(url: string, config?: AxiosConfig): Promise<T>;
        post<T extends unknown>(
            url: string,
            params?: unknown,
            config?: AxiosConfig
        ): Promise<T>;
        put<T extends unknown>(
            url: string,
            params?: unknown,
            config?: AxiosConfig
        ): Promise<T>;
        delete<T extends unknown>(
            url: string,
            params?: unknown,
            config?: AxiosConfig
        ): Promise<T>;
    }
}