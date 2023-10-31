import { Button, Space, Switch } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types';
import { DataType } from '../types';

export function tableConfig(params: { handleEdit: (val: DataType) => void, handleDelete: (val: DataType) => void }) {
    const { handleEdit, handleDelete } = params;
    const row = [
        {
            key: 'id',
            value: '',
            label: '编号'
        },
        {
            key: 'name',
            value: '',
            label: '原因类型'
        },
        {
            key: 'sort',
            value: '',
            label: '排序',
        },
        {
            key: 'status',
            value: '',
            label: '是否可用',
        },
        {
            key: 'createTime',
            value: '',
            label: '添加时间',
        },
        {
            key: 'operation',
            value: '',
            label: '操作',
            table: {
                render: (_: DataType, record: DataType) => {
                    return (
                        <Space size={0}>
                            <Button
                                type="link"
                                onClick={() => { handleEdit(record) }}
                            >
                                编辑
                            </Button>
                            <Button
                                type="link"
                                onClick={() => { handleDelete(record) }}
                                danger
                            >
                                删除
                             </Button>
                        </Space>
                    )
                }
            }
        }
    ] as EffectJsonFormConfig[]
    return {
        row
    };
}