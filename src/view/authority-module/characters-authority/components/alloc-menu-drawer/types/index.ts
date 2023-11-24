import { Response } from '@/common/axios';

export interface MenuDataType {
    id: number;
    parentId: number;
    createTime: string;
    title: string;
    level: number;
    sort: number;
    name: string;
    icon: string;
    hidden: number;
    children: MenuDataType[];
}

export interface menuTreeListResolve extends Response {
    data: MenuDataType[]
}

export interface MenuKeyParams {
    roleId: number | string;
    menuIds: number[] | string;
}
