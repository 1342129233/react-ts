import { get, post, Response } from '@/common/axios';
import { fetchConfigResolve, updateStatus } from '../types';

// 资源列分类表
export function fetchConfig() {
    return get<fetchConfigResolve>(`/api/admin/list`);
}

export function adminUserDelete(id: number) {
    return post<Response>(`/api/admin/delete/${id}`);
}

export function adminUpdateStatus(params: updateStatus) {
    return post<Response>(`/api/admin/updateStatus/${params.id}?status=${params.status}`)
}




