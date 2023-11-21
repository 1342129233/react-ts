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

export function convertArray(data: any[]) {
    const list: any[] = [];
    data.forEach(item => {
        const dataList = {
            value: item.id,
            label: item.name,
            children: item.children
        };
        if(item.children) {
            dataList.children = convertArray(item.children)
        }
        list.push(dataList)
    });
    return list;
}



