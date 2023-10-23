import { Response } from '@/common/axios';

export interface DataType {
    filterType: number;
    handAddStatus: number;
    id: number;
    inputList: string;
    inputType: number;
    name: string;
    productAttributeCategoryId: number;
    relatedStatus: number;
    searchType: number;
    selectType: number;
    sort: number;
    type: number;
}

export interface PageType {
    pageNum: number;
    pageSize: number;
    total?: number;
}

export interface ProductAttributeParamsType {
    id: string;
    name: string;
    type: string;
    pageNum: number;
    pageSize: number;
}

export interface ProductAttributeResolve extends Response{
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}
