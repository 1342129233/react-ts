import { get, Response } from '@/common/axios';
import { BrandListResponse } from '../type';

// 获取列表
export const getBrandList = (parmas: Record<string, unknown>) => {
    return get<BrandListResponse>(`/api/brand/list`, {
        pageNum: parmas.pageNum,
        pageSize: parmas.pageSize,
        keyword: parmas.keyword
    })
}

// 删除获取列表
export const getBrandListDelete = (id: number) => {
    return get<Response>(`/api/brand/delete/${id}`)
}


