import { Response } from '@/common/axios';

export interface DataType {
    adminCount: number;
    createTime: string;
    description: string;
    id: number;
    name: string;
    sort: number;
    status: number;
}

export interface AdminRoleIdResolve extends Response {
    data: DataType[];
}

export interface FormData {
    adminId: string | number;
    roleIds: string | number;
}
