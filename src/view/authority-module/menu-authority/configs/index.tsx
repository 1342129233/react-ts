import { Button, Space, Switch } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types';
import { numberToChinese } from '@/common/utils';
import { DataType, UpdateStatus } from '../types';


export function tableConfig(params: { handleEdit: (val: number) => void, handleDelete: (val: number) => void, updateStatus: (val: UpdateStatus) => void, handlJunior: (value: number) => void }) {
    const { handleEdit, handleDelete, updateStatus, handlJunior } = params;
    const row = [
        {
            key: 'id',
            value: '',
            label: '编号',
            table: {}
        },
        {
            key: 'title',
            value: '',
            label: '菜单名称',
            table: {}
        },
        {
            key: 'level',
            value: '',
            label: '菜单级数',
            table: {
                render: (_: DataType, record: DataType) => {
                    const value = numberToChinese(record.level + 1)
                    return <div>{ value }级</div>
                }
            }
        },
        {
            key: 'name',
            value: '',
            label: '前端名称',
            table: {}
        },
        {
            key: 'icon',
            value: '',
            label: '前端图标',
            table: {}
        },
        {
            key: 'hidden',
            value: '',
            label: '是否显示',
            table: {
                render: (_: DataType, record: DataType) => {
                    const switchValue = record.hidden === 1 ? false : true;
                    const onChange = (checked: boolean) => {
                        const value = checked ? 0 : 1
                        updateStatus({ id: record.id!, status: value });
                    }
                    return <Switch checked={switchValue} onChange={onChange} />
                }
            }
        },
        {
            key: 'sort',
            value: '',
            label: '排序',
            table: {}
        },
        {
            key: 'parentId',
            value: '',
            label: '设置下级',
            table: {
                render: (_: DataType, record: DataType) => {
                    const disabled = record.level === 1;
                    return <Button type="link" disabled={disabled} onClick={() => handlJunior(record.id!)}>
                        查看下级
                    </Button>
                }
            }
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
                                onClick={() => { handleEdit(record.id!) }}
                            >
                                编辑
                            </Button>
                            <Button
                                type="link"
                                onClick={() => { handleDelete(record.id!) }}
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