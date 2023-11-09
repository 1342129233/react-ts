import React, { useRef, useEffect } from 'react';
import { Button } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import { standardPageModel } from './configs/index';

function ReturnApply() {
    const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();

    const handleEdit = () => {}
    const handleDelete = () => {}
    const { row, returnApplyList } = standardPageModel({ handleEdit, handleDelete });
    const formateSearchParams = (params: Record<string, unknown>) => {
        return {
            ...params,
            createTime: '2018-10-17'
        }
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
                tableLeftButton={<Button type="primary" danger>批量删除</Button>}
            ></StandardPage>
        </>
    )
}

export default ReturnApply;
