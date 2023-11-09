import { get } from '@/common/axios';
import { ReturnApplyDetailsResolve } from '../types';
 
export function getReturnApplyDetails() {
    return get<ReturnApplyDetailsResolve>(`/api/returnApply/3`);
}
