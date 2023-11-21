import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle } from "react";
import { message, Popconfirm, Table, Button, Cascader, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { productList, convertArray, productSimpleList } from '@/common/public-fetch/index';


interface ProductCategoryColumnsType {
    parentCategoryName: string;
    productCategoryId: number | string;
    productCategoryName: string;
}

interface OptionsType {
    value: number;
    label: string
    children?: OptionsType[]
}

const ProductCategory = (props: Props, ref: Ref<unknown>) => {
    const [productCategoryData, setProductCategoryData] = useState<ProductCategoryColumnsType[]>([]);  
    const [productOptions, setProductOptions] = useState<OptionsType[]>([]);
    const [productd, setProductd] = useState<any>(undefined);
    // table
    const productCategoryColumns: ColumnsType<ProductCategoryColumnsType> = [
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            render: (_: ProductCategoryColumnsType, record: ProductCategoryColumnsType) => <div>
                { record.parentCategoryName } {`>`} {record.productCategoryName}
            </div>,
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (_, record, index) => (
                <Popconfirm title="请确认删除?" onConfirm={() => handleDelete(record.productCategoryId)}>
                    <Button type="link">
                        删除
                    </Button>
                </Popconfirm>
            ),
        }
    ];
    const handleDelete = (id: number | string) => {
        const list = productCategoryData.filter(item => item.productCategoryId !== id);
        setProductCategoryData([
            ...list
        ])
    }
    const getProductList = async () => {
        const res =  await productList();
        const productArray = convertArray(res.data);
        setProductOptions([
            ...productArray
        ]);
    }
    // 新增
    const productAdd = () => {
        if(!productd) {
            message.warning('请选择分类！')
            return;
        }
        const isTable = productCategoryData.find(item => item.productCategoryId === productd[1]);
        if(isTable) {
            message.warning('分类已存在！')
            return;
        }
        const productdItem: OptionsType | undefined = productOptions.find(item => item.value === productd[0])
        if(!productdItem) {
            message.warning('找不到分类！')
            return;
        }
        const parentCategoryName = productdItem.label;
        if(!productdItem.children) {
            message.warning('找不到分类！')
            return;
        }
        const productdChildrenItem = productdItem.children.find(item => item.value === productd[1]);
        if(!productdChildrenItem) {
            message.warning('找不到分类！')
            return;
        }
        const productCategoryName = productdChildrenItem.label;
        setProductCategoryData(prev => [
            ...prev,
            {
                parentCategoryName: parentCategoryName,
                productCategoryId: productdChildrenItem.value,
                productCategoryName: productCategoryName
            }
        ])
        setProductd(undefined)
    }
    useEffect(() => {
        getProductList();
    }, [])

    useImperativeHandle(ref, () => {
        return {
			data: productCategoryData
        }
    });

    return <div style={{ width: '100%' }} className="mgb10">
        <Row gutter={8}>
            <Col span={4}></Col>
            <Col span={8}>
                <Cascader
                    value={productd}
                    options={productOptions}
                    onChange={e => setProductd(e)}
                    allowClear
                />
            </Col>
            <Col span={12}>
                <Button onClick={() => productAdd()}>添加</Button>
            </Col>
        </Row>
        <div className="mgt10"></div>
        <Row gutter={8}>
            <Col span={4}></Col>
            <Col span={18}>
                <Table
                    columns={productCategoryColumns} 
                    dataSource={productCategoryData} 
                    rowKey={record => record.productCategoryId} 
                    pagination={false}
                />
            </Col>
        </Row>
    </div>
}

interface Props {

}

export default forwardRef<HTMLDivElement, Props>(ProductCategory);

