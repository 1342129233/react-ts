import { get, post, Response } from '@/common/axios';
import { productAttributeCategory } from '@/common/public-fetch/productAttributeCategory';
import { ProductAttrResolve } from '../types';

// 获取列表
export function getProductAttrList(pageNum: number, pageSize: number ) {
    return productAttributeCategory(pageNum, pageSize)
    // return get<ProductAttrResolve>(`/api/productAttribute/category/list?pageNum=${pageNum}&pageSize=${pageSize}`);
}

// 更新
export function updateProductAttrList(id: number, params: { name: string }) {
    const formData = new window.FormData();
    formData.append('name', params.name);
    return post<Response>(`/api/productAttribute/category/update/${id}`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

// 创建新数据
export function createProductAttrList(params: { name: string }) {
    const formData = new window.FormData();
    formData.append('name', params.name);
    return post<Response>(`/productAttribute/category/create`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

// 删除这条数据
export function delProductAttrList(id: number) {
    return get<Response>(`/api/productCategory/delete/${id}`);
}
