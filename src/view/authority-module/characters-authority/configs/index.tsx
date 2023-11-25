import dayjs from 'dayjs';
import { Button, Space, Popconfirm, Switch } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { DataType, UpdateStatus } from '../types';

export function standardPageModel(params: { 
    handleMenu: (record: DataType) => void, 
    handleEdit: (record: DataType) => void, 
    handleDelete: (id: number) => void, 
    updateStatus: (record: UpdateStatus) => void, 
    updateResource: (record: DataType) => void
}) {
    const { handleMenu, handleEdit, handleDelete, updateStatus, updateResource } = params;

    const rows = [
        {
            key: 'keyword',
            value: '',
            label: '输入搜索:',
            placeholder: '角色名称',
            search: {
                type: 'input',
            },
        },
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
            label: '角色名称:',
            placeholder: '',
            table: {}
        },
        {
            key: 'description',
            value: '',
            label: '描述:',
            placeholder: '',
            table: {}
        },
        {
            key: 'createTime',
            value: '',
            label: '添加时间:',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const createTime = dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss');
                    return <div>{ createTime }</div>
                }
            }
        },
        {
            key: 'status',
            value: '',
            label: '是否启用:',
            placeholder: '',
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
            label: '操作',
            placeholder: '',
            table: {
                width: 100,
                render: (_: DataType, record: DataType) => {
                    return <div style={{ width: "100px" }}>
                        <Space size={0}>
                            <div>
                                <Button
                                    type="link"
                                    onClick={() => { handleMenu(record) }}
                                >
                                    分配菜单
                                </Button>
                                <Button
                                    type="link"
                                    onClick={() => { updateResource(record) }}
                                >
                                    分配资源
                                </Button>
                            </div>
                            <div>
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
                            </div>
                        </Space>
                    </div>
                }
            }
        }
    ] as EffectJsonFormConfig[];

    return {
        rows
    }
}
