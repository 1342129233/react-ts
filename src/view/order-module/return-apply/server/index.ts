import { get, post, Response } from '@/common/axios';
import { ReturnApplyParams, ReturnApplyResolve } from '../types';

// 获取列表
export function returnApplyList(params: ReturnApplyParams) {
    return get<ReturnApplyResolve>('/api/returnApply/list', { ...params });
}

// 删除
export function returnApplyDel(ids: string) {
    return post<Response>(`/api/returnApply/delete?ids=${ids}`)
}

