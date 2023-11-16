import React, { useState, useRef } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import ActivityDrawer from './components/activity-drawer/index';
import { flashList, flashDelete, flashUpdateStatus } from './server';
import { standardPageModel } from './configs';
import { UpdateStatusType, DataType } from './types';
import { info } from './components/activity-drawer/configs';
import { FormData } from './components/activity-drawer/types';

function SecondKill() {
	const activityDrawer = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();
	const [data, setData] = useState<FormData>(info);
	const tableLeftButton = ()  => {
		return <>
			<Button>秒杀时间短列表</Button>
			<Button onClick={() => createActive()}>添加活动</Button>
		</>
	}
	const createActive = () => {
		const value = {
			createTime: '',
			endDate: '',
			id: 0,
			startDate: '',
			status: 0,
			title: '',
		}
		setData({...value})
		activityDrawer.current?.isOpen()
	}
	// 上下线
	const updateStatus = async (value: UpdateStatusType) => {
		try {
			await flashUpdateStatus(value);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}

	// 设置商品
	const handleProduct = (params: DataType) => {}
	// 编辑
	const handleEdit = async (params: DataType) => {
		const value = {
			createTime: params.createTime,
			endDate: params.endDate,
			id: params.id,
			startDate: params.startDate,
			status: params.status,
			title: params.title
		}
		setData({...value})
		activityDrawer.current?.isOpen()
	}
	// 删除
	const handleDelete = async (params: DataType) => {
		try {
			await flashDelete(params.id);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	
	const returnReasonList = () => {
		standardPageRef.current?.select();
	}
	
	const { rows } = standardPageModel({ updateStatus, handleProduct, handleEdit, handleDelete });
	return (
		<div>
			<StandardPage
				ref={standardPageRef}
				config={{
					rows: rows,
					fetchConfig: flashList
				}}
				tableLeftButton={tableLeftButton()}
			></StandardPage>
			<ActivityDrawer
				ref={activityDrawer}
				data={data}
				getList={returnReasonList}
			/>
		</div>
	);
}

export default SecondKill;
