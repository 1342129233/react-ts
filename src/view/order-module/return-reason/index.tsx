import React, { useState, useEffect, useRef } from 'react';
import { message, Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table'
import LiveTable from '@/common/components/live-table/index';
import ReasonDrawer from './components/reason-drawer/index';
import { usePage, PageType } from '@/common/hooks/usePage';
import { getReturnReasonList, deleteReturnReason } from './server';
import { DataType } from './types';
import { tableConfig } from './configs';

function ReturnReason() {
    const reasonDrawer = useRef<HTMLDivElement & { isOpen: Function }>(null);
    const [id, setId] = useState<number>(0)
    const searchParams = useRef({
        pageNum: 1, 
        pageSize: 5
    });
    // 编辑
    const handleEdit = (record: DataType) => {
        setId(record.id!);
        reasonDrawer.current?.isOpen();
    }
    // 单个删除
    const handleDelete = async (record: DataType) => {
        try {
            const res = await deleteReturnReason(record.id!);
            returnReasonList();
        } catch(error: any) {
            message.error(error?.message || '请求失败')
        }
    }
    const { row } = tableConfig({ handleEdit, handleDelete });
    const liveTableRef = useRef<HTMLDivElement & { keys: Function }>(null);
    // 获取列表
    const returnReasonList = async() => {
        try {
			const res = await getReturnReasonList(searchParams.current);
			setData([
                ...res.data.list
            ])
            const { pageNum, pageSize, total } = res.data
            setPage(prev => ({
                ...prev,
                pageNum,
                pageSize,
                total
            }))
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    const handlePageChange = (paramsPage: PageType) => {
        searchParams.current = Object.assign({...searchParams.current}, {
            pageNum: paramsPage.pageNum,
            pageSize: paramsPage.pageSize
        })
        returnReasonList();
    }
    const { paginationProps, page, setPage } = usePage(handlePageChange);
    const [data, setData] = useState<DataType[]>([]);
    // 批量删除
    const handleAllDelete = async () => {
        const keys: number[] = liveTableRef.current?.keys() || [];
        if(keys.length === 0) {
			message.warning('请至少选中一条数据!')
			return;
		}
		try {
            const res = await deleteReturnReason(keys);
            returnReasonList();
        } catch(error: any) {
            message.error(error?.message || '请求失败')
        }
    }
    
    useEffect(() => {
        searchParams.current = Object.assign({...searchParams.current}, {
            pageNum: page.pageNum,
            pageSize: page.pageSize
        })
        returnReasonList()
    }, [])
    return <>
        <LiveTable 
            ref={liveTableRef}
            config={row}
            data={data}
            pagination={paginationProps}
            tableLeftButton={<div className='tableLeftButton'>
                <Button onClick={() => reasonDrawer.current?.isOpen()}>新建</Button>
                <Popconfirm title="请确认删除?" onConfirm={() => handleAllDelete()}>
					<Button type="primary" danger>批量删除</Button>
				</Popconfirm>
            </div>}
        />
        <ReasonDrawer
            ref={reasonDrawer}
            id={id}
            getList={returnReasonList}
        />
    </>
}

export default ReturnReason;
