import React, { useState, useRef } from 'react';
import { Button, message } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import ReturnApplyDetail from './components/returnApplyDetail/index';
import { standardPageModel } from './configs/index';
import { returnApplyDel } from './server';
import { momentFormat } from '@/common/utils';
import { DataType } from './types';
import { isArray } from 'lodash';

function ReturnApply() {
    const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();
    const returnApplyDetailDrawer = useRef<HTMLDivElement & { isOpen: Function }>(null);
    const [id, setId] = useState<number>(0)
    const handleEdit = (record: DataType) => {
        setId(record.id)
        returnApplyDetailDrawer.current?.isOpen()
    }
    
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
			await returnApplyDel(value);
			standardPageRef.current?.select();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	};
    const { row, returnApplyList } = standardPageModel({ handleEdit, handleDelete });
    const formateSearchParams = (params: Record<string, unknown>) => {
        return {
            ...params,
            createTime: params.createTime ? momentFormat(params.createTime as string) : '',
            handleTime: params.handleTime ? momentFormat(params.handleTime as string) : ''
        }
    }
    
    // 批量删除
    const delList = () => {
        const idList = standardPageRef.current?.tableSelectedRowKeys() || [];
        if(idList.length === 0) {
			message.error('请先选中目标！');
			return;
		}
        handleDelete(idList)
    }
    return (
        <>
            <StandardPage
                ref={standardPageRef}
                config={{
                    rows: row,
                    fetchConfig: returnApplyList,
                    formateSearchParams: formateSearchParams
                }}
                tableLeftButton={<Button type="primary" onClick={() => delList()} danger>批量删除</Button>}
            ></StandardPage>
            <ReturnApplyDetail 
                ref={returnApplyDetailDrawer}
                id={id}
            />
        </>
    )
}

export default ReturnApply;
