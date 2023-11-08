import React, { useEffect, useState } from 'react';

import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import moment from 'moment';
import { Button, Table, Space, Switch } from 'antd';
const { Column, ColumnGroup } = Table;
import { productListAxios } from '../server';
import { DataTable } from '../types/index';
import { brandList, productList } from '@/common/public-fetch/index';
import { ProductType } from '@/common/public-fetch/product';
import { BrandType } from '@/common/public-fetch/brand';

interface OptionsType {
    value: number;
    label: string
}

function convertArray(data: any[]) {
    const list: any[] = [];
    data.forEach(item => {
        const dataList = {
            value: item.id,
            label: item.name,
            children: item.children
        };
        if(item.children) {
            dataList.children = convertArray(item.children)
        }
        list.push(dataList)
    });
    return list;
}

export function Search() {

    let [brand, setBrand]= useState<OptionsType[]>([]);
    let [product, setProduct] = useState<OptionsType[]>([]);

    useEffect(() => {
        const options = async () => {
            try {
                const resBrandList =  await brandList();
                let  brandArray: OptionsType[] = [];
                resBrandList.data.list.forEach((item: BrandType) => {
                    brandArray.push({
                        value: item.id,
                        label: item.name
                    });
                });
                setBrand([...brandArray]);
                const resProductList =  await productList();
                let productArray: OptionsType[] = [];
                productArray = convertArray(resProductList.data)
                setProduct([...productArray]);
            } catch (error) {
                console.log('error', error)
            }
        }
        options();
    }, [])
    

    const row = [
        {
            key: 'id',
            value: '',
            label: '编号',
            table: {
                width: 100,
                fixed: 'left'
            }
        },
        {
            key: 'pic',
            value: '',
            label: '图片',
            table: {
                width: 100,
                render: (_: any, record: DataTable) => {
                    return (<div>
                        <img src={record.pic} style={{ width: 100, height: 100 }}/>
                    </div>)
                }
            }
        },
        {
            key: 'keyword',
            value: '',
            label: '商品名称',
            search: {
                type: 'input',
                placehold: '请输入商品名称'
            },
            table: {
                width: 120,
                render: (_: any, record: DataTable) => {
                    return (<div>
                        <div>{ record.name }</div>
                        <div>{ record.brandName }</div>
                    </div>)
                }
            }
        },
        {
            key: 'productSn',
            value: '',
            label: '商品货号',
            search: {
                type: 'input',
                placehold: '请输入商品货号'
            },
            table: {
                width: 120,
                render: (_: any, record: DataTable) => {
                    return (<div>
                        <div>价格: { record.price }</div>
                        <div>货号: { record.productSn }</div>
                    </div>)
                }
            }
        },
        {
            key: 'productCategoryId',
            value: '',
            label: '商品分类',
            search: {
                type: 'cascader',
                options: product,
                placehold: '请选择商品分类'
            },
            table: {
                width: 120
            }
        },
        {
            key: 'tagValue',
            value: '',
            label: '标签',
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
                render: (_: any, record: DataTable) => {
                    return (<div>
                        <div>{record.sort}</div>
                    </div>)
                }
            }
        },
        {
            key: 'SKU',
            value: '',
            label: 'SKU库存',
            table: {
                width: 110,
                render: (_: any, record: DataTable) => {
                    return (<div>
                        <div>SKU库存</div>
                    </div>)
                }
            }
        },
        {
            key: 'salesVolume',
            value: '',
            label: '销量',
            table: {
                width: 100,
                render: (_: any, record: DataTable) => {
                    return (<div>
                        <div>{record.sale}</div>
                    </div>)
                }
            }
        },
    
        // table 处理
        {
            key: 'brandId',
            value: '',
            label: '商品品牌',
            search: {
                options: brand,
                type: 'select',
                placehold: '请选择品牌'
            },
            table: {
                width: 120
            }
        },
        {
            key: 'publishStatus',
            value: '',
            label: '上架状态',
            search: {
                options: [
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled' }
                ],
                type: 'select',
                placehold: '全部'
            },
            table: {
                width: 120
            }
        },
        {
            key: 'verifyStatus',
            value: '',
            label: '审核状态',
            selectOptions: [
                { value: 0, label: '未审核' },
                { value: 1, label: '审核' }
            ],
            search: {
                type: 'select',
                placehold: '全部'
            },
            table: {
                width: 120,
                render: (_: any, record: DataTable) => {
                    return (<div>
                        <div>
                            {
                                record.verifyStatus ? '审核' : '未审核'
                            }
                        </div>
                        <Button type="link" block>
                            审核详情
                        </Button>
                    </div>)
                }
            }
        },
        {
            key: 'lotteryTime',
            value: Date.now(),
            label: '测试时间',
            getValueFromEvent: (value: unknown) => {
                return value ? moment(value).valueOf() : undefined
            },
            getValueProps: (value: string | number | Date) => {
                const date = new Date(Number(value));
                return { value: moment(date, 'YYYY-MM-DD HH:mm:ss') }
            },
            table: {
                width: 100,
                render: (_: any, record: any) => {
                    const date = new Date();
                    const value = moment(date).format("YYYY-MM-DD HH:mm:ss");
                    return (<div>{ value }</div>)
                }
            }
        },
        {
            key: 'operation',
            value: '',
            label: '操作',
            table: {
                width: 100,
                fixed: 'right',
                // render: (_: any, record: any, index: number) => {
                //     return (
                //         <Space size={0}>
                //             <Button
                //                 type="link"
                //             >
                //                 查看
                //             </Button>
                //             <Button
                //                 type="link"
                //                 onClick={() => { handleEdit(_, record, index) }}
                //             >
                //                 编辑
                //             </Button>
                //             <Button
                //                 type="link"
                //                 onClick={() => { handleDelete(_, record, index) }}
                //                 danger
                //             >
                //                 删除
                //             </Button>
                //         </Space>
                //     )
                // }
            }
        }
    ] as EffectJsonFormConfig[]

    return { 
        productListAxios,
        row,
        product, // 其他接口信息
    };
}
