import { get } from '@/common/axios/index';

export interface ProductType {
    id: number;
    name: string;
}

export interface ProductResolve {
    code: number;
    message: string;
    data: ProductType[];
}

// 商品分类接口
export const productList = () => {
    return get<ProductResolve>('/api/productCategory/list/withChildren')
}

