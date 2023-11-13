import React, { useState, useRef } from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import StandardPage from '@/common/components/standard-page/index';
import { orderDelete } from './servers';
import { standardPageModel } from './configs/index';
import styles from './style/index.module.less';
import { isArray } from 'lodash';

function OrderList() {
	const navigate = useNavigate();
	const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();
	const formateSearchParams = (params: Record<string, unknown>) => {
        return {
            ...params
        }
    }
	// 删除请求
	const handleDelete = async (id: React.Key | React.Key[]) => {
		let list = [];
		if(isArray(id)) {
			list = id
		} else {
			list = [id]
		}
		const value = list.toString();
		try {
			await orderDelete(value);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	};
	const handleEdit = () => {
		// navigate();
	}
	const handleDeleteList = () => {
		const idList = standardPageRef.current?.tableSelectedRowKeys() || [];
        if(idList.length === 0) {
			message.error('请先选中目标！');
			return;
		}
        handleDelete(idList)
	}
	const { row, fetchConfig } = standardPageModel({ handleEdit, handleDelete });
	return (
		<>
			<StandardPage
				ref={standardPageRef}
				config={{
					rows: row,
					fetchConfig: fetchConfig,
					formateSearchParams: formateSearchParams
				}}
				tableLeftButton={<div className={styles.tableLeftButton}>
					<Button type="primary">批量发货</Button>
					<Button type="primary">关闭订单</Button>
					<Button type="primary" danger onClick={() => handleDeleteList()}>删除订单</Button>
				</div>}
			></StandardPage>
		</>
	);
}

export default OrderList;
