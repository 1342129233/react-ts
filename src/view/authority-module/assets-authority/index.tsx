import React, { useRef } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import { resourceList, resourceDelete } from './server';
import { standardPageModel } from './configs';
import { DataType } from './types';

function AssetsAuthority() {
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function, tableData: unknown[] }>();
	
	const handleResource = () => {}
	const add = () => {}
	const handleEdit = (record: DataType) => {}
	const handleDelete = async (id: number) => {
		try {
			await resourceDelete(id);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	
	const { rows } = standardPageModel({ handleEdit,  handleDelete });
	const tableLeftButton = ()  => {
		return <>
			<Button onClick={() => handleResource()}>资源分类</Button>
			<Button onClick={() => add()}>添加</Button>
		</>
	}
	return (
		<div>
			<StandardPage
				ref={standardPageRef}
				config={{
					rows: rows,
					fetchConfig: resourceList
				}}
				tableLeftButton={tableLeftButton()}
			></StandardPage>
		</div>
	);
}

export default AssetsAuthority;
