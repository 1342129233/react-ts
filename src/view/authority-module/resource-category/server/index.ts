import { get, post, Response } from '@/common/axios';
import { ResourceCategoryResolve } from '../types';

// 资源列分类表
export function fetchConfig() {
    return get<ResourceCategoryResolve>(`/api/resourceCategory/listAll`);
}


// 删除资源列分类表
export function resourceCategoryDelete(id: number) {
    return post<Response>(`/api/resourceCategory/delete/${id}`);
}


