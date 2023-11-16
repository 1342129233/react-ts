import { Switch, Button, Space, Popconfirm } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { DataType, UpdateStatusType } from '../types';
import { momentFormat, formatDate } from '@/common/utils';

export function standardPageModel(params: { updateStatus: (value: UpdateStatusType) => void, handleProduct: (value: DataType) => void, handleEdit: (value: DataType) => void, handleDelete: (value: DataType) => void }) {
    const { updateStatus, handleProduct, handleEdit, handleDelete } = params;
    const rows = [
        {
            key: 'keyword',
            value: '',
            label: '活动名称:',
            placeholder: '请输入活动名称',
            search: {
                type: 'input',
            }
        },
        {
            key: 'id',
            value: '',
            label: '编号:',
            table: {}
        },
        {
            key: 'title',
            value: '',
            label: '活动标题:',
            table: {}
        },
        {
            key: 'activeStatus',
            value: '',
            label: '活动状态:',
            table: {
                render: (_: DataType, record: DataType) => {
                    const nowTime = Date.now();
                    const startDate = Number(momentFormat(record.startDate));
                    const endDate = Number(momentFormat(record.endDate));
                    if(nowTime < endDate || nowTime > startDate) {
                        return <div>活动进行中</div>
                    }
                    if(nowTime < startDate) {
                        return <div>活动未开始</div>
                    }
                    if(nowTime > endDate) {
                        return <div>活动已结束</div>
                    }
                }
            }
        },
        {
            key: 'startDate',
            value: '',
            label: '开始时间:',
            table: {
                render: (_: DataType, record: DataType) => {
                    const startDate = formatDate(momentFormat(record.startDate)) as string;
                    return <div>{ startDate }</div>
                }
            }
        },
        {
            key: 'endDate',
            value: '',
            label: '结束时间:',
            table: {
                render: (_: DataType, record: DataType) => {
                    const endDate = formatDate(momentFormat(record.endDate)) as string;
                    return <div>{ endDate }</div>
                }
            }
        },
        {
            key: 'status',
            value: '',
            label: '上线/下线:',
            table: {
                render: (_: DataType, record: DataType) => {
                    const switchValue = record.status === 1 ? true : false;
                    const onChange = (checked: boolean) => {
                        const value = checked ? 1 : 0
                        updateStatus({ id: record.id, status: value });
                    }
                    return <Switch checked={switchValue} onChange={onChange} />
                }
            }
        },
        {
            key: 'controls',
            value: '',
            label: '操作:',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <Space size={0}>
                        <Button
                            type="link"
                            onClick={() => { handleProduct(record) }}
                        >
                            设置商品
                        </Button>
                        <Button
                            type="link"
                            onClick={() => { handleEdit(record) }}
                        >
                            编辑
                        </Button>
                        <Popconfirm title="请确认删除?" onConfirm={() => handleDelete(record)}>
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