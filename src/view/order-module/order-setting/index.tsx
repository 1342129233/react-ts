import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Space, message, Row, Col } from 'antd';
import { getOrderSetting, orderSettingFinish } from './server';
import { FormInfo } from './configs';

function OrderSetting() {
	const [form] = Form.useForm();
	// 成功
	const onFinish = async (values: any) => {
		const params = form.getFieldsValue();
		try {
			await orderSettingFinish(params);
			await orderSettingList();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	};
	
	// 失败
	const onFinishFailed = (error: any) => {
		message.error(error?.message || '请求失败')
	};
	const orderSettingList = async () => {
		try {
			const res = await getOrderSetting();
			const info = res.data;
			form.setFieldsValue({
				...info
			})
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	useEffect(() => {
		orderSettingList();
	}, [])
	return (
		<div>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 800 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item label="秒杀订单超过:">
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item name="flashOrderOvertime" noStyle>
								<Input addonAfter="分" />
							</Form.Item>
						</Col>
						<Col span={12}>未付款，订单自动关闭</Col>
					</Row>
				</Form.Item>
				<Form.Item label="正常订单超过:">
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item name="normalOrderOvertime" noStyle>
								<Input addonAfter="分" />
							</Form.Item>
						</Col>
						<Col span={12}>未付款，订单自动关闭</Col>
					</Row>
				</Form.Item>
				<Form.Item label="发货超过:">
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item name="confirmOvertime" noStyle>
								<Input addonAfter="天" />
							</Form.Item>
						</Col>
						<Col span={12}>未收货，订单自动完成</Col>
					</Row>
				</Form.Item>
				<Form.Item label="订单完成超过:">
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item name="finishOvertime" noStyle>
								<Input addonAfter="天" />
							</Form.Item>
						</Col>
						<Col span={12}>自动结束交易，不能申请售后</Col>
					</Row>
				</Form.Item>
				<Form.Item label="订单完成超过:">
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item name="commentOvertime" noStyle>
								<Input addonAfter="天" />
							</Form.Item>
						</Col>
						<Col span={12}>自动五星好评</Col>
					</Row>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default OrderSetting;
