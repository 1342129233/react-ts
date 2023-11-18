import { get, Response, post } from '@/common/axios';
import { FetchConfigResolve, FetchConfigParams, UpdateStatusType } from '../types';

// 品牌推荐列表
export function fetchConfig(params: FetchConfigParams) {
    return get<FetchConfigResolve>(`/api/home/brand/list`, { ...params });
}

// 是否推荐
export function updateRecommendStatus(params: UpdateStatusType) {
    const formData = new window.FormData();
    formData.append('ids', params.ids + '');
    formData.append('recommendStatus', params.recommendStatus + '');
    return post<Response>(`/api/home/brand/update/recommendStatus`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

// 批量删除
export function recommendSubjecDelete(ids: string) {
    const formData = new window.FormData();
    formData.append('ids', ids);
    return post<Response>('/api/home/brand/delete', formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

