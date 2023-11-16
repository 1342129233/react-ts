import React, { useState, useRef } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import AdvertiseDrawer from './components/advertise-drawer/index';
import { advertiseList, advertiseUpdateStatus, advertiseDelete } from './server';
import { standardPageModel } from './configs';
import { DataType, UpdateStatusType } from './types';
import { info } from './components/advertise-drawer/configs';
import { FormData } from './components/advertise-drawer/types';
import { isArray } from 'lodash';

function AdvertisingList() {
	const activityDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();
	const [id, setId] = useState<null | number>(null);
	const tableLeftButton = ()  => {
		return <>
			<Button type="primary" danger onClick={() => handleDeleteList()}>批量删除</Button>
			<Button onClick={() => add()}>添加广告</Button>
		</>
	}
	const add = () => {
		setId(null)
		activityDrawerRef.current?.isOpen()
	}
	// 上下线
	const updateStatus = async (value: UpdateStatusType) => {
		try {
			await advertiseUpdateStatus(value);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}

	// 设置商品
	const handleProduct = (params: DataType) => {}
	// 编辑
	const handleEdit = async (params: DataType) => {
		setId(params.id);
		activityDrawerRef.current?.isOpen()
	}
	// 删除
	const handleDelete = async (id: React.Key | React.Key[]) => {
		let list = [];
		if(isArray(id)) {
			list = id
		} else {
			list = [id]
		}
		const value = list.toString();
		try {
			await advertiseDelete(value);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	
	const returnReasonList = () => {
		standardPageRef.current?.select();
	}

	const handleDeleteList = () => {
		const idList = standardPageRef.current?.tableSelectedRowKeys() || [];
        if(idList.length === 0) {
			message.error('请先选中目标！');
			return;
		}
        handleDelete(idList)
	}
	
	const { rows } = standardPageModel({ updateStatus, handleDelete, handleEdit });
	return (
		<div>
			<StandardPage
				ref={standardPageRef}
				config={{
					rows: rows,
					fetchConfig: advertiseList
				}}
				tableLeftButton={tableLeftButton()}
			></StandardPage>
			<AdvertiseDrawer
				ref={activityDrawerRef}
				id={id}
				getList={returnReasonList}
			/>
		</div>
	);
}

export default AdvertisingList;

