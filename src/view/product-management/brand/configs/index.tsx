
import  { Space, Button } from 'antd';
import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { getBrandList } from '../server';
import { DataType } from '../type';



export function Search(props: any) {
    const { handleEdit, handleDelete } = props;
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
                value: '',
                label: 'ID',
                table: {
                    width: 100
                }
            },
            {
                key: 'name',
                value: '',
                label: '品牌名称',
                table: {
                    width: 100
                }
            },
            {
                key: 'firstLetter',
                value: '',
                label: '品牌首字母',
                table: {
                    width: 100
                }
            },
            
            {
                key: 'sort',
                value: '',
                label: '排序',
                table: {
                    width: 100,
                }
            },
            {
                key: 'factoryStatus',
                value: '',
                label: '品牌制造商',
                table: {
                    width: 100
                }
            },
            {
                key: 'showStatus',
                value: '',
                label: '是否显示',
                table: {
                    width: 100
                }
            },
            {
                key: 'productCount',
                value: '',
                label: '商品数量',
                table: {
                    width: 100
                }
            },
            {
                key: 'productCommentCount',
                value: '',
                label: '评论数量',
                table: {
                    width: 100
                }
            },
            {
                key: 'operation',
                value: '',
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
