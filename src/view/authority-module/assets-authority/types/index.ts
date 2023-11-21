import { Response } from '@/common/axios';

export interface ResourceListResolve extends Response {
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}

export interface DataType {
    categoryId: string | number;
    createTime: string;
    description: string;
    id: number;
    name: string;
    url: string;
}

export interface ResourceListParams {
    pageNum: number;
    pageSize: number;
    nameKeyword: string;
    urlKeyword: string;
    categoryId: number | string;
}


