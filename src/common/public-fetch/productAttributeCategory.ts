import { get } from '@/common/axios/index';

export interface ProductAttributeCategoryType {
    attributeCount: number;
    id: number;
    name: string;
    paramCount: number;
}

export interface ProductAttributeCategoryResolve {
    code: number;
    message: string;
    data: {
        list: ProductAttributeCategoryType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}


export const productAttributeCategory = (pageNum: number = 1, pageSize: number = 100) => {
    return get<ProductAttributeCategoryResolve>(`/api/productAttribute/category/list?pageNum=${pageNum}&pageSize=${pageSize}`);
}

