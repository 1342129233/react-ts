import { get, post, Response } from '@/common/axios';
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

// 修改是否显示
export const isShowStatus = (params: { ids: string, showStatus: string }) => {
    const formData = new window.FormData();
    formData.append('ids', params.ids);
    formData.append('showStatus', params.showStatus);
    return post<Response>('/api/brand/update/showStatus', formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}

// 修改品牌制造商
export const isFactoryStatus = (params: { ids: string, factoryStatus: string }) => {
    const formData = new window.FormData();
    formData.append('ids', params.ids);
    formData.append('factoryStatus', params.factoryStatus);
    return post<Response>('/api/brand/update/factoryStatus', formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}
