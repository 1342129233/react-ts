import { Response } from '@/common/axios';

export interface ResourceCategoryResolve extends Response {
    data: DataType[]
}

export interface DataType {
    createTime: string;
    id?: number;
    name: string;
    sort: number | string;
}

