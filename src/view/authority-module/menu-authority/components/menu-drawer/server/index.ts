import { get, post, Response } from '@/common/axios';
import { DataType } from '../../../types';
import { menuIdResolve, MenuListResolve } from '../types';
 
// 更新
export function updateMenu(params: DataType) {
    return post<Response>(`/api/menu/update/1`, { ...params });
}

// 创建
export function createMenu(params: DataType) {
    return post<Response>(`/api/menu/create`, { ...params });
}

// 获取单个
export function menuId(id: number) {
    return get<menuIdResolve>(`/api/menu/${id}`);
}

// 获取级别
export function menuList() {
    return get<MenuListResolve>(`/api/menu/list/0`, { pageSize: 100, pageNum: 1 });
}

