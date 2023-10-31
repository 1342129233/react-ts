import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table, Button, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { usePage } from '@/common/hooks/usePage';
import ProductInfo from './components/product-info/index';
import { getProductAttribute, delProductAttribute } from './server';
import { DataType, PageType, ProductAttributeParamsType } from './types';
import styles from './style/index.module.less';
import { isArray } from 'lodash';

function ProductAttrList() {
	const productInfoRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const searchParams = useRef<ProductAttributeParamsType>({
		id: '',
		name: '',
		type: '',
		pageNum: 1,
		pageSize: 10
	});
	// 报错信息
	const [searchRoute] = useSearchParams();
	const [productId, setProductId] = useState<number | null>(null);
	const routeParams = {
		id: searchRoute.get('cid'),
		name: searchRoute.get('cname'),
		type: searchRoute.get('type')
	}
	const [data, setData] = useState<DataType[]>([]);
	const columns: ColumnsType<DataType> = [
		{
			title: '编号',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '属性名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '商品类型',
			key: 'commodityType',
			render: (_: DataType, record) => (
				<div>{routeParams.name}</div>
			)
		},
		{
			title: '可选值列表',
			dataIndex: 'inputList',
			key: 'inputList'
		},
		{
			title: '排序',
			dataIndex: 'sort',
			key: 'sort'
		},
		{
			title: "操作",
			key: 'action',
			render: (_: DataType, record) => (
				<div className={styles.settings}>
					<Button onClick={() => handleEdit(_)}>编辑</Button>
					<Popconfirm title="请确认删除?" onConfirm={() => handleDelete(_.id)}>
						<Button type="primary" danger>删除</Button>
					</Popconfirm>
				</div>
			)
		}
	]
	const handleEdit = (_: DataType) => {
		setProductId(_.id);
		productInfoRef.current?.isOpen();
	};
	// 删除
	const handleDelete = async(id: React.Key | React.Key[]) => {
		let list = [];
		if(isArray(id)) {
			list = id
		} else {
			list = [id]
		}
		const value = list.toString();
		try {
			await delProductAttribute(value);
			handleProductAttribut();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	};
	const handleProductAttribut = async () => {
		try {
			const res = await getProductAttribute(searchParams.current);
			setData([
				...res.data.list
			])
			setPage((prev: PageType) => ({
				...prev,
				pageNum: res.data.pageNum,
				pageSize: res.data.pageSize,
				total: res.data.total
			}))
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	const handlePageChange = (paramsPage: PageType) => {
		searchParams.current = Object.assign({
			id: '',
			name: '',
			type: '',
			pageNum: 0,
			pageSize: 0
		}, {
			pageNum: paramsPage.pageNum,
			pageSize: paramsPage.pageSize
		}, routeParams);
		handleProductAttribut()
	}
	const { paginationProps, page, setPage } = usePage(handlePageChange);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
			setSelectedRowKeys(selectedRowKeys)
		}
	}
	const add = () => {
		setProductId(null);
		productInfoRef.current?.isOpen();
	}
	const handleAllDelete = () => {
		if(selectedRowKeys.length === 0) {
			message.warning('请至少选中一条数据!')
			return;
		}
		handleDelete(selectedRowKeys)
	}

	useEffect(() => {
		searchParams.current = Object.assign({
			id: '',
			name: '',
			type: '',
			pageNum: 0,
			pageSize: 0
		}, {
			pageNum: page.pageNum,
			pageSize: page.pageSize
		}, routeParams)
		handleProductAttribut();
	}, [])
	return (
		<div>
			<div className={styles.mgb10}>
				<Button onClick={() => add()} className={styles.mgr10}>添加</Button>
				<Popconfirm title="请确认删除?" onConfirm={() => handleAllDelete()}>
					<Button type="primary" danger>批量删除</Button>
				</Popconfirm>
			</div>
			<Table
				rowSelection={{
					type: 'checkbox',
					...rowSelection,
				}}
				columns={columns} 
				dataSource={data} 
				rowKey={(record) => record.id}
				pagination={paginationProps}
			/>
			<ProductInfo
				ref={productInfoRef}
				id={productId}
			></ProductInfo>
		</div>
	);
}

export default ProductAttrList;
