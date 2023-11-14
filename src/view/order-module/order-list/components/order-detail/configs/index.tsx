import { statusMap } from '@/common/public-type/index';
import { convertMap } from '@/common/utils';
import { Button, Image } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { OrderItemDataType, ControlsType } from '../types';

export function tableModel() {
    const basicRow = [
        {
            key: 'orderSn',
            value: '',
            label: '订单编号:',
            table: {
                label: '订单编号'
            }
        },
        {
            key: 'billContent',
            value: '',
            label: '发货单流水号:',
            table: {
                label: '发货单流水号'
            }
        },
        {
            key: 'memberUsername',
            value: '',
            label: '用户账号:',
            table: {
                label: '用户账号'
            }
        },
        {
            key: 'payType',
            value: '',
            label: '支付方式:',
            table: {
                label: '支付方式'
            }
        },
        {
            key: 'sourceType',
            value: '',
            label: '订单来源:',
            table: {
                label: '订单来源'
            }
        },
        {
            key: 'orderType',
            value: '',
            label: '订单类型:',
            table: {
                label: '订单类型'
            }
        }
    ] as EffectJsonFormConfig[];

    const distributionRow = [
        {
            key: 'deliveryCompany',
            value: '',
            label: '配送方式:',
            table: {
                label: '配送方式'
            }
        },
        {
            key: 'deliverySn',
            value: '',
            label: '物流单号:',
            table: {
                label: '物流单号'
            }
        },
        {
            key: 'autoConfirmDay',
            value: '',
            label: '自动确认收货时间:',
            table: {
                label: '自动确认收货时间'
            }
        },
        {
            key: 'totalAmount',
            value: '',
            label: '订单可得优币:',
            table: {
                label: '订单可得优币'
            }
        },
        {
            key: 'integration',
            value: '',
            label: '订单可得成长值:',
            table: {
                label: '订单可得成长值'
            }
        },
        {
            key: 'promotionInfo',
            value: '',
            label: '活动信息:',
            table: {
                label: '活动信息'
            }
        }
    ] as EffectJsonFormConfig[];

    const consigneeRow = [
        {
            key: 'receiverName',
            value: '',
            label: '收货人:',
            table: {
                label: '收货人'
            }
        },
        {
            key: 'receiverPhone',
            value: '',
            label: '手机号码:',
            table: {
                label: '手机号码'
            }
        },
        {
            key: 'receiverPostCode',
            value: '',
            label: '邮政编码:',
            table: {
                label: '邮政编码'
            }
        },
        {
            key: 'deliveryAddress',
            value: '',
            label: '收货地址:',
            table: {
                label: '收货地址'
            }
        }
    ] as EffectJsonFormConfig[];

    const orderItemRow = [
        {
            key: 'productPic',
            value: '',
            label: '商品图片:',
            table: {
                label: '商品图片',
                render: (_: OrderItemDataType, record: OrderItemDataType) => {
                    return <>
                        <Image
                            width={100}
                            src={record.productPic}
                        />
                    </>
                }
                
            }
        },
        {
            key: 'productName',
            value: '',
            label: '商品名称:',
            table: {
                label: '商品名称',
                render: (_: OrderItemDataType, record: OrderItemDataType) => {
                    return <>
                        <div>{ record.productName.productName }</div>
                        <div>品牌: { record.productName.productBrand }</div>
                    </>
                }
            }
        },
        {
            key: 'productSn',
            value: '',
            label: '价格/货号:',
            table: {
                label: '价格/货号',
                render: (_: OrderItemDataType, record: OrderItemDataType) => {
                    return <>
                        <div>价格: { record.productSn.productPrice }</div>
                        <div>货号: { record.productSn.productSn }</div>
                    </>
                }
            }
        },
        {
            key: 'productAttr',
            value: '',
            label: '属性:',
            table: {
                label: '属性',
                render: (_: OrderItemDataType, record: OrderItemDataType) => {
                    return <>
                        {
                            record.productAttr.map((item, index) => <div key={item.key + index}>
                                <div>{ item.key }: { item.value }</div>
                            </div>)
                        }
                    </>
                }
            }
        },
        {
            key: 'productQuantity',
            value: '',
            label: '数量:',
            table: {
                label: '数量'
            }
        },
        {
            key: 'productPrice',
            value: '',
            label: '小计:',
            table: {
                label: '小计'
            }
        }
    ] as EffectJsonFormConfig[];

    const expenseOneRow = [
        {
            key: 'integration',
            value: '',
            label: '商品合计:',
            table: {
                label: '商品合计'
            }
        },
        {
            key: 'freightAmount',
            value: '',
            label: '运费:',
            table: {
                label: '运费'
            }
        },
        {
            key: 'couponAmount',
            value: '',
            label: '优惠券:',
            table: {
                label: '优惠券'
            }
        },
        {
            key: 'deleteStatus',
            value: '',
            label: '积分抵扣:',
            table: {
                label: '积分抵扣'
            }
        }
    ] as EffectJsonFormConfig[];

    const expenseTwoRow = [
        {
            key: 'promotionAmount',
            value: '',
            label: '活动优惠:',
            table: {
                label: '活动优惠'
            }
        },
        {
            key: 'discountAmount',
            value: '',
            label: '折扣金额:',
            table: {
                label: '折扣金额'
            }
        },
        {
            key: 'totalAmount',
            value: '',
            label: '订单总金额:',
            table: {
                label: '订单总金额'
            }
        },
        {
            key: 'payAmount',
            value: '',
            label: '应付款金额:',
            table: {
                label: '应付款金额'
            }
        }
    ] as EffectJsonFormConfig[];

    const controlsRow = [
        {
            key: 'operateMan',
            value: '',
            label: '操作者:',
            table: {
                label: '操作者'
            }
        },
        {
            key: 'createTime',
            value: '',
            label: '操作时间:',
            table: {
                label: '操作时间'
            }
        },
        {
            key: 'status',
            value: '',
            label: '订单状态:',
            table: {
                label: '订单状态',
                render: (_: ControlsType, record: ControlsType) => {
                    const value = convertMap(statusMap).filter(item => item.value === record.orderStatus);
                    return <>
                        { value[0].label }
                    </>
                }
            }
        },
        {
            key: 'confirmStatus',
            value: '',
            label: '付款状态:',
            table: {
                label: '付款状态',
                render: (_: ControlsType, record: ControlsType) => {
                    return <>
                        已支付
                    </>
                }
            }
        },
        {
            key: 'orderStatus',
            value: '',
            label: '发货状态:',
            table: {
                label: '发货状态',
                render: (_: ControlsType, record: ControlsType) => {
                    const value = convertMap(statusMap).filter(item => item.value === record.orderStatus);
                    return <>
                        { value[0].label }
                    </>
                }
            }
        },
        {
            key: 'note',
            value: '',
            label: '备注:',
            table: {
                label: '备注'
            }
        }
    ] as EffectJsonFormConfig[];
    
    return {
        basicRow,
        distributionRow,
        consigneeRow,
        orderItemRow,
        expenseOneRow,
        expenseTwoRow,
        controlsRow
    };
}