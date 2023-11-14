export * from '@/common/public-type/index';

export enum orderTypeEnum {
    NRMAL = 0, 
    CLEAR = 1
}

// 订单分类
export const orderTypeMap: { [key in orderTypeEnum]: string } = {
    [orderTypeEnum.NRMAL]: '正常订单',
    [orderTypeEnum.CLEAR]: '秒杀订单'
}

export enum sourceTypeEnum {
    PC = 0,
    APP = 1
}

// 订单来源
export const sourceTypeMap = {
    [sourceTypeEnum.PC]: 'PC订单',
    [sourceTypeEnum.APP]: 'APP订单'
}

// 支付方式
export enum payTypeEnum {
    NO_PAYMENT = 0,
    ALIPAY_PAYMENT = 1,
    WECHAT_PAYMENT = 2
}

export const payTypeMap = {
    [payTypeEnum.NO_PAYMENT]: '未支付',
    [payTypeEnum.ALIPAY_PAYMENT]: '支付宝',
    [payTypeEnum.WECHAT_PAYMENT]: '微信'
}


