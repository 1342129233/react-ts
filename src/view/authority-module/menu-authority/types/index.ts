import { Response } from '@/common/axios';

export interface DataType {
    createTime: string;
    hidden: number;
    icon: string;
    id?: number;
    level: number;
    name: string;
    parentId: number;
    sort: number;
    title: string;
}

export interface PageType {
    pageNum: number; 
    pageSize: number;
    total?: number;
}

export interface MenuListResolve extends Response {
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}

export interface UpdateStatus {
    id: number;
    status: number;
}
