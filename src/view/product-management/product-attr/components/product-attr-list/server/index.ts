import { get, post } from '@/common/axios';
import { ProductAttributeParamsType, ProductAttributeResolve } from '../types';

export function getProductAttribute(page: ProductAttributeParamsType) {
    return get<ProductAttributeResolve>(`/api/productAttribute/list/${page.id}?pageNum=${page.pageNum}&pageSize=${page.pageSize}&type=${page.type}`);
}

export function delProductAttribute(id: string) {
    const formData = new window.FormData();
    formData.append('ids', id)
    return post<ProductAttributeResolve>(`/api/productAttribute/delete`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}



