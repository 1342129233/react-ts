import dayjs from 'dayjs';
import { Button, Space, Popconfirm } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { DataType } from '../types';

export function standardPageModel(params: { handleEdit: (value: DataType) => void, handleDelete: (value: number) => void } ) {
    const { handleEdit, handleDelete } = params;

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
            label: '名称',
            placeholder: '',
            table: {}
        },
        {
            key: 'createTime',
            value: '',
            label: '创建时间',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const createTime = dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss');
                    return <div>{ createTime }</div>
                }
            }
        },
        {
            key: 'sort',
            value: '',
            label: '排序',
            placeholder: '',
            table: {}
        },
        {
            key: 'config',
            value: '',
            label: '操作',
            placeholder: '',
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
        }
    ] as EffectJsonFormConfig[];

    return {
        rows
    }
}
