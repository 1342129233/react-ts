import { get, Response } from '@/common/axios/index';

export interface DataType {
    createTime: string;
    id: number;
    name: string;
    sort: number;
}

export interface ResourceCategoryResolve extends Response {
    data: DataType[];
}

export function resourceCategory() {
    return get<ResourceCategoryResolve>('/api/resourceCategory/listAll')
}
