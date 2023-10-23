import { get } from '@/common/axios';
import { ProductAttributeResolve } from '../types';

export function getProductAttribute(id: number) {
    return get<ProductAttributeResolve>(`/api/productAttribute/${id}`);
}