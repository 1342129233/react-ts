import { Switch, Button, Space, Popconfirm } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { DataType, UpdateStatusType } from '../types';
import { recommendStatusMap } from '@/common/public-type';
import { convertMap } from '@/common/utils';

export function standardPageModel(params: { updateStatus: (value: UpdateStatusType) => void, handleSort: (value: DataType) => void, handleDelete: (value: number) => void }) {
    const { updateStatus, handleSort, handleDelete } = params;
    const recommendsMap = convertMap(recommendStatusMap);
    const rows = [
        {
            key: 'id',
            value: '',
            label: '编号:',
            placeholder: '',
            table: {}
        },
        {
            key: 'productName',
            value: '',
            label: '商品名称:',
            placeholder: '请输入商品名称',
            search: {
                type: 'input',
            },
            table: {
                label: '商品名称'
            }
        },
        {
            key: 'isRecommendStatus',
            value: '',
            label: '是否推荐:',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const switchValue = record.recommendStatus === 1 ? true : false;
                    const onChange = (checked: boolean) => {
                        const value = checked ? 1 : 0
                        updateStatus({ ids: record.id, recommendStatus: value });
                    }
                    return <Switch checked={switchValue} onChange={onChange} />
                }
            }
        },
        {
            key: 'sort',
            value: '',
            label: '排序:',
            placeholder: '',
            table: {
                label: '排序'
            }
        },
        {
            key: 'recommendStatus',
            value: '',
            label: '推荐状态:',
            placeholder: '请选择推荐状态',
            search: {
                type: 'select',
                options: recommendsMap
            },
            table: {
                label: "状态",
                render: (_: DataType, record: DataType) => {
                    const value = recommendsMap.filter(item => item.value === record.recommendStatus)
                    return <>
                        { value[0].label }
                    </>
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
                            onClick={() => { handleSort(record) }}
                        >
                            设置排序
                        </Button>
                        <Popconfirm title="请确认删除?" onConfirm={() => handleDelete(record.id)}>
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
