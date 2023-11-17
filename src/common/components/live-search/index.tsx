import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle, Ref } from 'react';
import { Button, Form, Input, Select, DatePicker, Row, Col, Table, Cascader } from 'antd';
import type { FormInstance } from 'antd/es/form';
import moment from 'moment';
import PropTypes from 'prop-types';
import { EffectJsonFormConfig, JsonDatePickerConfig } from './types/index';

const LiveSearch = (props: Props, ref: Ref<unknown>) => {
	const { formName } = props;
	const [form] = Form.useForm();
	const formRef = React.useRef<FormInstance>(null);
	const [isPreAdd, setIsPreAdd] = useState(false);

	useImperativeHandle(ref, () => {
        return {
			getFormValue: () => {
				const values = form.getFieldsValue()
				return values
			},
        }
    });

	useEffect(() => {
		setIsPreAdd(props.isPreAdd === false ? false : true)
	}, []);

	const onFinish = (values?: Record<string, unknown>) => {
		if(props.onUpdateSearch) {
			props.onUpdateSearch(values)
		}
	};
	const onReset = () => {
		form.resetFields();
		onFinish()
	}
	const onPreAdd = () => {
		if(props.onPreAdd) {
			props.onPreAdd();
		}
	}
  
	const formHtml = (item: EffectJsonFormConfig) => {
		if(item?.search?.type === 'input') {
			return <Input placeholder={item.placeholder} />
		}
		if(item?.search?.type === 'select') {
			const selectOptions = item.search?.options || [];
			return (
				<Select options={selectOptions} placeholder={item.placeholder} />
			)
		}
		if(item?.search?.type === 'cascader') {
			const selectOptions = item.search?.options || [];
			return (
				<Cascader options={selectOptions} placeholder={item.placeholder} />
			)
		}
		if(item?.search?.type === 'datePicker') {
			return (
				<DatePicker 
					showTime
					format="YYYY-MM-DD HH:mm:ss"
				/>
			)
		}
	}
	return (
		<div>
			<Form form={form} name={formName} onFinish={onFinish} ref={formRef}>
				<Row gutter={2}>
					{
						props.config.map((item: EffectJsonFormConfig) => {
							{
								return item.search ? 
									<Col className="gutter-row" sm={24} md={12} lg={8} xl={4} key={item.key}>
										<Form.Item
											name={item.key} 
											label={item.label}
											key={item.key}
											initialValue={item.value}
											getValueFromEvent={(item as JsonDatePickerConfig).getValueFromEvent || undefined }
											getValueProps={(item as JsonDatePickerConfig).getValueProps || undefined }
										>
											{ formHtml(item) }
										</Form.Item>
									</Col>
									:
									null
							}
						})
					}
					<Col className="gutter-row" sm={24} md={12} lg={8} xl={6}>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								搜 索
							</Button>
							<Button
								className="mgl10"
								htmlType="button" 
								onClick={onReset}
							>
								重 置
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			{
				isPreAdd ? 
				<Button
					className="mgt10"
					htmlType="button" 
					onClick={onPreAdd}
				>
					创 建
				</Button>
				: null
			}
			
		</div>
	);
}

interface Props {
	config: Array<EffectJsonFormConfig>,
	onUpdateSearch: (value?: Record<string, unknown>) => void,
	onPreAdd?: () => void
	isPreAdd?: boolean
	formName: string
}

export default forwardRef<HTMLDivElement, Props>(LiveSearch);
