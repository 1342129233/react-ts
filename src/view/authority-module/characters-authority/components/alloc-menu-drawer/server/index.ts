import { get, post, Response } from '@/common/axios';
import { menuTreeListResolve, MenuKeyParams } from '../types';

export const menuTreeList = () => {
    return get<menuTreeListResolve>(`/api/menu/treeList`);
}

export const listMenuList = (id: number) => {
    return get<menuTreeListResolve>(`/api/role/listMenu/${id}`);
}

export const allocMenu = (form: MenuKeyParams) => {
    const formData = new window.FormData();
    formData.append('roleId', form.roleId as string);
    formData.append('menuIds', form.menuIds as string);
    return post<Response>(`/api/role/allocMenu`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}




