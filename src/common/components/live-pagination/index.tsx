import React, { RefObject, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import { PageType } from '@/common/hooks/usePage';


const LivePagination = (props: Props) => {
    const { pagination, page } = props;
    return (
        <Pagination
            {...pagination}
            current={page.pageNum}
            style={{ marginTop: 10 }} 
        />
    );
}

interface Props {
    pagination: TablePaginationConfig
    page: PageType
}

export default LivePagination;
