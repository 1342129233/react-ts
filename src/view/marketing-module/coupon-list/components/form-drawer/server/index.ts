import { get, post, Response } from '@/common/axios';
import { CouponIdResolve, FormData } from '../types';
 
// 获取 coupon
export function couponId(id: number) {
    return get<CouponIdResolve>(`/api/coupon/${id}`);
}

// 更新coupon
export function couponUpdate(form: FormData) {
    return post<Response>(`/api/coupon/update/${form.id}`, { ...form });
}

// 创建coupon
export function couponCreate(form: FormData) {
    return post<Response>(`/api/coupon/create`, { ...form });
}


