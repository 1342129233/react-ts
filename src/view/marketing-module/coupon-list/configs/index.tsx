import { Switch, Button, Space, Popconfirm } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { DataType, UpdateStatusType } from '../types';
import { platformTypeMap, couponTypeMap, usableProductTypeMap } from '@/common/public-type';
import { convertMap, formatDate, momentFormat } from '@/common/utils';

export function standardPageModel(params: { lookDetails: (value: DataType) => void, handleEdit: (value: DataType) => void, handleDelete: (value: number) => void }) {
    const { lookDetails, handleEdit, handleDelete } = params;
    // 适用平台
    const platformMap = convertMap(platformTypeMap);
    // 优惠券类型
    const couponMap = convertMap(couponTypeMap);
    // 可使用商品
    const usableProductMap = convertMap(usableProductTypeMap);
    const rows = [
        {
            key: 'id',
            value: '',
            label: '编号:',
            placeholder: '',
            table: {}
        },
        {
            key: 'name',
            value: '',
            label: '优惠券名称:',
            placeholder: '请输入优惠券名称',
            search: {
                type: 'input',
            },
            table: {
                label: '优惠券名称'
            }
        },
        {
            key: 'type',
            value: '',
            label: '优惠券类型:',
            placeholder: '请选择优惠券类型',
            search: {
                type: 'input',
                options: couponMap
            },
            table: {
                label: '优惠券类型',
                render: (_: DataType, record: DataType) => {
                    const value = couponMap.filter(item => item.value === record.type)
                    return <div>{ value[0].label }</div>
                }
            }
        },
        {
            key: 'useType',
            value: '',
            label: '可使用商品:',
            placeholder: '',
            table: {
                label: '优惠券类型',
                render: (_: DataType, record: DataType) => {
                    const value = usableProductMap.filter(item => item.value === record.useType)
                    return <div>{ value[0].label }</div>
                }
            }
        },
        {
            key: 'minPoint',
            value: '',
            label: '使用门槛:',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <div>满{ record.minPoint }元可用</div>
                }
            }
        },
        {
            key: 'amount',
            value: '',
            label: '面值:',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <div>{ record.amount }元</div>
                }
            }
        },
        {
            key: 'platform',
            value: '',
            label: '适用平台:',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const value = platformMap.filter(item => item.value === record.platform)
                    return <div>{ value[0].label }</div>
                }
            }
        },
        {
            key: 'validity',
            value: '',
            label: '有效期:',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const startTime = formatDate(momentFormat(record.startTime)) as string;
                    const endTime = formatDate(momentFormat(record.endTime)) as string;
                    return <div>
                        <div>{ startTime }</div>
                        <div>至</div>
                        <div>{ endTime }</div>
                    </div>
                }
            }
        },
        {
            key: 'validity',
            value: '',
            label: '状态:',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const nowTime = Date.now();
                    const startTime = Number(momentFormat(record.startTime));
                    const endTime = Number(momentFormat(record.endTime));
                    if(nowTime > endTime) {
                        return <div>已过期</div>
                    }
                    return <div>未过期</div>
                }
            }
        },
        {
            key: 'config',
            value: '',
            label: '操作:',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <Space size={0}>
                        <Button
                            type="link"
                            onClick={() => { lookDetails(record) }}
                        >
                            查看
                        </Button>
                        <Button
                            type="link"
                            onClick={() => { handleEdit(record) }}
                        >
                            编辑
                        </Button>
                        <Popconfirm title="请确认删除?" onConfirm={() => handleDelete(record.id)}>
                            <Button type="link">
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                }
            }
        },
    ] as EffectJsonFormConfig[];
    return {
        rows
    }
}
