import { Response } from '@/common/axios';

export interface CompanyAddressType {
    addressName: string;
    city: string;
    detailAddress: string;
    id: number;
    name: string;
    phone: string;
    province: string;
    receiveStatus: null;
    region: string;
    sendStatus: null;
}


export interface ReturnApplyDataType {
    [key: string]: unknown;
    companyAddress: CompanyAddressType;
    companyAddressId: number;
    createTime: string;
    description: string;
    handleMan: string;
    handleNote: string;
    handleTime: string;
    id: number;
    memberUsername: string;
    orderId: number;
    orderSn: string;
    productAttr: string;
    productBrand: string;
    productCount: number;
    productId: number;
    productName: string;
    productPic: string;
    productPrice: number;
    productRealPrice: number;
    proofPics: string;
    reason: string;
    receiveMan: string;
    receiveNote: null;
    receiveTime: string;
    returnAmount: number;
    returnName: string;
    returnPhone: string;
    status: number;
}

export interface ReturnApplyDetailsResolve extends Response {
    data: ReturnApplyDataType;
}