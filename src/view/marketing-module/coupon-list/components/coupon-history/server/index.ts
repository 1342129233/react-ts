import { get, Response } from '@/common/axios';
import { CouponIdResolve, CouponHistoryParams } from '../types';

export function couponId(id: number) {
    return get<CouponIdResolve>(`/api/coupon/${id}`);
}

export function couponHistoryList(params: CouponHistoryParams) {
    return get<CouponIdResolve>(`/api/couponHistory/list`, { ...params } );
}

