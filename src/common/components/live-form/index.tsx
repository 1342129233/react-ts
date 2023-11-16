import React, { useEffect, useImperativeHandle, Ref, useRef, forwardRef, useState } from 'react';
import { Steps, Button, Checkbox, Form, Input, Cascader, Select, Switch, Row, Col, Radio, Upload, DatePicker } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import styles from './css/index.module.less';

const { TextArea } = Input;

interface OptionsType {
	value: number;
	label: string;
}

function LiveForm(props: any, ref: Ref<unknown>) {
	const { inlineOperate = false } = props;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	useImperativeHandle(ref, () => {
        return {
			getFormValue: () => {
				const values = form.getFieldsValue()
				return values
			},
        }
    });
	const infoValue = (key: string, value: any) => {
		props.dataInfo[key] = value
		form.setFieldsValue({
			...props.dataInfo
		})
	}
	function itemsHtml(item: any): JSX.Element {
		if(item?.component) {
			return item.component(props.dataInfo, infoValue);
		}
		if(item?.render) {
			item.value = props.dataInfo[item.name];
			return item.render(item);
		}
		if(item.tag === 'input') {
			return <Input allowClear />
		}
		if(item.tag === 'textArea') {
			return <TextArea rows={4} style={{ whiteSpace: 'pre-line'}} />
		}
		if(item.tag === 'switch') {
			const switchChange = (value: boolean) => {
				item.value = value ? 1 : 0;
			}
			return <Switch checked={ item.value === 1 ? true : false } onChange={switchChange} />
		}
		if(item.tag === 'checkbox') {
			const options = item.search?.options || [];
			return <Checkbox.Group options={options} />
		}
		if(item.tag === 'select') {
			const selectOptions = item.search?.options || [];
			return (
				<Select
					allowClear
					options={selectOptions} 
					placeholder={item.placeholder}
					style={{
						width: 200
					}}
				/>
			)
		}
		if(item.tag === 'cascader') {
			const selectOptions = item.search?.options || [];
			useEffect(() => {
				const value = form ? form.getFieldsValue()[item.name] : 0;

				const findCascaderValue = (id: number, menuList: any) => {
					for (let i = 0; i < menuList.length; i++) {
						const menu = menuList[i];
						if (menu.value === id) {
							return [menu.value];
						} else if (menu.children) {
							const childPath: any = findCascaderValue(id, menu.children);
							if (childPath) {
								return [menu.value, ...childPath];
							}
						}
					}
					return null;
				}

				const cascaderValue = findCascaderValue(value, selectOptions);
				form.setFieldsValue({
					[item.name]: cascaderValue
				})
			}, [selectOptions]);
			const filter = (inputValue: string, path: any[]) =>
				path.some(
					(option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
				);

			return (
				<Cascader
					allowClear
					multiple={false}
					options={selectOptions} 
					placeholder={item.placeholder}
					showSearch={{ filter }}
					style={{
						width: 200
					}}
				/>
			)
		}
		if(item.tag === 'radio') {
			const selectOptions = item.search?.options || [];
			return <Radio.Group>
				{
					selectOptions.map((item: OptionsType) => (
						<Radio value={item.value} key={item.value}>{item.label}</Radio>
					))
				}
			</Radio.Group>
		}
		if(item.tag === 'datePicker') {
			return <DatePicker format="YYYY-MM-DD HH:mm:ss" />
		}
		return <></>
	}
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	const onReset = () => {
		form.resetFields();
	};
	// 设置组件的默认值
	let [defaultValue, setDefaultValue] = useState({});
	useEffect(() => {
		if(props.dataInfo) {
			form.setFieldsValue({
				...props.dataInfo
			})
		} else {
			const list: Record<string, unknown> = {}
			props.config.forEach((item: any) => {
				list[item.name] = item.value;
			});
			form.setFieldsValue({
				...list
			})
		}
	}, [props.dataInfo])
	  
	return (
		<div>
			<Form
				ref={formRef}
				form={form}
				labelCol={{ span: 6 }}
				initialValues={defaultValue}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 800 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				{
					props.config.map((items: any) => {
						return (
							<Form.Item
								label={items.label}
								name={items.name}
								key={items.name}
								rules={items.rules}
								getValueFromEvent={ items.getValueFromEvent }
								getValueProps={ items.getValueProps }
								{ ...items?.child }
							>
								{ itemsHtml(items) }
							</Form.Item>
						)
					})
				}
				{/* <Row>
					<Col span={6}></Col>
					<Col span={18}>{ props?.children }</Col>
				</Row> */}
				{ props?.children }
				<Form.Item wrapperCol={{ offset: 8, span: 16 }} className={styles.footer}>
					{
						inlineOperate
						? 
						inlineOperate
						:
						<>
							<Button type="primary" htmlType="submit" className={styles.button}>
								确认
							</Button>
							<Button className={styles.button} onClick={onReset}>
								取消
							</Button>
						</>
					}
				</Form.Item>
			</Form>
		</div>
	);
}

interface Props {
	config: any,
	inlineOperate?: any,
	dataInfo?: any,
	children?: any
}

export default forwardRef<HTMLDivElement, Props>(LiveForm);
