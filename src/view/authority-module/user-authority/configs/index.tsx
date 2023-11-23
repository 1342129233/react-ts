import { Space, Button, Popconfirm, Switch } from 'antd';
import dayjs from 'dayjs';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { DataType, updateStatus } from '../types';

export function standardPageModel(params: { handleUser: (value: DataType) => void, handleEdit: (value: DataType) => void, handleDelete: (value: number) => void, updateStatus: (params: updateStatus) => void })  {
    const { handleUser, handleEdit, handleDelete, updateStatus } = params;

    const rows = [
        {
            key: 'keyword',
            value: '',
            label: '输入搜索:',
            placeholder: '账号/姓名',
            search: {
                type: 'input',
            },
        },
        {
            key: 'id',
            value: '',
            label: '编号',
            placeholder: '',
            table: {}
        },
        {
            key: 'username',
            value: '',
            label: '账号',
            placeholder: '',
            table: {}
        },
        {
            key: 'nickName',
            value: '',
            label: '姓名',
            placeholder: '',
            table: {}
        },
        {
            key: 'email',
            value: '',
            label: '邮箱',
            placeholder: '',
            table: {}
        },
        {
            key: 'createTime',
            value: '',
            label: '添加时间',
            placeholder: '',
            table: {
                width: 200,
                render: (_: DataType, record: DataType) => {
                    if(record.createTime) {
                        const createTime = dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss');
                        return <div>{ createTime }</div>
                    }
                    return <div>N/A</div>
                }
            }
        },
        {
            key: 'loginTime',
            value: '',
            label: '最后登录',
            placeholder: '',
            table: {
                width: 200,
                render: (_: DataType, record: DataType) => {
                    if(record.loginTime) {
                        const loginTime = dayjs(record.loginTime).format('YYYY-MM-DD HH:mm:ss');
                        return <div>{ loginTime }</div>
                    }
                    return <div>N/A</div>
                }
            }
        },
        {
            key: 'status',
            value: '',
            label: '是否启用',
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
                render: (_: DataType, record: DataType) => {
                    return <Space size={0}>
                        <Button
                            type="link"
                            onClick={() => { handleUser(record) }}
                        >
                            分配角色
                        </Button>
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
