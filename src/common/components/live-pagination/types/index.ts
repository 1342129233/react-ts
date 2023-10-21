export interface PaginationType {
    pageNum: number;
    pageSize: number;
    total?: number;
    pageSizeOptions?: number[];
    
}

export interface Props extends PaginationType {
    onUpdate: Function;
}

