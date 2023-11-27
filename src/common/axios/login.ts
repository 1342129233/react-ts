// 登录
import { get, post } from '@/common/axios/index';
interface DataType {
    tokenHead: string;
    token: string;
}

interface LoginResolve {
    code: number;
    data: DataType;
    message: string;
}

// 登录
export const login = (params: { password: string; username: string }) => {
    return post<LoginResolve>(`/api/admin/login`, { ...params });
}

export interface adminRolesResolve {
    code: number;
    data: RolesDataType;
    message: string;
}

export interface RolesDataType {
    icon: string;
    menus: MenusType[];
    roles: string[];
    username: string;
}

export interface MenusType {
    createTime: string;
    hidden: number;
    icon: string;
    id: number;
    level: number;
    name: string;
    parentId: number;
    sort: number;
    title: string;
}

// 权限
export const adminRoles = () => {
    return get<LoginResolve>(`/api/admin/info`);
}