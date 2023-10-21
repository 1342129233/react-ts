import { get, post, Response } from '@/common/axios/index';
import { ProductRequest, ProductResponse } from '../types/index';

// 获取列表
export const productListAxios = (parmas: Record<string, unknown>) => {
    return get<ProductResponse>('/api/product/list', { ...parmas });
}

// 上下架
export const updatePublishStatus = (parmas: Record<string, unknown>) => {
    return post<Response>(`/api/product/update/publishStatus?ids=${parmas.id}&publishStatus=${parmas.publishStatus}`);
}
