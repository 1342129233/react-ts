import React, { useRef, useEffect } from 'react';
import { Button } from 'antd';
import StandardPage from '@/common/components/standard-page/index';
import { standardPageModel } from './configs/index';

function ReturnApply() {
    const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();

    const handleEdit = () => {}
    const handleDelete = () => {}
    const { row, returnApplyList } = standardPageModel({ handleEdit, handleDelete });
    const formParams = () => {}
    return (
        <>
            <StandardPage
                ref={standardPageRef}
                config={{
                    rows: row,
                    fetchConfig: returnApplyList
                }}
                tableLeftButton={<Button type="primary" danger>批量删除</Button>}
            ></StandardPage>
        </>
    )
}

export default ReturnApply;
