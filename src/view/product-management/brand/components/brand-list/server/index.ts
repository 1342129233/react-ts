import { get, post, Response } from '@/common/axios';
import { BrandListIdResponse, DataType } from '../type';

// 获取单个列表
export const getBrandListId = (id: number) => {
    return get<BrandListIdResponse>(`/api/brand/${id}`);
};

// 更新列表
export const updateBrandList = (id: number, params: DataType) => {
    return post<Response>(`/api/brand/update/${id}`, { ...params });
};

// 更新列表
export const createBrandList = (params: DataType) => {
    return post<Response>(`/api/brand/create`, { ...params });
};