import { get, post, Response } from '@/common/axios';
import { UpdateStatusType } from '../types';

// 获取列表
export function advertiseList(params: any) {
    return get<Response>('/api/home/advertise/list', { ...params });
}

// 修改上下线状态
export function advertiseUpdateStatus(params: UpdateStatusType) {
    return post<Response>(`/api/home/advertise/update/status/${params.id}?status=${params.status}`);
}

// 删除啊
export function advertiseDelete(id: string) {
    const formData = new window.FormData();
    formData.append('ids', id);
    return post<Response>(`/api/home/advertise/delete`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}




