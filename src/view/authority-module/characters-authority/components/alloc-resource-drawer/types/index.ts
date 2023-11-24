import { Response } from '@/common/axios';

export interface ResourceCategoryDataType {
    createTime: string
    id: number;
    name: string;
    sort: number;
}

export interface ResourceCategoryResolve extends Response  {
    data: ResourceCategoryDataType[];
}

export interface ResourceResolveDataType {
    categoryId: number;
    createTime: string;
    description: string;
    id: number;
    name: string;
    url: string;
}

export interface ResourceResolve extends Response {
    data: ResourceResolveDataType[];
}

export interface ListResourceIdResolve extends Response {
    data: ResourceResolveDataType[]
}

export interface ResourceIdsParams {
    roleId: number | string;
    resourceIds: number[] | string;
}

export interface Options {
    label: string;
    value: number;
    categoryId?: number;
    children?: Options[];
}


