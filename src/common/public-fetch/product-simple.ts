import { get, Response } from '@/common/axios/index';

interface DataType {
    albumPics: string;
    brandId: number;
    brandName: string;
    deleteStatus: number;
    detailTitle: string;
    feightTemplateId: number;
    giftGrowth: number;
    giftPoint: number;
    id: number;
    keywords: string;
    lowStock: number;
    name: string;
    newStatus: number;
    note: string;
    originalPrice: number;
    pic: string;
    previewStatus: number;
    price: number;
    productAttributeCategoryId: number;
    productCategoryId: number;
    productCategoryName: string;
    productSn: string;
    promotionPerLimit: number;
    promotionType: number;
    publishStatus: number;
    recommandStatus: number;
    sale: number;
    serviceIds: string;
    sort: number;
    stock: number;
    subTitle: string;
    unit: string;
    usePointLimit: number;
    verifyStatus: number;
    weight: number;
}

interface ProductSimpleResolve extends Response{
    data: DataType[]
}

// 搜索指定商品
export const productSimpleList = (keyword: string) => {
    return get<ProductSimpleResolve>(`/api/product/simpleList?keyword=${keyword}`)
}
