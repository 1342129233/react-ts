import { get, post, Response } from '@/common/axios';
import { ProductAttrResolve } from '../types';

export function getProductAttrList(pageNum: number, pageSize: number ) {
    return get<ProductAttrResolve>(`/api/productAttribute/category/list?pageNum=${pageNum}&pageSize=${pageSize}`);
}

export function updateProductAttrList(id: number, params: { name: string }) {
    const formData = new window.FormData();
    formData.append('name', params.name);
    return post<Response>(`/api/productAttribute/category/update/${id}`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

export function createProductAttrList(params: { name: string }) {
    const formData = new window.FormData();
    formData.append('name', params.name);
    return post<Response>(`/productAttribute/category/create`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

