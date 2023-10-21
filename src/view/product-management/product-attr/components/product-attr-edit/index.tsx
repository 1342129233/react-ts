import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { updateProductAttrList, createProductAttrList } from '../../server';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

function ProductAttrEdit(props: Props) {
	const { open = false, handleOpenEmit, cur = {}, id = 0 } = props;
	const [form] = Form.useForm();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const timeoutRef = useRef<any>();

	const onFinish = async () => {
		const formValue = form.getFieldsValue();
		console.log('submit', formValue);
		try {
			id === 0 ?  await createProductAttrList(formValue) : await updateProductAttrList(id, formValue);
		} catch(error) {
			console.log('error', error);
		}
	}
	const handleOk = () => {
		setConfirmLoading(true);
		timeoutRef.current = window.setTimeout(() => {
			timeoutRef.current = null;
			onFinish();
			handleOpenEmit(false);
			setConfirmLoading(false);
		}, 2000);
	};
	const handleCancel = () => {
		handleOpenEmit(false);
	};
	const formFields = () => {
		const formCurrent = {
			name: '',
			...cur
		}
		form.setFieldsValue(formCurrent)
	}
	useEffect(() => {
		formFields();
	}, [cur])
	useEffect(() => {
		return () => window.clearTimeout(timeoutRef.current);
	}, []);
	return (
		<div>
			<Modal
				title={id === 0 ? '添加类型' : '编辑类型'}
				forceRender
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<Form
					{...layout}
					form={form}
				>
					<Form.Item name="name" label="类型名称" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

interface Props {
	open: boolean;
	handleOpenEmit: (value: boolean) => void;
	cur: Record<string, any>;
	id: number
}

export default ProductAttrEdit;
