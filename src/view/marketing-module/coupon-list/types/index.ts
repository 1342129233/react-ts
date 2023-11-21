import { Response } from '@/common/axios';

export interface FetchConfigResolve extends Response {
    data: {
        list: DataType[]
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}

export interface DataType {
    amount: number;
    count: number;
    enableTime: string;
    endTime: string;
    id: number;
    minPoint: number;
    name: string;
    perLimit: number;
    platform: number;
    publishCount: number;
    receiveCount: number;
    startTime: string;
    type: number;
    useCount: number;
    useType: number;
}

export interface FetchConfigParams {
    name: string | number;
    type: number;
    pageNum: number;
    pageSize: number;
}

export interface UpdateStatusType {
    ids: string | number;
    recommendStatus: number;
}
