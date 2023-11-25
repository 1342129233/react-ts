import { Switch, Button, Space, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { momentFormat, formatDate } from '@/common/utils';
import { DataType, UpdateStatusType } from '../types';

export function standardPageModel(params: { updateStatus: (value: UpdateStatusType) => void, handleEdit: (value: DataType) => void, handleDelete: (value: number) => void }) {
    const { updateStatus, handleEdit, handleDelete } = params;

    const rows = [
        {
            key: 'id',
            value: '',
            label: '编号',
            placeholder: '',
            table: {}
        },
        {
            key: 'name',
            value: '',
            label: '秒杀时间段名称',
            placeholder: '',
            table: {}
        },
        {
            key: 'startTime',
            value: '',
            label: '每日开始时间',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const time = dayjs(record.startTime).format("HH:mm:ss") as unknown as string;
                    return <div>{ time }</div>
                }
            }
        },
        {
            key: 'endTime',
            value: '',
            label: '每日结束时间',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const time = dayjs(record.endTime).format("HH:mm:ss") as unknown as string;
                    return <div>{ time }</div>
                }
            }
        },
        {
            key: 'status',
            value: '',
            label: '启用:',
            table: {
                render: (_: DataType, record: DataType) => {
                    const switchValue = record.status === 1 ? true : false;
                    const onChange = (checked: boolean) => {
                        const value = checked ? 1 : 0
                        updateStatus({ id: record.id!, status: value });
                    }
                    return <Switch checked={switchValue} onChange={onChange} />
                }
            }
        },
        {
            key: 'config',
            value: '',
            label: '操作:',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <Space size={0}>
                        <Button
                            type="link"
                            onClick={() => { handleEdit(record) }}
                        >
                            编辑
                        </Button>
                        <Popconfirm title="请确认删除?" onConfirm={() => handleDelete(record.id!)}>
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
