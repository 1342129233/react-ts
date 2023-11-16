import { get, Response, post } from '@/common/axios';
import { FetchConfigResolve, FetchConfigParams, UpdateStatusType } from '../types';

// 秒杀活动列表
export function fetchConfig(params: FetchConfigParams) {
    return get<FetchConfigResolve>(`/api/home/recommendSubject/list`, { ...params });
}

// 是否推荐
export function updateRecommendStatus(params: UpdateStatusType) {
    return post<Response>(`/api/home/recommendSubject/update/recommendStatus`, { ...params });
}

// 批量删除
export function recommendSubjecDelete(ids: string) {
    const formData = new window.FormData();
    formData.append('ids', ids);
    return post<Response>('/api/home/recommendSubject/delete', formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

