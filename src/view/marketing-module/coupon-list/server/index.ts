import { get, Response, post } from '@/common/axios';
import { FetchConfigResolve, FetchConfigParams, UpdateStatusType } from '../types';

// 优惠券列表
export function fetchConfig(params: FetchConfigParams) {
    return get<FetchConfigResolve>(`/api/coupon/list`, { ...params });
}

// 批量删除
export function couponDelete(id: number) {
    return post<FetchConfigResolve>(`/api/coupon/delete/${id}`);
}

