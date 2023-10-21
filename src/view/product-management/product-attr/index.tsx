import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ProductAttrEdit from './components/product-attr-edit/index';
import { getProductAttrList } from './server';
import { DataType, PageType } from './types';
import styles from './style/index.module.less';

function ProductAttr() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [cur, setCur] = useState({
		name: ''
	});
	const [id, setId] = useState(0);
	const columns: ColumnsType<DataType> = [
		{
			title: '编号',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '类型名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '属性数量',
			dataIndex: 'attributeCount',
			key: 'attributeCount'
		},
		{
			title: '参数数量',
			dataIndex: 'paramCount',
			key: 'paramCount'
		},
		{
			title: "设置",
			key: 'settings',
			render: (_: DataType, record) => (
				<div className={styles.settings}>
					<Button onClick={() => statsList(_)}>属性列表</Button>
					<Button onClick={() => argumentList(_)}>参数列表</Button>
				</div>
			)
		},
		{
			title: "操作",
			key: 'action',
			render: (_: DataType, record) => (
				<div className={styles.settings}>
					<Button onClick={() => handleEdit(_)}>编辑</Button>
					<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(_.id)}>
						<Button type="primary" danger>删除</Button>
					</Popconfirm>
				</div>
			)
		}
	];
	const [data, setData] = useState<DataType[]>([]);
	const [page, setPage] = useState<PageType>({
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
	// 分页
	const handlePageChange = (current: number, pageSize: number) => {
		setPage((prev) => ({
			...prev,
			pageNum: current,
			pageSize
		}))
		const pageInfo = {
			pageNum: current,
			pageSize: pageSize,
			total: page.total
		}
		getProductAttr(pageInfo);
	}
	// 编辑
	const handleEdit = (_: DataType) => {
		setCur({
			name: _.name
		})
		setId(_.id);
		setOpen(true);
	}
	// 删除
	const handleDelete = (id: number) => {}
	// 属性列表
	const statsList = (_: DataType) => {
		navigate(`/product-management/product-attr-list?cid=${_.id}&cname=${_.name}&type=0`);
	}
	// 参数列表
	const argumentList = (_: DataType) => {}
	// 新增
	const create = () => {
		setId(0);
		setCur({
			name: ''
		}),
		setOpen(true);
	}


	const getProductAttr = async (pageInfo: PageType) => {
		try {
			const res = await getProductAttrList(pageInfo.pageNum, pageInfo.pageSize);
			setData([...res.data.list]);
			setPage(prev => ({
				...prev,
				pageNum: res.data.pageNum,
				pageSize: res.data.pageSize,
				total: res.data.total,
			}))
		} catch(error) {
			console.log('error', error);
		}
	}
	useEffect(() => {
		getProductAttr(page);
	}, [])
	return (
		<div>
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
			<ProductAttrEdit
				open={open}
				handleOpenEmit={(value: boolean) => setOpen(value)}
				cur={cur}
				id={id}
			></ProductAttrEdit>
		</div>
	);
}

export default ProductAttr;
