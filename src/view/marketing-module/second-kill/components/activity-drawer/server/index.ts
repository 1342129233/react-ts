import { get, Response, post } from '@/common/axios';
import { FormData } from '../types';

// 修改活动
export function flashUpdate(params: FormData) {
    return post<Response>(`/api/flash/update/${params.id}`, { ...params });
}

// 创建活动
export function flashCreate(params: FormData) {
    return post<Response>(`/api/flash/create`, { ...params });
}
