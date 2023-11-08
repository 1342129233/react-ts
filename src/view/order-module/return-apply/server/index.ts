import { get } from '@/common/axios';
import { ReturnApplyParams, ReturnApplyResolve } from '../types';

export function returnApplyList(params: ReturnApplyParams) {
    return get<ReturnApplyResolve>('/api/returnApply/list', { ...params });
}

