// 订单状态

export enum statusEnum {
    NOT_PAYMENT = 0, 
    NOT_SEND = 1,
    YES_SEND = 2,
    COMPLETE = 3,
    OFF = 4
}

export const statusMap: { [key in statusEnum]: string } = {
    [statusEnum.NOT_PAYMENT]: '未付款',
    [statusEnum.NOT_SEND]: '待发货',
    [statusEnum.YES_SEND]: '已发货',
    [statusEnum.COMPLETE]: '已完成',
    [statusEnum.OFF]: '已关闭'
}

export enum AdvertisingPositionEnum {
    PC = 0,
    APP = 1
}

export const advertisingPositionMap: { [key in AdvertisingPositionEnum]: string } = {
    [AdvertisingPositionEnum.PC]: 'PC首页轮播',
    [AdvertisingPositionEnum.APP]: 'APP首页轮播'
}

export enum recommendStatusEnum {
    CANCEL = 0,
    VERIFY = 1
}

export const recommendStatusMap: { [key in recommendStatusEnum]: string } = {
    [recommendStatusEnum.CANCEL]: '未推荐',
    [recommendStatusEnum.VERIFY]: '推荐'
}


// 适用平台
export enum platformEnum {
    ALL = 0,
    MOVE = 1,
    PC = 2
}

export const platformTypeMap: { [key in platformEnum]: string } = {
    [platformEnum.ALL]: '全平台',
    [platformEnum.MOVE]: '移动平台',
    [platformEnum.PC]: 'PC平台'
}

// 优惠券类型
export enum couponEnum {
    ALL = 0,
    MEMBER = 1,
    SHOP = 2,
    SIGN_IN = 3
}

export const couponTypeMap: { [key in couponEnum]: string } = {
    [couponEnum.ALL]: '全场赠券',
    [couponEnum.MEMBER]: '会员赠券',
    [couponEnum.SHOP]: '购物赠券',
    [couponEnum.SIGN_IN]: '注册赠券'
}

// 可使用商品
export enum usableProductEnum {
    ALL = 0,
    APPOINT_TYPE = 1,
    APPOINT_PRODUCT = 2
}


export const usableProductTypeMap: { [key in usableProductEnum]: string } = {
    [usableProductEnum.ALL]: '全场通用',
    [usableProductEnum.APPOINT_TYPE]: '指定分类',
    [usableProductEnum.APPOINT_PRODUCT]: '指定商品'
}
