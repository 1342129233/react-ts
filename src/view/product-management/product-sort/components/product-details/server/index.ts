import { get } from '@/common/axios/index';
import { ProductCategoryResolve, ProductAttributeResolve } from '../types';

// 商品分类
export const getProductCategoryManage = (id: number) => {
    return get<ProductCategoryResolve>(`/api/productCategory/${id}`)
}

// 筛选属性
export const getProductAttributeManage = () => {
    return get<ProductAttributeResolve>(`/api/productAttribute/category/list/withAttr`)
}
