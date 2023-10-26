import React, { useState, useRef } from 'react';
import { message, Button } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import BrandList from './components/brand-list/index';
import styles from './style/index.module.less';
import { getBrandListDelete, isShowStatus } from './server';
import { Search, StatusEnum } from './configs';
import { DataType } from './type';

function Brand() {
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();
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
	const { config } = Search({ handleEdit, handleDelete, standardPageRef });

	// 新增
	const add = () => {
		setId(0)
		brandListtRef.current?.isOpen();
	}
	const updateStatus = async (status: string) => {
		const idList: number[] = standardPageRef.current?.tableSelectedRowKeys() || [];
		if(idList.length === 0) {
			message.error('请先选中目标！');
			return;
		}
		const params = {
			ids: idList.toString(),
			showStatus: status
		}
		try {
			// 请求接口
			await isShowStatus(params);
		} catch(error: any) {
			message.error(error?.message || '删除失败')
		}
		// 从新请求
		await standardPageRef.current?.select()
	}
	return (
		<div>
			<StandardPage
				ref={standardPageRef}
				config={config}
				tableLeftButton={
					<div className={styles.tableLeftButton}>
						<Button onClick={() => add()}>新增</Button>
						<Button type="primary" onClick={() => updateStatus(StatusEnum.YES)}>批量显示品牌</Button>
						<Button type="primary" onClick={() => updateStatus(StatusEnum.NO)}>批量隐藏品牌</Button>
					</div>
				}
			></StandardPage>
			<BrandList
				ref={brandListtRef}
				id={id}
			/>
		</div>
	);
}

export default Brand;
