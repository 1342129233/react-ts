import { Response } from '@/common/axios';

export interface DataType {
    autoConfirmDay: number;
    billContent: null;
    billHeader: null;
    billReceiverEmail: null;
    billReceiverPhone: null;
    billType: null;
    commentTime: null;
    confirmStatus: number;
    couponAmount: number;
    couponId: number;
    createTime: string;
    deleteStatus: number;
    deliveryCompany: string;
    deliverySn: string;
    deliveryTime: null;
    discountAmount: number;
    freightAmount: number;
    growth: number;
    id: number;
    integration: number;
    integrationAmount: number;
    memberId: number;
    memberUsername: string;
    modifyTime: string;
    note: string;
    orderSn: string;
    orderType: number;
    payAmount: number;
    payType: number;
    paymentTime: null;
    promotionAmount: number;
    promotionInfo: string;
    receiveTime: null;
    receiverCity: string;
    receiverDetailAddress: string;
    receiverName: string;
    receiverPhone: string;
    receiverPostCode: string;
    receiverProvince: string;
    receiverRegion: string;
    sourceType: number | string;
    status: number;
    totalAmount: number;
    useIntegration: null;
}

export interface OrderListParams {
    pageNum: number;
    pageSize: number;
    orderSn: number;
    receiverKeyword: number;
    status: number;
    orderType: number;
    sourceType: number;
    createTime: number | string;
}

export interface OrderListResolve extends Response {
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}
