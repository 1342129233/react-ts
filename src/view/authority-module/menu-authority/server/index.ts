import { get, post, Response } from "@/common/axios";
import { PageType, MenuListResolve, UpdateStatus } from '../types';

// 获取列表
export function menuList(parentId: number | string = 0, params: PageType) {
    return get<MenuListResolve>(`/api/menu/list/${parentId}`);
}

// 修改状态
export function menuHidden(params: UpdateStatus) {
    return post<Response>(`/api/menu/updateHidden/${params.id}?hidden=${params.status}`);
}

// 删除列表
export function menuDelete(id: number) {
    return post<Response>(`/api/menu/delete/${id}`);
}




