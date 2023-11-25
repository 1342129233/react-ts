import { Response } from '@/common/axios';
import { DataType } from '../../../types';

export interface menuIdResolve extends Response {
    data: DataType;
}

export interface MenuListResolve extends Response {
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    };
}

export interface Options {
    value: number;
    label: string;
}

