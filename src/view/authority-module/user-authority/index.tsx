import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import UserDrawer from './components/user-drawer/index';
import AdministratorDrawer from './components/administrator-drawer/index';
import { fetchConfig, adminUserDelete, adminUpdateStatus } from './server';
import { standardPageModel } from './configs';
import { DataType, updateStatus } from './types';


function UserAuthority() {
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function, tableData: unknown[] }>();
	const userDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const administratorDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const [data, setData] = useState<null | DataType>(null)
	const [administratorId, setAdministratorId] = useState<null | number>(null)
	const add = () => {
		setData(null);
		userDrawerRef.current?.isOpen();
	}
	const handleUser = (record: DataType) => {
		setAdministratorId(record.id!)
		administratorDrawerRef.current?.isOpen();
	}
	const handleEdit = (record: DataType) => {
		setData({
			createTime: record.createTime,
			email: record.email,
			icon: record.icon,
			id: record.id,
			loginTime: record.loginTime,
			nickName: record.nickName,
			note: record.note,
			password: record.password,
			status: record.status,
			username: record.username
		})
		userDrawerRef.current?.isOpen();
	}
	const handleDelete = async (id: number) => {
		try {
			await adminUserDelete(id);
			standardPageRef.current?.select()
		} catch(error: any) {
			message.error(error.message || '请求失败')
		}
	}
	const updateStatus = async (params: updateStatus ) => {
		try {
			await adminUpdateStatus(params);
			standardPageRef.current?.select()
		} catch(error: any) {
			message.error(error.message || '请求失败')
		}
	}
	const { rows } = standardPageModel({ handleUser, handleEdit, handleDelete, updateStatus });
	const returnReasonList = () => {
		standardPageRef.current?.select();
	}
	return (
		<>
			<StandardPage
                ref={standardPageRef}
                config={{
                    rows: rows,
                    fetchConfig: fetchConfig
                }}
                isLiveSearchRequest={false}
                paginationConfig={false}
                isRowSelection={false}
                tableLeftButton={<Button onClick={() => add()}>
					新增
				</Button>}
            ></StandardPage>
			<UserDrawer ref={userDrawerRef} userData={data} getList={returnReasonList} />
			<AdministratorDrawer ref={administratorDrawerRef} id={administratorId} getList={returnReasonList} />
		</>
	);
}

export default UserAuthority;
