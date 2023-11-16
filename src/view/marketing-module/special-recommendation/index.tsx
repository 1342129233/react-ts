import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import SortDrawer from './components/sort-drawer/index';
import SpecialSubjectDrawer from './components/special-subject-drawer/index';
import { fetchConfig, updateRecommendStatus, recommendSubjecDelete } from './server';
import { standardPageModel } from './configs';
import { UpdateStatusType, DataType } from './types';
import { recommendStatusEnum } from '@/common/public-type';
import { isArray } from 'lodash';

function SpecialRecommendation() {
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();
	const sortDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const specialSubjectDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const [form, setForm] = useState({
		id: 0,
		sort: 0
	});
	// 更新推荐
	const updateStatus = (value: UpdateStatusType) => {
		updateStatusRequest({
			ids: value.ids as number,
			recommendStatus: value.recommendStatus
		});
	}
	// 设置排序
	const handleSort = (record: DataType) => {
		setForm({
			id: record.id,
			sort: record.sort
		})
		sortDrawerRef.current?.isOpen()
	}
	// 删除
	const handleDelete = async (id: number) => {
		let list = [];
		if(isArray(id)) {
			list = id
		} else {
			list = [id]
		}
		const value = list.toString();
		try {
			await recommendSubjecDelete(value);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}

	const updateStatusRequest = async (params: { ids: number | number[], recommendStatus: number }) => {
		let list = [];
		if(isArray(params.ids)) {
			list = params.ids
		} else {
			list = [params.ids]
		}
		const value = list.toString();
		try {
			await updateRecommendStatus({ids: value, recommendStatus: params.recommendStatus});
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}

	const updateStatusList = (status: number) => {
		const idList = standardPageRef.current?.tableSelectedRowKeys() || [];
        if(idList.length === 0) {
			message.error('请先选中目标！');
			return;
		}
		updateStatusRequest({ ids: idList, recommendStatus: status})
	}

	// 批量删除
    const delList = () => {
        const idList = standardPageRef.current?.tableSelectedRowKeys() || [];
        if(idList.length === 0) {
			message.error('请先选中目标！');
			return;
		}
        handleDelete(idList)
    }
	const returnReasonList = () => {
		standardPageRef.current?.select();
	}
	const specialSubject = () => {
		specialSubjectDrawerRef.current?.isOpen()
	}

	const { rows } = standardPageModel({ updateStatus, handleSort, handleDelete });
	const tableLeftButton = ()  => {
		return <>
			<Button onClick={() => updateStatusList(recommendStatusEnum.VERIFY)}>设为推荐</Button>
			<Button onClick={() => updateStatusList(recommendStatusEnum.CANCEL)}>取消推荐</Button>
			<Button onClick={() => delList()} danger>批量删除</Button>
			<Button onClick={() => specialSubject()} >选择专题</Button>
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
			></StandardPage>
			<SortDrawer
				ref={sortDrawerRef}
				form={form}
				getList={returnReasonList}
			></SortDrawer>
			<SpecialSubjectDrawer ref={specialSubjectDrawerRef} getList={returnReasonList}></SpecialSubjectDrawer>
		</div>
	);
}

export default SpecialRecommendation;
