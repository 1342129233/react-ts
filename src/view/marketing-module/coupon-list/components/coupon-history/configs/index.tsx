import dayjs from 'dayjs';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { couponTypeMap, usableProductTypeMap } from '@/common/public-type';
import { convertMap } from '@/common/utils';
import { CouponDataType, DataType } from '../types';

export function tableConfig() {
    const basicsRows = [
        {
            key: 'name',
            value: '',
            label: '名称',
            table: {}
        },
        {
            key: 'type',
            value: '',
            label: '优惠券类型',
            table: {
                render: (_: CouponDataType, record: CouponDataType) => {
                    const couponType = convertMap(couponTypeMap).find(item => item.value === record.type);
                    return <div>{ couponType?.label }</div>
                }
            }
        },
        {
            key: 'useType',
            value: '',
            label: '可使用商品',
            table: {
                render: (_: CouponDataType, record: CouponDataType) => {
                    const usableProductType = convertMap(usableProductTypeMap).find(item => item.value === record.useType);
                    return <div>{ usableProductType?.label }</div>
                }
            }
        },
        {
            key: 'minPoint',
            value: '',
            label: '使用门槛',
            table: {
                render: (_: CouponDataType, record: CouponDataType) => {
                    return <div>满{ record.minPoint }元可用</div>
                }
            }
        },
        {
            key: 'amount',
            value: '',
            label: '面值',
            table: {
                render: (_: CouponDataType, record: CouponDataType) => {
                    return <div>{ record.amount }元</div>
                }
            }
        },
        {
            key: 'status',
            value: '',
            label: '状态',
            table: {
                render: (_: CouponDataType, record: CouponDataType) => {
                    const time = Date.now()
                    const endTime = +dayjs(record.endTime).format('x');
                    if(time > endTime) {
                        return <div>已过期</div>
                    } else {
                        return <div>未过期</div>
                    }
                }
            }
        }
    ] as EffectJsonFormConfig[];

    const effectiveRows = [
        {
            key: 'time',
            value: '',
            label: '有效期',
            table: {
                render: (_: CouponDataType, record: CouponDataType) => {
                    const startTime = dayjs(record.startTime).format('YYYY-MM-DD');
                    const endTime = dayjs(record.endTime).format('YYYY-MM-DD');
                    return <div>
                        {startTime} 
                        <div> 至 </div>
                        {endTime}
                    </div>
                }
            }
        },
        {
            key: 'publishCount',
            value: '',
            label: '总发行量',
            table: {}
        },
        {
            key: 'receiveCount',
            value: '',
            label: '已领取',
            table: {}
        },
        {
            key: 'count',
            value: '',
            label: '待领取',
            table: {}
        },
        {
            key: 'useCount',
            value: '',
            label: '已使用',
            table: {}
        },
        {
            key: 'notUseCount',
            value: '',
            label: '未使用',
            table: {
                render: (_: CouponDataType, record: CouponDataType) => {
                    const notUseCount = record.publishCount - record.useCount;
                    return <div>{ notUseCount }</div>
                }
            }
        }
    ] as EffectJsonFormConfig[];

    

    return {
        basicsRows,
        effectiveRows
    }
}

export function standardPageModel() {
    const rows = [
        {
            key: 'useStatus',
            value: '',
            label: '使用状态:',
            placeholder: '',
            search: {
                type: 'select',
                options: convertMap(useStatusMap)
            },
            table: {
                label: "当前状态",
                render: (_: DataType, record: DataType) => {
                    const status = convertMap(useStatusMap).find(item => item.value === record.useStatus);
                    return <div> { status?.label } </div>
                }
            }
        },
        {
            key: 'orderSn',
            value: '',
            label: '订单编码:',
            placeholder: '',
            search: {
                type: 'input',
            },
            table: {
                label: "订单编码",
                render: (_: DataType, record: DataType) => {
                    const orderSn = record.orderSn ?? 'N/A'
                    return <div>{ orderSn }</div>
                }
            }
        },
        {
            key: 'couponCode',
            value: '',
            label: '优惠码',
            placeholder: '',
            table: {}
        },
        {
            key: 'memberNickname',
            value: '',
            label: '领取会员',
            placeholder: '',
            table: {}
        },
        {
            key: 'getType',
            value: '',
            label: '领取方式',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <div>主动获取</div>
                }
            }
        },
        {
            key: 'createTime',
            value: '',
            label: '领取时间',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const createTime = dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss');
                    return <div>{ createTime }</div>
                }
            }
        },
        {
            key: 'useTime',
            value: '',
            label: '使用时间',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {

                    const useTime = record.useTime ? dayjs(record.useTime).format('YYYY-MM-DD HH:mm:ss') : 'N/A';
                    return <div>{ useTime }</div>
                }
            }
        },
    ] as EffectJsonFormConfig[];

    return {
        rows
    }
} 

export enum StatusEnum {
    UNUSED = 0,
    CONFUSED = 1,
    EXPIRED = 2
}

export const useStatusMap: { [key in StatusEnum]: string } = {
    [StatusEnum.UNUSED]: '未使用',
    [StatusEnum.CONFUSED]: '已使用',
    [StatusEnum.EXPIRED]: '已过期'
}

