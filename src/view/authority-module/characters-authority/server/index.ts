import { get, post, Response } from '@/common/axios';
import { RoleResolve, updateStatus } from '../types';

export const roleList= () => {
    return get<RoleResolve>('/api/role/list')
}

export const roleDelete= (id: number) => {
    const formData = new window.FormData();
    formData.append('ids', id + '');
    return post<Response>(`/api/role/delete`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

export const roleUpdateStatus = (params: updateStatus) => {
    return get<RoleResolve>(`/api/role/updateStatus/${params.id}?status=${params.status}`,)
}


