export enum orderTypeEnum {
    NRMAL = 0, 
    CLEAR = 1
}

// 订单分类
export const orderTypeMap: { [key in orderTypeEnum]: string } = {
    [orderTypeEnum.NRMAL]: '正常订单',
    [orderTypeEnum.CLEAR]: '秒杀订单'
}

export enum statusEnum {
    NOT_PAYMENT = 0, 
    NOT_SEND = 1,
    YES_SEND = 2,
    COMPLETE = 3,
    OFF = 4
}

// 订单状态
export const statusMap: { [key in statusEnum]: string } = {
    [statusEnum.NOT_PAYMENT]: '未付款',
    [statusEnum.NOT_SEND]: '未发货',
    [statusEnum.YES_SEND]: '已发货',
    [statusEnum.COMPLETE]: '已完成',
    [statusEnum.OFF]: '已关闭'
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


