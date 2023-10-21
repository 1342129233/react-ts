import { get } from '@/common/axios/index';
import { ProductResolve } from '../types';


// 商品分类接口
export const productList = (page: number, pageSize: number, parentId: number = 0) => {
    return get<ProductResolve>(`/api/productCategory/list/${parentId}?pageNum=${page}&pageSize=${pageSize}`)
}

