import { get } from '@/common/axios';
import { ReturnApplyDetailsResolve } from '../types';
 
export function getReturnApplyDetails(id: number) {
    return get<ReturnApplyDetailsResolve>(`/api/returnApply/${id}`);
}
