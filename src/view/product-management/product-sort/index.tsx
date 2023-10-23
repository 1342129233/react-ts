import React, { useState, useEffect, useRef, ForwardedRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Table, Popconfirm, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ProductDetails from './components/product-details/index';
import { productList } from './server';
import { DataType } from './types';
import { StatusToBoolean, StatusToNUmber } from './configs';
import styles from './style/index.module.less';

function ProductSort() {
	const navigate = useNavigate();
	const [searchParamsRoute]= useSearchParams();
	const parentId = +searchParamsRoute.getAll('parentId')[0] || 0;
	const productCatRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const [productCateId, setProductCateId] = useState<null | number>(null);
	const [data, setData] = useState<DataType[]>([]);
	const [page, setPage] = useState({
		pageNum: 1,
		pageSize: 5,
		total: 0
	});
	const paginationProps = {
		showSizeChanger: true,
		showQuickJumper: false,
		showTotal: () => `共${page.total}条`,
		pageSize: page.pageSize,
		current: page.pageNum,
		total: page.total,
		onChange: (current: number, pageSize: number) => handlePageChange(current, pageSize),
		pageSizeOptions: [5, 10, 20, 30]
	}
	// 分页 change
	const handlePageChange = (current: number, pageSize: number) => {
		setPage((prev) => ({
			...prev,
			pageNum: current,
			pageSize
		}))
		// 接口
		getProductCategoryList(current, pageSize, parentId);
	}
	// 删除
	const handleDelete = (id: number) => {
		const newData = data.filter((item) => item.id !== id);
    	setData(newData);
	}
	// 编辑
	const handleEdit = (id: number) => {
		setProductCateId(id);
		productCatRef.current?.isOpen();
	}
	const create = () => {
		setProductCateId(null)
		productCatRef.current?.isOpen();
	}
	const nextSort = (record: DataType) => {
		navigate(`/product-management/product-sort?parentId=${record.id}`)
	}
	const columns: ColumnsType<DataType> = [
		{
			title: "编号",
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: "分类名称",
			dataIndex: 'keywords',
			key: 'keywords'
		},
		{
			title: "级别",
			dataIndex: 'level',
			key: 'level'
		},
		{
			title: "商品数量",
			dataIndex: 'productCount',
			key: 'productCount'
		},
		{
			title: "数量单位",
			dataIndex: 'productUnit',
			key: 'productUnit'
		},
		{
			title: "导航栏",
			key: 'navStatus',
			render: (_: DataType, record) => {
				const handleNavStatusChange = (_: DataType,checked: boolean) => {
					const params = {
						id:_?.id,
						is_contact: StatusToNUmber[String(checked)]
					}
					// 请求接口
					console.log(params);
				}
				return <Switch 
					key={_.navStatus}
					defaultChecked={StatusToBoolean[String(_.navStatus)]}
					onChange={(checked)=>handleNavStatusChange(_, checked)}
				/>
			}
		},
		{
			title: "是否显示",
			key: 'showStatus',
			render: (_: DataType, record) => {
				const handleShowStatusChange = (_: DataType,checked: boolean) => {
					const params = {
						id:_?.id,
						showStatus: StatusToNUmber[String(checked)]
					}
					// 请求接口
					console.log(params);
				}
				return <Switch 
					key={_.showStatus}
					defaultChecked={StatusToBoolean[String(_.navStatus)]}
					onChange={(checked)=>handleShowStatusChange(_, checked)}
				/>
			}
		},
		{
			title: "排序",
			dataIndex: 'sort',
			key: 'sort'
		},
		{
			title: "设置",
			key: 'settings',
			render: (_: DataType, record) => (
				<div className={styles.tableCell}>
					<Button onClick={() => nextSort(_)}>查看下级</Button>
				</div>
			)
		},
		{
			title: "操作",
			key: 'action',
			render: (_: DataType, record) => (
				<div className={styles.tableCell}>
					<Button className={styles.action} onClick={() => handleEdit(_.id)}>编辑</Button>
					{
						data.length > 1 ? (
						<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(_.id)}>
							<Button type="primary" danger className={styles.action} >删除</Button>
						</Popconfirm>
						) : null
					}
				</div>
			)
		}
	]
	const getProductCategoryList = async (page: number, pageSize: number, parentId: number) => {
		try {
			const res = await productList(page, pageSize, parentId);
			setData([
				...res.data.list
			])
			setPage({
				pageNum: res.data.pageNum,
				pageSize: res.data.pageSize,
				total: res.data.total
			})
		} catch(err) {}
	}
	useEffect(() => {
		getProductCategoryList(1, page.pageSize, parentId);
	}, [parentId])
	return (
		<>
			<Button
				type="primary"
				className={styles.mgb10} 
				onClick={create}
			>
				新建
			</Button>
			<Table
				columns={columns} 
				dataSource={data} 
				rowKey={(record) => record.id}
				pagination={paginationProps}
			/>
			<ProductDetails id={productCateId} ref={productCatRef}/>
		</>
	);
}

export default ProductSort;
