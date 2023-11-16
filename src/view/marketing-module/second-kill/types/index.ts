import { Response } from '@/common/axios';

export interface FlashListParams {
    pageNum: number;
    pageSize: number;
    keyword: string;
}

export interface FlashListResolve extends Response{
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}

export interface DataType {
    createTime: string;
    endDate: string;
    id: number;
    startDate: string;
    status: number;
    title: string;
}

export interface UpdateStatusType {
    id: number;
    status: number;
}
