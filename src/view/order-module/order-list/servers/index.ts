import { get, post, Response } from '@/common/axios';
import { OrderListParams, OrderListResolve } from '../types';

// 订单列表
export function orderList(params: OrderListParams) {
    return get<OrderListResolve>(`/api/order/list`, { ...params });
}

// 删除订单
export function orderDelete(ids: string) {
    return post<Response>(`/api/order/delete?ids=${ids}`);
}

// 关闭订单
export function orderClose(ids: string, note: string) {
    return post<Response>(`/api/order/update/close?ids=${ids}&note=${note}`);
}
