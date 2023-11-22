import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import ResourceDrawer from './components/resource-drawer/index';
import { resourceList, resourceDelete } from './server';
import { standardPageModel } from './configs';
import { DataType } from './types';


function AssetsAuthority() {
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function, tableData: unknown[] }>();
	const resourceDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const [resourceData, setResourceData] = useState<null | DataType>(null)

	const handleResource = () => {}
	const add = () => {
		setResourceData(null)
		resourceDrawerRef.current?.isOpen();
	}
	const handleEdit = (record: DataType) => {
		setResourceData({
			categoryId: record.categoryId,
			createTime: record.createTime,
			description: record.description,
			id: record.id,
			name: record.name,
			url: record.url
		})
		resourceDrawerRef.current?.isOpen();
	}
	const handleDelete = async (id: number) => {
		try {
			await resourceDelete(id);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	
	const { rows, options } = standardPageModel({ handleEdit,  handleDelete });
	const tableLeftButton = ()  => {
		return <>
			<Button onClick={() => handleResource()}>资源分类</Button>
			<Button onClick={() => add()}>添加</Button>
		</>
	}
	const returnReasonList = () => {
		standardPageRef.current?.select();
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
			<ResourceDrawer 
				ref={resourceDrawerRef}
				resourceData={resourceData} 
				options={options}
				getList={returnReasonList}
			/>
		</div>
	);
}

export default AssetsAuthority;
