import { get, post, Response } from '@/common/axios';
import { DataType } from '../../../types';

// 创建资源
export function resourceCreate(params: DataType) {
    return post<Response>(`/api/resource/create`, { ...params });
}

// 更新资源
export function resourceUpdate(params: DataType) {
    return post<Response>(`/api/resource/update/${params.id}`, { ...params });
}
