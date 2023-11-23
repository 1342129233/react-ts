import { get } from '@/common/axios/index';

export interface RoleType {
    adminCount: number;
    createTime: string;
    description: string;
    id: number;
    name: string;
    sort: number;
    status: number;
}

export interface RoleResolve {
    code: number;
    message: string;
    data: RoleType[];
}


export const roleListAll= () => {
    return get<RoleResolve>('/api/role/listAll')
}