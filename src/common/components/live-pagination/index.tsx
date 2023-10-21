import React, { RefObject, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { Props } from '../live-pagination/types';

const LivePagination = ({ pageNum, pageSize, total = 0, pageSizeOptions = [10, 20, 30, 50], onUpdate}: Props) => {
	const showTotal: PaginationProps['showTotal'] = (total: number) => `共 ${total} 条`;
    const paginationChange = (page: number, size: number) => {
        onUpdate({
            pageNum: page,
            pageSize: size,
            total,
            pageSizeOptions
        })
    }
    const onShowSizeChange = (page: number, size: number) => {
        onUpdate({
            pageNum: page,
            pageSize: size,
            total,
            pageSizeOptions
        })
    }
    return (
        <Pagination
            size="small" 
            current={pageNum} 
            pageSize={pageSize} 
            total={total} 
            showTotal={showTotal} 
            pageSizeOptions={pageSizeOptions}
            showSizeChanger
            onChange={paginationChange}
            onShowSizeChange={onShowSizeChange}
        />
    );
}
export default LivePagination;
