import React, { useState, useEffect, memo, forwardRef, useImperativeHandle, Ref, useRef, Fragment } from 'react';
import { Form, Input, Select, Radio, Button, Cascader, message, Upload, Avatar } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TheDrawer from '@/common/components/the-drawer';
import { productList } from '../../server';
import { formInfo, REVEAL_MAP } from './configs';
import { FormType, OptionsType, FormListFieldDataType, ProductAttributeOptions } from './types';
import { DataType } from '../../types';
import { convertMap, serverToOption, findCascaderValue, traverse } from '@/common/utils';
import type { OptionMapType } from '@/common/utils';
import { getProductCategoryManage, getProductAttributeManage } from './server';
import styles from './style/index.module.less';

const { Option } = Select;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

// 上传图片之前
const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/png';
	if (!isJpgOrPng) {
	  message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 10;
	if (!isLt2M) {
	  message.error('Image must smaller than 10MB!');
	}
	return isJpgOrPng && isLt2M;
};

function ProductCate(props: Props, ref: Ref<unknown>) {
	let { id } = props;
	const [loading, setLoading] = useState(false);
	const isInitialRender = useRef(true); // 用于标记是否是首次渲染
	const [openDrawer, setOpenDrawer] = useState(false);
	const [productCategoryOption, setroductCategoryOption] = useState<OptionsType[]>([]);
	const [productProductAttributeOption, setProductProductAttributeOption] = useState<OptionsType[]>([]);
	const productRef = useRef<OptionMapType[]>([]);
	const [form] = Form.useForm();
	
	useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
	// 上传事件
	const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === 'uploading') {
		  setLoading(true);
		  return;
		}
		if (info.file.status === 'done') {
		  // Get this url from response in real world.
		  getBase64(info.file.originFileObj as RcFile, (url) => {
			setLoading(false);
			// 图片地址
			form.setFieldsValue({
				icon: "https://game-channel-admin-test.staging.kuaishou.c…game-admin-main/gamechanneladminlogo.abbaea65.png"
			})
		  });
		}
	};
	const normFile = (e: any) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};
	const onSubmit = () => {
		const formValue = form.getFieldsValue();
		const productItem: number[] = [];
		formValue.productAttributeIdList.forEach((item: { value: number[] }) => {
			if(item.value.length > 0) {
				const len = item.value.length - 1;
				productItem.push(item.value[len]);
			}
		});
		formValue.productAttributeIdList = productItem;
		console.log('提交', formValue);
	}
	const addProductAttributeId = () => {
		const list = form.getFieldsValue();
		const productAttributeIdList = list.productAttributeIdList;
		if(productAttributeIdList.length === 3) {
			message.warning('长度不可大于三个', 2)
			return;
		}
		const newProductAttributeIdList = [
			...productAttributeIdList,
			{
				value: 0
			}
		]
		form.setFieldsValue({
			productAttributeIdList: [
				...newProductAttributeIdList
			]
		})
	}
	const delProductAttributeId = (index: number) => {
		const list = form.getFieldsValue();
		const productAttributeIdList = list.productAttributeIdList;
		productAttributeIdList.splice(index, 1)
		form.setFieldsValue({
			productAttributeIdList: [
				...productAttributeIdList
			]
		})
	}
	const getProductCategoryList = async () => {
		try {
			// 商品分类
			const res = await productList(1, 100);
			const productOptionList = res.data.list.map((item: DataType) => ({
				value: item.id,
				label: item.name
			}))
			productOptionList.unshift({
				value: 0,
				label: "无上级分类"
			})
			setroductCategoryOption([
				...productOptionList
			])
			// 筛选属性
			const productAttributeRes = await getProductAttributeManage();
			const productAttributeOptionList = serverToOption(productAttributeRes.data, { value: 'id', label: 'name', children: 'productAttributeList' });
			setProductProductAttributeOption([
				...productAttributeOptionList
			])
			productRef.current = productAttributeOptionList;
		} catch(err) {}
	}
	const getProductManage = async (id: number) => {
		try {
			const res = await getProductCategoryManage(id);
			const productAttributeIdList: number[] = res.data.productAttributeIdList as number[];
			let list: { value: number[] | string[] }[] = [];
			if(productAttributeIdList && productAttributeIdList.length > 0) {
				productAttributeIdList.forEach((item: number | string) => {
					const value = findCascaderValue(+item, productRef.current) || [];
					console.log(value);
					list.push({
						value
					})
				});
			} else {
				list = [{value: []}]
			}
			form.setFieldsValue({
				...formInfo,
				...res.data,
				productAttributeIdList: [...list]
			});
		} catch(err) {}
	}
	const request = async(id: number | null) => {
		await getProductCategoryList();
		if(id) {
			await getProductManage(id)
		} else {
			form.setFieldsValue({...formInfo});
		}
	}
	useEffect(() => {
		if(isInitialRender.current) {
			isInitialRender.current = false;
			return;
		}
		request(id);
		return () => {
			id = null
		}
		
	}, [id])
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);	
	return (
		<>
			<TheDrawer
				title="商品"
				open={openDrawer}
				onOpenClose={(value) => setOpenDrawer(value)}
				onSave={() => onSubmit()}
			>
				<Form
					form={form}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					autoComplete="off"
				>
					<Form.Item
						label="分类名称:"
						name="name"
						rules={[{ required: true, message: '请输入分类名称!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="上级分类:"
						name="parentId"
					>
						<Select
							placeholder="请选择上级分类"
							allowClear
						>
							{
								productCategoryOption.map((item: OptionsType) => (
									<Option value={item.value} key={item.value}>{item.label}</Option>
								))
							}
						</Select>
					</Form.Item>
					<Form.Item
						label="数量单位:"
						name="productUnit"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="排序:"
						name="sort"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="是否显示:"
						name="showStatus"
					>
						<Radio.Group>
							{
								convertMap(REVEAL_MAP).map((item: OptionMapType) => (
									<Radio value={item.value} key={item.value}>{item.label}</Radio>
								))
							}
						</Radio.Group>
					</Form.Item>
					<Form.Item
						label="是否显示在导航栏:"
						name="navStatus"
					>
						<Radio.Group>
							{
								convertMap(REVEAL_MAP).map((item: OptionMapType) => (
									<Radio value={item.value} key={item.value}>{item.label}</Radio>
								))
							}
						</Radio.Group>
					</Form.Item>
					<Form.Item
						label="分类图标:"
						name="icon"
						valuePropName="fileList"
						getValueFromEvent={normFile}
					>
						<Upload
							name="file"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action=""
							beforeUpload={beforeUpload}
							onChange={handleChange}
						>
							{ uploadButton }
						</Upload>
					</Form.Item>
					<Form.Item
						label="筛选属性:"
					>
						<Form.List
							name="productAttributeIdList"
						>
							{(fields, { add, remove }) => {
								let items = form.getFieldValue('productAttributeIdList');
								return fields.map((field: FormListFieldDataType, index: number) => {
									return (
										<div key={ index } className={styles.cascaderItem}>
											<Form.Item
												name={[field.name, 'value']}
												className={styles.cascaderWidth}
											>
												<Cascader 
													options={productProductAttributeOption} 
													placeholder="请选择" 
													
												/>
											</Form.Item>
											{
												index !== 0 
												? 
												<Button className={styles.cascaderButton} onClick={() => delProductAttributeId(index)}>删除</Button>
												: 
												<div className={styles.cascaderButton}></div>
											}
										</div>
									)
								})
							}}
						</Form.List>
						<Button type="primary" onClick={addProductAttributeId}>新增</Button>
					</Form.Item>
					<Form.Item
						label="关键词:"
						name="keywords"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="分类描述:"
						name="description"
					>
						<Input />
					</Form.Item>
				</Form>
			</TheDrawer>
		</>
	);
}

interface Props {
	id: number | null
}

export default forwardRef<HTMLDivElement, Props>(ProductCate);
