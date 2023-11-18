import { get, post, Response } from '@/common/axios';
import { SubjectListResolve, RecommendSubjectCreateParams } from '../types';
 
// 获取商品列表
export function fetchConfig(params: { pageNum: number; pageSize: number; keyword?: string; showStatus?: number }) {
    params.showStatus = 1
    return get<SubjectListResolve>(`/api/brand/list`, { ...params })
}

// 提交商品
export function recommendSubjectCreate(params: RecommendSubjectCreateParams[]) {
    return post<Response>(`/api/home/newProduct/create`, params)
}



