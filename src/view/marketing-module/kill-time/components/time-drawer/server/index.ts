import { get, Response, post } from '@/common/axios';
import { DataType } from '../../../types';

// 创建
export function flashSessionCreate(params: DataType) {
    return post<Response>(`/api/flashSession/create`, { ...params });
}

// 修改
export function flashSessionUpdate(params: DataType) {
    return post<Response>(`/api/flashSession/update/${params.id}`, { ...params });
}
