import { get, post, Response } from "@/common/axios";
import { PageType, ReturnReasonResolve, DataType, ReturnReasonIdResolve } from '../types';

// 获取列表
export function getReturnReasonList(params: PageType) {
    return get<ReturnReasonResolve>('/api/returnReason/list', { ...params });
}

// 删除编号
export function deleteReturnReason(id: number | number[]) {
    return post<Response>(`/api/returnReason/delete?ids=${id}`);
}

// 更新
export function updateReturnReason(params: DataType) {
    return post<Response>(`/api/returnReason/update/${params.id}`, { ...params });
}

// 创建
export function createReturnReason(params: DataType) {
    return post<Response>(`/api/returnReason/create`, { ...params })
};

// 获取单个
export function getReturnReason(id: number) {
    return get<ReturnReasonIdResolve>(`/api/returnReason/${id}`);
}


