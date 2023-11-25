import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import TimeDrawer from './components/time-drawer/index';
import { flashSessionList, flashSessionUpdateState, flashSessionDelete } from './server';
import { standardPageModel } from './configs';
import { UpdateStatusType, DataType } from './types';

function KillTime() {
    const timeDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
    const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();
    const [data, setData] = useState<DataType | null>(null);
    // 添加
    const add = () => {
        setData(null)
		timeDrawerRef.current?.isOpen()
    }
    // 上下线
	const updateStatus = async (value: UpdateStatusType) => {
		try {
			await flashSessionUpdateState(value);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
    // 编辑
	const handleEdit = async (params: DataType) => {
		const value = {
			createTime: params.createTime,
            endTime: params.endTime,
            id: params.id,
            name: params.name,
            startTime: params.startTime,
            status: params.status
		}
		setData({...value})
		timeDrawerRef.current?.isOpen()
	}
	// 删除
	const handleDelete = async (id: number) => {
		try {
			await flashSessionDelete(id);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
    const { rows } = standardPageModel({ updateStatus, handleEdit, handleDelete });
    const formateSearchParams = (params: Record<string, unknown>) => {
        return {}
    }
    const formateSearchResolve = (params: Record<string, unknown>) => {
        return params.data;
    }
    const returnReasonList = () => {
		standardPageRef.current?.select();
	}
    return (<>
        <StandardPage
            ref={standardPageRef}
            config={{
                rows: rows,
                fetchConfig: flashSessionList,
                formateSearchParams: formateSearchParams,
                formateSearchResolve: formateSearchResolve
            }}
            isLiveSearchRequest={false}
            isRowSelection={false}
            tableLeftButton={<Button onClick={() => add()}>添加</Button>}
        ></StandardPage>
        <TimeDrawer ref={timeDrawerRef} data={data} getList={returnReasonList} /> 
    </>)
}

export default KillTime;
