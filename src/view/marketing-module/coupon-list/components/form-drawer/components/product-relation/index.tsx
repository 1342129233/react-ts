import React, { useState, useEffect, useRef, useMemo, forwardRef, Ref, useImperativeHandle } from "react";
import { message, Form, Popconfirm, Input, Select, DatePicker, Table, Radio, Button, Cascader, Spin, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { SelectProps } from 'antd/es/select';
import { productList, convertArray, productSimpleList } from '@/common/public-fetch/index';
import debounce from 'lodash/debounce';

interface ProductRelationType{
    productId: number | string;
    productName: string;
    productSn: string;
}

let productRelationList: UserValue[]  = [];

function ProductRelation(props: Props, ref: Ref<unknown>) {
    const [productRelationData, setProductRelationData] = useState<ProductRelationType[]>([]);  
    const [productValue, setProductValue] = useState<UserValue>();
    // table
    const productCategoryColumns: ColumnsType<ProductRelationType> = [
        {
            title: '分类名称',
            dataIndex: 'productName',
            key: 'productName',
            width: 150,
            render: (_: ProductRelationType, record: ProductRelationType) => <div>
                { record.productName }
            </div>,
        },
        {
            title: '货号',
            dataIndex: 'productSn',
            key: 'productSn',
            width: 150,
            render: (_: ProductRelationType, record: ProductRelationType) => <div>
                NO.{ record.productSn }
            </div>,
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (_, record, index) => (
                <Popconfirm title="请确认删除?" onConfirm={() => handleDelete(record.productId)}>
                    <Button type="link">
                        删除
                    </Button>
                </Popconfirm>
            ),
        }
    ];
    const handleDelete = (id: number | string) => {
        const list = productRelationData.filter(item => item.productId !== id);
        setProductRelationData([
            ...list
        ])
    }
    // 新增
    const productAdd = () => {
        if(!productValue) {
            return;
        }
        const id = (productValue).value;
        const list = productRelationList.find(item => item.value === id)
        if(list) {
            setProductRelationData([
                {
                    productId: list.value,
                    productName: list.label,
                    productSn: list.productSn
                }
            ])
        }
    }
    useEffect(() => {
    }, [])

    useImperativeHandle(ref, () => {
        return {
			data: productRelationData
        }
    });

    return <div style={{ width: '100%' }} className="mgb10">
        <Row gutter={8}>
            <Col span={4}></Col>
            <Col span={8}>
            <DebounceSelect
                value={productValue}
                placeholder="搜索商品"
                fetchOptions={fetchUserList}
                onChange={(newValue) => {
                    setProductValue(newValue as UserValue);
                }}
                style={{ width: '100%' }}
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
                    dataSource={productRelationData}
                    rowKey={record => record.productId} 
                    pagination={false}
                />
            </Col>
        </Row>
    </div>
}

interface Props {

}

export default forwardRef<HTMLDivElement, Props>(ProductRelation);

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
    fetchOptions: (search: string) => Promise<ValueType[]>;
    debounceTimeout?: number;
}

function DebounceSelect<
    ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState<ValueType[]>([]);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                  return;
                }

                setOptions(newOptions);
                setFetching(false);
            })
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout])

    return (
        <Select
            showSearch
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

interface UserValue {
    label: string;
    value: number;
    productSn: string;
}
  
async function fetchUserList(username: string): Promise<UserValue[]> {
    const res = await productSimpleList(username);
    productRelationList= res.data.map(item => ({
        value: item.id,
        label: item.id + item.name,
        productSn: item.productSn
    }))
    return productRelationList
}

