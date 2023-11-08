import React, { useRef } from 'react';
import { Button, Space, Switch, message } from 'antd';
import { useNavigate  } from "react-router-dom";
import StandardPage from '@/common/components/standard-page/index';
import { Search } from './configs/index';
import { updatePublishStatus } from './server/index';


const ProductList = () => {
	const navigate = useNavigate()
	const { row, productListAxios, product } = Search();
	const standardPageRef = useRef<HTMLDivElement & { select: Function }>();
	

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
			message.error(error.message || '请求失败')
		}
	}
	// 删除
	const handleDelete = async (check: boolean, record: any, index: number) => {
		message.error('演示环境暂无修改权限，如需修改数据可本地搭建后台服务！')
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
			<StandardPage
				ref={standardPageRef}
				config={{
					rows: row,
					fetchConfig: productListAxios
				}}
				liveTableRender={liveTableRender}
			></StandardPage>
		</div>
	);
}

export default ProductList;
