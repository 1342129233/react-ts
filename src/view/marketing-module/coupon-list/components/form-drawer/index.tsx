import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, Ref, useMemo } from "react";
import { message, Form, Input, Select, DatePicker, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { FormInstance } from 'antd/es/form';
import TheDrawer from '@/common/components/the-drawer/index';
import { convertMap } from '@/common/utils';
import { info, serverToFe, feToServer } from './configs';
import { ProductRelationType, ProductCategoryRelationType } from './types'; 
import { couponId, couponUpdate, couponCreate } from './server';
import { couponTypeMap, platformTypeMap, usableProductTypeMap, usableProductEnum } from '@/common/public-type';
import ProductCategory from './components/product-category/index';
import ProductRelation from './components/product-relation/index';
import { useDidUpdateEffect } from '@/common/hooks/useDidUpdateEffect';

const { Option } = Select;
const { RangePicker } = DatePicker;
  
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

function FormDrawer(props: PropsType, ref: Ref<unknown>) {
    const { id, getList } = props;
    const [form] = Form.useForm();
    const formRef = React.useRef<FormInstance>(null);
    const productCategoryRef = useRef<HTMLDivElement & { data: ProductCategoryRelationType[] }>(null);
    const ProductRelationRef = useRef<HTMLDivElement & { data: ProductRelationType[] }>(null);
    const [formDrawer, setFormDrawer] = useState(false);

    const onSubmit = async () => {
        const formValue = form.getFieldsValue();
        const value = feToServer(formValue);
        if(formValue.radio === usableProductEnum.APPOINT_TYPE) {
            value.productCategoryRelationList = productCategoryRef.current?.data || [];
        }
        if(formValue.radio === usableProductEnum.APPOINT_PRODUCT) {
            value.productRelationList = ProductRelationRef.current?.data || [];
        }
        if(id) {
            value.id = id;
        }
        try {
			id ? await couponUpdate(value) : await couponCreate(value);
			getList();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }

    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setFormDrawer(!formDrawer)
			}
		}
	})
    const [radio, setRadio] = useState(0);
    const usableProductChange = ({ target: { value } }: RadioChangeEvent) => {
        form.setFieldValue('radio', value)
        const formRadio = form.getFieldValue('radio')
        setRadio(formRadio)
    }
    
    const getCouponList = async () => {
        try {
			const res = await couponId(id);
            const data = serverToFe(res.data)
            form.setFieldsValue(data)
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    } 
    useEffect(() => {
        if(id && formDrawer) {
            getCouponList()
        }
        if(!id && formDrawer) {
            form.setFieldsValue(info)
        }
    }, [formDrawer]);
    return <TheDrawer
        title="配置优惠券"
        open={formDrawer}
        onOpenClose={(value) => setFormDrawer(value)}
        onSave={() => onSubmit()}
    >
        <Form
            {...layout}
            ref={formRef}
            form={form}
            name="coupon-form-ref"
            initialValues={info}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name="type" label="优惠券类型:">
                <Select
                    allowClear
                >
                    {
                        convertMap(couponTypeMap).map(item => (
                            <Option value={item.value} key={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item name="name" label="优惠券名称:" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="platform" label="适用平台:">
                <Select
                    allowClear
                >
                    {
                        convertMap(platformTypeMap).map(item => (
                            <Option value={item.value} key={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item name="publishCount" label="发行总量:" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="amount" label="面额:" rules={[{ required: true }]}>
                <Input addonAfter="元" />
            </Form.Item> 
            <Form.Item name="perLimit" label="每人限领:">
                <Input addonAfter="张" />
            </Form.Item>
            <Form.Item name="minPoint" label="使用门槛:">
                <Input addonBefore="满" addonAfter="元可用" />
            </Form.Item>
            <Form.Item name="enableTime" label="领取日期:">
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="time" label="有效期">
                <RangePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="radio" label="可使用商品:">
                <Radio.Group options={convertMap(usableProductTypeMap)} onChange={usableProductChange} optionType="button" />
            </Form.Item>
            {
                radio == usableProductEnum.APPOINT_TYPE ? <Form.Item wrapperCol={{span: 24}}><ProductCategory ref={productCategoryRef} /></Form.Item> : null
            }
            {
                radio == usableProductEnum.APPOINT_PRODUCT ? <Form.Item wrapperCol={{span: 24}}><ProductRelation ref={ProductRelationRef} /></Form.Item> : null
            }
            <Form.Item name="note" label="备注:">
                <Input />
            </Form.Item>
        </Form>
    </TheDrawer>
}

interface PropsType {
    id: number;
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(FormDrawer);

