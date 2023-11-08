import { Button, Space } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { returnApplyList } from '../server';
import { convertMap } from '@/common/utils';
import { DataType } from '../types';

export enum StatusEnum {
    ToBeProcessed = 0,
    ReturningGoods = 1,
    Completed = 2,
    Declined = 3
}

export const StatusMap: { [key in StatusEnum]: string } = {
    [StatusEnum.ToBeProcessed]: "待处理",
    [StatusEnum.ReturningGoods]: "退货中",
    [StatusEnum.Completed]: "已完成",
    [StatusEnum.Declined]: "已拒绝",
}

export function standardPageModel(params: { handleEdit: (val: DataType) => void, handleDelete: (val: DataType) => void }) {
    const { handleEdit, handleDelete } = params;
    const row = [
        {
            key: 'id',
            value: '',
            label: '输入搜索:',
            placeholder: '请输入搜索内容',
            search: {
                type: 'input',
            },
            table: {
                label: '服务单号'
            }
        },
        {
            key: 'status',
            value: '',
            label: '处理状态:',
            placeholder: '请输入处理状态',
            search: {
                type: 'select',
                options: convertMap(StatusMap)
            },
            table: {
                label: '申请状态'
            }
        },
        {
            key: 'createTime',
            value: '',
            label: '申请时间:',
            placeholder: '请输入申请时间',
            search: {
                type: 'datePicker',
            },
            table: {
                label: '申请时间'
            }
        },
        {
            key: 'memberUsername',
            value: '',
            label: '用户账号'
        },
        {
            key: 'productRealPrice',
            value: '',
            label: '退款金额'
        },
        {
            key: 'handleMan',
            value: '',
            label: '操作人员:',
            placeholder: '请输入操作人员',
            search: {
                type: 'input',
            }
        },
        {
            key: 'handleTime',
            value: '',
            label: '处理时间:',
            placeholder: '请输入处理时间',
            search: {
                type: 'datePicker',
            },
            table: {
                label: '处理时间'
            }
        },
        {
            key: 'operation',
            value: '',
            label: ' 操作',
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
        row,
        returnApplyList
    };
}
