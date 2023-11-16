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