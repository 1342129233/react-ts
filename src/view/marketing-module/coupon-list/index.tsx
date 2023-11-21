import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import FormDrawer from './components/form-drawer/index';
import CouponHistoryDrawer from './components/coupon-history/index';
import { fetchConfig, couponDelete } from './server';
import { standardPageModel } from './configs';
import { UpdateStatusType, DataType } from './types';
import { isArray } from 'lodash';

function CouponList() {
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();
	const formDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const couponHistoryDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const [formId, setFormId] = useState(0);
	// 删除
	const handleDelete = async (id: number) => {
		try {
			await couponDelete(id);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}

	// 查看详情
	const lookDetails = (redord: DataType) => {
		setFormId(redord.id)
		couponHistoryDrawerRef.current?.isOpen();
	}
	// 编辑
	const handleEdit = (redord: DataType) => {
		setFormId(redord.id)
		formDrawerRef.current?.isOpen()
	}
	// 请求
	const returnReasonList = () => {
		standardPageRef.current?.select();
	}
	const add = () => {
		setFormId(0)
		formDrawerRef.current?.isOpen()
	}

	const { rows } = standardPageModel({ lookDetails, handleEdit, handleDelete });
	const tableLeftButton = ()  => {
		return <>
			<Button onClick={() => add()}>添加</Button>
		</>
	}
	return (
		<div>
			<StandardPage
				ref={standardPageRef}
				config={{
					rows: rows,
					fetchConfig: fetchConfig
				}}
				tableLeftButton={tableLeftButton()}
				formName="StandardPage1"
			></StandardPage>
			<FormDrawer
				ref={formDrawerRef}
				id={formId}
				getList={returnReasonList}
			></FormDrawer>
			<CouponHistoryDrawer 
				ref={couponHistoryDrawerRef}
				id={formId}
			/>
		</div>
	);
}

export default CouponList;



