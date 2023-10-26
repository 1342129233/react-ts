import React, { useState, useRef } from 'react';
import { message, Button } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import BrandList from './components/brand-list/index';
import { getBrandListDelete } from './server';
import { Search } from './configs';
import { DataType } from './type';

function Brand() {
	const [id, setId] = useState(0);
	const brandListtRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const handleEdit = (_: DataType) => {
		setId(_.id)
		brandListtRef.current?.isOpen();
    }
    const handleDelete = async(_: DataType) => {
		try {
			await getBrandListDelete(_.id);
			// 从新请求
			standardPageRef.current?.select()
		} catch(error: any) {
			message.error(error?.message || '删除失败')
		}
    }
	const { config } = Search({ handleEdit, handleDelete });
	const standardPageRef = useRef<HTMLDivElement & { select: Function }>();
	// 新增
	const add = () => {
		setId(0)
		brandListtRef.current?.isOpen();
	}
	return (
		<div>
			<StandardPage
				ref={standardPageRef}
				config={config}
				tableLeftButton={<Button onClick={() => add()}>新增</Button>}
			></StandardPage>
			<BrandList
				ref={brandListtRef}
				id={id}
			/>
		</div>
	);
}

export default Brand;
