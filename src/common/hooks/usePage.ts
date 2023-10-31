import React, { useState, useRef } from 'react';

export interface PageType {
    pageNum: number; 
    pageSize: number;
    total?: number;
}

export interface PaginationProps {
	showSizeChanger: boolean;
	showQuickJumper: boolean;
	showTotal: () => string
	pageSize: number;
	pageNum: number;
	total: number;
	onChange: (pageNum: number, pageSize: number) => void,
	pageSizeOptions: number[]
}

export function usePage(callback: (params: PageType) => void) {
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
		pageNum: page.pageNum,
		total: page.total,
		onChange: (pageNum: number, pageSize: number) => handlePageChange(pageNum, pageSize),
		pageSizeOptions: [5, 10, 20, 30]
	}

    const handlePageChange = (pageNum: number, pageSize: number) => {
        setPage((prev) => ({
			...prev,
			pageNum,
			pageSize
		}))
        callback({pageNum: pageNum, pageSize: pageSize})
    }

    return {
        paginationProps,
        page,
        setPage
    }
}
