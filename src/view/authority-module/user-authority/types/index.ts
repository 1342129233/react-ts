import { get, post, Response } from '@/common/axios';

export interface fetchConfigResolve extends Response {
    list: DataType[];
    pageNum: number;
    pageSize: number;
    total: number;
    totalPage: number;
}

export interface DataType {
    createTime: string;
    email: string;
    icon: string;
    id?: number;
    loginTime: string;
    nickName: string;
    note: string;
    password: string;
    status: number;
    username: string;
}

export interface updateStatus {
    id: number;
    status: number;
}
 