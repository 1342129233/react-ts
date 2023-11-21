import { get, post, Response } from '@/common/axios';
import { ResourceListResolve, ResourceListParams } from '../types';

// 资源列表
export function resourceList(params: ResourceListParams) {
    return get<ResourceListResolve>(`/api/resource/list`, { ...params });
}

// 资源删除
export function resourceDelete(id: number) {
    return post<Response>(`/api/resource/delete/${id}`);
}


