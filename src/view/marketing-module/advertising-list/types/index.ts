import { Response } from '@/common/axios';


export interface DataType extends Response {
    clickCount: number;
    endTime: string;
    id: number;
    name: string;
    note: string;
    orderCount: number;
    pic: string;
    sort: number;
    startTime: string;
    status: number;
    type: number;
    url: string;
}

export interface AdvertiseListResolve {
    data: {
        list: DataType[];
    },
    pageNum: number;
    pageSize: number;
    total: number;
    totalPage: number;
}

export interface UpdateStatusType {
    id: number;
    status: number;
}
