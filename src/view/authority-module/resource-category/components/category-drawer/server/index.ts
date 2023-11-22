import { get, post, Response } from '@/common/axios';
import { DataType } from '../../../types';

// 创建资源分类
export function create(params: DataType) {
    return post<Response>(`/api/resourceCategory/create`, { ...params });
}

// 更新资源分类
export function update(params: DataType) {
    return post<Response>(`/api/resourceCategory/update/${params.id}`, { ...params });
}

