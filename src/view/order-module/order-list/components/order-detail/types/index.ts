import { Response } from '@/common/axios';

export interface OrderIdResolve extends Response{
    data: OrderData
}

export interface OrderData {
    autoConfirmDay: number;
    billContent: null | string;
    billHeader: null;
    billReceiverEmail: null;
    billReceiverPhone: null;
    billType: null;
    commentTime: null;
    confirmStatus: number;
    couponAmount: number;
    couponId: null;
    createTime: string;
    deleteStatus: number;
    deliveryCompany: string;
    deliverySn: string;
    deliveryTime: string;
    discountAmount: number;
    freightAmount: number;
    growth: number;
    historyList: HistoryType[];
    id: number;
    integration: number;
    integrationAmount: number;
    memberId: number;
    memberUsername: string;
    modifyTime: null;
    note: null;
    orderItemList: OrderItemType[];
    orderSn: string;
    orderType: number;
    payAmount: number;
    payType: number;
    paymentTime: string;
    promotionAmount: number;
    promotionInfo: string;
    receiveTime: string;
    receiverCity: string;
    receiverDetailAddress: string;
    receiverName: string;
    receiverPhone: string;
    receiverPostCode: string;
    receiverProvince: string;
    receiverRegion: string;
    sourceType: number;
    status: number;
    totalAmount: number;
    useIntegration: null;
}

export interface HistoryType {
    createTime: string;
    id: number;
    note: string;
    operateMan: string;
    orderId: null
    orderStatus: number;
}

export interface OrderItemType {
    couponAmount: null;
    giftGrowth: null;
    giftIntegration: null;
    id: number;
    integrationAmount: null;
    orderId: null;
    orderSn: string;
    productAttr: string;
    productBrand: string;
    productCategoryId: null;
    productId: number;
    productName: string;
    productPic: string;
    productPrice: number;
    productQuantity: number;
    productSkuCode: null;
    productSkuId: null;
    productSn: string;
    promotionAmount: null;
    promotionName: null;
    realAmount: null;
}

export interface BasicDataType {
    id: number;
    orderSn: string;
    billContent: null | string;
    memberUsername: string
    payType: number;
    sourceType: number;
    orderType: number;
}

export interface DistributionDataType {
    id: number;
    deliveryCompany: string;
    deliverySn: string;
    autoConfirmDay: number
    totalAmount: number;
    integration: number;
    promotionInfo: string;
}

export interface ConsigneeDataType {
    id: number;
    receiverName: string;
    receiverPhone: string;
    receiverPostCode: string;
    deliveryAddress: string;
}

export interface OrderItemDataType {
    id: number;
    productPic: string;
    productName: {
        productName: string;
        productBrand: string;
    };
    productSn: {
        productPrice: number;
        productSn: string;
    };
    productAttr: ProductAttrType[];
    productQuantity: number;
    productPrice: string;
}

export interface ProductAttrType {
    key: string;
    value: string;
}

export interface ExpenseType {
    id: number;
    integration: string;
    freightAmount: string
    couponAmount: string;
    deleteStatus: string;
    promotionAmount: string;
    discountAmount:  string;
    totalAmount: string;
    payAmount: string;
}

export interface ControlsType {
    id: number;
    operateMan: string;
    createTime: string;
    status: number;
    confirmStatus: number;
    orderStatus: number;
    note: string;
}