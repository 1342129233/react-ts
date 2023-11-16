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
    id: number;
    recommendStatus: number;
    sort: number;
    subjectId: number;
    subjectName: string;
}

export interface FetchConfigParams {
    subjectName: string | number;
    recommendStatus: number;
    pageNum: number;
    pageSize: number;
}

export interface UpdateStatusType {
    ids: string | number;
    recommendStatus: number;
}
