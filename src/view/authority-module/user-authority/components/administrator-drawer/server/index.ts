import { get, post, Response } from '@/common/axios';
import { FormData, AdminRoleIdResolve } from '../types';

export function adminRoleUpdate(params: FormData) {
    const formData = new window.FormData();
    formData.append('adminId', params.adminId as string);
    formData.append('roleIds', params.roleIds as string);
    return post<Response>('/api/admin/role/update', formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

export function adminRoleId(id: number) {
    return get<AdminRoleIdResolve>(`/api/admin/role/${id}`);
}

