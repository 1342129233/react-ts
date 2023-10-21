import { get } from '@/common/axios';
import { GetProductInfoResponse } from '../types';

export function getProductInfo(id: string) {
    return get<GetProductInfoResponse>(`/api/product/updateInfo/${id}`)
}
