import react, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Radio, Tabs, DatePicker, Form, Table, Space, Checkbox, Button, message, Transfer } from 'antd';
import type { TabsProps } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

import moment from 'moment';
import { brandList, productList, productAttributeCategory, subjectList, prefrenceAreaList } from '@/common/public-fetch/index';
import { BrandType } from '@/common/public-fetch/brand';
import { ProductAttributeCategoryType } from '@/common/public-fetch/productAttributeCategory';
export { initialize } from './info';
import CommoditySpecification from '../components/commodity-specification/index';
import { cloneDeep } from 'lodash';

interface OptionsType {
    value: number;
    label: string;
    children?: OptionsType[]
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


export function formItemFn() {
    const [product, setProduct] = useState<OptionsType[]>([]);
    const [brand, setBrand]= useState<OptionsType[]>([]);
    const [category, setCategory]= useState<OptionsType[]>([]);
    

    const options = async () => {
        try {
            // 
            const resBrandList =  await brandList();
            let  brandArray: OptionsType[] = [];
            resBrandList.data.list.forEach((item: BrandType) => {
                brandArray.push({
                    value: item.id,
                    label: item.name
                });
            });
            setBrand([...brandArray]);

            // 
            const resProductList =  await productList();
            let productArray: OptionsType[] = [];
            productArray = convertArray(resProductList.data)
            setProduct([...productArray]);
            
            // 
            const resProductAttributeCategory =  await productAttributeCategory();
            let  productAttributeCategoryArray: OptionsType[] = [];
            resProductAttributeCategory.data.list.forEach((item: ProductAttributeCategoryType) => {
                productAttributeCategoryArray.push({
                    value: item.id,
                    label: item.name
                });
            });
            setCategory([...productAttributeCategoryArray]);

        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        options();
    }, [])

    const detailedInformationConfig = [
        {
            name: 'productCategoryId',
            label: '商品分类：',
            value: [],
            tag: 'cascader',
            placeholder: '',
            search: {
                options: product
            },
            rules: [{ required: true, message: '请选择商品分类' }]
        },
        {
            name: 'name',
            label: '商品名称：',
            value: '',
            tag: 'input',
            placeholder: '',
            rules: [{ required: true, message: '请输入商品名称' }]
        },
        {
            name: 'subTitle',
            label: '副标题：',
            value: '',
            tag: 'input',
            placeholder: '',
            rules: [{ required: true, message: '请输入副标题' }]
        },
        {
            name: 'brandId',
            label: '商品品牌：',
            value: '',
            tag: 'select',
            placeholder: '',
            search: {
                options: brand
            },
            // rules: [{ required: true, message: '请选择商品品牌' }]
        },
        {
            name: 'description',
            label: '商品介绍：',
            value: '',
            tag: 'textArea',
            placeholder: '',
        },
        {
            name: 'productSn',
            label: '商品货号：',
            value: '',
            tag: 'input',
            placeholder: '',
        },
        {
            name: 'price',
            label: '商品售价：',
            value: 0,
            tag: 'input',
            placeholder: '',
        },
        {
            name: 'originalPrice',
            label: '市场价：',
            value: 0,
            tag: 'input',
            placeholder: '',
        },
        {
            name: 'stock',
            label: '商品库存：',
            value: 0,
            tag: 'input'
        },
        {
            name: 'unit',
            label: '计量单位：',
            value: '',
            tag: 'input',
            placeholder: '',
        },
        {
            name: 'weight',
            label: '商品重量：',
            value: 0,
            tag: 'input',
            placeholder: '',
            render: (item: any): JSX.Element => {
                return (
                    <div>
                        <Input defaultValue={item.value} style={{ width: 300 }} />
                        <span className='mgl10'>克</span>
                    </div>
                )
            }
        },
        {
            name: 'sort',
            label: '排序：',
            value: 0,
            tag: 'input',
            placeholder: '',
        }
    ]

    let detailedInformation = useMemo(() => {
        return detailedInformationConfig
    }, [product, brand])

    let salesPromotionConfig = [
        {
            name: 'giftPoint',
            label: '赠送积分：',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'giftGrowth',
            label: '赠送成长值：',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'lowStock',
            label: '积分购买限制：',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'previewStatus',
            label: '预告商品：',
            value: 1,
            tag: 'switch',
            placeholder: '',
            child: {
                valuePropName:"checked"
            }
        },
        {
            name: 'publishStatus',
            label: '商品上架：',
            value: 1,
            tag: 'switch',
            placeholder: '',
            child: {
                valuePropName:"checked"
            }
        },
        {
            name: 'promotionType',
            label: '商品新品：',
            value: 1,
            tag: 'switch',
            placeholder: '',
            child: {
                valuePropName:"checked"
            }
        },  
        {
            name: 'recommandStatus',
            label: '商品推荐：',
            value: 0,
            tag: 'checkbox',
            placeholder: '',
            child: {
                valuePropName:"checked"
            }
        },
        {
            name: 'serviceIds',
            label: '服务保证：',
            value: '',
            tag: 'checkbox',
            placeholder: '',
            search: {
                options: [
                    { label: '无忧退货', value: '1' },
                    { label: '快速腿退款', value: '2' },
                    { label: '免费包邮', value: '3' },
                ]
            },
        },
        {
            name: 'detailDesc',
            label: '详细页标题：',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'description',
            label: '详细页描述：',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'keywords',
            label: '商品关键字：',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'note',
            label: '商品备注：',
            value: '',
            tag: 'input',
            placeholder: ''
        }
    ]

    let salesPromotion = useMemo(() => {
        return salesPromotionConfig
    }, [])
    
    const productAttributeCategoryConfig = [
        {
            name: 'productAttributeCategoryId',
            label: '属性类型：',
            value: 3,
            tag: 'select',
            placeholder: '请选择属性类型',
            search: {
                options: category
            }
        },
        // {
        //     name: 'commoditySpecification',
        //     label: '商品规格：',
        //     value: 3,
        //     tag: 'component',
        //     placeholder: '',
        //     component: (dataInfo: any,infoValue: Function) => {
        //         const clickInfo = (key: string, value: any) => {
        //             infoValue(key, value);
        //         }
        //         return <CommoditySpecification
        //             dataInfo={dataInfo} 
        //             colorOptions={colorOptions} 
        //             colorClick={colorClick}
        //             clickInfo={clickInfo}
        //         ></CommoditySpecification>
        //     }
        // },
    ]

    let productAttributeCategoryMemo = useMemo(() => {
        return productAttributeCategoryConfig
    }, [category])

    return {
        detailedInformation,
        salesPromotion,
        productAttributeCategoryMemo
    }
}

