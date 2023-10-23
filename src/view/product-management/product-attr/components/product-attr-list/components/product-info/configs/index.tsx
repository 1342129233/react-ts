import { useMemo, useState, useEffect } from 'react';
import { convertMap, serverToOption } from '@/common/utils';
import { productAttributeCategory } from '@/common/public-fetch/productAttributeCategory';

import { FilterOptionMap, SearchOptionMap, RelatedOptionMap, SelectOptionMap, InputTypeOptionMap } from './options';
 
interface OptionsType {
    value: number;
    label: string;
    children?: OptionsType[]
}

export const info = {
    filterType: 0,
    handAddStatus: 0,
    id: 0,
    inputList: '',
    inputType: 0,
    name:'',
    productAttributeCategoryId: 1,
    relatedStatus: 0,
    searchType: 0,
    selectType: 0,
    sort: 100,
    type: 0
}

export function formItemFn() {
    const [productAttributeCategoryOptions, setProductAttributeCategoryOptions] = useState<OptionsType[]>([]);
    const options = async () => {
        try {
            // 
            const res =  await productAttributeCategory();
            const list = serverToOption(res.data.list, { value: 'id', label: 'name', children: 'children' })
            setProductAttributeCategoryOptions([
                ...list
            ])
        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        options();
    }, [])
    const config = [
        {
            name: 'name',
            label: '属性名称:',
            value: '',
            tag: 'input',
            placeholder: '',
            rules: [{ required: true, message: '请输入属性名称' }]
        },
        {
            name: 'productAttributeCategoryId',
            label: '商品类型:',
            value: '',
            tag: 'select',
            placeholder: '',
            search: {
                options: productAttributeCategoryOptions
            }
        },
        {
            name: 'filterType',
            label: '分类筛选样式:',
            value: '',
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(FilterOptionMap)
            }
        },
        {
            name: 'searchType',
            label: '能否进行检索:',
            value: '',
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(SearchOptionMap)
            }
        },
        {
            name: 'relatedStatus',
            label: '商品属性关联:',
            value: '',
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(RelatedOptionMap)
            }
        },
        {
            name: 'selectType',
            label: '属性是否可选:',
            value: '',
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(SelectOptionMap)
            }
        },
        {
            name: 'inputType',
            label: '属性值的录入方式:',
            value: '',
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(InputTypeOptionMap)
            }
        },
        {
            name: 'inputList',
            label: '属性值可选值列表:',
            value: '',
            tag: 'textArea',
            placeholder: ''
        },
        {
            name: 'handAddStatus',
            label: '是否支持手动新增:',
            value: '',
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(RelatedOptionMap)
            }
        },
        {
            name: 'sort',
            label: '排序属性:',
            value: '',
            tag: 'input',
            placeholder: ''
        }
        
    ]
    
    const formConfig = useMemo(() => {
        return config
    }, [productAttributeCategoryOptions])
    return {
        formConfig
    }
}

