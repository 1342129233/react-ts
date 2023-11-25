import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import EditDrawer from './components/edit-drawer/index';
import AllocMenuDrawer from './components/alloc-menu-drawer/index';
import AllocResourceDrawer from './components/alloc-resource-drawer/index';
import { roleList, roleDelete, roleUpdateStatus } from './server';
import { standardPageModel } from './configs';
import { DataType, UpdateStatus } from './types';

function CharactersAuthority() {
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function, tableData: unknown[] }>();
	const editDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const allocMenuDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const allocResourceDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const [data, setData] = useState<null | DataType>(null)
	const [menuId, setMenuId] = useState<null | number>(null)

	// 分配菜单
	const handleMenu = (record: DataType) => {
		setMenuId(record.id!)
		allocMenuDrawerRef.current?.isOpen();
	}
	// 分配资源
	const updateResource = (record: DataType) => {
		setMenuId(record.id!)
		allocResourceDrawerRef.current?.isOpen();
	}
	// 编辑
	const handleEdit = (record: DataType) => {
		setData({
			adminCount: record.adminCount,
			createTime: record.createTime,
			description: record.description,
			id: record.id,
			name: record.name,
			sort: record.sort,
			status: record.status,
		});
		editDrawerRef.current?.isOpen();
	}
	// 删除
	const handleDelete = async (id: number) => {
		try {
			await roleDelete(id);
			standardPageRef.current?.select()
		} catch(error: any) {
			message.error(error.message || '请求失败')
		}
	}
	// 是否启用
	const updateStatus = async (record: UpdateStatus) => {
		try {
			await roleUpdateStatus(record);
			standardPageRef.current?.select()
		} catch(error: any) {
			message.error(error.message || '请求失败')
		}
	}
	// 新增
	const add = () => {
		setData(null);
		editDrawerRef.current?.isOpen();
	}
	const { rows } = standardPageModel({ handleMenu, handleEdit, handleDelete, updateStatus, updateResource });
	const returnReasonList = () => {
		standardPageRef.current?.select();
	}
	return (
		<>
			<StandardPage
                ref={standardPageRef}
                config={{
                    rows: rows,
                    fetchConfig: roleList
                }}
                isLiveSearchRequest={false}
                paginationConfig={false}
                isRowSelection={false}
                tableLeftButton={<Button onClick={() => add()}>
					新增
				</Button>}
            ></StandardPage>
			<EditDrawer ref={editDrawerRef} userData={data} getList={returnReasonList} />
			<AllocMenuDrawer ref={allocMenuDrawerRef} id={menuId} />
			<AllocResourceDrawer ref={allocResourceDrawerRef} id={menuId} />
		</>
	);
}

export default CharactersAuthority;
