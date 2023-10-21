import React, { useState, useRef } from 'react';

export interface pageType {
    pageNum: number; 
    pageSize: number;
    total?: number;
}

export function usePage(callback: (params: pageType) => Promise<void>) {
    const [page, setPage] = useState({
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

    const handlePageChange = (current: number, pageSize: number) => {
        setPage((prev) => ({
			...prev,
			pageNum: current,
			pageSize
		}))
        callback({pageNum: current, pageSize: pageSize})
    }

    return {
        paginationProps,
        page,
        setPage
    }
}
