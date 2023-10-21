import React, { useRef, useState } from 'react';
import { Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';

function ProductInfo() {
    const formRef = useRef<FormInstance>(null);
    const onFinish = (values: Record<string, unknown>) => {
        console.log(values);
    };
    const [infoForm, setInfoForm] = useState({
        productCategoryId: '333',
        name: '',
        subTitle: '',
        brandId: '',
        description: '',
        productSn: '',
        price: '',
        originalPrice: '',
        stock: '',
        unit: '',
        weight: '',
        sort: ''
    });
    return (
        <div>
            <Form
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                style={{ maxWidth: 680 }}
            >
                <Form.Item name="productCategoryId" label="商品分类：" rules={[{ required: true }]}>
                    <Input value={infoForm.productCategoryId} />
                </Form.Item>
            </Form>
        </div>
    );
}

export default ProductInfo;
