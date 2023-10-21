import { Response } from '@/common/axios';

export interface DataType {
    attributeCount: number;
    id: number;
    name: string;
    paramCount: number;
}

export interface ProductAttrResolve extends Response{
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}

export interface PageType {
    pageNum: number;
    pageSize: number;
    total: number;
}

