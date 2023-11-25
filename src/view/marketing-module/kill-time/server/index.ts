import { get, Response, post } from '@/common/axios';
import { FlashSessionListResolve, UpdateStatusType } from '../types';

// 秒杀时间段列表
export function flashSessionList() {
    return get<FlashSessionListResolve>(`/api/flashSession/list`);
}

// 状态更新
export function flashSessionUpdateState(params: UpdateStatusType) {
    return post<Response>(`/api/flashSession/update/status/${params.id}?status=${params.status}`);
}

// 删除
export function flashSessionDelete(id: number) {
    return post<Response>(`/api/flashSession/delete/${id}`);
}



