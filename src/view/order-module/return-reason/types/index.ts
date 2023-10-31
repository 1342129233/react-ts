import { Response } from '@/common/axios';

export interface PageType {
    pageNum: number; 
    pageSize: number;
    total?: number;
}

export interface DataType {
    createTime: string;
    id?: number;
    name: string;
    sort: number;
    status: number;
}

export interface ReturnReasonResolve extends Response {
    data: {
        pageNum: number; 
        pageSize: number;
        total: number;
        totalPage: number;
        list: DataType[];
    };  
}

export interface ReturnReasonIdResolve extends Response {
    data: DataType
}
