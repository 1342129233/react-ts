import { get } from '@/common/axios';
import { useTabFetch } from '@/common/components/standard-page/useTabFetch';
import { ReturnApplyParams, ReturnApplyResolve } from '../types';

export const fetchConfig = useTabFetch<ReturnApplyResolve, ReturnApplyParams, 'data'>({
    url: '/api/returnApply/list',
    method: 'get',
    key: 'data'
})

export function returnApplyList(params: ReturnApplyParams) {
    return get<ReturnApplyResolve>('/api/returnApply/list', { ...params });
}

