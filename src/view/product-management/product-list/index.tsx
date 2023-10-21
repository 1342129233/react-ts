import React, { useRef, useEffect, useState } from 'react';
import { Table, Button, Space, Switch, message } from 'antd';
import { useNavigate  } from "react-router-dom";
import LiveSearch from '@/common/components/live-search/index';
import LiveTable from '@/common/components/live-table/index';
import LivePagination from '@/common/components/live-pagination/index';
import StandardPage from '@/common/components/standard-page/index';
import { PaginationType } from '@/common/components/live-pagination/types';
import { Search } from './configs/index';
import { DataTable } from './types/index';
import { productListAxios, updatePublishStatus } from './server/index';


const ProductList = () => {
	const navigate = useNavigate()
	const { Config, product } = Search();
	const liveSeachRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
	const liveTableRef = useRef<HTMLDivElement>(null);
	const standardPageRef = useRef<HTMLDivElement & { select: Function }>();
	const [data, setData] = useState<Array<DataTable>>([]);
	const [pagination, setPagination] = useState<PaginationType>({
		pageNum: 1,
    	pageSize: 10,
    	total: 0,
		pageSizeOptions: [10, 20]
	})
	// 处理请求数据
	const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});
	const [messageApi, contextHolder] = message.useMessage();

	
	// 发送请求
	const submit = async() => {
		try {
			const res = await productListAxios(searchParams);
			setData([...res.data.list]);
			setPagination({
				...pagination,
				pageNum: res.data.pageNum,
				pageSize: res.data.pageSize
			});
		} catch(error) {
			console.log('error', error);
		}
	}

	// 搜索
	const onSelect = () => {
		const form = liveSeachRef.current?.getFormValue() || {};
		setPagination({
			...pagination,
			pageNum: 1
		});
		setSearchParams({
			...searchParams,
			...form,
			...pagination
		})
		submit();
	}

	// useEffect(() => {
	// 	onSelect()
	// }, [pagination.pageNum, pagination.pageSize])

	// 分页
	const handleChildUpdate = async (pagination: PaginationType) => {
		setPagination({...pagination})
		setSearchParams({
			...searchParams,
			...pagination
		})
	}

	// 以下是 table 的操作
	const publishChange = async (check: boolean, record: any, index: number) => {
		// 接口
		const params = {
			id: record.id,
			publishStatus: check ? 1 : 0
		}
		try {
			await updatePublishStatus(params);
			standardPageRef.current?.select()
		} catch(error: any) {
			messageApi.error(error.message)
		}
	}
	// 删除
	const handleDelete = async (check: boolean, record: any, index: number) => {
		messageApi.error('演示环境暂无修改权限，如需修改数据可本地搭建后台服务！')
	}
	
	const handleEdit = (check: boolean, record: any, index: number) => {
		navigate(`/product-management/product-update?id=${record.id}`)
	}
	const liveTableRender = {
		tagValue: (_: any, record: any, index: number) => {
			return (
				<div>
		         	<div>上架: <Switch checked={ record.publishStatus === 1 ? true : false } onClick={(check) => publishChange(check, record, index)}/></div>
		         	<div>新品: <Switch checked={ record.promotionType === 1 ? true : false } /></div>
		         	<div>推荐: <Switch checked={ record.recommandStatus === 1 ? true : false } /></div>
		     	</div>
			)
		},
		operation: (_: any, record: any, index: number) => {
			return (
				<Space size={0}>
                    <Button
                        type="link"
                        onClick={() => { handleEdit(_, record, index) }}
                    >
                        编辑
                    </Button>
                    <Button
                        type="link"
						onClick={() => { handleDelete(_, record, index) }}
                        danger
                    >
                        删除
                     </Button>
                </Space>
			)
		}
	}

	return (
		<div>
			{contextHolder}
			{/* <LiveSearch
				ref={liveSeachRef}
				config={Config}
				isPreAdd={false}
				onUpdateSearch={onSelect}
			></LiveSearch> */}
			{/* <LiveTable
				ref={liveTableRef}
				config={Config.row}
				data={data}
				pagination={pagination}
			>
			</LiveTable> */}
			{/* <LivePagination	{ ...pagination }  onUpdate={handleChildUpdate}></LivePagination>  */}
			<StandardPage
				ref={standardPageRef}
				config={Config}
				liveTableRender={liveTableRender}
			></StandardPage>
		</div>
	);
}

export default ProductList;
