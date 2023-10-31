import React, { useEffect, useState, useImperativeHandle, Ref, forwardRef, useRef } from 'react';
import { message, Button } from 'antd';
import TheDrawer from '@/common/components/the-drawer/index';
import LiveForm from '@/common/components/live-form/index';
import { useDidUpdateEffect } from '@/common/hooks/useDidUpdateEffect';
import { getBrandListId, updateBrandList, createBrandList } from './server';
import { PropsType, DataType } from './type';
import { info, formItemFn } from './configs';

function BrandForm(props: PropsType, ref: Ref<unknown>) {
	const { id } = props;
	const { config } = formItemFn();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [form, setForm] = useState<DataType>({...info});
	const LiveFormRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
	useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
	const onSubmit = async () => {
		const params = LiveFormRef.current?.getFormValue();
		try {
			params.id ? await updateBrandList(id, params) : await createBrandList(params);
		} catch(error: any) {
			message.error(error?.message || '删除失败')
		}
	};
	const getBrand = async () => {
		try {
			const res = await getBrandListId(id);
			const newFormInfo = Object.assign({...info}, res.data);
			setForm({
				...newFormInfo
			});
		} catch(error: any) {
			message.error(error?.message || '删除失败')
		}
	}
	useDidUpdateEffect(() =>
		id !== 0 ? getBrand() : setForm({...info})
	, [id])
	return (
		<TheDrawer
			title="商品品牌"
			open={openDrawer}
			onOpenClose={(value) => setOpenDrawer(value)}
			onSave={() => onSubmit()}
		>
			<LiveForm
				ref={LiveFormRef}
				config={config}
				dataInfo={form}
				inlineOperate={<></>}
			/>
		</TheDrawer>
	);
}

export default forwardRef<HTMLDivElement, PropsType>(BrandForm);
