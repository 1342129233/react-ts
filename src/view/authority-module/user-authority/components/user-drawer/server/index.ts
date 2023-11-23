import { get, post, Response } from '@/common/axios';
import { DataType } from '../../../types';

export function adminUserUpdate(params: DataType) {
    return post<Response>(`/api/admin/update/${params.id}`, { ...params });
}

export function adminUserCreate(params: DataType) {
    return post<Response>(`/api/admin/register`, { ...params });
}

