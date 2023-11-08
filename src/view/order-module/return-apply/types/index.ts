import { Response } from '@/common/axios';

export interface DataType {
    id: number;
    createTime: string;
    handleTime: string;
    memberUsername: string;
    productRealPrice: number;
    returnName: number;
    status: number;
}

export interface ReturnApplyResolve extends Response {
    data: {
        list: DataType[],
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
} 

export interface ReturnApplyParams {
    pageNum: number;
    pageSize: number;
    id?: number | string;
    status?: number;
    createTime?: number | string;
    handleMan?: number | string;
    handleTime?: number | string;
}
