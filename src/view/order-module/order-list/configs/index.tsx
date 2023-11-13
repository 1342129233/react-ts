import { Button, Space } from 'antd';
import { DataType } from '../types';
import { orderList } from '../servers';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { convertMap } from '@/common/utils';
import { sourceTypeMap, statusMap, orderTypeMap, payTypeMap } from './config';

export function standardPageModel(params: { handleEdit: (val: DataType) => void, handleDelete: (val: React.Key) => void }) {
    const { handleEdit, handleDelete } = params;
    const row = [
        {
            key: 'id',
            value: '',
            label: '编号:',
            placeholder: '请输入搜索内容',
            search: {
                type: 'input',
            },
            table: {
                label: '编号'
            }
        },
        {
            key: 'receiverKeyword',
            value: '',
            label: '收货人:',
            placeholder: '收货人姓名/手机号码',
            search: {
                type: 'input',
            }
        },
        {
            key: 'orderSn',
            value: '',
            label: '输入搜索:',
            placeholder: '请输入搜索内容',
            table: {
                label: '订单编号'
            }
        },
        {
            key: 'createTime',
            value: '',
            label: '提交时间:',
            placeholder: '请输入搜索内容',
            search: {
                type: 'input',
            },
            table: {
                label: '提交时间'
            }
        },
        {
            key: 'memberUsername',
            value: '',
            label: '用户账号:',
            placeholder: '请输入搜索内容',
            table: {
                label: '用户账号'
            }
        },
        {
            key: 'totalAmount',
            value: '',
            label: '订单金额:',
            placeholder: '请输入搜索内容',
            table: {
                label: '订单金额',
                render: (_: DataType, record: DataType) => {
                    return <div>¥{ record.totalAmount }</div>
                }
            }
        },
        {
            key: 'payType',
            value: '',
            label: '支付方式:',
            placeholder: '请输入搜索内容',
            table: {
                label: '支付方式',
                render: (_: DataType, record: DataType) => {
                    const payType = Number(record.sourceType);
                    const value = convertMap(payTypeMap).filter(item => item.value === payType);
                    return <div>{ value[0].label }</div>
                }
            }
        },
        {
            key: 'sourceType',
            value: '',
            label: '订单来源:',
            placeholder: '请输入搜索内容',
            search: {
                type: 'select',
                options: convertMap(sourceTypeMap)
            },
            table: {
                label: '订单来源',
                render: (_: DataType, record: DataType) => {
                    const source = Number(record.sourceType);
                    const value = convertMap(sourceTypeMap).filter(item => item.value === source);
                    return <div>{ value[0].label }</div>
                }
            }
        },
        {
            key: 'status',
            value: '',
            label: '订单状态:',
            placeholder: '全部',
            search: {
                type: 'select',
                options: convertMap(statusMap)
            },
            table: {
                label: '支付状态',
                render: (_: DataType, record: DataType) => {
                    const status = Number(record.status);
                    const value = convertMap(statusMap).filter(item => item.value === status);
                    return <div>{ value[0].label }</div>
                }
            }
        },
        {
            key: 'orderType',
            value: '',
            label: '订单分类:',
            placeholder: '全部',
            search: {
                type: 'select',
                options: convertMap(orderTypeMap)
            },
            table: {
                label: '订单分类',
                render: (_: DataType, record: DataType) => {
                    const orderType = Number(record.orderType);
                    const value = convertMap(statusMap).filter(item => item.value === orderType);
                    return <div>{ value[0].label }</div>
                }
            }
        },
        {
            key: 'operation',
            value: '',
            label: ' 操作',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <Space size={0}>
                        <Button
                            type="link"
                            onClick={() => { handleEdit(record) }}
                        >
                            查看订单
                        </Button>
                        <Button
                            type="link"
                            onClick={() => { handleDelete(record.id) }}
                            danger
                        >
                            删除订单
                        </Button>
                    </Space>
                }
            }
        }
    ] as EffectJsonFormConfig[];

    return {
        row,
        fetchConfig: orderList
    }
}
