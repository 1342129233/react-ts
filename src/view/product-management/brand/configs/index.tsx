
import  { Space, Button, Switch, message } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { getBrandList, isShowStatus, isFactoryStatus } from '../server';
import { DataType } from '../type';

export enum StatusEnum{
    NO = '0',
    YES = '1'
}

export const StatusToBoolean: { [key: string]: boolean } = {
    [StatusEnum.NO]: false,
    [StatusEnum.YES]: true,
}
export const StatusToNUmber: { [key: string]: number } = {
    false: 0,
    true: 1,
}

export function Search(props: any) {
    const { handleEdit, handleDelete, standardPageRef } = props;
    const config = {
        row: [
            {
                key: 'keyword',
                value: '',
                label: '输入搜索',
                placeholder: '请输入品牌名称/关键字',
                search: {
                    type: 'input',
                }
            },
            {
                key: 'id',
                label: 'ID',
                table: {
                    width: 100
                }
            },
            {
                key: 'name',
                label: '品牌名称',
                table: {
                    width: 100
                }
            },
            {
                key: 'firstLetter',
                label: '品牌首字母',
                table: {
                    width: 100
                }
            },
            
            {
                key: 'sort',
                label: '排序',
                table: {
                    width: 100,
                }
            },
            {
                key: 'factoryStatus',
                label: '品牌制造商',
                table: {
                    render: (_: DataType, record: DataType) => {
                        const handleShowStatusChange = async (checked: boolean) => {
                            const params = {
                                ids: String(record.id),
                                factoryStatus: String(StatusToNUmber[String(checked)])
                            }

                            try {
                                // 请求接口
                                await isFactoryStatus(params);
                            } catch(error: any) {
                                message.error(error?.message || '删除失败')
                            }
                            // 从新请求
                            await standardPageRef.current?.select()
                        }
                        
                        return <Switch 
                            key={record.factoryStatus}
                            defaultChecked={StatusToBoolean[String(record.factoryStatus)]}
                            onChange={(checked)=>handleShowStatusChange(checked)}
                        />
                    }
                }
            },
            {
                key: 'showStatus',
                label: "是否显示",
                table: {
                    render: (_: DataType, record: DataType) => {
                        const handleShowStatusChange = async (checked: boolean) => {
                            const params = {
                                ids: String(record.id),
                                showStatus: String(StatusToNUmber[String(checked)])
                            }

                            try {
                                // 请求接口
                                await isShowStatus(params);
                            } catch(error: any) {
                                message.error(error?.message || '删除失败')
                            }
                            // 从新请求
                            await standardPageRef.current?.select()
                        }
                        
                        return <Switch 
                            key={record.showStatus}
                            defaultChecked={StatusToBoolean[String(record.showStatus)]}
                            onChange={(checked)=>handleShowStatusChange(checked)}
                        />
                    }
                }
            },
            {
                key: 'productCount',
                label: '商品数量',
                table: {
                    width: 100
                }
            },
            {
                key: 'productCommentCount',
                label: '评论数量',
                table: {
                    width: 100
                }
            },
            {
                key: 'operation',
                label: ' 操作',
                table: {
                    width: 100,
                    render: (_: DataType, record: DataType, index: number) => {
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
        ] as EffectJsonFormConfig[],
        fetchConfig: getBrandList
    }
    return {
        config,
        handleEdit,
        handleDelete
    }
}
