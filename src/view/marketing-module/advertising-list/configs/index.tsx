import { Switch, Button, Space, Popconfirm, Image } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { convertMap, momentFormat, formatDate } from '@/common/utils';
import { advertisingPositionMap } from '@/common/public-type';
import { DataType, UpdateStatusType } from '../types';

export function standardPageModel(props: { updateStatus: (value: UpdateStatusType) => void, handleDelete: (id: number) => void, handleEdit: (params: DataType) => void }) {
    const { updateStatus, handleDelete, handleEdit } = props;
    const advertisingPositionOptions = convertMap(advertisingPositionMap);
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
            label: '广告名称:',
            placeholder: '广告名称',
            search: {
                type: 'input',
            },
            table: {}
        },
        {
            key: 'type',
            value: '',
            label: '广告位置:',
            placeholder: '',
            search: {
                type: 'select',
                options: advertisingPositionOptions
            },
            table: {
                render: (_: DataType, record: DataType) => {
                    const value = advertisingPositionOptions.filter(item => item.value === record.type)
                    return <div>
                        { value[0].label }
                    </div>
                }
            }
        },
        {
            key: 'endTime',
            value: '',
            label: '到期时间:',
            placeholder: '',
            search: {
                type: 'datePicker'
            }
        },
        {
            key: 'pic',
            value: '',
            label: '广告图片:',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <Image
                        width={80}
                        src={record.pic}
                    />
                }
            }
        },
        {
            key: 'time',
            value: '',
            label: '时间:',
            placeholder: '',
            table: {
                width: 200,
                render: (_: DataType, record: DataType) => {
                    const startTime = formatDate(momentFormat(record.startTime)) as string;
                    const endTime = formatDate(momentFormat(record.endTime)) as string;
                    return <div>
                        <div>开始时间: { startTime }</div>
                        <div>到期时间: { endTime }</div>
                    </div>
                }
            }
        },
        {
            key: 'status',
            value: '',
            label: '上线/下线:',
            placeholder: '',
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
            key: 'clickCount',
            value: '',
            label: '点击次数:',
            placeholder: '',
            table: {}
        },
        {
            key: 'orderCount',
            value: '',
            label: '生成订单:',
            placeholder: '',
            table: {}
        },
        {
            key: 'config',
            value: '',
            label: '配置:',
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
                        <Popconfirm title="请确认删除?" onConfirm={() => handleDelete(record.id)}>
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
