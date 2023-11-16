import { get, Response, post } from '@/common/axios';
import { FlashListParams, FlashListResolve, UpdateStatusType } from '../types';

// 秒杀活动列表
export function flashList(params: FlashListParams) {
    return get<FlashListResolve>(`/api/flash/list`, { ...params });
}

// 删除秒杀活动
export function flashDelete(id: number) {
    return post<Response>(`/api/flash/delete/${id}`);
}

// 修改活动状态
export function flashUpdateStatus(params: UpdateStatusType) {
    return post<Response>(`/api/flash/update/status/${params.id}?status=${params.status}`);
}




