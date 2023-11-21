import { Response } from '@/common/axios';

export interface FormData {
    amount: number | string;
    endTime: number | string | Date;
    minPoint: number | string;
    name: string;
    note: string;
    perLimit: string;
    platform: number;
    productCategoryRelationList: ProductCategoryRelationType[];
    productRelationList: ProductRelationType[];
    publishCount: number;
    startTime: number | string | Date;
    type: number;
    useType: number;
    enableTime: string | number;
    time?: Date[]
    id?: number;
    radio?: number
}

export interface ProductCategoryRelationType {
    parentCategoryName: string;
    productCategoryId: number | string;
    productCategoryName: string;
}

export interface ProductRelationType{
    productId: number | string;
    productName: string;
    productSn: string;
}

export interface OptionsType {
    value: number;
    label: string
}

export interface CouponIdResolve extends Response {
    data: FormData;
}


