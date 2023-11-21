import { Response } from '@/common/axios';

export interface CouponIdResolve extends Response {
    data: CouponDataType;
}

export interface CouponDataType {
    amount: number;
    code: number;
    count: number;
    enableTime: string;
    endTime: string;
    id: number;
    memberLevel: string;
    minPoint: number;
    name: string;
    note: string;
    perLimit: number;
    platform: number;
    productCategoryRelationList: ProductCategoryRelationType[];
    productRelationList: ProductRelationType[];
    publishCount: number;
    receiveCount: number;
    startTime: string;
    type: number;
    useCount: number;
    useType: number;
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

export interface CouponHistoryParams {
    pageNum: number;
    pageSize: number;
    couponId: number;
    useStatus: number
    orderSn: string;
}

export interface CouponHistoryResolve extends Response {
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}

export interface DataType {
    couponCode: string;
    couponId: number;
    createTime: string;
    getType: number;
    id: number;
    memberId: number;
    memberNickname: string;
    orderId?: number;
    orderSn?: number;
    useStatus: number;
    useTime: string;
}
