import React, { useState, useEffect, useRef, useImperativeHandle, Ref, forwardRef } from 'react';
import { Form } from 'antd';
import TheDrawer from '@/common/components/the-drawer';
import LiveForm from '@/common/components/live-form';
import { getProductAttribute } from './server';
import { info, formItemFn } from './configs';
import { DataType } from './types';

function ProductInfo(props: PropsType, ref: Ref<unknown>) {
	let { id } = props;
	const { formConfig } = formItemFn();
	const [form] = Form.useForm();
	const [dataInfo, setDataInfo] = useState<DataType>(info);
	const isInitialRender = useRef(true); // 用于标记是否是首次渲染
	const [openDrawer, setOpenDrawer] = useState(false);
	const detailedInformationRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
	const onSubmit = () => {}
	const productAttribute = async (id: number) => {
		try {
			// 商品分类
			const res = await getProductAttribute(id);
			const data = Object.assign(info, res.data)
			setDataInfo({
				...data
			})
		} catch(err) {}
	}
	useEffect(() => {
		if(isInitialRender.current) {
			isInitialRender.current = false;
			return;
		}
		if(id) {
			productAttribute(id);
		}
		return () => {
			id = null
		}

	}, [id])
	useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
	return (
		<div>
			<TheDrawer
				title="商品属性详情"
				open={openDrawer}
				onOpenClose={(value) => setOpenDrawer(value)}
				onSave={() => onSubmit()}
			>
				<LiveForm
					ref={detailedInformationRef}
					config={formConfig}
					dataInfo={dataInfo}
					inlineOperate={<></>}
				/>
			</TheDrawer>
		</div>
	);
}

interface PropsType {
	id: number | null;
}

export default forwardRef(ProductInfo);
