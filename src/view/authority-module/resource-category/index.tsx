import React, { useState, useRef } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import CategoryDrawer from './components/category-drawer/index';
import { standardPageModel } from './configs';
import { fetchConfig, resourceCategoryDelete } from './server';
import { DataType } from './types';

function ResourceCategory() {
    const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function, tableData: unknown[] }>();
    const categoryDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
    const [categoryData, setCategoryData] = useState<null | DataType>(null)

    const handleEdit = (record: DataType) => {
        setCategoryData({
            createTime: record.createTime,
            id: record.id,
            name: record.name,
            sort: record.sort
        })
        categoryDrawerRef.current?.isOpen()
    }
	const handleDelete = async (id: number) => {
		try {
			await resourceCategoryDelete(id);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
    const add = () => {
        setCategoryData(null);
        categoryDrawerRef.current?.isOpen()
    }
    const formateSearchParams = (params: Record<string, unknown>) => {
        return {}
    }
    const formateSearchResolve = (params: Record<string, unknown>) => {
        return params.data;
    }
    const returnReasonList = () => {
		standardPageRef.current?.select();
	}
    const { rows } = standardPageModel({ handleEdit,  handleDelete });
    const tableLeftButton = ()  => {
		return <>
			<Button onClick={() => add()}>添加</Button>
		</>
	}
    return (
        <>
            <StandardPage
                ref={standardPageRef}
                config={{
                    rows: rows,
                    fetchConfig: fetchConfig,
                    formateSearchParams: formateSearchParams,
                    formateSearchResolve: formateSearchResolve
                }}
                isLiveSearchRequest={false}
                paginationConfig={false}
                isRowSelection={false}
                tableLeftButton={tableLeftButton()}
            ></StandardPage>
            <CategoryDrawer ref={categoryDrawerRef} categoryData={categoryData} getList={returnReasonList} />
        </>
    )
}

export default ResourceCategory;
